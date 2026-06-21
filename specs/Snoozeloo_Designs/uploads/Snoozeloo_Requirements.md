# Snoozeloo Requirements

This requirements document explains the main functionality behind Snoozeloo.

The exact appearance and colors of specific UI elements can be found in the mockups. The app uses a single theme; there is no light and dark mode.

This document is intended to provide an overall understanding of what the app should be capable of. Implementation details are left to the developer's discretion (e.g., loading indicators, error messages, etc.).

## Figma Mockups

https://www.figma.com/design/t0TlMqJem7LCjALeyQNip2/Snoozeloo?node-id=62-6482&t=Goatlz8jjY3dyocJ-1

## App Variants

The mockups include two app variants:

- MVP
- Extended Version

Requirements specific to the extended version were highlighted in orange in the original document.

Depending on available time, either variant can be implemented.

## Icons

All icons can be:

- Material Design icons, or
- Exported SVG icons from the mockups when no equivalent Material icon exists.

---

# Alarm List Screen

## Requirements

- Display a list of all created alarms.
- Show an empty state when no alarms exist.
- Include a Floating Action Button (FAB) to create a new alarm.
- Provide a toggle on each alarm card to enable or disable the alarm.
- Alarm title is optional.

Each alarm card should also display:

- The next occurrence of the alarm in the format:

  ```
  1d 4h 45min
  ```

- The weekdays on which the alarm repeats.
- A sleep recommendation:

  ```
  Go to bed at XX:YYpm to get 8h of sleep
  ```

---

# Alarm Detail Screen

All configurations made on this screen must apply **only to the selected alarm** and must not affect any other alarms.

## Time Input

- Two input fields accepting digits only.
- Validate input to allow only valid times between:

  ```
  00:00 - 23:59
  ```

- The **Save** button is enabled only when the entered time is valid.

### Scheduling Rules

If the selected alarm time is earlier than the current time, schedule the alarm for the following day.

Example:

- Current time: Monday 11:00
- User enters: 09:00

Result:

- Alarm triggers on Tuesday at 09:00

## Next Occurrence

Display text below the inputs showing when the next occurrence will trigger:

```
1d 4h 45min
```

## Alarm Name

- Input for an optional alarm name.
- Show a dialog to enter the name.
- Save the name only when the dialog's **Save** button is tapped.
- Do not save changes when the dialog is dismissed.

## Extended Version Features

### Repeat Weekdays

- Selectable chips for choosing weekdays the alarm repeats on.

### Alarm Ringtone

- Display an alarm ringtone card.
- Tapping the card navigates to the **Ringtone Setting Screen**.
- When returning, update the ringtone selection to match the user's choice.

### Alarm Volume

- Card for setting alarm volume.
- Default volume is **50%**.

### Vibration

- Card for toggling vibration on or off.

---

# Alarm Trigger Screen

Displayed when an alarm is triggered.

## Turn Off

- Tapping **Turn Off**:
  - Stops the ringtone.
  - Dismisses the screen.

## Snooze (Extended Version)

- Tapping **Snooze**:
  - Stops the ringtone.
  - Dismisses the screen.
  - Schedules a new alarm 5 minutes in the future using the same configuration as the alarm being snoozed.

### Snooze Rule

Snoozing must **not** modify the alarm's normal repeating schedule.

---

# Ringtone Setting Screen

## Requirements

- Display a list of all default Android ringtones.
- Include a silent option.
- When a ringtone is selected:
  - Mark it as selected.
  - Play a short preview.

### Important

Do **not** automatically navigate back when the user selects a ringtone.