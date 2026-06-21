import SwiftUI
import AudioToolbox
import UserNotifications
import SharedLogic

// MARK: - Design tokens (from the design's iOS UI kit)

enum Theme {
    static let accent = Color(hex: 0x12B76A)
    static let accentPressed = Color(hex: 0x039855)
    static let bg = Color(hex: 0xF2F2F7)
    static let card = Color.white
    static let text = Color(hex: 0x09090B)
    static let textMuted = Color(hex: 0x52525B)
    static let textSubtle = Color(hex: 0x71717A)
    static let textFaint = Color(hex: 0xA1A1AA)
    static let border = Color(hex: 0xE4E4E7)
    static let dayOff = Color(hex: 0xC4C4CC)
    static let danger = Color(hex: 0xEF4444)
    static let secondaryFill = Color(hex: 0x787880).opacity(0.12)
}

extension Color {
    init(hex: UInt32) {
        self.init(
            .sRGB,
            red: Double((hex >> 16) & 0xFF) / 255,
            green: Double((hex >> 8) & 0xFF) / 255,
            blue: Double(hex & 0xFF) / 255,
            opacity: 1
        )
    }
}

private func mono(_ size: CGFloat) -> Font { .system(size: size, weight: .regular, design: .monospaced) }

// MARK: - App state

final class AppState: ObservableObject {
    static weak var shared: AppState?

    let facade = IosAlarmFacade()
    private let scheduler = IosAlarmScheduler()

    @Published var alarms: [Alarm] = []
    @Published var triggeredAlarm: Alarm?

    init() {
        facade.setScheduler(scheduler: scheduler)
        facade.observeAlarms { [weak self] list in
            self?.alarms = list
        }
        AppState.shared = self
    }

    func present(alarm: Alarm) { triggeredAlarm = alarm }
    func save(_ alarm: Alarm) { facade.save(alarm: alarm) { _ in } }
    func toggle(_ alarm: Alarm, _ enabled: Bool) { facade.setEnabled(id: alarm.id, enabled: enabled) }
    func delete(_ id: Int64) { facade.delete(id: id) }
}

// MARK: - Notification scheduling (UNUserNotificationCenter)

final class IosAlarmScheduler: NSObject, AlarmSchedulerPort {
    func schedule(alarm: Alarm, triggerAtMillis: Int64) {
        let center = UNUserNotificationCenter.current()
        let content = UNMutableNotificationContent()
        content.title = alarm.title.isEmpty ? "Alarm" : alarm.title
        content.body = String(format: "%02d:%02d", Int(alarm.hour), Int(alarm.minute))
        content.categoryIdentifier = "ALARM"
        content.sound = alarm.ringtoneId == "silent" ? nil : UNNotificationSound.default
        content.userInfo = NotificationPayload.userInfo(for: alarm)

        if alarm.days.isEmpty {
            let date = Date(timeIntervalSince1970: Double(triggerAtMillis) / 1000.0)
            let comps = Calendar.current.dateComponents(
                [.year, .month, .day, .hour, .minute, .second], from: date
            )
            let trigger = UNCalendarNotificationTrigger(dateMatching: comps, repeats: false)
            center.add(UNNotificationRequest(identifier: "alarm_\(alarm.id)", content: content, trigger: trigger))
        } else {
            for day in alarm.days {
                var comps = DateComponents()
                comps.weekday = Int(day.calendarValue) + 1 // iOS: Sun=1..Sat=7
                comps.hour = Int(alarm.hour)
                comps.minute = Int(alarm.minute)
                let trigger = UNCalendarNotificationTrigger(dateMatching: comps, repeats: true)
                center.add(UNNotificationRequest(
                    identifier: "alarm_\(alarm.id)_\(day.calendarValue)",
                    content: content,
                    trigger: trigger
                ))
            }
        }
    }

