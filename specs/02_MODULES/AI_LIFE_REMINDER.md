# AI Life Reminder / AI 生活提醒

## Document Purpose
Define AI Life Reminder as one of the three formal demo modules for AI Life Assistant. This module demonstrates proactive lifestyle reminders without becoming a full health management system or strict productivity app.

## Scope
AI Life Reminder focuses on gentle, contextual life reminders:
- Today reminders
- Bedtime reminders
- Drink water reminder
- No movement reminder
- Schedule reminder
- Personal checklist
- AI suggestion
- Reminder completion and recovery states

## What This Module Is / Is Not

### This module is
- A formal Demo Module.
- A lifestyle reminder system for a product-like prototype.
- A place to show AI-assisted reminder suggestions and completion reassurance.
- A parent module for the Personal Reminders scenario.

### This module is not
- A full health management platform.
- A medical diagnosis or medical reminder system.
- A strict productivity SaaS.
- A large task management system.
- A behavior surveillance tool.

## Core User Goal
The user wants to avoid missing small but important life tasks without feeling pressured, monitored, or judged.

## Main Demo Flow

```txt
User enters AI Life Reminder
↓
System shows today's reminder summary
↓
AI highlights one useful reminder or suggestion
↓
User checks upcoming, missed, and bedtime reminders
↓
User completes or postpones a reminder
↓
System shows gentle completion or recovery feedback
```

## Today Reminder
Shows the most relevant reminders for the current day.

Examples:
- Drink water
- Take medicine
- Prepare badge for tomorrow
- Charge phone before sleep

## Bedtime Reminder
Used for late-night preparation and closure.

Examples:
- Set alarm
- Prepare tomorrow's items
- Turn off living room light
- Leave non-urgent replies for tomorrow

## Drink Water Reminder
A low-pressure wellness reminder.

Rules:
- Do not shame the user.
- Do not imply medical authority.
- Allow snooze or dismiss.

## No Movement Reminder
A gentle nudge based on inactivity.

Example:

```text
你已經一段時間沒有移動了，要不要起來走一下或喝點水？
```

## Schedule Reminder
Connects reminder behavior to schedule context.

Example:

```text
你明天早上有會議，要不要今晚先設定「帶識別證」提醒？
```

## Personal Checklist
A short list of 3–5 personal reminder items. This should feel like a bedtime reassurance checklist, not a strict task backlog.

## AI Suggestion
AI suggestions should be:
- Contextual
- Optional
- Short
- Gentle
- Actionable

Avoid consecutive aggressive suggestions.

## Reminder States

| State | Meaning | UI Treatment |
|---|---|---|
| idle | Created but not near trigger time | Normal list item |
| upcoming | Approaching trigger time | Subtle highlight and time label |
| missed | Trigger time passed, unresolved | Muted alert with recovery actions |
| completed | User finished reminder | Softened text and check icon |
| paused | Temporarily disabled | Paused badge and lower visual priority |

## Completed State
Completion should provide reassurance without exaggerated gamification.

Example:

```text
今晚安心清單已完成。你已經完成睡前的重要準備事項。
```

## Missed Reminder Recovery
Missed reminders should feel recoverable, not like failure.

Recovery actions:
- Snooze
- Mark as completed
- Ignore once
- Edit reminder

Example:

```text
你有一個 20 分鐘前錯過的提醒：喝水。要延後 30 分鐘，還是標記為已完成？
```

## Personal Reminders Scenario Reference
`PERSONAL_REMINDERS.md` is a demo scenario under this module.

It demonstrates:
- Personal checklist
- Bedtime reminders
- Completion reassurance

It does not replace this AI Life Reminder module spec.

## Empty / Error State

### No reminders today
```text
今天沒有新的提醒。你可以放心安排自己的節奏。
```

### No missed reminders
```text
目前沒有錯過的提醒。
```

### Reminder sync error
```text
提醒暫時無法同步，稍後會再自動嘗試。
```

## Mobile / RWD Behavior

### Desktop
- Reminder summary and AI suggestion can appear side by side.
- Lists may be grouped by state.

### Tablet
- Summary first, then list sections.

### Mobile
- One-column reminder flow.
- Large tap targets for complete / snooze.
- Bottom navigation active item: Reminder.

## Stitch Scope Limit
When generating this module:
- Do not create a full health platform.
- Do not create a strict todo app.
- Do not create medical diagnosis or health scoring.
- Do not show long, stressful backlogs.
- Use Personal Reminders only as a child scenario.

## Stitch / Cursor / Codex Usage Notes
- Stitch should generate a calm reminder module, not a productivity dashboard.
- Cursor should use mock reminder states unless real data is requested.
- Codex should keep reminder language low-pressure and non-medical.

## Stitch MCP Description
Create an AI Life Reminder demo module for AI Life Assistant. Show today reminders, bedtime reminders, drink water reminder, no movement reminder, schedule reminder, personal checklist, AI suggestion, completed state, and missed reminder recovery. Keep the tone calm, low-pressure, and lifestyle-oriented. Do not generate a full health platform or strict todo app.
