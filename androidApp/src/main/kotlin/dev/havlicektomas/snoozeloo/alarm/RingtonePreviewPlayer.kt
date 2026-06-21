package dev.havlicektomas.snoozeloo.alarm

import android.content.Context
import android.media.AudioAttributes
import android.media.MediaPlayer
import android.net.Uri
import dev.havlicektomas.snoozeloo.domain.Ringtones

/** Plays a short, non-looping preview of a ringtone for the picker screen. */
class RingtonePreviewPlayer(private val context: Context) {
    private var player: MediaPlayer? = null

    fun play(ringtoneId: String) {
        stop()
        if (ringtoneId.isEmpty() || ringtoneId == Ringtones.SILENT_ID) return
        player = MediaPlayer().apply {
            setAudioAttributes(
                AudioAttributes.Builder()
                    .setUsage(AudioAttributes.USAGE_ALARM)
                    .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
                    .build(),
            )
            runCatching {
                setDataSource(context, Uri.parse(ringtoneId))
                setOnPreparedListener { it.start() }
                prepareAsync()
            }.onFailure { stop() }
        }
    }

    fun stop() {
        player?.runCatching { if (isPlaying) stop() }
        player?.release()
        player = null
    }
}
