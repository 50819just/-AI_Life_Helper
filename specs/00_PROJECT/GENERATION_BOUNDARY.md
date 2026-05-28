# GENERATION_BOUNDARY

## Document Purpose
Define generation boundaries for Stitch, Cursor, and Codex so AI Life Assistant remains a focused Product-like Demo Prototype instead of expanding into a full commercial product.

## Scope
This file explains which parts can be generated as full demo screens, which parts are scenario references, and which parts must remain Coming Soon.

## Formal Demo Modules
The following modules can be generated as complete demo flows:

1. Tomorrow Briefing
2. Smart Home Control
3. AI Life Reminder

## Demo Scenario Specs
The following specs support a parent module and should not replace it:

| File | Parent Module | Generation Role |
|---|---|---|
| `SLEEP_ENVIRONMENT.md` | Smart Home Control | Scenario reference for Sleep Mode / low-brightness control |
| `PERSONAL_REMINDERS.md` | AI Life Reminder | Scenario reference for bedtime checklist and personal reminder completion |

## Coming Soon Modules
Coming Soon modules may appear only as disabled or preview cards.

Do not generate full screens for:
- Health Monitor
- Family Space
- Car Mode
- AI Mood Analysis
- Full Home Security
- Full Health Analytics
- Full Automation Builder
- Device Marketplace

## Fixed Generation Rules

```txt
Only generate the selected screen or module.
Do not merge unrelated modules into the same screen.
Do not expand demo modules into full commercial product systems.
Coming Soon modules should appear only as disabled or preview cards.
```

## Do Not Generate
Do not generate:
- A full smart home platform.
- A full health management platform.
- A full calendar SaaS.
- A full productivity SaaS.
- A full AI agent operating system.
- A full security monitoring system.
- A large enterprise dashboard.

## Stitch Boundary
When using Stitch:
- Feed one screen or one formal module at a time.
- Use Design System presets as visual source of truth.
- Use `DEMO_SCOPE.md` and this file as scope guardrails.
- Use scenario specs only when generating their parent module scenario.
- Do not ask Stitch to create all modules in one prompt.

## Cursor Boundary
When using Cursor:
- Implement only the demo states described in module specs.
- Avoid building real integrations unless explicitly requested.
- Mock data is acceptable and preferred for this prototype.
- Do not create complex backend architecture for demo-only flows.

## Codex Boundary
When using Codex:
- Maintain file structure and naming.
- Do not rename or merge specs without explicit instruction.
- Preserve Product-like Demo Prototype scope.
- Prefer clear Markdown specs before implementation.

## State Definition
| Generation Type | Allowed Output | Not Allowed |
|---|---|---|
| Formal Demo Module | Full demo screen / flow | Full commercial system |
| Demo Scenario | Sub-flow inside parent module | Standalone product module |
| Coming Soon | Disabled / preview card | Full detail page |
| Out of Scope | None | Generated screens or features |

## Mobile / RWD Behavior
All generated screens should consider:
- Desktop
- Tablet
- Mobile

Mobile navigation must remain:

```txt
Home / AI Assistant / Smart Home / Reminder
```

Settings should be accessed from Profile, top-right icon, or More menu.

## Stitch / Cursor / Codex Usage Notes
Use this file before every generation pass to prevent scope drift. If a generation result creates a full platform, large dashboard, or unrelated module detail, treat it as out of scope and refine the prompt.
