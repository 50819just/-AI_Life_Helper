# Tomorrow Briefing / 明日簡報

## Document Purpose
Define Tomorrow Briefing as one of the three formal demo modules for AI Life Assistant. This module is a bedtime tomorrow-preparation flow, not a full calendar dashboard.

The main user need is:

> 我現在可以安心睡了嗎？明天準備好了嗎？

## Scope
Tomorrow Briefing demonstrates a focused bedtime flow:
- Sleep-time context
- Tomorrow's first important event
- AI wake-up suggestion
- One-tap alarm setup
- Preparation checklist
- Completion state: 明日準備完成

## What This Module Is / Is Not

### This module is
- A formal Demo Module.
- A bedtime tomorrow-preparation assistant.
- A calm way to reduce uncertainty before sleep.
- A focused flow that helps users confirm whether tomorrow is ready.

### This module is not
- A full calendar SaaS.
- A full schedule management dashboard.
- A full task management product.
- A productivity analytics tool.
- A complete multi-calendar account manager.

## Core User Goal
The user is preparing to sleep and wants to quickly know:

1. What is the first important thing tomorrow?
2. Do I need to wake up earlier?
3. What should I prepare before sleeping?
4. Can I safely stop thinking about tomorrow now?

## Main Demo Flow

```txt
User opens Tomorrow Briefing at night
↓
AI recognizes bedtime / night-preparation context
↓
System shows tomorrow's first important event
↓
AI explains whether the user should wake up earlier
↓
User confirms one-tap alarm setup
↓
System shows a short preparation checklist
↓
User confirms or completes key items
↓
System shows: 明日準備完成，可以放心休息
```

## 1. Sleep-time Context

### Purpose
Set the emotional and practical context: this is a night-before preparation flow.

### Example context
```text
現在是 22:30，適合先確認明天的重點，再安心休息。
```

### UI / content notes
- Keep the tone calm and low-pressure.
- Do not show a dense full-day calendar as the first view.
- Lead with what matters before sleep.

## 2. Tomorrow First Important Event

### Purpose
Identify the anchor event that determines tomorrow's preparation.

### Required information
- Event title
- Event time
- Location / online meeting if relevant
- Preparation note

### Example
```text
明天第一個重點行程是 08:30 的工廠端同步會議。
```

### Rule
Only show the most important upcoming event first. Additional events can be secondary, collapsed, or summarized.

## 3. AI Wake-up Suggestion

### Purpose
AI explains whether the user should wake up earlier and why.

### Suggestion logic
AI may consider:
- Earliest important event
- Preparation buffer
- Travel or setup time
- Current bedtime context
- Unfinished preparation items

### Example
```text
建議你 07:30 起床，這樣會有約 60 分鐘準備時間。
```

### Tone
- Explain the reason briefly.
- Avoid productivity pressure.
- Do not over-optimize the user's schedule.

## 4. One-tap Alarm Setup

### Primary CTA
```text
設定 07:30 鬧鐘
```

### Secondary CTA
```text
稍後提醒我
```

### Confirmation copy
```text
要幫你設定明天 07:30 的鬧鐘嗎？
```

### Completion copy
```text
已設定明天 07:30 的鬧鐘。
```

## 5. Preparation Checklist

### Purpose
Provide a short, reassuring checklist for tomorrow.

### Checklist rules
- Keep it short: 3–5 items.
- Only include items that help tomorrow feel ready.
- Do not show a long backlog.
- Low-priority tasks can be suggested for tomorrow.

### Example checklist
- 確認會議資料
- 準備識別證
- 手機充電
- 設定鬧鐘

## 6. Completion State

### Purpose
Create emotional closure before sleep.

### Completion message
```text
明日準備完成。你可以放心休息。
```

### UI notes
- Use a calm completion card.
- Avoid exaggerated gamification.
- The emotional goal is reassurance, not productivity celebration.

## Empty / Error State

### No tomorrow events
```text
明天暫時沒有重要行程。你可以依照平常節奏安排早晨。
```

### Calendar unavailable
```text
目前無法讀取行事曆，先用最近的提醒資料整理明日準備。
```

### No unfinished preparation items
```text
目前沒有需要特別準備的事項。
```

## Mobile / RWD Behavior

### Desktop
- Show the bedtime context, first important event, wake-up suggestion, and preparation checklist as a calm connected flow.
- Avoid turning the page into a full calendar dashboard.

### Tablet
- Event and wake-up suggestion should appear first.
- Checklist can appear below or beside the suggestion card.

### Mobile
Use one vertical flow:

```txt
Sleep-time context
→ first important event
→ AI wake-up suggestion
→ alarm CTA
→ preparation checklist
→ completion state
```

## State Definition

| State | Meaning | UI Treatment |
|---|---|---|
| ready_to_review | AI has tomorrow data | Show first event and suggestion |
| alarm_suggested | AI recommends wake-up time | Primary CTA visible |
| alarm_confirming | User is confirming setup | Confirmation prompt |
| alarm_set | Alarm created | Success state |
| checklist_pending | Preparation items remain | Short checklist |
| completed | Tomorrow preparation complete | Calm closure card |
| unavailable | Calendar unavailable | Gentle fallback state |

## Stitch Scope Limit
When generating this module:
- Do not design this as a full calendar dashboard.
- Do not show a dense timeline as the main focus.
- Do not create a full calendar SaaS.
- Do not create productivity analytics.
- Design it as a bedtime tomorrow-preparation flow.

## Stitch / Cursor / Codex Usage Notes
- Stitch should focus on the question: “Can I sleep now knowing tomorrow is prepared?”
- Cursor may use mock calendar and checklist data only.
- Codex should preserve the low-pressure bedtime flow and avoid expanding into task management.

## Stitch MCP Description
Create a Tomorrow Briefing demo module for AI Life Assistant. Design it as a bedtime tomorrow-preparation flow, not a full calendar dashboard. Show night context, tomorrow's first important event, AI wake-up suggestion, one-tap alarm setup, short preparation checklist, and completion state: 明日準備完成，可以放心休息.

## Visual / Mobile Implementation Lock

- Light Mode uses softened Atmospheric Glassmorphism: warm white, pale mint, soft teal, soft blue, lavender / blue shadow.
- Do not use pure black, large dead-black surfaces, black sidebar, black cards, or high-saturation green.
- Dark Mode uses the stable Nocturnal Clarity system in the next UI pass; do not mix dark tokens into Light Mode.
- Mobile order: title → reassurance summary → first important event → wake-up suggestion → alarm CTA → checklist → completion.
- Mobile alarm CTA must be thumb-friendly and at least 44–48px tall.
- Bottom nav active context: Home if entered as a Home module card; no separate Tomorrow tab in bottom nav.
