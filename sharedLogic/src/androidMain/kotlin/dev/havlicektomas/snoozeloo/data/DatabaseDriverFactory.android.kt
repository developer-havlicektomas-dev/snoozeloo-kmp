package dev.havlicektomas.snoozeloo.data

import android.content.Context
import app.cash.sqldelight.db.SqlDriver
import app.cash.sqldelight.driver.android.AndroidSqliteDriver
import dev.havlicektomas.snoozeloo.db.SnoozelooDatabase

actual class DatabaseDriverFactory(private val context: Context) {
    actual fun createDriver(): SqlDriver =
        AndroidSqliteDriver(SnoozelooDatabase.Schema, context, "snoozeloo.db")
}
