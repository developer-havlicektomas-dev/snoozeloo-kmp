package dev.havlicektomas.snoozeloo.domain

/**
 * A single alarm. All configuration applies only to this alarm.
 *
 * @param id 0 for a not-yet-persisted alarm; a positive row id once stored.
 * @param days the weekdays this alarm repeats on; empty means "ring once".
 * @param volume 0..100, default 50.
 */
data class Alarm(
    val id: Long = 0L,
    val title: String = "",
    val hour: Int,
    val minute: Int,
    val days: Set<WeekDay> = emptySet(),
    val enabled: Boolean = true,
    val ringtoneId: String = Ringtones.DEFAULT_ID,
    val volume: Int = 50,
    val vibrate: Boolean = true,
) {
    val repeats: Boolean get() = days.isNotEmpty()
}
