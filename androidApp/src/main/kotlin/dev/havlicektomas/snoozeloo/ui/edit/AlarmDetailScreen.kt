package dev.havlicektomas.snoozeloo.ui.edit

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Slider
import androidx.compose.material3.SliderDefaults
import androidx.compose.material3.Switch
import androidx.compose.material3.SwitchDefaults
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.ButtonDefaults
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import dev.havlicektomas.snoozeloo.domain.WeekDay
import dev.havlicektomas.snoozeloo.ui.theme.Inter
import dev.havlicektomas.snoozeloo.ui.theme.JetBrainsMono
import dev.havlicektomas.snoozeloo.ui.theme.SnoozeColors
import dev.havlicektomas.snoozeloo.ui.theme.SnoozeIcons

@Composable
fun AlarmDetailScreen(
    state: AlarmEditState,
    onBack: () -> Unit,
    onSave: () -> Unit,
    onSetHour: (String) -> Unit,
    onSetMinute: (String) -> Unit,
    onToggleDay: (WeekDay) -> Unit,
    onOpenName: () -> Unit,
    onSetNameDraft: (String) -> Unit,
    onSaveName: () -> Unit,
    onCancelName: () -> Unit,
    onOpenRingtone: () -> Unit,
    onSetVolume: (Int) -> Unit,
    onToggleVibrate: () -> Unit,
    onDelete: () -> Unit,
) {
    Column(modifier = Modifier.fillMaxWidth().background(SnoozeColors.Surface)) {
        // Top bar
        Row(
            modifier = Modifier.fillMaxWidth().padding(start = 8.dp, end = 16.dp, top = 6.dp, bottom = 4.dp),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            IconButton(onClick = onBack) {
                Icon(SnoozeIcons.ArrowBack, contentDescription = "Back", tint = SnoozeColors.OnSurface)
            }
            Text(
                state.screenTitle,
                style = MaterialTheme.typography.titleLarge,
                color = SnoozeColors.OnSurface,
                modifier = Modifier.weight(1f).padding(start = 4.dp),
            )
            TextButton(onClick = onSave, enabled = state.saveEnabled) {
                Text(
                    "Save",
                    color = if (state.saveEnabled) SnoozeColors.Accent else SnoozeColors.Disabled,
                    fontWeight = FontWeight.SemiBold,
                )
            }
        }

        Column(
            modifier = Modifier
                .fillMaxWidth()
                .verticalScroll(rememberScrollState())
                .padding(bottom = 44.dp),
        ) {
            // Time inputs
            Row(
                modifier = Modifier.fillMaxWidth().padding(top = 20.dp),
                horizontalArrangement = Arrangement.Center,
                verticalAlignment = Alignment.Top,
            ) {
                TimeField(value = state.hourText, onChange = onSetHour, label = "Hour")
                Text(
                    ":",
                    fontFamily = JetBrainsMono,
                    fontSize = 44.sp,
                    color = SnoozeColors.OnSurfaceVariant,
                    modifier = Modifier.padding(top = 18.dp, start = 6.dp, end = 6.dp),
                )
                TimeField(value = state.minuteText, onChange = onSetMinute, label = "Minute")
            }
            Text(
                state.nextText,
                fontSize = 14.sp,
                fontWeight = FontWeight.SemiBold,
                color = SnoozeColors.Accent,
                textAlign = TextAlign.Center,
                modifier = Modifier.fillMaxWidth().padding(top = 14.dp, bottom = 20.dp),
            )

            // Alarm name
            Card {
                RowBetween(
                    modifier = Modifier.clickable { onOpenName() },
                ) {
                    Text("Alarm name", fontSize = 16.sp, color = SnoozeColors.OnSurface)
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(state.titleLabel, fontSize = 16.sp, color = SnoozeColors.OnSurfaceVariant)
                        Icon(
                            SnoozeIcons.ChevronRight,
                            contentDescription = null,
                            tint = SnoozeColors.OnSurfaceVariant,
                        )
                    }
                }
            }

            // Repeat
            Text(
                "Repeat",
                fontSize = 13.sp,
                fontWeight = FontWeight.SemiBold,
                color = SnoozeColors.OnSurfaceVariant,
                modifier = Modifier.padding(start = 20.dp, top = 4.dp, bottom = 9.dp),
            )
            Row(
                modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp),
                horizontalArrangement = Arrangement.spacedBy(7.dp),
            ) {
                WeekDay.ordered.forEach { day ->
                    val selected = state.days.contains(day)
                    Box(
                        modifier = Modifier
                            .weight(1f)
                            .height(46.dp)
                            .clip(RoundedCornerShape(12.dp))
                            .background(if (selected) SnoozeColors.Primary else SnoozeColors.SurfaceContainerHighest)
                            .clickable { onToggleDay(day) },
                        contentAlignment = Alignment.Center,
                    ) {
                        Text(
                            day.label,
                            fontSize = 14.sp,
                            fontWeight = FontWeight.SemiBold,
                            color = if (selected) SnoozeColors.OnPrimary else SnoozeColors.OnSurfaceVariant,
                        )
                    }
                }
            }

            Spacer(Modifier.height(14.dp))

            // Ringtone
            Card {
                RowBetween(modifier = Modifier.clickable { onOpenRingtone() }) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            SnoozeIcons.Bell,
                            contentDescription = null,
                            tint = SnoozeColors.Accent,
                            modifier = Modifier.size(20.dp),
                        )
                        Spacer(Modifier.width(12.dp))
                        Text("Ringtone", fontSize = 16.sp, color = SnoozeColors.OnSurface)
                    }
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(state.ringtoneName, fontSize = 16.sp, color = SnoozeColors.OnSurfaceVariant)
                        Icon(
                            SnoozeIcons.ChevronRight,
                            contentDescription = null,
                            tint = SnoozeColors.OnSurfaceVariant,
                        )
                    }
                }
            }

            // Volume
            Card {
                Column {
                    RowBetween {
                        Text("Volume", fontSize = 16.sp, color = SnoozeColors.OnSurface)
                        Text("${state.volume}%", fontFamily = JetBrainsMono, fontSize = 14.sp, color = SnoozeColors.OnSurfaceVariant)
                    }
                    Slider(
                        value = state.volume.toFloat(),
                        onValueChange = { onSetVolume(it.toInt()) },
                        valueRange = 0f..100f,
                        colors = SliderDefaults.colors(
                            thumbColor = SnoozeColors.Accent,
                            activeTrackColor = SnoozeColors.Accent,
                        ),
                    )
                }
            }

            // Vibration
            Card {
                RowBetween {
                    Text("Vibration", fontSize = 16.sp, color = SnoozeColors.OnSurface)
                    Switch(
                        checked = state.vibrate,
                        onCheckedChange = { onToggleVibrate() },
                        colors = SwitchDefaults.colors(
                            checkedThumbColor = SnoozeColors.OnPrimary,
                            checkedTrackColor = SnoozeColors.Primary,
                        ),
                    )
                }
            }

            if (state.isEditing) {
                OutlinedButton(
                    onClick = onDelete,
                    modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 4.dp).height(50.dp),
                    shape = RoundedCornerShape(14.dp),
                    colors = ButtonDefaults.outlinedButtonColors(contentColor = SnoozeColors.Error),
                    border = androidx.compose.foundation.BorderStroke(1.dp, SnoozeColors.Error),
                ) {
                    Text("Delete alarm", fontWeight = FontWeight.Medium)
                }
            }
        }
    }

    if (state.nameDialogVisible) {
        AlertDialog(
            onDismissRequest = onCancelName,
            title = { Text("Alarm name") },
            text = {
                Column {
                    Text(
                        "Give this alarm a name, or leave it blank.",
                        fontSize = 14.sp,
                        color = SnoozeColors.OnSurfaceVariant,
                    )
                    Spacer(Modifier.height(14.dp))
                    OutlinedTextField(
                        value = state.nameDraft,
                        onValueChange = onSetNameDraft,
                        singleLine = true,
                        placeholder = { Text("Name") },
                        modifier = Modifier.fillMaxWidth(),
                    )
                }
            },
            confirmButton = { TextButton(onClick = onSaveName) { Text("Save", color = SnoozeColors.Accent) } },
            dismissButton = { TextButton(onClick = onCancelName) { Text("Cancel", color = SnoozeColors.Accent) } },
        )
    }
}

