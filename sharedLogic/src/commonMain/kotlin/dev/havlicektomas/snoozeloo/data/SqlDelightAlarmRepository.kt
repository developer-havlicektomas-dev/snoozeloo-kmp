package dev.havlicektomas.snoozeloo.data

import app.cash.sqldelight.coroutines.asFlow
import app.cash.sqldelight.coroutines.mapToList
import dev.havlicektomas.snoozeloo.db.SnoozelooDatabase
import dev.havlicektomas.snoozeloo.domain.Alarm
import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.withContext

class SqlDelightAlarmRepository(
    database: SnoozelooDatabase,
    private val dispatcher: CoroutineDispatcher,
) : AlarmRepository {

    private val queries = database.alarmQueries

    override fun getAlarms(): Flow<List<Alarm>> =
        queries.selectAll().asFlow().mapToList(dispatcher).map { rows -> rows.map { it.toDomain() } }

    override suspend fun getAllOnce(): List<Alarm> = withContext(dispatcher) {
        queries.selectAll().executeAsList().map { it.toDomain() }
    }

    override suspend fun getById(id: Long): Alarm? = withContext(dispatcher) {
        queries.selectById(id).executeAsOneOrNull()?.toDomain()
    }

    override suspend fun upsert(alarm: Alarm): Long = withContext(dispatcher) {
        if (alarm.id == 0L) {
            queries.insert(
                title = alarm.title,
                hour = alarm.hour.toLong(),
                minute = alarm.minute.toLong(),
                days = alarm.days.encode(),
                enabled = if (alarm.enabled) 1L else 0L,
                ringtoneId = alarm.ringtoneId,
                volume = alarm.volume.toLong(),
                vibrate = if (alarm.vibrate) 1L else 0L,
            )
            queries.lastInsertRowId().executeAsOne()
        } else {
            queries.update(
                title = alarm.title,
                hour = alarm.hour.toLong(),
                minute = alarm.minute.toLong(),
                days = alarm.days.encode(),
                enabled = if (alarm.enabled) 1L else 0L,
                ringtoneId = alarm.ringtoneId,
                volume = alarm.volume.toLong(),
                vibrate = if (alarm.vibrate) 1L else 0L,
                id = alarm.id,
            )
            alarm.id
        }
    }

    override suspend fun setEnabled(id: Long, enabled: Boolean) = withContext(dispatcher) {
        queries.setEnabled(enabled = if (enabled) 1L else 0L, id = id)
    }

    override suspend fun delete(id: Long) = withContext(dispatcher) {
        queries.deleteById(id)
    }
}
