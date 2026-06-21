package dev.havlicektomas.snoozeloo.ui.trigger

import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.graphicsLayer
import dev.havlicektomas.snoozeloo.ui.theme.SnoozeIcons
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.height
import dev.havlicektomas.snoozeloo.ui.theme.JetBrainsMono
import dev.havlicektomas.snoozeloo.ui.theme.SnoozeColors

@Composable
fun AlarmTriggerScreen(
    timeText: String,
    title: String,
    onTurnOff: () -> Unit,
    onSnooze: () -> Unit,
) {
    Surface(modifier = Modifier.fillMaxSize(), color = SnoozeColors.Surface) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = 24.dp, vertical = 36.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
        ) {
            Column(
                modifier = Modifier.weight(1f).fillMaxWidth(),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Center,
            ) {
                PulsingBell()
                Text(
                    text = "ALARM",
                    color = SnoozeColors.Accent,
                    fontWeight = FontWeight.SemiBold,
                    fontSize = 13.sp,
                    letterSpacing = 1.3.sp,
                    modifier = Modifier.padding(top = 22.dp),
                )
                Text(
                    text = timeText,
                    fontFamily = JetBrainsMono,
                    fontSize = 72.sp,
                    color = SnoozeColors.OnSurface,
                    modifier = Modifier.padding(top = 22.dp),
                )
                Text(
                    text = title,
                    fontSize = 20.sp,
                    color = SnoozeColors.OnSurfaceVariant,
                )
            }
            Button(
                onClick = onTurnOff,
                modifier = Modifier.fillMaxWidth().height(56.dp),
                colors = ButtonDefaults.buttonColors(containerColor = SnoozeColors.Primary),
            ) { Text("Turn off", fontSize = 16.sp, fontWeight = FontWeight.Medium) }
            Button(
                onClick = onSnooze,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(56.dp)
                    .padding(top = 0.dp),
                colors = ButtonDefaults.buttonColors(
                    containerColor = SnoozeColors.PrimaryContainer,
                    contentColor = SnoozeColors.OnPrimaryContainer,
                ),
            ) { Text("Snooze for 5 minutes", fontSize = 16.sp, fontWeight = FontWeight.Medium) }
        }
    }
}

@Composable
private fun PulsingBell() {
    val transition = rememberInfiniteTransition(label = "bell")
    val pulse by transition.animateFloat(
        initialValue = 1f,
        targetValue = 1.12f,
        animationSpec = infiniteRepeatable(tween(900), RepeatMode.Reverse),
        label = "pulse",
    )
    Box(contentAlignment = Alignment.Center) {
        Box(
            modifier = Modifier
                .size(96.dp)
                .graphicsLayer { scaleX = pulse; scaleY = pulse }
                .background(SnoozeColors.PrimaryContainer, CircleShape),
        )
        Icon(
            imageVector = SnoozeIcons.Bell,
            contentDescription = null,
            tint = SnoozeColors.Primary,
            modifier = Modifier.size(46.dp),
        )
    }
}