    func cancel(alarmId: Int64) {
        let center = UNUserNotificationCenter.current()
        center.getPendingNotificationRequests { requests in
            let ids = requests.map { $0.identifier }
                .filter { $0 == "alarm_\(alarmId)" || $0.hasPrefix("alarm_\(alarmId)_") }
            center.removePendingNotificationRequests(withIdentifiers: ids)
        }
    }
}

enum NotificationPayload {
    static func userInfo(for alarm: Alarm) -> [String: Any] {
        [
            "id": Int(alarm.id),
            "title": alarm.title,
            "hour": Int(alarm.hour),
            "minute": Int(alarm.minute),
            "ringtoneId": alarm.ringtoneId,
            "volume": Int(alarm.volume),
            "vibrate": alarm.vibrate,
            "days": alarm.days.map { Int($0.calendarValue) },
        ]
    }

    static func alarm(from info: [AnyHashable: Any]) -> Alarm? {
        guard let id = info["id"] as? Int else { return nil }
        let dayValues = (info["days"] as? [Int]) ?? []
        let days = Set(dayValues.map { WeekDay.companion.fromCalendarValue(value: Int32($0)) })
        return Alarm(
            id: Int64(id),
            title: info["title"] as? String ?? "",
            hour: Int32(info["hour"] as? Int ?? 0),
            minute: Int32(info["minute"] as? Int ?? 0),
            days: days,
            enabled: true,
            ringtoneId: info["ringtoneId"] as? String ?? "silent",
            volume: Int32(info["volume"] as? Int ?? 50),
            vibrate: info["vibrate"] as? Bool ?? true
        )
    }
}

// MARK: - Root + navigation

enum Route: Hashable {
    case newAlarm
    case edit(Int64)
}

struct RootView: View {
    @EnvironmentObject var appState: AppState

    var body: some View {
        AlarmListView()
            .fullScreenCover(isPresented: Binding(
                get: { appState.triggeredAlarm != nil },
                set: { if !$0 { appState.triggeredAlarm = nil } }
            )) {
                if let alarm = appState.triggeredAlarm {
                    AlarmTriggerView(
                        alarm: alarm,
                        onTurnOff: { appState.triggeredAlarm = nil },
                        onSnooze: {
                            appState.facade.snooze(alarm: alarm)
                            appState.triggeredAlarm = nil
                        }
                    )
                }
            }
    }
}

// MARK: - Alarm list

struct AlarmListView: View {
    @EnvironmentObject var appState: AppState
    @State private var path: [Route] = []

    var body: some View {
        NavigationStack(path: $path) {
            ZStack(alignment: .bottomTrailing) {
                Theme.bg.ignoresSafeArea()

                VStack(alignment: .leading, spacing: 0) {
                    VStack(alignment: .leading, spacing: 2) {
                        Text("SNOOZELOO")
                            .font(.system(size: 12, weight: .semibold))
                            .tracking(0.7)
                            .foregroundColor(Theme.accent)
                        Text("Your alarms")
                            .font(.system(size: 34, weight: .bold))
                            .foregroundColor(Theme.text)
                    }
                    .padding(.horizontal, 20)
                    .padding(.top, 12)

                    if appState.alarms.isEmpty {
                        EmptyStateView()
                    } else {
                        ScrollView {
                            LazyVStack(spacing: 12) {
                                ForEach(appState.alarms, id: \.id) { alarm in
                                    AlarmCard(
                                        alarm: alarm,
                                        onEdit: { path.append(.edit(alarm.id)) },
                                        onToggle: { appState.toggle(alarm, $0) },
                                        onPreview: { appState.present(alarm: alarm) }
                                    )
                                }
                            }
                            .padding(.horizontal, 16)
                            .padding(.top, 14)
                            .padding(.bottom, 120)
                        }
                    }
                }

                Button(action: { path.append(.newAlarm) }) {
                    Image(systemName: "plus")
                        .font(.system(size: 24, weight: .bold))
                        .foregroundColor(.white)
                        .frame(width: 56, height: 56)
                        .background(Theme.accent)
                        .clipShape(Circle())
                        .shadow(color: Theme.accent.opacity(0.35), radius: 10, y: 8)
                }
                .padding(.trailing, 20)
                .padding(.bottom, 42)
            }
            .navigationBarHidden(true)
            .navigationDestination(for: Route.self) { route in
                switch route {
                case .newAlarm:
                    AlarmDetailView(existing: nil)
                case .edit(let id):
                    AlarmDetailView(existing: appState.alarms.first { $0.id == id })
                }
            }
        }
    }
}

