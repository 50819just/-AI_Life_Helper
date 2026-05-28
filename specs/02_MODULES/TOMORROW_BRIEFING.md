# Tomorrow Briefing / 明日秘書

## Document Purpose
Define Tomorrow Briefing as one of the three formal demo modules for AI Life Assistant. This module helps users understand tomorrow's schedule, prepare in advance, and set a suggested alarm through a calm AI-guided flow.

## Scope
Tomorrow Briefing demonstrates:
- Calendar data display
- Today schedule context
- Tomorrow preview
- Earliest event detection
- AI wake-up suggestion
- One-tap alarm setup
- Preparation checklist
- Completion state

## What This Module Is / Is Not

### This module is
- A formal Demo Module.
- A focused schedule preparation flow.
- A way to show AI reasoning based on mock calendar and task data.
- A bedtime-friendly preparation assistant.

### This module is not
- A full calendar SaaS.
- A full task management product.
- A full travel planning system.
- A complete multi-calendar account manager.

## Core User Goal
The user wants to quickly know whether tomorrow requires preparation, whether they need to wake up earlier, and what small actions should be completed before sleeping.

## Main Demo Flow

```txt
User enters Tomorrow Briefing
↓
System loads mock calendar and task data
↓
AI identifies today's remaining context and tomorrow's earliest event
↓
AI suggests a wake-up time
↓
User confirms one-tap alarm setup
↓
System shows preparation checklist
↓
User sees completion state: 明日準備完成
```

## Calendar Data Display
This MVP uses mock Google Calendar / Notion-style data.

### Displayed information
- Calendar source label
- Today schedule summary
- Tomorrow earliest event
- Event time
- Event title
- Preparation note

### Not included
- Full calendar editing
- Multi-account sync settings
- Complex recurring event management

## Today Schedule
Today schedule provides context, not a full daily agenda.

Example:

```text
今天還有 1 件未完成準備事項：確認明日會議資料。
```

## Tomorrow Preview
Tomorrow preview should answer:
- What is the first important event?
- How much preparation time is needed?
- Should the user wake up earlier?
- Are there any simple preparation items?

## Earliest Event
The earliest event is the anchor insight of this module.

Example:

```text
明天第一個重點行程是 08:30 的工廠端同步會議。
```

## Wake-up Suggestion Logic
AI should calculate or infer a suggested wake-up time based on:
- Earliest event time
- Preparation buffer
- Travel or setup buffer when applicable
- User bedtime context

Example:

```text
建議你 07:30 起床，這樣會有約 60 分鐘準備時間。
```

## One-tap Alarm Setup
Primary CTA:

```text
設定 07:30 鬧鐘
```

Secondary CTA:

```text
稍後提醒我
```

## Alarm Confirmation
Alarm setup is a state-changing action and should be confirmed.

Example:

```text
要幫你設定明天 07:30 的鬧鐘嗎？
```

Completion:

```text
已設定明天 07:30 的鬧鐘。
```

## Preparation Checklist
Checklist should stay short and relevant.

Examples:
- 確認會議資料
- 準備識別證
- 手機充電
- 設定鬧鐘

## Completion State
The completion state should create closure.

Example:

```text
明日準備完成。你可以放心休息。
```

## Empty / Error State

### No tomorrow events
```text
明天暫時沒有重要行程。你可以依照平常節奏安排早晨。
```

### Calendar unavailable
```text
目前無法讀取行事曆，先用你最近的提醒資料整理明日準備。
```

### No unfinished tasks
```text
今天沒有未完成的準備事項。
```

## Mobile / RWD Behavior

### Desktop
- Show schedule summary, wake-up suggestion, and checklist as related cards.

### Tablet
- Earliest event and AI suggestion should appear first.
- Checklist can appear below.

### Mobile
- Use one vertical flow: earliest event → AI suggestion → alarm CTA → checklist → completion state.
- Bottom navigation can remain active on Home or open as module detail depending on implementation.

## Stitch Scope Limit
When generating this module:
- Do not create a full calendar app.
- Do not create a full task manager.
- Do not add complex account sync settings.
- Keep the demo focused on tomorrow preparation.

## Stitch / Cursor / Codex Usage Notes
- Stitch should generate a calm preparation module with clear AI suggestion and CTA.
- Cursor may use mock data only.
- Codex should preserve bedtime-friendly and low-pressure language.

## Stitch MCP Description
Create a Tomorrow Briefing demo module for AI Life Assistant. Show mock calendar data, today schedule context, tomorrow's earliest event, AI wake-up suggestion, one-tap alarm setup, preparation checklist, and completion state. Keep the tone calm, bedtime-friendly, and product-like. Do not generate a full calendar SaaS or task management product.