@Composable
private fun TimeField(value: String, onChange: (String) -> Unit, label: String) {
    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        BasicTextField(
            value = value,
            onValueChange = onChange,
            singleLine = true,
            textStyle = TextStyle(
                fontFamily = JetBrainsMono,
                fontSize = 50.sp,
                color = SnoozeColors.OnSurface,
                textAlign = TextAlign.Center,
            ),
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
            decorationBox = { inner ->
                Box(
                    modifier = Modifier
                        .width(116.dp)
                        .height(88.dp)
                        .clip(RoundedCornerShape(12.dp))
                        .background(SnoozeColors.SurfaceContainerHighest),
                    contentAlignment = Alignment.Center,
                ) { inner() }
            },
        )
        Text(label, fontSize = 12.sp, color = SnoozeColors.OnSurfaceVariant, modifier = Modifier.padding(top = 6.dp))
    }
}

@Composable
private fun Card(content: @Composable () -> Unit) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp, vertical = 7.dp)
            .clip(RoundedCornerShape(12.dp))
            .background(SnoozeColors.SurfaceContainer)
            .padding(16.dp),
    ) { content() }
}

@Composable
private fun RowBetween(modifier: Modifier = Modifier, content: @Composable () -> Unit) {
    Row(
        modifier = modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically,
    ) { content() }
}
