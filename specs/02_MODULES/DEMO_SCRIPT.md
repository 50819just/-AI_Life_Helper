# Demo Script

## Document Purpose
Define the product-like demo script for NestBuddy. This script shows how Home / Dashboard（合併首頁） leads users into the three formal demo modules: Tomorrow Briefing, Smart Home Control, and AI Life Reminder.

## Scope
This demo script is designed for a Product-like Demo Prototype. It should feel like a real product journey while staying inside demo scope.

## Demo Goal
Show how NestBuddy helps the user prepare for tomorrow, adjust the home environment, and complete gentle lifestyle reminders.

## Demo Flow Overview

```txt
Home / Dashboard（合併首頁）
↓
Tomorrow Briefing
↓
Smart Home Control
  └── Sleep Environment Scenario
↓
AI Life Reminder
  └── Personal Reminders Scenario
```

## Step 1. Home / Dashboard（合併首頁）
The user enters Home.

Home shows:
- AI Greeting
- AI Chat Entry（AI Ask anything）
- Dashboard Summary（Home 內摘要區，現行首頁摘要卡）
- Tomorrow Briefing card
- Smart Home Control card
- AI Life Reminder card
- 低調「更多模組 →」入口（Coming Soon previews 只在 Module Library 內）

AI greeting example:

```text
Hi 哲宇，今天過得還好嗎？今晚可以先整理明天的行程，再進入睡眠模式。
```

## Step 2. Tomorrow Briefing
User opens Tomorrow Briefing.

System shows:
- Mock calendar source
- Today's remaining context
- Tomorrow's earliest event
- AI wake-up suggestion
- Preparation checklist

AI says:

```text
我看到你明天 08:30 有一場工廠端同步會議。
建議幫你設定 07:30 鬧鐘，並預留 60 分鐘準備時間。
```

User taps:

```text
設定 07:30 鬧鐘
```

System shows:

```text
已設定明天 07:30 的鬧鐘。
明日準備完成。
```

## Step 3. Smart Home Control
User opens Smart Home Control.

System shows:
- Device Dashboard
- Bedroom Main Light on
- Living Room Light on
- Brightness and color temperature controls
- Smart scenes
- AI Recommended Scene
- On / Off 狀態採綠燈 / 紅燈 icon 與文字並存

AI says:

```text
現在接近睡前時間，臥室燈還開著。要不要切換成睡眠模式？
```

### Sleep Environment Scenario
Sleep Environment appears as a scenario inside Smart Home Control.

System shows:
- Time after 23:00
- Phone has not moved for 15 minutes
- Phone screen is off
- Bedroom main light is on

User taps:

```text
啟動睡眠模式
```

System shows:

```text
臥室主燈已關閉。
睡眠模式已啟動。
```

## Step 4. AI Life Reminder
User opens AI Life Reminder.

System shows:
- Today reminders
- Bedtime reminder
- Drink water reminder
- Missed reminder recovery
- Personal checklist
- AI suggestion

AI says:

```text
今晚還有 2 個提醒需要確認。先處理鬧鐘和客廳燈就好，其他低優先事項明早再看也可以。
```

### Personal Reminders Scenario
Personal Reminders appears as a scenario inside AI Life Reminder.

User completes:
- 設定明早鬧鐘
- 確認明天要帶的東西
- 關閉客廳燈

System shows:

```text
今晚安心清單已完成。你已經完成睡前的重要準備事項。
```

## UX Rules
- The demo should reduce uncertainty step by step.
- AI messages should be short, contextual, and gentle.
- Smart Home Control should not feel like a full IoT platform.
- AI Life Reminder should not feel like a strict todo app.
- Completion messages should create closure and reassurance.

## State Definition
| Step | Completion Signal |
|---|---|
| Home | User understands available modules |
| Tomorrow Briefing | Alarm set and preparation complete |
| Smart Home Control | Sleep Mode activated |
| AI Life Reminder | Personal reminders completed |

## Mobile / RWD Behavior
- Desktop: present demo as connected product dashboard and module screens.
- Tablet: show clear module priority with readable cards.
- Mobile: use vertical guided flow and bottom navigation.

## Stitch / Cursor / Codex Usage Notes
- Stitch should generate one step or one module at a time.
- Cursor should use mock data to connect demo states.
- Codex should keep demo scope focused and avoid expanding into full commercial features.

## Stitch MCP Description
Create a product-like demo storyboard for NestBuddy showing Home / Dashboard（合併首頁）, Tomorrow Briefing, Smart Home Control with Sleep Environment scenario, and AI Life Reminder with Personal Reminders scenario. Use calm lifestyle smart home visual direction, soft glassmorphism, the current Light Mode palette, and low-pressure AI language.
