package dev.havlicektomas.snoozeloo.di

import dev.havlicektomas.snoozeloo.alarm.AndroidAlarmScheduler
import dev.havlicektomas.snoozeloo.alarm.RingtonePreviewPlayer
import dev.havlicektomas.snoozeloo.alarm.SystemRingtoneProvider
import dev.havlicektomas.snoozeloo.data.DatabaseDriverFactory
import dev.havlicektomas.snoozeloo.scheduling.AlarmSchedulerPort
import dev.havlicektomas.snoozeloo.ui.edit.AlarmEditViewModel
import dev.havlicektomas.snoozeloo.ui.list.AlarmListViewModel
import org.koin.android.ext.koin.androidContext
import org.koin.androidx.viewmodel.dsl.viewModel
import org.koin.core.module.Module
import org.koin.core.parameter.parametersOf
import org.koin.dsl.module

val androidModule: Module = module {
    single { DatabaseDriverFactory(androidContext()) }
    single { SystemRingtoneProvider(androidContext()) }
    factory { RingtonePreviewPlayer(androidContext()) }
    single<AlarmSchedulerPort> { AndroidAlarmScheduler(androidContext()) }

    viewModel { AlarmListViewModel(get(), get(), get()) }
    viewModel { params -> AlarmEditViewModel(params.get(), get(), get(), get(), get(), get()) }
}
