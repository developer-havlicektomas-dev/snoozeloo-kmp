package dev.havlicektomas.snoozeloo.alarm

import android.app.AlarmManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import dev.havlicektomas.snoozeloo.domain.Alarm
import dev.havlicektomas.snoozeloo.scheduling.AlarmSchedulerPort

/**
 * Schedules exact, doze-exempt alarms with [AlarmManager.setAlarmClock]. The alarm payload
 * travels in the PendingIntent so [AlarmReceiver] can ring without a DB lookup.
 */
class AndroidAlarmScheduler(private val context: Context) : AlarmSchedulerPort {

    private val alarmManager = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager

    override fun schedule(alarm: Alarm, triggerAtMillis: Long) {
        val pendingIntent = firePendingIntent(alarm, mutable = true)
        val showIntent = PendingIntent.getActivity(
            context,
            requestCode(alarm.id),
            Intent(context, AlarmTriggerActivity::class.java),
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE,
        )
        alarmManager.setAlarmClock(
            AlarmManager.AlarmClockInfo(triggerAtMillis, showIntent),
            pendingIntent,
        )
    }

    override fun cancel(alarmId: Long) {
        alarmManager.cancel(
            PendingIntent.getBroadcast(
                context,
                requestCode(alarmId),
                Intent(context, AlarmReceiver::class.java).setAction(AlarmIntents.ACTION_FIRE),
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE,
            ),
        )
    }

    private fun firePendingIntent(alarm: Alarm, mutable: Boolean): PendingIntent {
        val intent = Intent(context, AlarmReceiver::class.java)
            .setAction(AlarmIntents.ACTION_FIRE)
            .also { AlarmIntents.putAlarm(it, alarm) }
        val flags = PendingIntent.FLAG_UPDATE_CURRENT or
            (if (mutable) PendingIntent.FLAG_MUTABLE else PendingIntent.FLAG_IMMUTABLE)
        return PendingIntent.getBroadcast(context, requestCode(alarm.id), intent, flags)
    }

    /** Request codes must be Ints; negative snooze ids stay distinct from positive row ids. */
    private fun requestCode(alarmId: Long): Int = alarmId.toInt()
}
