# Havlicek Mobile Design System

A modern, professional mobile design system for **iOS** and **Android** apps built under the `havlicektomas.dev` brand. The system is platform-aware: it shares a single set of color, type, and spacing tokens, but it ships two UI kits — one that follows Apple HIG conventions, one that follows Material 3 — so screens feel native on each platform while staying visually consistent in voice and palette.

The accent is a single confident green; everything else is a tightly controlled neutral scale. The system supports light and dark modes natively.

---

## Sources

- **Brand vibe:** "modern, professional. one green accent color, used in light and dark." (provided by the user, May 2026)
- **Fonts uploaded by the user:** `Inter Regular`, `JetBrains Mono Regular` (Regular weight only — see Caveats)
- **No existing v1, codebase, or Figma file** — this is a greenfield system.

---

## Index

| File / folder | Purpose |
|---|---|
| `README.md` | This file. Brand context, content fundamentals, visual foundations, iconography. |
| `SKILL.md` | Agent-skill entry point — read first when invoking the skill. |
| `colors_and_type.css` | All design tokens (CSS variables) for color, type, spacing, radius, shadow, motion. Light + dark. |
| `fonts/` | Local TTF files (Inter Regular, JetBrains Mono Regular). |
| `assets/` | Brand mark, app icons, illustrations, raster assets. |
| `preview/` | Static HTML cards used to render the **Design System** tab. One concept per file. |
| `ui_kits/ios/` | iOS UI kit (Apple HIG-flavored): components, screens, click-through prototype. |
| `ui_kits/android/` | Android UI kit (Material 3-flavored): components, screens, click-through prototype. |

---

## Content fundamentals

The brand voice is **calm, confident, and concrete.** Copy reads like a thoughtful product engineer wrote it — never hype-y, never bureaucratic. Use this as a checklist:

- **Person.** Address the user as **you**. Refer to the product as **we** sparingly — most of the time, the product is invisible. Never "I."
- **Casing.** **Sentence case everywhere.** Buttons, nav labels, headers, section titles. Title Case is reserved for proper nouns and the app name itself. Never `ALL CAPS` for body content; caps only for tiny eyebrow labels or status pills (with letter-spacing).
- **Sentence length.** Short. One idea per sentence. Trust the user to read the next one.
- **Voice.** Active. "Save changes," not "Changes will be saved." "Sign in," not "Please sign in to your account."
- **Punctuation.** No exclamation marks except in genuine celebration ("Welcome back."). Use periods on standalone labels only when the label is a full sentence ("Your trial ends in 3 days.").
- **Numbers.** Spell out one through nine in prose; use digits everywhere in UI ("3 unread," not "three unread").
- **Empty states & errors.** State what happened, then offer one clear next action. No apologizing, no jokes.
- **Emoji.** **Never in product chrome.** Allowed only in user-generated content (chat, comments). Status uses colored dots / icons, not 🟢.
- **Loading & progress.** "Loading…" / "Syncing…" / "Saving…" — present-continuous, lowercase verb + ellipsis. Never "Please wait."
- **Microcopy examples.**
  - ✅ "Add a new task" → ❌ "Click here to add a new task!"
  - ✅ "You're all caught up." → ❌ "🎉 Woohoo, nothing to do!"
  - ✅ "Couldn't sign in. Check your password and try again." → ❌ "Oops! Something went wrong."

---

## Visual foundations

### Color
- **One accent: green.** Used for primary actions, selection, focus, and brand moments. No secondary brand color.
  - Light mode accent: `--green-500` (`#12B76A`) on white.
  - Dark mode accent: `--green-400` (`#32D583`) — brighter for AA contrast on near-black.
- **Neutrals are slightly cool.** A 12-stop scale from `#FFFFFF` to `#09090B`. The hierarchy is built almost entirely from neutrals; the accent is rare.
- **Semantic colors are reserved.** Red for destructive/error, amber for warning, blue for info. Each has a `-soft` variant for tinted backgrounds.
- **No gradients.** Surfaces are flat. The only exception is a 1-stop "protection" overlay used behind the status bar on full-bleed image screens.
- **Imagery palette.** Photography should be naturally lit, slightly desaturated, with cool shadows. Avoid warm orange/red-dominant images that fight the green accent.

### Typography
- **Inter** for everything UI. Weights used: 400 / 500 / 600 / 700.
- **JetBrains Mono** for code, numbers in tabular contexts (timers, prices when alignment matters), and any "technical" texture.
- **No display serif.** This is a product system, not a marketing system.
- **Scale follows iOS conventions** (display 34, title-1 28, title-2 22, body 17, footnote 13, caption 12). Android maps onto Material 3's roles using the same pixel values for cross-platform consistency.
- **Letter-spacing tightens as size grows.** Display gets `-0.022em`, body gets `-0.005em`, captions get `+0.01em`.
- **Line-height:** 1.12 for display, 1.45 for body. Never use the browser default.

### Spacing
- Base unit: **4px.** All spacing tokens are multiples of 4 (with 2px as a half-step for tight icon adjustments).
- Mobile screens use **16px horizontal gutters** as the default, **20px** on iPad/wide views.
- Cards have **16px internal padding**; list rows have **12px vertical / 16px horizontal**.

### Corner radii
- **Buttons:** `--radius-md` (10px) — soft but not pill, unless explicitly pill (`--radius-full`).
- **Cards & sheets:** `--radius-lg` (14px) inline; `--radius-xl` (20px) modal sheets; `--radius-2xl` (28px) iOS bottom sheets.
- **Inputs:** `--radius-md` (10px), matching buttons.
- **Avatars & dots:** `--radius-full`.
- Never zero-radius except inside scrolling row dividers.

