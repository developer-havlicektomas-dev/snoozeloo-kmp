package dev.havlicektomas.snoozeloo.ui.theme

import androidx.compose.material3.Typography
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp
import dev.havlicektomas.snoozeloo.R

/**
 * Inter for content, JetBrains Mono for clock numerals — matching the design system.
 * Only the Regular TTFs were provided, so heavier weights are synthesized by Compose.
 */
val Inter = FontFamily(
    Font(R.font.inter_regular, FontWeight.Normal),
    Font(R.font.inter_regular, FontWeight.Medium),
    Font(R.font.inter_regular, FontWeight.SemiBold),
    Font(R.font.inter_regular, FontWeight.Bold),
)

val JetBrainsMono = FontFamily(
    Font(R.font.jetbrains_mono_regular, FontWeight.Normal),
)

val SnoozeTypography = Typography(
    headlineLarge = TextStyle(
        fontFamily = Inter, fontWeight = FontWeight.Normal, fontSize = 28.sp, lineHeight = 34.sp,
    ),
    titleLarge = TextStyle(
        fontFamily = Inter, fontWeight = FontWeight.Normal, fontSize = 22.sp, lineHeight = 28.sp,
    ),
    titleMedium = TextStyle(
        fontFamily = Inter, fontWeight = FontWeight.SemiBold, fontSize = 17.sp, lineHeight = 22.sp,
    ),
    bodyLarge = TextStyle(
        fontFamily = Inter, fontWeight = FontWeight.Normal, fontSize = 16.sp, lineHeight = 22.sp,
    ),
    bodyMedium = TextStyle(
        fontFamily = Inter, fontWeight = FontWeight.Normal, fontSize = 15.sp, lineHeight = 20.sp,
    ),
    labelLarge = TextStyle(
        fontFamily = Inter, fontWeight = FontWeight.Medium, fontSize = 14.sp, lineHeight = 18.sp,
    ),
    labelMedium = TextStyle(
        fontFamily = Inter, fontWeight = FontWeight.SemiBold, fontSize = 13.sp, lineHeight = 16.sp,
    ),
)
