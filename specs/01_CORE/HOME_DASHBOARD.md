# HOME_DASHBOARD

## Document Purpose
Define Home / Dashboard as the formal product entry and demo navigation surface for AI Life Assistant. Home should look like a real product dashboard while keeping module details scoped and easy to enter.

## Scope
Home / Dashboard includes:
- AI Greeting
- AI Chat Entry
- Dashboard Summary
- Three formal module cards
- Coming Soon module cards
- Mobile bottom navigation
- Settings entry outside bottom navigation

## Page Purpose
Home helps users understand what AI Life Assistant can do and gives them clear access to the three core demo modules.

Home is not a pure landing page and not a full enterprise dashboard.

## Home as Product Entry
Home should create a polished first impression:
- Personal greeting
- Calm product tone
- Current day context
- Summary of schedule, reminders, and home status

Example:

```text
Hi Darius，今天過得還好嗎？
```

## Home as Demo Navigation
Home should guide users into:
1. Tomorrow Briefing
2. Smart Home Control
3. AI Life Reminder

Each module card should show a short summary and one clear entry action.

## AI Greeting
AI Greeting should be warm, concise, and contextual.

Examples:
- 「Hi Darius，今天過得還好嗎？」
- 「今晚可以先整理明天的行程，再進入睡眠模式。」
- 「你有 2 個提醒和 1 個智慧家庭狀態需要注意。」

## AI Chat Entry
AI Chat Entry should be visible but not dominate the whole page.

Possible labels:
- Ask AI
- AI Assistant
- 和 AI 說說

The entry opens AI Assistant / AI Chat, not a full unrelated chatbot product.

## Dashboard Summary

### Today Summary
Shows short daily context.

### Tomorrow Schedule Summary
Shows the next important event or preparation insight.

### Reminder Summary
Shows upcoming, missed, or completed reminder status.

### Smart Home Status Summary
Shows key device state, especially lights and sleep readiness.

## Module Cards

### Tomorrow Briefing
Purpose: prepare for tomorrow's schedule and alarm.

### Smart Home Control
Purpose: control lighting and smart scenes.

### AI Life Reminder
Purpose: manage lifestyle reminders and checklist.

## Coming Soon Module Cards
Coming Soon cards may include:
- Health Monitor
- Family Space
- Car Mode
- AI Mood Analysis

Rules:
- Disabled or preview style only.
- No full CTA.
- No complete detail page.
- Lower visual priority than formal modules.

## Bottom Navigation
Mobile bottom navigation is fixed:

```txt
Home / AI Assistant / Smart Home / Reminder
```

Home is active on this screen.

## Settings Entry
Settings should not appear in mobile bottom navigation.

Allowed entry points:
- Profile
- Top-right icon
- More menu

## Light / Dark Mode Behavior
- Light Mode uses Atmospheric Glassmorphism preset.
- Dark Mode uses Nocturnal Clarity preset.
- Home should support both modes across summary cards and module cards.
- Dark Mode should remain readable and low-brightness.

## Desktop / Tablet / Mobile Layout

### Desktop
- Multi-column dashboard.
- AI greeting and summary can be wide.
- Module cards can appear as a card grid.

### Tablet
- Summary first, then two-column module cards.

### Mobile
- One-column vertical flow.
- AI Greeting → Summary → Module Cards → Coming Soon.
- Bottom navigation fixed.

## State Definition
| State | Meaning | Home Treatment |
|---|---|---|
| Normal | All modules available | Show module cards normally |
| Needs attention | Reminder or smart home issue exists | Use subtle badge / summary |
| Coming Soon | Future module | Disabled preview card |
| Empty | No reminders or events | Calm empty message |

## Stitch Scope Limit
When generating Home:
- Do not put all module details on Home.
- Do not generate full Coming Soon pages.
- Do not use Settings in bottom navigation.
- Do not create a large enterprise dashboard.

## Stitch / Cursor / Codex Usage Notes
- Stitch should generate Home as a product dashboard and demo navigation surface.
- Cursor should route module cards to existing demo module screens.
- Codex should preserve bottom navigation and Coming Soon boundaries.

## Stitch MCP Description
Create a Home / Dashboard screen for AI Life Assistant. It should be the formal product entry and demo navigation surface with AI greeting, AI Chat entry, dashboard summary, three formal module cards, Coming Soon preview cards, and mobile bottom navigation. Keep it calm, product-like, Apple Home inspired, soft glassmorphism, and low-distraction.
