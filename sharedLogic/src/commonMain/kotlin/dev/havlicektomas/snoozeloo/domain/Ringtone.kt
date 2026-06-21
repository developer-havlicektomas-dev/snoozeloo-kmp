package dev.havlicektomas.snoozeloo.domain

/**
 * A selectable alarm sound. [id] is a stable key used for persistence and for mapping
 * to a platform sound resource; [name] is the user-facing label.
 */
data class Ringtone(val id: String, val name: String)

/**
 * The canonical ringtone list, mirroring the design reference
 * (`Snoozeloo.dc.html`). The first entry is the silent option.
 *
 * On Android the [id] maps to a bundled `raw` resource (or a system ringtone);
 * on iOS it maps to a bundled sound file. [SILENT_ID] means "no sound".
 */
object Ringtones {
    const val SILENT_ID = "silent"
    const val DEFAULT_ID = "bright_morning"

    val all: List<Ringtone> = listOf(
        Ringtone(SILENT_ID, "Silent"),
        Ringtone("bright_morning", "Bright morning"),
        Ringtone("argon", "Argon"),
        Ringtone("carbon", "Carbon"),
        Ringtone("helium", "Helium"),
        Ringtone("krypton", "Krypton"),
        Ringtone("neon", "Neon"),
        Ringtone("osmium", "Osmium"),
        Ringtone("platinum", "Platinum"),
        Ringtone("rhodium", "Rhodium"),
    )

    fun nameFor(id: String): String =
        all.firstOrNull { it.id == id }?.name ?: "Silent"
}
