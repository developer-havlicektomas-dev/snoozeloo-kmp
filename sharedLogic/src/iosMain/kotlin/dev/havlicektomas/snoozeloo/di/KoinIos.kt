package dev.havlicektomas.snoozeloo.di

import dev.havlicektomas.snoozeloo.data.AlarmRepository
import dev.havlicektomas.snoozeloo.data.DatabaseDriverFactory
import dev.havlicektomas.snoozeloo.domain.Alarm
import dev.havlicektomas.snoozeloo.domain.AlarmTimeCalculator
import dev.havlicektomas.snoozeloo.domain.TimeValidator
import dev.havlicektomas.snoozeloo.scheduling.AlarmCoordinator
import dev.havlicektomas.snoozeloo.scheduling.AlarmSchedulerPort
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.flow.launchIn
import kotlinx.coroutines.flow.onEach
import kotlinx.coroutines.launch
import org.koin.core.component.KoinComponent
import org.koin.core.component.get
import org.koin.core.context.startKoin
import org.koin.dsl.module

/** Called once from Swift (in `iOSApp.init`) to stand up the Koin graph. */
fun startKoinIos() {
    startKoin {
        modules(
            sharedModule,
            module { single { DatabaseDriverFactory() } },
        )
    }
}

/**
 * Swift-friendly facade over the shared graph. Exposes only non-suspending methods so
 * SwiftUI never has to deal with Kotlin `Flow` or coroutines — writes are fire-and-forget
 * on an internal main-dispatcher scope, and reads are delivered via a callback.
 */
class IosAlarmFacade : KoinComponent {
    private val repository: AlarmRepository = get()
    private val coordinator: AlarmCoordinator = get()
    private val calculator: AlarmTimeCalculator = get()
    private val scope = CoroutineScope(SupervisorJob() + Dispatchers.Main)

    /** Plug in the Swift `UNUserNotificationCenter` scheduler. */
    fun setScheduler(scheduler: AlarmSchedulerPort) {
        coordinator.scheduler = scheduler
    }

    /** Observe the alarm list; [onChange] is invoked on the main thread on every change. */
    fun observeAlarms(onChange: (List<Alarm>) -> Unit) {
        repository.getAlarms().onEach(onChange).launchIn(scope)
    }

    fun save(alarm: Alarm, onSaved: (Alarm) -> Unit) {
        scope.launch {
            val id = repository.upsert(alarm)
            val saved = alarm.copy(id = id)
            coordinator.sync(saved)
            onSaved(saved)
        }
    }

    fun setEnabled(id: Long, enabled: Boolean) {
        scope.launch {
            repository.setEnabled(id, enabled)
            repository.getById(id)?.let { coordinator.sync(it) }
        }
    }

    fun delete(id: Long) {
        scope.launch {
            repository.delete(id)
            coordinator.cancel(id)
        }
    }

    fun snooze(alarm: Alarm) = coordinator.snooze(alarm)

    // --- Pure helpers exposed for the SwiftUI layer ---
    fun nextOccurrenceText(alarm: Alarm): String = calculator.nextOccurrenceText(alarm)
    fun nextOccurrenceMillis(alarm: Alarm): Long = calculator.nextOccurrence(alarm).toEpochMilliseconds()
    fun isValidTime(hour: String, minute: String): Boolean = TimeValidator.isValid(hour, minute)
    fun formatTime(hour: Int, minute: Int): String = AlarmTimeCalculator.formatTime(hour, minute)
    fun bedtime(hour: Int, minute: Int): String = AlarmTimeCalculator.bedtime(hour, minute)
}
