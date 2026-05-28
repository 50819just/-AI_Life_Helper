# Personal Reminders Scenario / 個人提醒子情境

Parent Module: AI Life Reminder  
Scenario Type: Demo Scenario  
This file does not replace `AI_LIFE_REMINDER.md`.

## Document Purpose
Define Personal Reminders as a scenario under AI Life Reminder. It demonstrates a short personal checklist, bedtime reminders, and completion reassurance.

## Scope
Personal Reminders is not an independent formal module. It is a focused demo scenario inside AI Life Reminder.

It shows:
- Personal checklist
- Bedtime preparation reminders
- AI suggestion for non-urgent items
- Completion status
- Reassuring final state

## Scenario Purpose
This scenario helps users answer:

> 睡前還有什麼小事需要確認？

It should reduce mental load before sleep, not create a strict productivity backlog.

## Core Inputs
- User-created reminders
- AI-generated bedtime checklist items
- Unfinished tasks from Tomorrow Briefing
- Optional tags such as home, health, work, personal

## Core Outputs
- Short checklist
- Priority reminder highlight
- Completion status
- Optional AI suggestion for postponing non-urgent items

## Demo Flow

```txt
User enters AI Life Reminder
↓
User opens Personal Reminders / bedtime checklist scenario
↓
System shows 3–5 reminder items
↓
AI suggests focusing on urgent bedtime items
↓
User completes checklist items
↓
System shows calming completion state
```

## Example Checklist
- 確認明天要帶的東西
- 設定明早鬧鐘
- 關閉客廳燈
- 手機充電
- 把不急的訊息留到明天回

## AI Suggestion Example
```text
先處理鬧鐘和客廳燈就好，其他低優先事項明早再看也可以。
```

## Completion State
```text
今晚安心清單已完成。你已經完成睡前的重要準備事項。
```

## State Definition
| State | Meaning | UI Treatment |
|---|---|---|
| idle | Item not started | Normal checklist row |
| urgent | Important bedtime item | Subtle amber label |
| non-urgent | Can wait | Neutral / secondary text |
| completed | Done | Checkmark and softened text |
| postponed | Moved to later | Small postponed badge |

## Empty / Error State

### Empty
```text
睡前沒有待辦事項，可以安心休息。
```

### Sync issue
```text
目前無法同步部分提醒，但你仍可以先完成本機清單。
```

## Mobile / RWD Behavior
- Desktop: checklist and AI suggestion may appear side by side.
- Tablet: checklist first, suggestion card below or beside it.
- Mobile: large tap targets, simple done states, one-column layout.

## Stitch Scope Limit
When generating this scenario:
- Keep it inside AI Life Reminder.
- Do not treat it as a standalone module.
- Do not create a full todo app.
- Do not show a long backlog before sleep.

## Stitch / Cursor / Codex Usage Notes
- Stitch should use this as a child scenario under AI Life Reminder.
- Cursor should implement simple mock reminder completion.
- Codex should preserve calm, low-pressure reminder language.

## Stitch MCP Description
Create a Personal Reminders scenario inside AI Life Reminder. Show a short bedtime checklist, AI suggestion, completion states, and a calm reassurance message. Do not treat it as a standalone module or a full todo app.