private struct EmptyStateView: View {
    var body: some View {
        VStack(spacing: 6) {
            Image(systemName: "bell.slash")
                .font(.system(size: 48, weight: .light))
                .foregroundColor(Theme.dayOff)
                .padding(.bottom, 12)
            Text("No alarms yet")
                .font(.system(size: 20, weight: .semibold))
                .foregroundColor(Theme.textMuted)
            Text("Add your first alarm and we'll wake you on time.")
                .font(.system(size: 15))
                .foregroundColor(Theme.textSubtle)
                .multilineTextAlignment(.center)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .top)
        .padding(.top, 80)
        .padding(.horizontal, 32)
    }
}

private struct AlarmCard: View {
    let alarm: Alarm
    let onEdit: () -> Void
    let onToggle: (Bool) -> Void
    let onPreview: () -> Void

    private var facade: IosAlarmFacade { AppState.shared!.facade }

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            HStack(alignment: .top) {
                VStack(alignment: .leading, spacing: 1) {
                    if !alarm.title.isEmpty {
                        Text(alarm.title)
                            .font(.system(size: 15, weight: .medium))
                            .foregroundColor(Theme.textMuted)
                    }
                    Text(facade.formatTime(hour: alarm.hour, minute: alarm.minute))
                        .font(mono(42))
                        .foregroundColor(alarm.enabled ? Theme.text : Theme.textFaint)
                }
                .contentShape(Rectangle())
                .onTapGesture { onEdit() }

                Spacer()

                VStack(alignment: .trailing, spacing: 14) {
                    Toggle("", isOn: Binding(get: { alarm.enabled }, set: { onToggle($0) }))
                        .labelsHidden()
                        .tint(Theme.accent)
                    Button(action: onPreview) {
                        Image(systemName: "bell")
                            .font(.system(size: 17))
                            .foregroundColor(Theme.textFaint)
                    }
                }
            }

            HStack(spacing: 8) {
                if !alarm.days.isEmpty {
                    ForEach(WeekDay.companion.ordered, id: \.calendarValue) { day in
                        Text(day.label)
                            .font(.system(size: 13, weight: .semibold))
                            .foregroundColor(alarm.days.contains(day) ? Theme.accent : Theme.dayOff)
                    }
                } else {
                    Text("Ring once")
                        .font(.system(size: 13, weight: .medium))
                        .foregroundColor(Theme.textSubtle)
                }
            }
            .padding(.top, 14)

            Text(alarm.enabled ? "Rings in \(facade.nextOccurrenceText(alarm: alarm))" : "Off")
                .font(.system(size: 13, weight: .semibold))
                .foregroundColor(Theme.accent)
                .padding(.top, 11)
            Text("Go to bed at \(facade.bedtime(hour: alarm.hour, minute: alarm.minute)) to get 8h of sleep")
                .font(.system(size: 12))
                .foregroundColor(Theme.textFaint)
                .padding(.top, 3)
        }
        .padding(16)
        .background(Theme.card)
        .clipShape(RoundedRectangle(cornerRadius: 14))
        .shadow(color: Color.black.opacity(0.05), radius: 2, y: 1)
    }
}

// MARK: - Alarm detail

struct AlarmDetailView: View {
    let existing: Alarm?

    @EnvironmentObject var appState: AppState
    @Environment(\.dismiss) private var dismiss

