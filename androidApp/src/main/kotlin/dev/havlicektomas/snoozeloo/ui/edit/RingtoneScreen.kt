package dev.havlicektomas.snoozeloo.ui.edit

import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import dev.havlicektomas.snoozeloo.domain.Ringtone
import dev.havlicektomas.snoozeloo.ui.theme.SnoozeColors
import dev.havlicektomas.snoozeloo.ui.theme.SnoozeIcons

@Composable
fun RingtoneScreen(
    state: AlarmEditState,
    onBack: () -> Unit,
    onSelect: (String) -> Unit,
) {
    Column(modifier = Modifier.fillMaxSize().background(SnoozeColors.Surface)) {
        Row(
            modifier = Modifier.fillMaxWidth().padding(start = 8.dp, top = 6.dp, bottom = 6.dp),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            IconButton(onClick = onBack) {
                Icon(SnoozeIcons.ArrowBack, contentDescription = "Back", tint = SnoozeColors.OnSurface)
            }
            Text(
                "Ringtone",
                style = MaterialTheme.typography.titleLarge,
                color = SnoozeColors.OnSurface,
                modifier = Modifier.padding(start = 4.dp),
            )
        }
        LazyColumn(modifier = Modifier.fillMaxSize()) {
            items(state.ringtones, key = { it.id }) { ringtone ->
                RingtoneRow(
                    ringtone = ringtone,
                    selected = ringtone.id == state.ringtoneId,
                    previewing = ringtone.id == state.previewingRingtoneId,
                    onClick = { onSelect(ringtone.id) },
                )
            }
            item {
                Text(
                    "Tap a sound to hear a short preview. Your choice is saved when you go back.",
                    fontSize = 13.sp,
                    color = SnoozeColors.OnSurfaceVariant,
                    modifier = Modifier.padding(horizontal = 24.dp, vertical = 14.dp),
                )
            }
        }
    }
}

@Composable
private fun RingtoneRow(
    ringtone: Ringtone,
    selected: Boolean,
    previewing: Boolean,
    onClick: () -> Unit,
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onClick() }
            .padding(horizontal = 24.dp, vertical = 14.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Box(
            modifier = Modifier
                .size(20.dp)
                .clip(CircleShape)
                .border(2.dp, if (selected) SnoozeColors.Accent else SnoozeColors.Outline, CircleShape),
            contentAlignment = Alignment.Center,
        ) {
            if (selected) {
                Box(modifier = Modifier.size(10.dp).clip(CircleShape).background(SnoozeColors.Accent))
            }
        }
        Spacer(Modifier.width(16.dp))
        Text(ringtone.name, fontSize = 16.sp, color = SnoozeColors.OnSurface, modifier = Modifier.weight(1f))
        if (previewing) Equalizer()
    }
}

@Composable
private fun Equalizer() {
    val transition = rememberInfiniteTransition(label = "eq")
    Row(
        verticalAlignment = Alignment.Bottom,
        horizontalArrangement = Arrangement.spacedBy(2.dp),
        modifier = Modifier.height(16.dp),
    ) {
        repeat(3) { index ->
            val scale by transition.animateFloat(
                initialValue = 0.35f,
                targetValue = 1f,
                animationSpec = infiniteRepeatable(
                    tween(600, delayMillis = index * 200),
                    RepeatMode.Reverse,
                ),
                label = "bar$index",
            )
            Box(
                modifier = Modifier
                    .width(3.dp)
                    .height((16 * scale).dp)
                    .clip(RoundedCornerShape(2.dp))
                    .background(SnoozeColors.Accent),
            )
        }
    }
}
