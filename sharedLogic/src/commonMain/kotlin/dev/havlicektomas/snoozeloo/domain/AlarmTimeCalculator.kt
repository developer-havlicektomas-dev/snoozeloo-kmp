package dev.havlicektomas.snoozeloo.domain

import kotlinx.datetime.Clock
import kotlinx.datetime.DateTimeUnit
import kotlinx.datetime.Instant
import kotlinx.datetime.LocalDateTime
import kotlinx.datetime.LocalTime
import kotlinx.datetime.TimeZone
import kotlinx.datetime.isoDayNumber
import kotlinx.datetime.plus
import kotlinx.datetime.toInstant
import kotlinx.datetime.toLocalDateTime

/**
 * Pure scheduling/formatting logic, ported 1:1 from the design reference
 * (`Snoozeloo.dc.html` `Component` class). Kept side-effect free and clock-injected
 * so it can be unit-tested deterministically and shared across platforms.
 */
class AlarmTimeCalculator(private val clock: Clock = Clock.System) {

    /**
     * The next [Instant] this alarm will fire.
     * - Not repeating: today at the set time, or tomorrow if that is already past.
     * - Repeating: the soonest enabled weekday strictly in the future (scans 8 days).
     */
    fun nextOccurrence(
        alarm: Alarm,
        now: Instant = clock.now(),
        timeZone: TimeZone = TimeZone.currentSystemDefault(),
    ): Instant {
        val nowLocal = now.toLocalDateTime(timeZone)
        val time = LocalTime(alarm.hour, alarm.minute)

        if (alarm.days.isEmpty()) {
            var candidate = LocalDateTime(nowLocal.date, time).toInstant(timeZone)
            if (candidate <= now) {
                candidate = LocalDateTime(nowLocal.date.plus(1, DateTimeUnit.DAY), time)
                    .toInstant(timeZone)
            }
            return candidate
        }

        for (i in 0..7) {
            val date = nowLocal.date.plus(i, DateTimeUnit.DAY)
            val weekDay = WeekDay.fromCalendarValue(date.dayOfWeek.isoDayNumber % 7)
            val candidate = LocalDateTime(date, time).toInstant(timeZone)
            if (alarm.days.contains(weekDay) && candidate > now) return candidate
        }
        return now
    }

    /** Milliseconds from [now] until the next occurrence (never negative). */
    fun millisUntilNext(alarm: Alarm, now: Instant = clock.now()): Long =
        nextOccurrence(alarm, now).toEpochMilliseconds() - now.toEpochMilliseconds()

    /** e.g. "1d 4h 45min" — the human-readable countdown to the next occurrence. */
    fun nextOccurrenceText(alarm: Alarm, now: Instant = clock.now()): String =
        formatDuration(millisUntilNext(alarm, now))

    /** A new instant 5 minutes from [now]; used for snoozing without touching the schedule. */
    fun snoozeInstant(now: Instant = clock.now()): Instant =
        now.plus(5, DateTimeUnit.MINUTE)

    companion object {
        private fun pad(n: Int): String = n.toString().padStart(2, '0')

        /** "07:05" */
        fun formatTime(hour: Int, minute: Int): String = "${pad(hour)}:${pad(minute)}"

        /** "1d 4h 45min" — days/hours shown only when relevant, minutes always shown. */
        fun formatDuration(millis: Long): String {
            var mins = maxOf(0L, millis / 60_000L)
            val days = mins / 1440
            mins %= 1440
            val hours = mins / 60
            val minutes = mins % 60
            val parts = buildList {
                if (days > 0) add("${days}d")
                if (days > 0 || hours > 0) add("${hours}h")
                add("${minutes}min")
            }
            return parts.joinToString(" ")
        }

        /** Recommended bedtime for 8h sleep — the alarm time minus 8h (i.e. +16h), 12h formatted. */
        fun bedtime(hour: Int, minute: Int): String = to12((hour + 16) % 24, minute)

        private fun to12(hour: Int, minute: Int): String {
            val hr = ((hour + 11) % 12) + 1
            val suffix = if (hour < 12) "am" else "pm"
            return "$hr:${pad(minute)}$suffix"
        }
    }
}

/** Validates raw text from the two time-input fields. */
object TimeValidator {
    private val twoDigits = Regex("\\d{1,2}")

    fun isValid(hourText: String, minuteText: String): Boolean {
        if (!hourText.matches(twoDigits) || !minuteText.matches(twoDigits)) return false
        val h = hourText.toIntOrNull() ?: return false
        val m = minuteText.toIntOrNull() ?: return false
        return h in 0..23 && m in 0..59
    }
}
