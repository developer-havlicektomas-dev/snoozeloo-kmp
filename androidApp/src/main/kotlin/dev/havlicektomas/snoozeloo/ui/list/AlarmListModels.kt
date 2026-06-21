package dev.havlicektomas.snoozeloo.ui.list

import androidx.compose.runtime.Immutable

@Immutable
data class DayChipUi(val label: String, val selected: Boolean)

@Immutable
data class AlarmListItemUi(
    val id: Long,
    val timeText: String,
    val title: String,
    val hasTitle: Boolean,
    val enabled: Boolean,
    val nextText: String,
    val sleepText: String,
    val repeats: Boolean,
    val dayChips: List<DayChipUi>,
)

@Immutable
data class AlarmListState(
    val loading: Boolean = true,
    val alarms: List<AlarmListItemUi> = emptyList(),
) {
    val isEmpty: Boolean get() = !loading && alarms.isEmpty()
}
