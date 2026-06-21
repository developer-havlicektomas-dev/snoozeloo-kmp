package dev.havlicektomas.snoozeloo.scheduling

import dev.havlicektomas.snoozeloo.domain.Alarm
import dev.havlicektomas.snoozeloo.domain.AlarmTimeCalculator
import kotlinx.datetime.Clock

/**
 * Bridges domain state changes to OS scheduling. The [scheduler] is set by the platform
 * after startup (Android in its `Application`, iOS in the app delegate / SwiftUI entry)
 * so the same coordination logic is shared without requiring Koin to know about the
 * platform implementation.
 */
class AlarmCoordinator(
    private val calculator: AlarmTimeCalculator,
    private val clock: Clock = Clock.System,
) {
    var scheduler: AlarmSchedulerPort? = null

    /** Re-schedule an enabled alarm at its next occurrence, or cancel it if disabled. */
    fun sync(alarm: Alarm) {
        val scheduler = scheduler ?: return
        if (alarm.enabled) {
            scheduler.schedule(alarm, calculator.nextOccurrence(alarm).toEpochMilliseconds())
        } else {
            scheduler.cancel(alarm.id)
        }
    }

    fun cancel(alarmId: Long) {
        scheduler?.cancel(alarmId)
    }

    /**
     * Schedule a one-off snooze 5 minutes out using a distinct (negative) id so it never
     * clobbers the alarm's normal repeating schedule.
     */
    fun snooze(alarm: Alarm) {
        val scheduler = scheduler ?: return
        val snoozeAlarm = alarm.copy(id = snoozeId(alarm.id), days = emptySet())
        scheduler.schedule(snoozeAlarm, calculator.snoozeInstant().toEpochMilliseconds())
    }

    /**
     * After a repeating alarm fires, re-arm it for the following matching weekday so it
     * keeps ringing on schedule. No-op for one-time alarms.
     */
    fun rescheduleAfterFire(alarm: Alarm) {
        if (alarm.enabled && alarm.repeats) sync(alarm)
    }

    companion object {
        /** Snooze pseudo-ids are negative so they don't collide with real row ids. */
        fun snoozeId(alarmId: Long): Long = -(alarmId + 1)
    }
}
