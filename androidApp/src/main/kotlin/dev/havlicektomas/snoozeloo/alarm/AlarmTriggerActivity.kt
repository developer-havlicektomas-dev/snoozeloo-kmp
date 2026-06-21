package dev.havlicektomas.snoozeloo.alarm

import android.os.Build
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import dev.havlicektomas.snoozeloo.domain.AlarmTimeCalculator
import dev.havlicektomas.snoozeloo.scheduling.AlarmCoordinator
import dev.havlicektomas.snoozeloo.ui.theme.SnoozelooTheme
import dev.havlicektomas.snoozeloo.ui.trigger.AlarmTriggerScreen
import org.koin.android.ext.android.inject

/** Full-screen alarm UI shown over the lockscreen when an alarm fires. */
class AlarmTriggerActivity : ComponentActivity() {

    private val coordinator: AlarmCoordinator by inject()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        showOverLockscreen()

        val alarm = AlarmIntents.readAlarm(intent)
        if (alarm == null) {
            finish()
            return
        }

        setContent {
            SnoozelooTheme {
                AlarmTriggerScreen(
                    timeText = AlarmTimeCalculator.formatTime(alarm.hour, alarm.minute),
                    title = alarm.title.ifBlank { "Alarm" },
                    onTurnOff = {
                        AlarmService.stop(this)
                        finish()
                    },
                    onSnooze = {
                        coordinator.snooze(alarm)
                        AlarmService.stop(this)
                        finish()
                    },
                )
            }
        }
    }

    private fun showOverLockscreen() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O_MR1) {
            setShowWhenLocked(true)
            setTurnScreenOn(true)
        } else {
            @Suppress("DEPRECATION")
            window.addFlags(
                android.view.WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED or
                    android.view.WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON,
            )
        }
    }
}
