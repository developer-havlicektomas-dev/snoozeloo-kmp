package dev.havlicektomas.snoozeloo.ui.edit

import androidx.compose.runtime.Immutable
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dev.havlicektomas.snoozeloo.alarm.RingtonePreviewPlayer
import dev.havlicektomas.snoozeloo.alarm.SystemRingtoneProvider
import dev.havlicektomas.snoozeloo.data.AlarmRepository
import dev.havlicektomas.snoozeloo.domain.Alarm
import dev.havlicektomas.snoozeloo.domain.AlarmTimeCalculator
import dev.havlicektomas.snoozeloo.domain.Ringtone
import dev.havlicektomas.snoozeloo.domain.TimeValidator
import dev.havlicektomas.snoozeloo.domain.WeekDay
import dev.havlicektomas.snoozeloo.scheduling.AlarmCoordinator
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.receiveAsFlow
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

@Immutable
data class AlarmEditState(
    val isEditing: Boolean = false,
    val hourText: String = "07",
    val minuteText: String = "00",
    val title: String = "",
    val days: Set<WeekDay> = emptySet(),
    val ringtoneId: String = "",
    val ringtoneName: String = "Silent",
    val volume: Int = 50,
    val vibrate: Boolean = true,
    val isValid: Boolean = true,
    val nextText: String = "",
    val nameDialogVisible: Boolean = false,
    val nameDraft: String = "",
    val previewingRingtoneId: String? = null,
    val ringtones: List<Ringtone> = emptyList(),
) {
    val saveEnabled: Boolean get() = isValid
    val titleLabel: String get() = title.ifBlank { "None" }
    val screenTitle: String get() = if (isEditing) "Edit alarm" else "Add alarm"
}

class AlarmEditViewModel(
    private val alarmId: Long,
    private val repository: AlarmRepository,
    private val calculator: AlarmTimeCalculator,
    private val coordinator: AlarmCoordinator,
    private val ringtoneProvider: SystemRingtoneProvider,
    private val previewPlayer: RingtonePreviewPlayer,
) : ViewModel() {

    private val _state = MutableStateFlow(AlarmEditState())
    val state: StateFlow<AlarmEditState> = _state.asStateFlow()

    private val _events = Channel<Unit>(Channel.BUFFERED)
    /** Emits when the screen should navigate back (save / delete). */
    val navigateBack = _events.receiveAsFlow()

    private var previewJob: Job? = null

    init {
        viewModelScope.launch {
            val ringtones = withContext(Dispatchers.IO) { ringtoneProvider.list() }
            val existing = if (alarmId >= 0) repository.getById(alarmId) else null
            _state.value = if (existing != null) {
                AlarmEditState(
                    isEditing = true,
                    hourText = pad(existing.hour),
                    minuteText = pad(existing.minute),
                    title = existing.title,
                    days = existing.days,
                    ringtoneId = existing.ringtoneId,
                    volume = existing.volume,
                    vibrate = existing.vibrate,
                    ringtones = ringtones,
                ).recomputed()
            } else {
                AlarmEditState(
                    isEditing = false,
                    ringtoneId = ringtoneProvider.defaultId(),
                    ringtones = ringtones,
                ).recomputed()
            }
        }
    }

    fun setHour(value: String) = update { copy(hourText = value.filter(Char::isDigit).take(2)) }
    fun setMinute(value: String) = update { copy(minuteText = value.filter(Char::isDigit).take(2)) }

    fun toggleDay(day: WeekDay) = update {
        copy(days = if (days.contains(day)) days - day else days + day)
    }

    fun openNameDialog() = update { copy(nameDialogVisible = true, nameDraft = title) }
    fun setNameDraft(value: String) = update { copy(nameDraft = value) }
    fun saveName() = update { copy(title = nameDraft, nameDialogVisible = false) }
    fun cancelNameDialog() = update { copy(nameDialogVisible = false) }

    fun setVolume(value: Int) = update { copy(volume = value.coerceIn(0, 100)) }
    fun toggleVibrate() = update { copy(vibrate = !vibrate) }

    fun selectRingtone(id: String) {
        update { copy(ringtoneId = id, previewingRingtoneId = id) }
        previewPlayer.play(id)
        previewJob?.cancel()
        previewJob = viewModelScope.launch {
            delay(3_000)
            previewPlayer.stop()
            update { if (previewingRingtoneId == id) copy(previewingRingtoneId = null) else this }
        }
    }

    fun save() {
        val s = _state.value
        if (!s.isValid) return
        viewModelScope.launch {
            val alarm = Alarm(
                id = if (s.isEditing) alarmId else 0L,
                title = s.title,
                hour = s.hourText.toInt(),
                minute = s.minuteText.toInt(),
                days = s.days,
                enabled = true,
                ringtoneId = s.ringtoneId,
                volume = s.volume,
                vibrate = s.vibrate,
            )
            val newId = repository.upsert(alarm)
            coordinator.sync(alarm.copy(id = newId))
            _events.send(Unit)
        }
    }

    fun delete() {
        if (!_state.value.isEditing) return
        viewModelScope.launch {
            repository.delete(alarmId)
            coordinator.cancel(alarmId)
            _events.send(Unit)
        }
    }

    override fun onCleared() {
        previewPlayer.stop()
        super.onCleared()
    }

    private inline fun update(block: AlarmEditState.() -> AlarmEditState) {
        _state.value = _state.value.block().recomputed()
    }

    private fun AlarmEditState.recomputed(): AlarmEditState {
        val valid = TimeValidator.isValid(hourText, minuteText)
        val next = if (valid) {
            val draft = Alarm(hour = hourText.toInt(), minute = minuteText.toInt(), days = days)
            "Alarm in ${calculator.nextOccurrenceText(draft)}"
        } else {
            "Enter a valid time"
        }
        return copy(
            isValid = valid,
            nextText = next,
            ringtoneName = ringtoneProvider.nameFor(ringtoneId),
        )
    }

    private fun pad(n: Int): String = n.toString().padStart(2, '0')
}