    @State private var hourText: String
    @State private var minuteText: String
    @State private var title: String
    @State private var days: Set<WeekDay>
    @State private var ringtoneId: String
    @State private var volume: Double
    @State private var vibrate: Bool
    @State private var showNameDialog = false
    @State private var nameDraft = ""
    @State private var showRingtone = false

    init(existing: Alarm?) {
        self.existing = existing
        _hourText = State(initialValue: existing.map { String(format: "%02d", Int($0.hour)) } ?? "07")
        _minuteText = State(initialValue: existing.map { String(format: "%02d", Int($0.minute)) } ?? "00")
        _title = State(initialValue: existing?.title ?? "")
        _days = State(initialValue: existing.map { Set($0.days) } ?? [])
        _ringtoneId = State(initialValue: existing?.ringtoneId ?? "bright_morning")
        _volume = State(initialValue: Double(existing?.volume ?? 50))
        _vibrate = State(initialValue: existing?.vibrate ?? true)
    }

    private var facade: IosAlarmFacade { appState.facade }
    private var isValid: Bool { facade.isValidTime(hour: hourText, minute: minuteText) }

    private var nextText: String {
        guard isValid, let h = Int32(hourText), let m = Int32(minuteText) else { return "Enter a valid time" }
        let draft = Alarm(id: 0, title: title, hour: h, minute: m, days: days,
                          enabled: true, ringtoneId: ringtoneId, volume: 50, vibrate: vibrate)
        return "Alarm in \(facade.nextOccurrenceText(alarm: draft))"
    }

    private var ringtoneName: String {
        Ringtones.shared.all.first { $0.id == ringtoneId }?.name ?? "Silent"
    }

