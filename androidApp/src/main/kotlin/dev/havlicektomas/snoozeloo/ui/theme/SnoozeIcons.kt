package dev.havlicektomas.snoozeloo.ui.theme

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.PathParser
import androidx.compose.ui.unit.dp

/**
 * Line icons built from the design's own SVG path data (the Material Icons artifact isn't
 * on the Compose-Multiplatform classpath). Drawn as strokes so `Icon(tint = …)` recolors them.
 */
object SnoozeIcons {
    val Bell: ImageVector = stroke(
        "Bell",
        "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9 M10.3 21a1.94 1.94 0 0 0 3.4 0",
    )

    val ArrowBack: ImageVector = stroke("ArrowBack", "M19 12H5M12 19l-7-7 7-7")

    val ChevronRight: ImageVector = stroke("ChevronRight", "m9 18 6-6-6-6")

    val Plus: ImageVector = stroke("Plus", "M12 5v14M5 12h14")

    private fun stroke(name: String, pathData: String, strokeWidth: Float = 1.9f): ImageVector =
        ImageVector.Builder(
            name = name,
            defaultWidth = 24.dp,
            defaultHeight = 24.dp,
            viewportWidth = 24f,
            viewportHeight = 24f,
        ).apply {
            addPath(
                pathData = PathParser().parsePathString(pathData).toNodes(),
                stroke = SolidColor(Color.Black),
                strokeLineWidth = strokeWidth,
                strokeLineCap = StrokeCap.Round,
                strokeLineJoin = StrokeJoin.Round,
            )
        }.build()
}
