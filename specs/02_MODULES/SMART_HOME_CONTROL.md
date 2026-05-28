# Smart Home Control / 智慧家庭控制

## Document Purpose
Define Smart Home Control as one of the three formal demo modules for AI Life Assistant. This module demonstrates smart device control through a calm, product-like demo flow without becoming a full smart home platform.

## Scope
Smart Home Control focuses on a small set of understandable smart home interactions:
- Viewing device status.
- Turning lights on / off.
- Adjusting brightness.
- Adjusting color temperature.
- Switching Light / Dark Mode context.
- Activating simple smart scenes.
- Receiving an AI-recommended scene.

## What This Module Is / Is Not

### This module is
- A formal Demo Module.
- A smart home control experience for a product-like prototype.
- A way to demonstrate AI-assisted lighting and scene control.
- A parent module for the Sleep Environment scenario.

### This module is not
- A complete smart home platform.
- A full device marketplace.
- A full automation builder.
- A full home security system.
- A complete IoT integration product.

## Core User Goal
The user wants to quickly understand home device status and adjust the environment with minimal effort, especially around lighting and sleep preparation.

## Main Demo Flow

```txt
User enters Smart Home Control
↓
System shows device dashboard and current lighting state
↓
User adjusts light on/off, brightness, or color temperature
↓
AI suggests a suitable scene based on time and context
↓
User activates Sleep Mode or another simple scene
↓
System shows updated device state and completion feedback
```

## Device Dashboard

### Required content
- Main Light
- Bedroom Light
- Living Room Light
- Air Conditioner

### Display rules
Each device card should show:
- Device name
- Room
- Current status
- Main control
- Small status metadata when useful

## Lighting Control

### ON / OFF
- Must be visible and easy to understand.
- Do not rely only on color.
- Use text or icon support.

### Brightness
- Use a clear slider or stepped control.
- Night mode should avoid sudden full brightness.

### Color Temperature
- Allow simple warm / neutral / cool control.
- Do not expose complex lighting engineering settings.

## Light / Dark Mode Toggle
Light / Dark Mode is a product-level rule, but this module can demonstrate how lighting control behaves differently in day and night contexts.

- Light Mode uses Atmospheric Glassmorphism preset.
- Dark Mode uses Nocturnal Clarity preset.
- Night interactions must stay low-brightness and comfortable.

## Smart Scene
Demo scenes should stay simple:
- Sleep Mode
- Work Mode
- Movie Mode

Do not add a full custom scene builder in the demo.

## AI Recommended Scene
AI can recommend a scene based on:
- Time of day
- Current light status
- User inactivity
- Sleep preparation context

Example:

```text
現在已經接近睡前時間，臥室燈還開著。要不要切換成睡眠模式？
```

## Device State

| State | Meaning | UI Treatment |
|---|---|---|
| Online | Device can be controlled | Normal card state |
| Offline | Device unavailable | Muted card, clear recovery hint |
| Processing | Command is being applied | Spinner / subtle shimmer |
| Error | Command failed | Muted error message, no large red surface |

## Sleep Environment Scenario Reference
`SLEEP_ENVIRONMENT.md` is a demo scenario under this module.

It demonstrates:
- Sleep Mode
- Low-brightness night control
- Turning off lights
- AI-recommended bedtime environment

It does not replace this Smart Home Control module spec.

## Empty / Error State

### No devices connected
```text
還沒有連接智慧設備。
連接後，你可以在這裡快速控制燈光與情境模式。
```

### Device offline
```text
臥室燈目前離線，請確認 Wi‑Fi 或裝置電源。
```

### Command failed
```text
這次沒有成功執行，我們可以稍後再試一次。
```

## Mobile / RWD Behavior

### Desktop
- Device dashboard can use a multi-column card grid.
- AI recommendation and scene controls may appear side by side.

### Tablet
- Use two-column cards.
- Keep the primary controls near the top.

### Mobile
- Use one-column cards.
- Keep main control in thumb-friendly area.
- Bottom navigation active item: Smart Home.

## Stitch Scope Limit
When generating this module:
- Do not create a full smart home platform.
- Do not add many device categories.
- Do not create automation builder UI.
- Do not create security monitoring pages.
- Use Sleep Environment only as a scenario within this module.

## Stitch / Cursor / Codex Usage Notes
- Stitch should generate a focused Smart Home Control demo screen, not a whole IoT dashboard.
- Cursor should implement only mock states unless real integration is explicitly requested.
- Codex should preserve this module boundary and keep Sleep Environment as a child scenario.

## Stitch MCP Description
Create a Smart Home Control demo module for AI Life Assistant. Show a calm smart home device dashboard with light on/off, brightness, color temperature, simple smart scenes, and an AI-recommended scene. Use Stitch light/dark presets, soft glassmorphism, high readability, and low-brightness night behavior. Do not generate a complete smart home platform or automation builder.
