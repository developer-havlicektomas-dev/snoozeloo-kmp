package dev.havlicektomas.snoozeloo.data

import app.cash.sqldelight.db.SqlDriver

/**
 * Creates the platform SQL driver. The Android actual takes a `Context` constructor
 * argument; the iOS actual is parameterless.
 */
expect class DatabaseDriverFactory {
    fun createDriver(): SqlDriver
}
