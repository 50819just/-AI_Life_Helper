# NAVIGATION_RULES

## Document Purpose
Define the global navigation rules for AI Life Assistant, especially mobile bottom navigation, Settings entry, and Coming Soon module behavior.

## Scope
This file applies to Home, AI Assistant, Smart Home Control, AI Life Reminder, and related demo screens.

## Global Navigation Purpose
Navigation should help users quickly move between the product's core demo experiences without exposing future modules as full features.

## Mobile Bottom Navigation
Mobile bottom navigation is fixed to four items:

```txt
Home / AI Assistant / Smart Home / Reminder
```

### Item meaning
| Item | Destination |
|---|---|
| Home | Home / Dashboard |
| AI Assistant | AI Chat / Ask AI entry |
| Smart Home | Smart Home Control |
| Reminder | AI Life Reminder |

## Settings Rule
Settings is not included in mobile bottom navigation.

Allowed Settings entry:
- Profile
- Top-right settings icon
- More menu

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

They may appear only as disabled or preview cards on Home / Dashboard.

## Active / Inactive Nav State

| Screen | Active Nav Item |
|---|---|
| Home / Dashboard | Home |
| AI Chat / Assistant | AI Assistant |
| Smart Home Control | Smart Home |
| Sleep Environment scenario | Smart Home |
| AI Life Reminder | Reminder |
| Personal Reminders scenario | Reminder |
| Settings | None or Profile context |

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
- Mobile must use the fixed four-item bottom navigation.

## Stitch Generation Rule
Do not mix other bottom navigation versions.

Avoid:

```txt
Home / Dashboard / AI Chat / Notification / Settings
```

Use:

```txt
Home / AI Assistant / Smart Home / Reminder
```

## Stitch / Cursor / Codex Usage Notes
- Stitch should follow the four-item mobile nav exactly.
- Cursor should map routes according to this document.
- Codex should update conflicting docs if navigation changes are explicitly requested.