    var body: some View {
        ScrollView {
            VStack(spacing: 0) {
                // Time inputs
                HStack(alignment: .center, spacing: 12) {
                    TimeBox(text: $hourText)
                    Text(":").font(mono(48)).foregroundColor(Theme.dayOff)
                    TimeBox(text: $minuteText)
                }
                .padding(.top, 18)

                Text(nextText)
                    .font(.system(size: 14, weight: .semibold))
                    .foregroundColor(Theme.accent)
                    .padding(.vertical, 12)

                // Alarm name
                SettingsCard {
                    Button(action: { nameDraft = title; showNameDialog = true }) {
                        HStack {
                            Text("Alarm name").foregroundColor(Theme.text)
                            Spacer()
                            Text(title.isEmpty ? "None" : title).foregroundColor(Theme.textFaint)
                            Image(systemName: "chevron.right").font(.system(size: 13, weight: .semibold)).foregroundColor(Theme.dayOff)
                        }
                        .font(.system(size: 17))
                    }
                    .buttonStyle(.plain)
                }

                // Repeat
                VStack(alignment: .leading, spacing: 9) {
                    Text("Repeat")
                        .font(.system(size: 13, weight: .semibold))
                        .foregroundColor(Theme.textSubtle)
                        .padding(.leading, 4)
                    HStack(spacing: 7) {
                        ForEach(WeekDay.companion.ordered, id: \.calendarValue) { day in
                            let selected = days.contains(day)
                            Text(day.label)
                                .font(.system(size: 14, weight: .semibold))
                                .foregroundColor(selected ? .white : Theme.textMuted)
                                .frame(maxWidth: .infinity, minHeight: 46)
                                .background(selected ? Theme.accent : Theme.card)
                                .clipShape(RoundedRectangle(cornerRadius: 12))
                                .shadow(color: .black.opacity(0.05), radius: 2, y: 1)
                                .onTapGesture {
                                    if selected { days.remove(day) } else { days.insert(day) }
                                }
                        }
                    }
                }
                .padding(.horizontal, 16)
                .padding(.top, 6)
                .padding(.bottom, 18)

                // Ringtone
                SettingsCard {
                    Button(action: { showRingtone = true }) {
                        HStack {
                            Image(systemName: "music.note").foregroundColor(Theme.accent)
                            Text("Ringtone").foregroundColor(Theme.text)
                            Spacer()
                            Text(ringtoneName).foregroundColor(Theme.textFaint)
                            Image(systemName: "chevron.right").font(.system(size: 13, weight: .semibold)).foregroundColor(Theme.dayOff)
                        }
                        .font(.system(size: 17))
                    }
                    .buttonStyle(.plain)
                }

                // Volume
                SettingsCard {
                    VStack(spacing: 10) {
                        HStack {
                            Text("Volume").font(.system(size: 17)).foregroundColor(Theme.text)
                            Spacer()
                            Text("\(Int(volume))%").font(mono(15)).foregroundColor(Theme.textSubtle)
                        }
                        Slider(value: $volume, in: 0...100).tint(Theme.accent)
                    }
                }

                // Vibration
                SettingsCard {
                    HStack {
                        Text("Vibration").font(.system(size: 17)).foregroundColor(Theme.text)
                        Spacer()
                        Toggle("", isOn: $vibrate).labelsHidden().tint(Theme.accent)
                    }
                }

                if existing != nil {
                    Button(role: .destructive, action: deleteAlarm) {
                        Text("Delete alarm")
                            .font(.system(size: 17, weight: .medium))
                            .foregroundColor(Theme.danger)
                            .frame(maxWidth: .infinity, minHeight: 50)
                            .background(Theme.card)
                            .clipShape(RoundedRectangle(cornerRadius: 14))
                    }
                    .padding(.horizontal, 16)
                    .padding(.top, 8)
                }
            }
            .padding(.bottom, 40)
        }
        .background(Theme.bg.ignoresSafeArea())
        .navigationTitle(existing == nil ? "Add alarm" : "Edit alarm")
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .cancellationAction) {
                Button("Cancel") { dismiss() }.tint(Theme.accent)
            }
            ToolbarItem(placement: .confirmationAction) {
                Button("Save", action: saveAlarm)
                    .tint(Theme.accent)
                    .fontWeight(.semibold)
                    .disabled(!isValid)
            }
        }
        .navigationDestination(isPresented: $showRingtone) {
            RingtoneView(selectedId: $ringtoneId)
        }
        .alert("Alarm name", isPresented: $showNameDialog) {
            TextField("Name", text: $nameDraft)
            Button("Cancel", role: .cancel) {}
            Button("Save") { title = nameDraft }
        } message: {
            Text("Give this alarm a name, or leave it blank.")
        }
    }

    private func saveAlarm() {
        guard isValid, let h = Int32(hourText), let m = Int32(minuteText) else { return }
        let alarm = Alarm(
            id: existing?.id ?? 0,
            title: title,
            hour: h,
            minute: m,
            days: days,
            enabled: true,
            ringtoneId: ringtoneId,
            volume: Int32(volume),
            vibrate: vibrate
        )
        appState.save(alarm)
        dismiss()
    }

    private func deleteAlarm() {
        if let id = existing?.id {
            appState.delete(id)
        }
        dismiss()
    }
}

private struct TimeBox: View {
    @Binding var text: String

    var body: some View {
        TextField("", text: $text)
            .keyboardType(.numberPad)
            .multilineTextAlignment(.center)
            .font(mono(54))
            .foregroundColor(Theme.text)
            .frame(width: 108, height: 108)
            .background(Theme.card)
            .overlay(RoundedRectangle(cornerRadius: 16).stroke(Theme.border, lineWidth: 1))
            .clipShape(RoundedRectangle(cornerRadius: 16))
            .onChange(of: text) { newValue in
                text = String(newValue.filter(\.isNumber).prefix(2))
            }
    }
}

private struct SettingsCard<Content: View>: View {
    @ViewBuilder var content: Content

    var body: some View {
        content
            .padding(16)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(Theme.card)
            .clipShape(RoundedRectangle(cornerRadius: 14))
            .padding(.horizontal, 16)
            .padding(.vertical, 6)
    }
}

