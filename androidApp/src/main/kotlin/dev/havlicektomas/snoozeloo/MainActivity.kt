package dev.havlicektomas.snoozeloo

import android.Manifest
import android.app.AlarmManager
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.provider.Settings
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import dev.havlicektomas.snoozeloo.ui.edit.AlarmDetailScreen
import dev.havlicektomas.snoozeloo.ui.edit.AlarmEditViewModel
import dev.havlicektomas.snoozeloo.ui.edit.RingtoneScreen
import dev.havlicektomas.snoozeloo.ui.list.AlarmListScreen
import dev.havlicektomas.snoozeloo.ui.list.AlarmListViewModel
import dev.havlicektomas.snoozeloo.ui.theme.SnoozelooTheme
import dev.havlicektomas.snoozeloo.ui.trigger.AlarmTriggerScreen
import org.koin.androidx.compose.koinViewModel
import org.koin.core.parameter.parametersOf

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        enableEdgeToEdge()
        super.onCreate(savedInstanceState)
        ensurePermissions()
        setContent {
            SnoozelooTheme {
                SnoozelooRoot()
            }
        }
    }

    private fun ensurePermissions() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU &&
            checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) !=
            PackageManager.PERMISSION_GRANTED
        ) {
            requestPermissions(arrayOf(Manifest.permission.POST_NOTIFICATIONS), 0)
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            val alarmManager = getSystemService(Context.ALARM_SERVICE) as AlarmManager
            if (!alarmManager.canScheduleExactAlarms()) {
                runCatching {
                    startActivity(
                        Intent(
                            Settings.ACTION_REQUEST_SCHEDULE_EXACT_ALARM,
                            Uri.parse("package:$packageName"),
                        ),
                    )
                }
            }
        }
    }
}

private sealed interface Route {
    data object List : Route
    data class Edit(val alarmId: Long?) : Route
}

@Composable
private fun SnoozelooRoot() {
    var route by remember { mutableStateOf<Route>(Route.List) }
    var previewId by remember { mutableStateOf<Long?>(null) }

    val listViewModel: AlarmListViewModel = koinViewModel()
    val listState by listViewModel.state.collectAsStateWithLifecycle()

    when (val current = route) {
        Route.List -> AlarmListScreen(
            state = listState,
            onToggle = listViewModel::toggle,
            onAddNew = { route = Route.Edit(null) },
            onEdit = { route = Route.Edit(it) },
            onPreview = { previewId = it },
        )

        is Route.Edit -> EditFlow(
            alarmId = current.alarmId,
            onDone = { route = Route.List },
        )
    }

    // In-app preview of the trigger screen (does not ring).
    val previewItem = previewId?.let { id -> listState.alarms.firstOrNull { it.id == id } }
    if (previewItem != null) {
        AlarmTriggerScreen(
            timeText = previewItem.timeText,
            title = previewItem.title.ifBlank { "Alarm" },
            onTurnOff = { previewId = null },
            onSnooze = { previewId = null },
        )
        BackHandler { previewId = null }
    }
}

@Composable
private fun EditFlow(alarmId: Long?, onDone: () -> Unit) {
    val viewModel: AlarmEditViewModel = koinViewModel { parametersOf(alarmId ?: -1L) }
    val state by viewModel.state.collectAsStateWithLifecycle()
    var showRingtone by remember { mutableStateOf(false) }

    LaunchedEffect(Unit) {
        viewModel.navigateBack.collect { onDone() }
    }

    if (showRingtone) {
        RingtoneScreen(
            state = state,
            onBack = { showRingtone = false },
            onSelect = viewModel::selectRingtone,
        )
        BackHandler { showRingtone = false }
    } else {
        AlarmDetailScreen(
            state = state,
            onBack = onDone,
            onSave = viewModel::save,
            onSetHour = viewModel::setHour,
            onSetMinute = viewModel::setMinute,
            onToggleDay = viewModel::toggleDay,
            onOpenName = viewModel::openNameDialog,
            onSetNameDraft = viewModel::setNameDraft,
            onSaveName = viewModel::saveName,
            onCancelName = viewModel::cancelNameDialog,
            onOpenRingtone = { showRingtone = true },
            onSetVolume = viewModel::setVolume,
            onToggleVibrate = viewModel::toggleVibrate,
            onDelete = viewModel::delete,
        )
        BackHandler { onDone() }
    }
}
