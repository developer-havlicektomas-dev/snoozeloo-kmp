package dev.havlicektomas.snoozeloo.alarm

import android.content.Context
import android.media.RingtoneManager
import android.net.Uri
import dev.havlicektomas.snoozeloo.domain.Ringtone
import dev.havlicektomas.snoozeloo.domain.Ringtones

/**
 * Lists the device's alarm ringtones plus a silent option, per the requirement to show
 * "all default Android ringtones". A ringtone id is the content Uri string; [Ringtones.SILENT_ID]
 * means no sound.
 */
class SystemRingtoneProvider(private val context: Context) {

    fun list(): List<Ringtone> {
        val result = mutableListOf(Ringtone(Ringtones.SILENT_ID, "Silent"))
        runCatching {
            val manager = RingtoneManager(context).apply { setType(RingtoneManager.TYPE_ALARM) }
            val cursor = manager.cursor
            while (cursor.moveToNext()) {
                val title = cursor.getString(RingtoneManager.TITLE_COLUMN_INDEX)
                val uri = manager.getRingtoneUri(cursor.position)
                if (uri != null) result.add(Ringtone(uri.toString(), title))
            }
        }
        return result
    }

    /** A sensible default for newly created alarms: the system's default alarm sound. */
    fun defaultId(): String =
        RingtoneManager.getActualDefaultRingtoneUri(context, RingtoneManager.TYPE_ALARM)
            ?.toString()
            ?: Ringtones.SILENT_ID

    fun nameFor(id: String): String {
        if (id.isEmpty() || id == Ringtones.SILENT_ID) return "Silent"
        return runCatching {
            RingtoneManager.getRingtone(context, Uri.parse(id))?.getTitle(context)
        }.getOrNull() ?: "Ringtone"
    }
}
