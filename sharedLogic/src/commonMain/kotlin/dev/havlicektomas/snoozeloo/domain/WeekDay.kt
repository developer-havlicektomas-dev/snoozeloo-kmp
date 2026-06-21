package dev.havlicektomas.snoozeloo.domain

/**
 * Days of the week. [calendarValue] matches the JS `Date.getDay()` convention used
 * by the design reference (Sunday = 0 .. Saturday = 6) so scheduling math and the
 * stored representation line up across platforms.
 */
enum class WeekDay(val calendarValue: Int, val label: String) {
    MONDAY(1, "Mo"),
    TUESDAY(2, "Tu"),
    WEDNESDAY(3, "We"),
    THURSDAY(4, "Th"),
    FRIDAY(5, "Fr"),
    SATURDAY(6, "Sa"),
    SUNDAY(0, "Su");

    companion object {
        /** Display order used in the weekday selector (Mon → Sun). */
        val ordered: List<WeekDay> = listOf(
            MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
        )

        fun fromCalendarValue(value: Int): WeekDay =
            entries.first { it.calendarValue == value }
    }
}
