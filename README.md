# Snoozeloo

An alarm-clock app built as a Kotlin Multiplatform project with **native UIs**:
Jetpack Compose (Material 3) on Android and SwiftUI (Apple HIG) on iOS. Implements the
Extended feature set from [specs/Snoozeloo_Requirements.md](specs/Snoozeloo_Requirements.md)
with full native scheduling. The visual design lives in
[specs/Snoozeloo_Designs/](specs/Snoozeloo_Designs/) (a Claude Design connector export).

## Architecture

Shared Kotlin business logic; each platform owns its presentation layer.

- **`sharedLogic`** (KMP — Android library + iOS `SharedLogic` framework)
  - `domain/` — `Alarm`, `WeekDay`, `Ringtone`, and `AlarmTimeCalculator` / `TimeValidator`
    (next-occurrence, "1d 4h 45min" countdown, bedtime, validation — ported from the design
    reference and covered by unit tests).
  - `data/` — SQLDelight database (`Alarm.sq`), `AlarmRepository`, platform `DatabaseDriverFactory`.
  - `scheduling/` — `AlarmSchedulerPort` (implemented per platform) and `AlarmCoordinator`
    (recomputes the next occurrence and (re)schedules / cancels; snooze uses a distinct id so it
    never alters the repeating schedule).
  - `di/` — Koin `sharedModule`; `startKoinIos()` + `IosAlarmFacade` expose a Swift-friendly,
    non-suspending API (no Kotlin `Flow` across the interop boundary).
- **`androidApp`** — Compose screens (list / detail / ringtone / trigger), ViewModels via Koin,
  and an `AlarmManager` engine: exact `setAlarmClock`, a foreground `AlarmService` that rings +
  vibrates and posts a full-screen-intent notification launching `AlarmTriggerActivity` over the
  lockscreen, plus a `BootReceiver` that re-arms alarms after reboot.
- **`iosApp`** — SwiftUI screens consuming the shared framework through `IosAlarmFacade`, with a
  `UNUserNotificationCenter` scheduler (`UNCalendarNotificationTrigger`s, a notification category
  with Turn off / Snooze actions).

## Platform notes

- **Single light theme** (no dark mode), per the spec.
- **Android ringtones** come from `RingtoneManager` (the spec's "all default Android ringtones"),
  stored as content-Uri ids; iOS uses the shared bundled-ringtone list. Silent = no sound.
- **iOS** uses system fonts (SF Pro + a monospaced face for the clock) rather than bundling Inter /
  JetBrains Mono, and `UNNotificationSound.default` for non-silent alarms — adding the TTFs and
  custom `.caf` sounds would require registering them as Xcode resources. A background local
  notification cannot force a custom full-screen UI: tapping the notification opens the app and
  routes to the trigger screen (the in-app "preview" bell shows it directly).
- The iOS app links the system SQLite via `OTHER_LDFLAGS=-lsqlite3` in
  [Config.xcconfig](iosApp/Configuration/Config.xcconfig).

## Running

- **Android:** `./gradlew :androidApp:assembleDebug`, or run the `androidApp` configuration.
- **iOS:** open [iosApp](./iosApp) in Xcode and run (the build invokes the Gradle framework task).
- **Shared unit tests:** `./gradlew :sharedLogic:testAndroidHostTest`
