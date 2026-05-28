# NAVIGATION_RULES

## Document Purpose
Define the global navigation rules for AI Life Assistant, especially mobile bottom navigation, Settings entry, and Coming Soon module behavior.

## App Shell Source of Truth

Header、Navigation、Mobile Bottom Navigation 與 Footer 的主要規格已集中在：

```txt
specs/01_CORE/APP_SHELL/
├─ HEADER_NAV.md
├─ SIDEBAR_NAV.md
├─ MOBILE_BOTTOM_NAV.md
└─ FOOTER.md
```

本檔保留核心摘要；詳細規則以 `APP_SHELL` 資料夾為準。

## Scope
This file applies to Home, AI Assistant, Smart Home Control, AI Life Reminder, and related demo screens.

## Global Navigation Purpose
Navigation should help users quickly move between the product's core demo experiences without exposing future modules as full features.

## Header / Top Nav Rule

See:

```txt
specs/01_CORE/APP_SHELL/HEADER_NAV.md
```

## Desktop Sidebar Rule

Desktop sidebar / app shell detailed rules are centralized in:

```txt
specs/01_CORE/APP_SHELL/SIDEBAR_NAV.md
```

Current desktop sidebar direction:

```txt
New Chat
首頁
Ask AI
智慧家庭
生活提醒
```

Bottom utility:

```txt
亮色模式（實心 pill button）
設定
說明
帳號 / 登出
```

## Mobile Bottom Navigation
Mobile bottom function bar is fixed to four items:

```txt
Home / Devices / Tasks / Settings
```

AI Chat / Ask AI is not part of the mobile bottom function bar. It uses an independent floating action button.

### Item meaning
| Item | Destination |
|---|---|
| Home | Home / Dashboard |
| Devices | Smart Home Control |
| Tasks | AI Life Reminder |
| Settings | Settings / Preferences |

## Settings Rule
Settings is allowed as the fourth item in the updated mobile bottom function bar.

Allowed Settings entry:
- Profile
- Top-right settings icon
- More menu
- Mobile bottom function bar

## Dashboard Rule
Dashboard is part of Home summary. It is not a separate mobile bottom navigation item in the MVP demo.

## Notification Rule
Notification can appear as:
- Reminder state
- Home summary badge
- AI suggestion card

Notification is not a separate MVP bottom navigation item.

## Coming Soon Rule
Coming Soon modules do not enter global navigation.

They may appear only as disabled or preview cards inside Module Library / More Modules, reached from the low-key `更多模組 →` entry. Do not show Coming Soon card grid directly on Home.

## Active / Inactive Nav State

| Screen | Active Nav Item |
|---|---|
| Home / Dashboard | Home |
| AI Chat / Assistant | None; opened by floating Ask AI |
| Smart Home Control | Devices |
| Sleep Environment scenario | Devices |
| AI Life Reminder | Tasks |
| Personal Reminders scenario | Tasks |
| Settings | Settings |

## State Definition
| State | Meaning | UI Treatment |
|---|---|---|
| Active | Current section | Accent icon / label |
| Inactive | Available section | Neutral icon / label |
| Disabled | Coming Soon or unavailable | Muted, no primary CTA |
| Secondary | Settings / profile | Top-right or profile entry |

## Mobile / RWD Behavior
- Desktop may use top navigation, sidebar, or dashboard links if needed.
- Tablet can use tab-like or compact navigation.
- Mobile must use the fixed four-item bottom function bar and an independent floating Ask AI button.

## Footer Rule

See:

```txt
specs/01_CORE/APP_SHELL/FOOTER.md
```

## Stitch Generation Rule
Do not mix other bottom navigation versions.

Avoid:

```txt
Home / Dashboard / AI Chat / Notification / Settings
```

Use:

```txt
Home / Devices / Tasks / Settings
```

Add floating AI button:

```txt
Ask AI
```

## Stitch / Cursor / Codex Usage Notes
- Stitch should follow the four-item mobile nav exactly.
- Cursor should map routes according to this document.
- Codex should update conflicting docs if navigation changes are explicitly requested.
