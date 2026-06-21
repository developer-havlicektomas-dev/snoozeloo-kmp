package dev.havlicektomas.snoozeloo.scheduling

import dev.havlicektomas.snoozeloo.domain.Alarm

/**
 * Platform hook for OS-level alarm scheduling. Implemented by each app:
 * Android with `AlarmManager`, iOS with `UNUserNotificationCenter`.
 *
 * The full [Alarm] payload is passed so the platform can carry the ringtone, volume,
 * title etc. into the trigger without a database round-trip.
 */
interface AlarmSchedulerPort {
    /** Schedule (or reschedule) [alarm] to fire at [triggerAtMillis] (epoch millis). */
    fun schedule(alarm: Alarm, triggerAtMillis: Long)

    /** Cancel any pending OS alarm previously scheduled for [alarmId]. */
    fun cancel(alarmId: Long)
}
