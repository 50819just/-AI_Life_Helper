# Module Overview

## Document Purpose
Define the module hierarchy for NestBuddy / 巢伴 as a Product-like Demo Prototype.

## Scope
This document clarifies which modules are formal demo modules, which files are scenario specs, and which modules should remain Coming Soon.

## Product-like Demo Prototype
NestBuddy should feel like a formal lifestyle AI product, but the demo scope is limited.

> 三個模組都要有完整 Demo flow，但不展開成完整商業產品功能。

## Formal Demo Modules

1. Tomorrow Briefing
2. Smart Home Control
3. AI Life Reminder

These are the only three modules that should receive complete demo flows and full module screens.

## Demo Scenario Specs

| Scenario | Parent Module | Role |
|---|---|---|
| Sleep Environment | Smart Home Control | Demonstrates Sleep Mode, low-brightness smart home control, and the current day/night switching behavior |
| Personal Reminders | AI Life Reminder | Demonstrates bedtime checklist and personal reminder completion |

Scenario specs cannot replace their parent modules.

## Module Relationship

```txt
NestBuddy
│
├── Home / Dashboard（合併首頁）
│   ├── Tomorrow Briefing card
│   ├── Smart Home Control card
│   ├── AI Life Reminder card
│   └── 更多模組 → Module Library / Coming Soon previews
│
├── Tomorrow Briefing
│
├── Smart Home Control
│   └── Sleep Environment Scenario
│
└── AI Life Reminder
    └── Personal Reminders Scenario
```

## Coming Soon Modules
The following modules may appear only as disabled / preview cards inside Module Library / More Modules, not directly on Home:
- Health Monitor
- Family Space
- Car Mode
- AI Mood Analysis

They should not be generated as full pages or flows.

## State Definition
| Type | Can Generate Full Page | Notes |
|---|---|---|
| Formal Demo Module | Yes | Full demo flow only, not full commercial feature set |
| Demo Scenario | Only inside parent module | Reference / child flow |
| Coming Soon | No | Preview card only |

## Mobile / RWD Behavior
- Home shows only the three formal module cards plus a low-key `更多模組 →` entry. Coming Soon previews appear only inside Module Library / More Modules.
- Mobile bottom navigation uses Home / Devices / Tasks / Settings.
- Scenario screens inherit parent module navigation state.

## Stitch / Cursor / Codex Usage Notes
- Stitch should generate formal modules one at a time.
- Cursor should implement only demo-level states.
- Codex should preserve hierarchy and avoid scope expansion.

## Stitch MCP Description
Use this module hierarchy for NestBuddy. Generate only three formal demo modules: Tomorrow Briefing, Smart Home Control, and AI Life Reminder. Treat Sleep Environment and Personal Reminders as child scenarios. Coming Soon modules should appear only as disabled or preview cards inside Module Library / More Modules, not directly on Home.
