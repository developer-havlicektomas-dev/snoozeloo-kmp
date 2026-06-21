package dev.havlicektomas.snoozeloo.ui.theme

import androidx.compose.ui.graphics.Color

/** Brand + Material 3 tokens, taken from the design's `ui_kits/android/kit.css`. */
object SnoozeColors {
    val Primary = Color(0xFF12B76A)
    val OnPrimary = Color(0xFFFFFFFF)
    val PrimaryContainer = Color(0xFFECFDF3)
    val OnPrimaryContainer = Color(0xFF054F31)

    /** Accent used for "next occurrence" text and the ringtone icon. */
    val Accent = Color(0xFF006A60)

    val Surface = Color(0xFFFBFDF9)
    val SurfaceContainer = Color(0xFFF2F4EF)
    val SurfaceContainerHigh = Color(0xFFECEEE9)
    val SurfaceContainerHighest = Color(0xFFE6E8E3)
    val OnSurface = Color(0xFF1A1C18)
    val OnSurfaceVariant = Color(0xFF45483F)
    val Outline = Color(0xFF75786F)
    val OutlineVariant = Color(0xFFC4C8BD)

    val Error = Color(0xFFBA1A1A)
    val OnError = Color(0xFFFFFFFF)

    /** Disabled "Save" / inactive day chip text. */
    val Disabled = Color(0xFFA1A1AA)
    val DayChipOff = Color(0xFFC4C4CC)
}
