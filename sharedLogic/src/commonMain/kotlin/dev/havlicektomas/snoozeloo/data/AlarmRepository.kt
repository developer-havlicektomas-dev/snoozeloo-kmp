package dev.havlicektomas.snoozeloo.data

import dev.havlicektomas.snoozeloo.domain.Alarm
import kotlinx.coroutines.flow.Flow

/** Persistence boundary for alarms. Implemented over SQLDelight. */
interface AlarmRepository {
    /** Emits the full alarm list and re-emits on any change. */
    fun getAlarms(): Flow<List<Alarm>>

    /** One-shot snapshot of all alarms. */
    suspend fun getAllOnce(): List<Alarm>

    suspend fun getById(id: Long): Alarm?

    /** Inserts (id == 0) or updates the alarm; returns the persisted id. */
    suspend fun upsert(alarm: Alarm): Long

    suspend fun setEnabled(id: Long, enabled: Boolean)

    suspend fun delete(id: Long)
}
