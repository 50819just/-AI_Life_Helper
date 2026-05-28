# Sleep Environment Scenario / 睡眠環境子情境

Parent Module: Smart Home Control  
Scenario Type: Demo Scenario  
This file does not replace `SMART_HOME_CONTROL.md`.

## Document Purpose
Define Sleep Environment as a scenario under Smart Home Control. It demonstrates Sleep Mode, low-brightness night control, turning off lights, and AI-recommended bedtime environment.

## Scope
Sleep Environment is not an independent formal module. It is a focused demo scenario inside Smart Home Control.

It shows:
- Night context detection
- Bedroom / living room light status
- Low-brightness Dark Mode behavior
- AI recommendation for Sleep Mode
- User confirmation
- Updated sleep-ready state

## Scenario Purpose
This scenario helps users understand that Smart Home Control is not just a light switch. It can use AI and context to recommend a more comfortable bedtime environment.

## Trigger Conditions
AI may recommend Sleep Mode when:
1. Time is later than 23:00.
2. Phone has not moved for 15 minutes.
3. Phone screen is turned off.
4. Bedroom or living room light is still on.

## Demo Flow

```txt
User enters Smart Home Control
↓
User opens Sleep Environment / Sleep Mode scenario
↓
System displays current environment status
↓
AI checks trigger conditions
↓
AI recommends Sleep Mode
↓
User taps 啟動睡眠模式
↓
Lights gradually dim and turn off
↓
Sleep Mode becomes active
```

## Environment Status

### Before State
```txt
臥室主燈：開啟中
桌燈：已關閉
手機狀態：15 分鐘未移動
手機螢幕：已關閉
睡眠模式：尚未啟動
```

### After State
```txt
臥室主燈：已關閉
桌燈：已關閉
手機狀態：15 分鐘未移動
手機螢幕：已關閉
睡眠模式：已啟動
```

## Main CTA
Primary CTA:
- 啟動睡眠模式

Secondary CTA:
- 稍後再說
- 模擬觸發關燈

## State Definition
| State | Meaning | UI Treatment |
|---|---|---|
| Not Ready | Sleep conditions not matched | Neutral status |
| Almost Ready | Some sleep signals matched | AI suggestion card |
| Processing | Sleep Mode is being activated | Subtle dimming / loading |
| Active | Sleep Mode is on | Calm completion state |
| Error | Device command failed | Muted recovery message |

## Mobile / RWD Behavior
- Desktop: environment status grid + AI recommendation + CTA panel.
- Tablet: recommendation first, then status cards.
- Mobile: vertical state checklist and bottom CTA.

## Light / Dark Mode Notes
- Dark Mode uses Nocturnal Clarity preset.
- Night scenes must stay low-brightness.
- Avoid sharp white highlights.
- Glow should be subtle and comfortable.

## Stitch Scope Limit
When generating this scenario:
- Keep it inside Smart Home Control.
- Do not treat it as a standalone module.
- Do not create a full sleep tracking product.
- Do not add health scoring or medical sleep analysis.

## Stitch / Cursor / Codex Usage Notes
- Stitch should use this only when generating Sleep Mode within Smart Home Control.
- Cursor should implement it as a scenario route or section, not a top-level product module.
- Codex should preserve the parent-child relationship.

## Stitch MCP Description
Create a Sleep Environment scenario inside Smart Home Control. Show low-brightness night mode, environment status, AI-recommended Sleep Mode, turning lights off, and a calm completion state. Do not treat this as a standalone module or full sleep tracking product.
