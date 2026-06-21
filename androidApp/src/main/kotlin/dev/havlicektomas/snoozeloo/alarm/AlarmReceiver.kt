package dev.havlicektomas.snoozeloo.alarm

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import dev.havlicektomas.snoozeloo.scheduling.AlarmCoordinator
import org.koin.core.context.GlobalContext

/** Fired by [AlarmManager][android.app.AlarmManager] at the alarm time. */
class AlarmReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        if (intent.action != AlarmIntents.ACTION_FIRE) return
        val alarm = AlarmIntents.readAlarm(intent) ?: return

        // Start ringing in a foreground service.
        context.startForegroundService(
            Intent(context, AlarmService::class.java).also { AlarmIntents.putAlarm(it, alarm) },
        )

        // Re-arm repeating alarms for their next occurrence.
        runCatching {
            val coordinator = GlobalContext.get().get<AlarmCoordinator>()
            coordinator.rescheduleAfterFire(alarm)
        }
    }
}
