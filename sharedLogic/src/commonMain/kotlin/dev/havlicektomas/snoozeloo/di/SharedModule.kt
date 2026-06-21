package dev.havlicektomas.snoozeloo.di

import dev.havlicektomas.snoozeloo.data.AlarmRepository
import dev.havlicektomas.snoozeloo.data.DatabaseDriverFactory
import dev.havlicektomas.snoozeloo.data.SqlDelightAlarmRepository
import dev.havlicektomas.snoozeloo.db.SnoozelooDatabase
import dev.havlicektomas.snoozeloo.domain.AlarmTimeCalculator
import dev.havlicektomas.snoozeloo.scheduling.AlarmCoordinator
import kotlinx.coroutines.Dispatchers
import kotlinx.datetime.Clock
import org.koin.core.module.Module
import org.koin.dsl.module

/**
 * Shared graph. The platform must additionally provide a [DatabaseDriverFactory]
 * (Android needs a `Context`) — see each app's platform module.
 */
val sharedModule: Module = module {
    single { SnoozelooDatabase(get<DatabaseDriverFactory>().createDriver()) }
    single<AlarmRepository> { SqlDelightAlarmRepository(get(), Dispatchers.Default) }
    single<Clock> { Clock.System }
    single { AlarmTimeCalculator(get()) }
    single { AlarmCoordinator(get(), get()) }
}
