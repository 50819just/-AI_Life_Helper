# PART 2 — Module Flow

## 文件用途
把 AI Life Assistant 的三個核心模組拆成第二段流程，專門處理模組內部功能，不和首頁、Dashboard、Settings 混在一起。

## Flow Scope
此段只處理：
- Tomorrow Briefing 模組
- Smart Home Control 模組
- AI Life Reminder 模組

入口與全域導覽請放在 `PART_1_HOME_DASHBOARD_MODULE_LIBRARY_FLOW.md`。

---

## 1. Tomorrow Briefing 模組

```text
Tomorrow Briefing
│
├── Calendar Sync
│   ├── Google Calendar
│   ├── Apple Calendar
│   └── Outlook
│
├── Today Schedule
│   ├── Timeline View
│   ├── Meeting Card
│   ├── Event Detail
│   └── AI Summary
│
├── Tomorrow Preview
│   ├── First Event
│   ├── Wake-up Suggestion
│   ├── Travel Time
│   ├── Weather Reminder
│   └── Schedule Conflict
│
├── AI Analysis
│   ├── Sleep Suggestion
│   ├── Productivity Analysis
│   ├── Busy Level
│   └── Break Time Suggestion
│
└── Reminder System
    ├── Alarm Suggestion
    ├── Smart Notification
    ├── AI Voice Reminder
    └── Preparation Checklist
```

### UX Notes
- 主要目的：幫使用者理解今天與明天的節奏，提前準備。
- 核心畫面可分為：Today Schedule、Tomorrow Preview、AI Analysis。
- 提醒語氣要溫和，不要製造壓力。
- Calendar Sync 屬於設定 / onboarding 性質，不一定要常駐在主畫面。

---

## 2. Smart Home Control 模組

```text
Smart Home Control
│
├── Device Dashboard
│   ├── Main Light
│   ├── Bedroom Light
│   ├── Living Room
│   └── Air Conditioner
│
├── Lighting Control
│   ├── ON / OFF
│   ├── Brightness
│   ├── Color Temperature
│   └── RGB Mood Light
│
├── Smart Scene
│   ├── Sleep Mode
│   ├── Work Mode
│   ├── Movie Mode
│   ├── Away Mode
│   └── Wake-up Mode
│
├── Automation
│   ├── Auto Turn Off
│   ├── Motion Detection
│   ├── Auto Dim
│   └── AI Recommended Scene
│
└── Device Status
    ├── Online
    ├── Battery
    ├── Wi-Fi Status
    └── Usage History
```

### UX Notes
- 主要目的：快速控制家電與情境模式，尤其是燈光與睡眠場景。
- 夜間模式要低亮度、低刺激，避免突然大面積高亮。
- 高影響操作，例如 Away Mode 或全部關燈，可提供簡短確認。
- Device Status 應清楚但不過度搶眼。

---

## 3. AI Life Reminder 模組

```text
AI Life Reminder
│
├── Daily Reminder
│   ├── Schedule Reminder
│   ├── Drink Water
│   ├── Medicine Reminder
│   └── Sleep Reminder
│
├── Smart Detection
│   ├── No Movement
│   ├── Long Screen Time
│   ├── Late Night Warning
│   └── Health Suggestion
│
├── Leaving Home Reminder
│   ├── Lights Still On
│   ├── AC Still Running
│   ├── Door Lock Check
│   └── Wallet / Key Reminder
│
├── Sleep Assistant
│   ├── Relax Music
│   ├── AI Voice
│   ├── Do Not Disturb
│   └── Screen Dim
│
└── AI Suggestion
    ├── Stress Analysis
    ├── Rest Suggestion
    ├── Mood Support
    └── Personalized Advice
```

### UX Notes
- 主要目的：提供生活提醒與 AI 輔助，不是監控或施壓。
- Smart Detection 相關內容要注意語氣，避免讓使用者感到被責備。
- Leaving Home Reminder 可設計成離家前檢查清單。
- Sleep Assistant 應偏安定、舒緩、低亮度。

---

## Stitch Prompt Summary

Generate the module-level flows for AI Life Assistant. Keep these separate from Home and Dashboard. Include three modules: Tomorrow Briefing, Smart Home Control, and AI Life Reminder. Each module should have clear internal sections, calm AI assistance, soft smart-home visual style, and low-pressure reminder language. Avoid sci-fi dashboard, neon, complex 3D, and stressful warning-heavy UI.