// MARK: - Ringtone picker

struct RingtoneView: View {
    @Binding var selectedId: String
    @State private var previewingId: String?

    var body: some View {
        ScrollView {
            VStack(spacing: 0) {
                ForEach(Ringtones.shared.all, id: \.id) { ringtone in
                    Button(action: { select(ringtone.id) }) {
                        HStack {
                            Text(ringtone.name).font(.system(size: 17)).foregroundColor(Theme.text)
                            Spacer()
                            if previewingId == ringtone.id {
                                Image(systemName: "waveform").foregroundColor(Theme.accent)
                            }
                            if selectedId == ringtone.id {
                                Image(systemName: "checkmark").foregroundColor(Theme.accent).fontWeight(.semibold)
                            }
                        }
                        .padding(.horizontal, 16)
                        .padding(.vertical, 15)
                    }
                    .buttonStyle(.plain)
                    Divider().padding(.leading, 16)
                }
                Text("Tap a sound to hear a short preview. Your choice is saved when you go back.")
                    .font(.system(size: 13))
                    .foregroundColor(Theme.textFaint)
                    .padding(16)
            }
            .background(Theme.card)
            .clipShape(RoundedRectangle(cornerRadius: 14))
            .padding(16)
        }
        .background(Theme.bg.ignoresSafeArea())
        .navigationTitle("Ringtone")
        .navigationBarTitleDisplayMode(.inline)
    }

    private func select(_ id: String) {
        selectedId = id
        previewingId = id
        if id != "silent" {
            AudioServicesPlaySystemSound(1304)
        }
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.4) {
            if previewingId == id { previewingId = nil }
        }
    }
}

// MARK: - Alarm trigger

struct AlarmTriggerView: View {
    let alarm: Alarm
    let onTurnOff: () -> Void
    let onSnooze: () -> Void

    @State private var pulse = false

    private var facade: IosAlarmFacade { AppState.shared!.facade }

    var body: some View {
        VStack {
            Spacer()
            ZStack {
                Circle()
                    .fill(Theme.accent.opacity(0.5))
                    .frame(width: 96, height: 96)
                    .scaleEffect(pulse ? 2.2 : 1)
                    .opacity(pulse ? 0 : 0.5)
                Circle()
                    .fill(Color(hex: 0xECFDF3))
                    .frame(width: 96, height: 96)
                Image(systemName: "bell.fill")
                    .font(.system(size: 42))
                    .foregroundColor(Theme.accent)
            }
            .onAppear {
                withAnimation(.easeOut(duration: 1.8).repeatForever(autoreverses: false)) { pulse = true }
            }

            Text("ALARM")
                .font(.system(size: 13, weight: .semibold))
                .tracking(1.3)
                .foregroundColor(Theme.accent)
                .padding(.top, 22)
            Text(facade.formatTime(hour: alarm.hour, minute: alarm.minute))
                .font(mono(72))
                .foregroundColor(Theme.text)
                .padding(.top, 22)
            Text(alarm.title.isEmpty ? "Alarm" : alarm.title)
                .font(.system(size: 20))
                .foregroundColor(Theme.textMuted)

            Spacer()

            VStack(spacing: 12) {
                Button(action: onTurnOff) {
                    Text("Turn off")
                        .font(.system(size: 17, weight: .semibold))
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity, minHeight: 50)
                        .background(Theme.accent)
                        .clipShape(RoundedRectangle(cornerRadius: 14))
                }
                Button(action: onSnooze) {
                    Text("Snooze for 5 minutes")
                        .font(.system(size: 17, weight: .semibold))
                        .foregroundColor(Theme.text)
                        .frame(maxWidth: .infinity, minHeight: 50)
                        .background(Theme.secondaryFill)
                        .clipShape(RoundedRectangle(cornerRadius: 14))
                }
            }
        }
        .padding(.horizontal, 28)
        .padding(.vertical, 44)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color.white.ignoresSafeArea())
    }
}
