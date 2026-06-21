import SwiftUI
import UserNotifications
import SharedLogic

@main
struct iOSApp: App {
    @UIApplicationDelegateAdaptor(AppDelegate.self) private var appDelegate
    @StateObject private var appState: AppState

    init() {
        // Koin must be up before any facade is created.
        KoinIosKt.startKoinIos()
        _appState = StateObject(wrappedValue: AppState())
    }

    var body: some Scene {
        WindowGroup {
            RootView()
                .environmentObject(appState)
        }
    }
}

/// Handles notification presentation and the Turn off / Snooze actions.
final class AppDelegate: NSObject, UIApplicationDelegate, UNUserNotificationCenterDelegate {
    func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
    ) -> Bool {
        let center = UNUserNotificationCenter.current()
        center.delegate = self

        let turnOff = UNNotificationAction(identifier: "TURN_OFF", title: "Turn off", options: [.foreground])
        let snooze = UNNotificationAction(identifier: "SNOOZE", title: "Snooze for 5 minutes", options: [])
        let category = UNNotificationCategory(
            identifier: "ALARM",
            actions: [turnOff, snooze],
            intentIdentifiers: [],
            options: [.customDismissAction]
        )
        center.setNotificationCategories([category])
        center.requestAuthorization(options: [.alert, .sound, .badge]) { _, _ in }
        return true
    }

    // Show the alert (and play the sound) even while the app is foregrounded.
    func userNotificationCenter(
        _ center: UNUserNotificationCenter,
        willPresent notification: UNNotification,
        withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void
    ) {
        if let alarm = NotificationPayload.alarm(from: notification.request.content.userInfo) {
            AppState.shared?.present(alarm: alarm)
        }
        completionHandler([.banner, .sound])
    }

    func userNotificationCenter(
        _ center: UNUserNotificationCenter,
        didReceive response: UNNotificationResponse,
        withCompletionHandler completionHandler: @escaping () -> Void
    ) {
        let alarm = NotificationPayload.alarm(from: response.notification.request.content.userInfo)
        switch response.actionIdentifier {
        case "SNOOZE":
            if let alarm { AppState.shared?.facade.snooze(alarm: alarm) }
        case "TURN_OFF", UNNotificationDismissActionIdentifier:
            break
        default: // tapped the notification body
            if let alarm { AppState.shared?.present(alarm: alarm) }
        }
        completionHandler()
    }
}
