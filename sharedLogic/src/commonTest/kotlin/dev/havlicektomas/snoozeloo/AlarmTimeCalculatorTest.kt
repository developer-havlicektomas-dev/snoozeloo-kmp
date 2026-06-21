package dev.havlicektomas.snoozeloo

import dev.havlicektomas.snoozeloo.domain.Alarm
import dev.havlicektomas.snoozeloo.domain.AlarmTimeCalculator
import dev.havlicektomas.snoozeloo.domain.AlarmTimeCalculator.Companion.bedtime
import dev.havlicektomas.snoozeloo.domain.AlarmTimeCalculator.Companion.formatDuration
import dev.havlicektomas.snoozeloo.domain.TimeValidator
import dev.havlicektomas.snoozeloo.domain.WeekDay
import kotlinx.datetime.Instant
import kotlinx.datetime.LocalDateTime
import kotlinx.datetime.TimeZone
import kotlinx.datetime.toInstant
import kotlinx.datetime.toLocalDateTime
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertTrue

class AlarmTimeCalculatorTest {

    private val tz = TimeZone.UTC
    private val calc = AlarmTimeCalculator()

    // 2024-01-01 11:00 UTC is a Monday.
    private val mondayElevenAm: Instant =
        LocalDateTime(2024, 1, 1, 11, 0).toInstant(tz)

    private fun localOf(instant: Instant) = instant.toLocalDateTime(tz)

    @Test
    fun onceOnly_timeLaterToday_isToday() {
        val alarm = Alarm(hour = 23, minute = 0)
        val next = calc.nextOccurrence(alarm, mondayElevenAm, tz)
        val local = localOf(next)
        assertEquals(1, local.dayOfMonth)
        assertEquals(23, local.hour)
    }

    @Test
    fun onceOnly_timeAlreadyPast_isTomorrow() {
        // Spec example: Monday 11:00, user enters 09:00 -> next day 09:00.
        val alarm = Alarm(hour = 9, minute = 0)
        val next = calc.nextOccurrence(alarm, mondayElevenAm, tz)
        val local = localOf(next)
        assertEquals(2, local.dayOfMonth) // Tuesday
        assertEquals(9, local.hour)
    }

    @Test
    fun repeating_sameDayFutureTime_firesToday() {
        val alarm = Alarm(hour = 18, minute = 0, days = setOf(WeekDay.MONDAY))
        val next = calc.nextOccurrence(alarm, mondayElevenAm, tz)
        val local = localOf(next)
        assertEquals(1, local.dayOfMonth)
        assertEquals(18, local.hour)
    }

    @Test
    fun repeating_sameDayPastTime_firesNextWeek() {
        val alarm = Alarm(hour = 9, minute = 0, days = setOf(WeekDay.MONDAY))
        val next = calc.nextOccurrence(alarm, mondayElevenAm, tz)
        val local = localOf(next)
        assertEquals(8, local.dayOfMonth) // following Monday
        assertEquals(9, local.hour)
    }

    @Test
    fun repeating_picksSoonestEnabledWeekday() {
        val alarm = Alarm(hour = 7, minute = 30, days = setOf(WeekDay.WEDNESDAY, WeekDay.SATURDAY))
        val next = calc.nextOccurrence(alarm, mondayElevenAm, tz)
        val local = localOf(next)
        assertEquals(3, local.dayOfMonth) // Wednesday Jan 3
        assertEquals(7, local.hour)
        assertEquals(30, local.minute)
    }

    @Test
    fun formatDuration_matchesReference() {
        assertEquals("0min", formatDuration(0))
        assertEquals("45min", formatDuration(45L * 60_000))
        assertEquals("1h 0min", formatDuration(60L * 60_000))
        val oneDayFourHrs45 = (1L * 1440 + 4 * 60 + 45) * 60_000
        assertEquals("1d 4h 45min", formatDuration(oneDayFourHrs45))
    }

    @Test
    fun bedtime_isSixteenHoursLater_in12hFormat() {
        assertEquals("11:00pm", bedtime(7, 0))
        assertEquals("4:30pm", bedtime(0, 30))
    }

    @Test
    fun timeValidator_bounds() {
        assertTrue(TimeValidator.isValid("07", "30"))
        assertTrue(TimeValidator.isValid("23", "59"))
        assertTrue(TimeValidator.isValid("0", "0"))
        assertFalse(TimeValidator.isValid("24", "00"))
        assertFalse(TimeValidator.isValid("23", "60"))
        assertFalse(TimeValidator.isValid("", "30"))
        assertFalse(TimeValidator.isValid("ab", "30"))
        assertFalse(TimeValidator.isValid("123", "30"))
    }

    @Test
    fun snooze_isFiveMinutesLater() {
        val snooze = calc.snoozeInstant(mondayElevenAm)
        assertEquals(mondayElevenAm.toEpochMilliseconds() + 5L * 60_000, snooze.toEpochMilliseconds())
    }
}
