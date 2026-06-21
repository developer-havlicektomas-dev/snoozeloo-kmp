package dev.havlicektomas.snoozeloo.alarm

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import dev.havlicektomas.snoozeloo.data.AlarmRepository
import dev.havlicektomas.snoozeloo.scheduling.AlarmCoordinator
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import org.koin.core.context.GlobalContext

/** Re-schedules all enabled alarms after a device reboot. */
class BootReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        if (intent.action != Intent.ACTION_BOOT_COMPLETED) return
        val pending = goAsync()
        val koin = GlobalContext.get()
        val repository = koin.get<AlarmRepository>()
        val coordinator = koin.get<AlarmCoordinator>()
        CoroutineScope(Dispatchers.Default).launch {
            try {
                repository.getAllOnce()
                    .filter { it.enabled }
                    .forEach { coordinator.sync(it) }
            } finally {
                pending.finish()
            }
        }
    }
}