### Borders
- **Hairline borders** (1px) using `--border` for default separation, `--border-strong` when more emphasis is needed.
- Borders are preferred to shadows for separating list rows and tappable surfaces — shadows are reserved for floating elements (FAB, popovers, toasts, bottom sheets).

### Shadows / elevation
- Four-level scale: `sm` (subtle press / lift), `md` (popovers, dropdowns), `lg` (sheets, modals), `xl` (FAB, the rare hero card).
- In dark mode shadows are pushed harder (`rgba(0,0,0,0.36)` and up) since the bg is already dark.
- **`--shadow-focus`** is a 4px ring of accent at 18% — used on all focused inputs and tappable elements where the platform allows it.

### Backgrounds
- Default screen background is `--bg` (white in light, near-black in dark). No textures, patterns, grain, or gradients.
- "Subtle" surfaces (`--bg-subtle`) tint by 2% and are used for grouped sections, settings rows, and the area behind cards.
- Full-bleed photography is allowed on hero screens and onboarding; when used, content over the photo gets a vertical scrim (`linear-gradient(to bottom, transparent, rgba(0,0,0,0.5))`).

### Motion
- **Easing.** `--ease-out` for entrances, `--ease-in-out` for state changes, `--ease-spring` for tactile press-back. No bouncy "fun" easing in product chrome — only on celebratory micro-interactions (confetti on completion, etc.).
- **Durations.** 120ms for press feedback, 200ms for most transitions, 320ms for screen-level changes. Never longer than 400ms in app chrome.
- **Hover (web / iPad pointer).** Subtle bg darken — overlay `rgba(0,0,0,0.04)` light / `rgba(255,255,255,0.06)` dark.
- **Press / tap.** Scale to `0.97` for buttons + cards over 120ms; opacity to `0.85` for icon buttons. No color change on press (the scale + soft shadow loss reads as "down").
- **Page transitions.** iOS: push horizontally. Android: shared-axis fade-through (180ms out, 200ms in).

### Transparency & blur
- **iOS:** status-bar and tab-bar backgrounds use a backdrop-blur (`backdrop-filter: blur(28px) saturate(1.4)`) over `--overlay-blur`.
- **Android:** opaque surface tinting instead of blur (Material 3 convention).
- **Scrims** (`--overlay-scrim`) are 45% black light / 65% black dark, used behind modals and sheets.

### Layout rules
- **Fixed elements** on mobile: status bar (always shows through), nav/app bar (top), tab bar / bottom nav (bottom), occasional FAB. Everything else scrolls.
- **Safe areas:** content padding always respects `env(safe-area-inset-*)`. The minimum touch target is **44 × 44pt** (iOS) / **48 × 48dp** (Android).
- **Grid:** content max-width is the screen; no centered narrow column on phone. On tablet, content centers at 720px max.

### Cards
- White (`--bg-elevated`) surface in light, `--neutral-900` in dark.
- 14px radius, 16px internal padding.
- **Either** a 1px `--border` **or** `--shadow-md` — never both. Borders preferred inside scrolling lists; shadows preferred for floating cards.

---

## Iconography

- **System:** [Lucide](https://lucide.dev) — clean 1.5px stroke icons, free, MIT-licensed, very large set, available via CDN. We use them everywhere a glyph is needed in UI chrome.
- **Why Lucide:** consistent geometry, optical balance at 16/20/24px, neutral aesthetic that doesn't fight the modern-professional tone. Phosphor or Heroicons would also be acceptable; if you switch, switch them all — never mix.
- **Sizes.** 16px (inline with body text), 20px (default in toolbars and rows), 24px (tab bar, FAB icons), 28px+ (decorative / empty states).
- **Stroke.** 1.5px is the Lucide default — never override unless a specific component spec calls for it.
- **Color.** Icons inherit `currentColor` and follow the text color of their container. Selected/active states tint to `--accent`. Disabled icons go to `--fg-disabled`.
- **Platform-specific icons.** When iOS or Android has a strong native convention for a glyph (e.g. iOS share box vs. Android share fork), prefer SF Symbols on iOS and Material Symbols on Android **for that specific glyph only.** Everything else stays Lucide.
- **No emoji** in product chrome. Emoji is allowed only in user-generated content (chat messages, comments, tasks the user named themselves).
- **No hand-rolled SVG illustrations.** When an illustration is needed (empty states, onboarding hero), source it from an existing illustration set (e.g. unDraw) or commission it. Never generate decorative SVG in code.

Logos and the app mark live in `assets/`. The app mark is a simple wordmark in Inter SemiBold with the green accent dot — see `assets/logo.svg`.

---

## Caveats

- **Font weights.** The user uploaded **only Inter Regular** (and JetBrains Mono Regular). The system needs 500 / 600 / 700 weights for headings and emphasis. These are currently pulled from **Google Fonts** as a substitution. **Please upload Inter Medium / SemiBold / Bold TTFs** so the system can run fully offline. Same for JetBrains Mono if you need bold mono anywhere.
- **No reference brand artwork.** With no v1, no Figma, and no codebase, the visual direction (the specific shade of green, the neutral temperature, the radius scale) is a reasonable interpretation of "modern, professional, green accent" — not a recreation. Treat the first pass as a starting point and iterate.
- **No logo provided.** A placeholder wordmark has been generated for the design-system preview. Replace `assets/logo.svg` when a real mark exists.

---

See `SKILL.md` for how an agent should use this system when generating new screens or assets.
