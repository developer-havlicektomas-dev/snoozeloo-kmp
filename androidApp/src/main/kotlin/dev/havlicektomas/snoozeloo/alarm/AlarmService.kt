package dev.havlicektomas.snoozeloo.alarm

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.Context
import android.content.Intent
import android.media.AudioAttributes
import android.media.MediaPlayer
import android.media.RingtoneManager
import android.net.Uri
import android.os.Build
import android.os.IBinder
import android.os.VibrationEffect
import android.os.Vibrator
import android.os.VibratorManager
import dev.havlicektomas.snoozeloo.R
import dev.havlicektomas.snoozeloo.domain.Alarm
import dev.havlicektomas.snoozeloo.domain.Ringtones

/**
 * Foreground service that rings the alarm: plays the chosen sound on loop at the set
 * volume, optionally vibrates, and posts a full-screen-intent notification that launches
 * [AlarmTriggerActivity] over the lockscreen.
 */
class AlarmService : Service() {

    private var player: MediaPlayer? = null
    private var vibrator: Vibrator? = null

    override fun onBind(intent: Intent?): IBinder? = null

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        when (intent?.action) {
            ACTION_STOP -> {
                stopRinging()
                stopSelf()
                return START_NOT_STICKY
            }
        }
        val alarm = intent?.let { AlarmIntents.readAlarm(it) }
        if (alarm == null) {
            stopSelf()
            return START_NOT_STICKY
        }
        startForeground(NOTIFICATION_ID, buildNotification(alarm))
        startRinging(alarm)
        return START_STICKY
    }

    private fun buildNotification(alarm: Alarm): android.app.Notification {
        createChannel()
        val fullScreenIntent = Intent(this, AlarmTriggerActivity::class.java)
            .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK)
            .also { AlarmIntents.putAlarm(it, alarm) }
        val pending = PendingIntent.getActivity(
            this,
            alarm.id.toInt(),
            fullScreenIntent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE,
        )
        return android.app.Notification.Builder(this, CHANNEL_ID)
            .setSmallIcon(R.mipmap.ic_launcher)
            .setContentTitle(alarm.title.ifBlank { "Alarm" })
            .setContentText("%02d:%02d".format(alarm.hour, alarm.minute))
            .setCategory(android.app.Notification.CATEGORY_ALARM)
            .setOngoing(true)
            .setAutoCancel(false)
            .setFullScreenIntent(pending, true)
            .setContentIntent(pending)
            .build()
    }

    private fun startRinging(alarm: Alarm) {
        if (alarm.ringtoneId.isNotEmpty() && alarm.ringtoneId != Ringtones.SILENT_ID) {
            val uri = runCatching { Uri.parse(alarm.ringtoneId) }.getOrNull()
                ?: RingtoneManager.getDefaultUri(RingtoneManager.TYPE_ALARM)
            player = MediaPlayer().apply {
                setAudioAttributes(
                    AudioAttributes.Builder()
                        .setUsage(AudioAttributes.USAGE_ALARM)
                        .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
                        .build(),
                )
                isLooping = true
                val vol = (alarm.volume.coerceIn(0, 100)) / 100f
                setVolume(vol, vol)
                runCatching {
                    setDataSource(this@AlarmService, uri)
                    setOnPreparedListener { it.start() }
                    prepareAsync()
                }.onFailure { release(); player = null }
            }
        }
        if (alarm.vibrate) startVibration()
    }

    private fun startVibration() {
        vibrator = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            (getSystemService(Context.VIBRATOR_MANAGER_SERVICE) as VibratorManager).defaultVibrator
        } else {
            @Suppress("DEPRECATION")
            getSystemService(Context.VIBRATOR_SERVICE) as Vibrator
        }
        val pattern = longArrayOf(0, 500, 800)
        vibrator?.vibrate(VibrationEffect.createWaveform(pattern, 0))
    }

    private fun stopRinging() {
        player?.runCatching { if (isPlaying) stop() }
        player?.release()
        player = null
        vibrator?.cancel()
        vibrator = null
    }

    private fun createChannel() {
        val manager = getSystemService(NotificationManager::class.java)
        if (manager.getNotificationChannel(CHANNEL_ID) == null) {
            val channel = NotificationChannel(
                CHANNEL_ID,
                "Alarms",
                NotificationManager.IMPORTANCE_HIGH,
            ).apply {
                description = "Ringing alarms"
                setBypassDnd(true)
                setSound(null, null) // sound handled by the service's MediaPlayer
            }
            manager.createNotificationChannel(channel)
        }
    }

    override fun onDestroy() {
        stopRinging()
        super.onDestroy()
    }

    companion object {
        private const val CHANNEL_ID = "snoozeloo_alarms"
        private const val NOTIFICATION_ID = 1001
        const val ACTION_STOP = "dev.havlicektomas.snoozeloo.ACTION_STOP_ALARM"

        fun stop(context: Context) {
            context.startService(
                Intent(context, AlarmService::class.java).setAction(ACTION_STOP),
            )
        }
    }
}
