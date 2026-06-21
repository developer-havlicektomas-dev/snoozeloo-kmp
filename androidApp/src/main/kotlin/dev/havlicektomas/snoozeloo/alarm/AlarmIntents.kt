package dev.havlicektomas.snoozeloo.alarm

import android.content.Intent
import dev.havlicektomas.snoozeloo.domain.Alarm
import dev.havlicektomas.snoozeloo.domain.WeekDay

/**
 * Serializes an [Alarm] into Intent extras so the receiver/service can ring without a
 * database read (important for snooze pseudo-alarms that aren't persisted).
 */
object AlarmIntents {
    const val ACTION_FIRE = "dev.havlicektomas.snoozeloo.ACTION_FIRE"

    private const val EXTRA_ID = "extra_id"
    private const val EXTRA_TITLE = "extra_title"
    private const val EXTRA_HOUR = "extra_hour"
    private const val EXTRA_MINUTE = "extra_minute"
    private const val EXTRA_DAYS = "extra_days"
    private const val EXTRA_RINGTONE = "extra_ringtone"
    private const val EXTRA_VOLUME = "extra_volume"
    private const val EXTRA_VIBRATE = "extra_vibrate"

    fun putAlarm(intent: Intent, alarm: Alarm): Intent = intent.apply {
        putExtra(EXTRA_ID, alarm.id)
        putExtra(EXTRA_TITLE, alarm.title)
        putExtra(EXTRA_HOUR, alarm.hour)
        putExtra(EXTRA_MINUTE, alarm.minute)
        putExtra(EXTRA_DAYS, alarm.days.map { it.calendarValue }.toIntArray())
        putExtra(EXTRA_RINGTONE, alarm.ringtoneId)
        putExtra(EXTRA_VOLUME, alarm.volume)
        putExtra(EXTRA_VIBRATE, alarm.vibrate)
    }

    fun readAlarm(intent: Intent): Alarm? {
        if (!intent.hasExtra(EXTRA_ID)) return null
        val days = (intent.getIntArrayExtra(EXTRA_DAYS) ?: IntArray(0))
            .map { WeekDay.fromCalendarValue(it) }.toSet()
        return Alarm(
            id = intent.getLongExtra(EXTRA_ID, 0L),
            title = intent.getStringExtra(EXTRA_TITLE).orEmpty(),
            hour = intent.getIntExtra(EXTRA_HOUR, 0),
            minute = intent.getIntExtra(EXTRA_MINUTE, 0),
            days = days,
            enabled = true,
            ringtoneId = intent.getStringExtra(EXTRA_RINGTONE).orEmpty(),
            volume = intent.getIntExtra(EXTRA_VOLUME, 50),
            vibrate = intent.getBooleanExtra(EXTRA_VIBRATE, true),
        )
    }
}
