package dev.havlicektomas.snoozeloo.ui.list

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dev.havlicektomas.snoozeloo.data.AlarmRepository
import dev.havlicektomas.snoozeloo.domain.Alarm
import dev.havlicektomas.snoozeloo.domain.AlarmTimeCalculator
import dev.havlicektomas.snoozeloo.domain.WeekDay
import dev.havlicektomas.snoozeloo.scheduling.AlarmCoordinator
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

class AlarmListViewModel(
    private val repository: AlarmRepository,
    private val calculator: AlarmTimeCalculator,
    private val coordinator: AlarmCoordinator,
) : ViewModel() {

    // Re-emits every minute so the "Rings in …" countdown stays current.
    private val ticker = flow {
        while (true) {
            emit(Unit)
            delay(60_000)
        }
    }

    val state: StateFlow<AlarmListState> =
        combine(repository.getAlarms(), ticker) { alarms, _ ->
            AlarmListState(loading = false, alarms = alarms.map { it.toUi() })
        }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), AlarmListState())

    fun toggle(id: Long, enabled: Boolean) {
        viewModelScope.launch {
            repository.setEnabled(id, enabled)
            repository.getById(id)?.let { coordinator.sync(it) }
        }
    }

    private fun Alarm.toUi(): AlarmListItemUi = AlarmListItemUi(
        id = id,
        timeText = AlarmTimeCalculator.formatTime(hour, minute),
        title = title,
        hasTitle = title.isNotBlank(),
        enabled = enabled,
        nextText = if (enabled) "Rings in ${calculator.nextOccurrenceText(this)}" else "Off",
        sleepText = "Go to bed at ${AlarmTimeCalculator.bedtime(hour, minute)} to get 8h of sleep",
        repeats = repeats,
        dayChips = WeekDay.ordered.map { DayChipUi(it.label, days.contains(it)) },
    )
}
