# DEMO_SCOPE

## Document Purpose
Define the product scope for AI Life Assistant / AI 生活小幫手 as a Product-like Demo Prototype. This file prevents the project from expanding into a full commercial product while keeping the demo polished enough to feel like a real product.

## Scope
AI Life Assistant is a lifestyle AI product demo that combines AI assistance, smart home control, reminders, and schedule preparation.

The project should look and feel like a formal product, but the implemented demo scope is intentionally limited to three core demo modules.

> 三個模組都要有完整 Demo flow，但不展開成完整商業產品功能。

## Product-like Demo Prototype Definition

### What it means
- The UI should feel like a real product dashboard.
- The three core modules should each have a complete and understandable demo flow.
- The demo should support Desktop, Tablet, and Mobile screen generation.
- The product should have coherent navigation, design system, mock data, and AI behavior.
- Other future modules may appear only inside Module Library as Coming Soon previews, not directly as Home cards.

### What it does not mean
- It is not a full commercial smart home platform.
- It is not a full calendar SaaS.
- It is not a full health management platform.
- It is not a full productivity or task management system.
- It is not an all-purpose AI agent operating system.

## Formal Demo Modules

1. Tomorrow Briefing
2. Smart Home Control
3. AI Life Reminder

Each formal demo module needs:
- A clear entry point from Home / Dashboard.
- A defined user goal.
- A short but complete demo flow.
- AI suggestion or AI contextual support.
- A state change or completion result.
- A Stitch MCP description for UI generation.

## Demo Scenario Specs

The following files are scenario-level specs, not standalone formal modules:

| Scenario | Parent Module | Purpose |
|---|---|---|
| Sleep Environment | Smart Home Control | Demonstrates Sleep Mode, low-brightness night control, and AI-recommended lighting state. |
| Personal Reminders | AI Life Reminder | Demonstrates personal checklist, bedtime reminders, and completion reassurance. |

## Home / Dashboard Role
Home / Dashboard is the formal product entry and demo navigation surface. It should show what the product can do without expanding every module detail on the same page.

Home should include:
- AI Greeting
- AI Chat Entry
- Dashboard Summary
- Three formal module cards
- Low-key More Modules entry
- Mobile bottom navigation

## Coming Soon Policy
Coming Soon modules may appear as preview or disabled cards only inside Module Library / More Modules. They should not appear directly as Home cards and should not receive full detail pages, full flows, or complete feature specs in this demo scope.

Examples:
- Health Monitor
- Family Space
- Car Mode
- AI Mood Analysis

## State Definition
| State | Meaning | Demo Treatment |
|---|---|---|
| Formal Demo Module | One of the three core modules | Full demo flow and screen generation allowed |
| Demo Scenario | A contained scenario under a formal module | Used as reference or sub-flow only |
| Coming Soon | Future module | Preview card only, no full screen |
| Out of Scope | Full commercial systems | Do not generate |

## Mobile / RWD Behavior
The demo should support:
- Desktop: broader dashboard and multi-card layout.
- Tablet: two-column / stacked hybrid layout.
- Mobile: one-column flow and bottom navigation.

Mobile bottom navigation is fixed:

```txt
Home / Devices / Tasks / Settings
```

Ask AI is independent floating entry and is not part of the bottom navigation. Settings is the fourth item in the mobile bottom function bar.

## Stitch / Cursor / Codex Usage Notes
- Use this file as the scope boundary before generating screens or implementation tasks.
- Do not expand modules into full commercial platforms.
- Do not merge all modules into one large dashboard.
- Generate one screen or one module at a time.
