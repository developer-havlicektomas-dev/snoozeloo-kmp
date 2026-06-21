package dev.havlicektomas.snoozeloo

import android.app.Application
import dev.havlicektomas.snoozeloo.di.androidModule
import dev.havlicektomas.snoozeloo.di.sharedModule
import dev.havlicektomas.snoozeloo.scheduling.AlarmCoordinator
import dev.havlicektomas.snoozeloo.scheduling.AlarmSchedulerPort
import org.koin.android.ext.koin.androidContext
import org.koin.core.context.startKoin

class SnoozelooApp : Application() {
    override fun onCreate() {
        super.onCreate()
        val koinApp = startKoin {
            androidContext(this@SnoozelooApp)
            modules(sharedModule, androidModule)
        }
        // Wire the platform scheduler into the shared coordinator.
        val koin = koinApp.koin
        koin.get<AlarmCoordinator>().scheduler = koin.get<AlarmSchedulerPort>()
    }
}
