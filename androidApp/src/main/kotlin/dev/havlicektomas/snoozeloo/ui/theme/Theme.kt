package dev.havlicektomas.snoozeloo.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable

/** Single light theme (the app has no dark mode per the spec). */
private val SnoozeColorScheme = lightColorScheme(
    primary = SnoozeColors.Primary,
    onPrimary = SnoozeColors.OnPrimary,
    primaryContainer = SnoozeColors.PrimaryContainer,
    onPrimaryContainer = SnoozeColors.OnPrimaryContainer,
    surface = SnoozeColors.Surface,
    onSurface = SnoozeColors.OnSurface,
    surfaceContainer = SnoozeColors.SurfaceContainer,
    surfaceContainerHigh = SnoozeColors.SurfaceContainerHigh,
    surfaceContainerHighest = SnoozeColors.SurfaceContainerHighest,
    onSurfaceVariant = SnoozeColors.OnSurfaceVariant,
    outline = SnoozeColors.Outline,
    outlineVariant = SnoozeColors.OutlineVariant,
    background = SnoozeColors.Surface,
    onBackground = SnoozeColors.OnSurface,
    error = SnoozeColors.Error,
    onError = SnoozeColors.OnError,
)

@Composable
fun SnoozelooTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = SnoozeColorScheme,
        typography = SnoozeTypography,
        content = content,
    )
}
