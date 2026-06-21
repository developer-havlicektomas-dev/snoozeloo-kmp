package dev.havlicektomas.snoozeloo.data

import dev.havlicektomas.snoozeloo.db.AlarmEntity
import dev.havlicektomas.snoozeloo.domain.Alarm
import dev.havlicektomas.snoozeloo.domain.WeekDay

/** Encodes the repeat days as a comma-joined list of [WeekDay.calendarValue], e.g. "1,2,3". */
internal fun Set<WeekDay>.encode(): String =
    sortedBy { it.calendarValue }.joinToString(",") { it.calendarValue.toString() }

internal fun decodeDays(raw: String): Set<WeekDay> =
    raw.split(",")
        .mapNotNull { it.trim().toIntOrNull() }
        .map { WeekDay.fromCalendarValue(it) }
        .toSet()

internal fun AlarmEntity.toDomain(): Alarm = Alarm(
    id = id,
    title = title,
    hour = hour.toInt(),
    minute = minute.toInt(),
    days = decodeDays(days),
    enabled = enabled == 1L,
    ringtoneId = ringtoneId,
    volume = volume.toInt(),
    vibrate = vibrate == 1L,
)
