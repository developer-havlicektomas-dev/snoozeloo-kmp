package dev.havlicektomas.snoozeloo.ui.list

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Switch
import androidx.compose.material3.SwitchDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import dev.havlicektomas.snoozeloo.ui.theme.Inter
import dev.havlicektomas.snoozeloo.ui.theme.JetBrainsMono
import dev.havlicektomas.snoozeloo.ui.theme.SnoozeColors
import dev.havlicektomas.snoozeloo.ui.theme.SnoozeIcons

@Composable
fun AlarmListScreen(
    state: AlarmListState,
    onToggle: (Long, Boolean) -> Unit,
    onAddNew: () -> Unit,
    onEdit: (Long) -> Unit,
    onPreview: (Long) -> Unit,
) {
    Scaffold(
        containerColor = SnoozeColors.Surface,
        floatingActionButton = {
            FloatingActionButton(
                onClick = onAddNew,
                containerColor = SnoozeColors.PrimaryContainer,
                contentColor = SnoozeColors.OnPrimaryContainer,
                shape = RoundedCornerShape(16.dp),
            ) {
                Icon(SnoozeIcons.Plus, contentDescription = "Add alarm")
            }
        },
    ) { padding ->
        Column(modifier = Modifier.fillMaxSize().padding(padding)) {
            Header()
            when {
                state.isEmpty -> EmptyState()
                else -> LazyColumn(
                    modifier = Modifier.fillMaxSize(),
                    contentPadding = PaddingValues(start = 16.dp, end = 16.dp, top = 8.dp, bottom = 120.dp),
                    verticalArrangement = Arrangement.spacedBy(12.dp),
                ) {
                    items(state.alarms, key = { it.id }) { alarm ->
                        AlarmCard(alarm, onToggle, onEdit, onPreview)
                    }
                }
            }
        }
    }
}

@Composable
private fun Header() {
    Column(modifier = Modifier.padding(start = 24.dp, end = 24.dp, top = 18.dp, bottom = 10.dp)) {
        Text(
            text = "SNOOZELOO",
            color = SnoozeColors.Accent,
            fontFamily = Inter,
            fontWeight = FontWeight.SemiBold,
            fontSize = 12.sp,
            letterSpacing = 0.7.sp,
        )
        Text(
            text = "Your alarms",
            style = MaterialTheme.typography.headlineLarge,
            color = SnoozeColors.OnSurface,
        )
    }
}

@Composable
private fun EmptyState() {
    Column(
        modifier = Modifier.fillMaxSize().padding(horizontal = 32.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Spacer(Modifier.height(80.dp))
        Icon(
            SnoozeIcons.Bell,
            contentDescription = null,
            tint = SnoozeColors.OutlineVariant,
            modifier = Modifier.size(56.dp),
        )
        Text(
            "No alarms yet",
            fontSize = 20.sp,
            fontWeight = FontWeight.SemiBold,
            color = SnoozeColors.OnSurface,
            modifier = Modifier.padding(top = 18.dp),
        )
        Text(
            "Add your first alarm and we'll wake you on time.",
            fontSize = 15.sp,
            color = SnoozeColors.OnSurfaceVariant,
            textAlign = TextAlign.Center,
            modifier = Modifier.padding(top = 6.dp),
        )
    }
}

@Composable
private fun AlarmCard(
    alarm: AlarmListItemUi,
    onToggle: (Long, Boolean) -> Unit,
    onEdit: (Long) -> Unit,
    onPreview: (Long) -> Unit,
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(12.dp))
            .background(SnoozeColors.SurfaceContainer)
            .padding(18.dp),
    ) {
        Row(verticalAlignment = Alignment.Top) {
            Column(
                modifier = Modifier.weight(1f).clickable { onEdit(alarm.id) },
            ) {
                if (alarm.hasTitle) {
                    Text(
                        alarm.title,
                        fontSize = 15.sp,
                        fontWeight = FontWeight.Medium,
                        color = SnoozeColors.OnSurfaceVariant,
                    )
                }
                Text(
                    alarm.timeText,
                    fontFamily = JetBrainsMono,
                    fontSize = 42.sp,
                    color = if (alarm.enabled) SnoozeColors.OnSurface else SnoozeColors.Disabled,
                )
            }
            Column(horizontalAlignment = Alignment.End) {
                Switch(
                    checked = alarm.enabled,
                    onCheckedChange = { onToggle(alarm.id, it) },
                    colors = SwitchDefaults.colors(
                        checkedThumbColor = SnoozeColors.OnPrimary,
                        checkedTrackColor = SnoozeColors.Primary,
                    ),
                )
                Spacer(Modifier.height(12.dp))
                Box(
                    modifier = Modifier
                        .size(30.dp)
                        .clip(CircleShape)
                        .clickable { onPreview(alarm.id) },
                    contentAlignment = Alignment.Center,
                ) {
                    Icon(
                        SnoozeIcons.Bell,
                        contentDescription = "Preview alarm",
                        tint = SnoozeColors.OnSurfaceVariant,
                        modifier = Modifier.size(19.dp),
                    )
                }
            }
        }
        Row(
            modifier = Modifier.padding(top = 14.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
        ) {
            if (alarm.repeats) {
                alarm.dayChips.forEach { chip ->
                    Text(
                        chip.label,
                        fontSize = 13.sp,
                        fontWeight = FontWeight.SemiBold,
                        color = if (chip.selected) SnoozeColors.Primary else SnoozeColors.DayChipOff,
                    )
                }
            } else {
                Text("Ring once", fontSize = 13.sp, fontWeight = FontWeight.Medium, color = SnoozeColors.OnSurfaceVariant)
            }
        }
        Text(
            alarm.nextText,
            fontSize = 13.sp,
            fontWeight = FontWeight.SemiBold,
            color = SnoozeColors.Accent,
            modifier = Modifier.padding(top = 11.dp),
        )
        Text(
            alarm.sleepText,
            fontSize = 12.sp,
            color = SnoozeColors.OnSurfaceVariant,
            modifier = Modifier.padding(top = 3.dp),
        )
    }
}
