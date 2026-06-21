package dev.havlicektomas.snoozeloo.data

import app.cash.sqldelight.db.SqlDriver
import app.cash.sqldelight.driver.native.NativeSqliteDriver
import dev.havlicektomas.snoozeloo.db.SnoozelooDatabase

actual class DatabaseDriverFactory {
    actual fun createDriver(): SqlDriver =
        NativeSqliteDriver(SnoozelooDatabase.Schema, "snoozeloo.db")
}
