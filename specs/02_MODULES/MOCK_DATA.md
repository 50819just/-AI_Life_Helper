# Mock Data

## Document Purpose
Provide sample data for NestBuddy Product-like Demo Prototype. This mock data supports Home / Dashboard（合併首頁）, three formal demo modules, scenario specs, and Stitch / Cursor / Codex generation.

## Scope
This file includes mock data for:
- Home Dashboard
- Tomorrow Briefing
- Smart Home Control
- Sleep Environment scenario
- AI Life Reminder
- Personal Reminders scenario
- Coming Soon modules
- Light / Dark mode state
- Mobile bottom navigation state

## Global Demo Context
```json
{
  "userName": "哲宇",
  "currentTime": "09:30",
  "date": "2026-05-29",
  "mode": "light",
  "device": "mobile",
  "scenario": "dashboard_home",
  "bottomNavActive": "Home"
}
```

## Home Dashboard Mock Data
```json
{
  "greeting": "Hi 哲宇，今天過得還好嗎？",
  "aiChatEntry": "AI Ask anything",
  "aiSuggestions": ["我想早起", "關燈", "提醒生活"],
  "aiCategories": ["個人", "家庭", "工作"],
  "dashboardSummary": {
    "environment": "30%",
    "humidity": "濕度",
    "sleepAnalysis": "7.5 hrs · 優質 +12%",
    "quickActions": "3 個常用動作"
  },
  "moduleCards": [
    { "id": "tomorrow_briefing", "title": "Tomorrow Briefing", "status": "需要確認明日起床時間" },
    { "id": "smart_home_control", "title": "Smart Home Control", "status": "臥室燈開啟中" },
    { "id": "ai_life_reminder", "title": "AI Life Reminder", "status": "2 個睡前提醒未完成" }
  ]
}
```

## Tomorrow Briefing Mock Data
```json
{
  "calendarSource": "Google Calendar Mock",
  "todaySchedule": [
    { "time": "20:30", "title": "倒垃圾", "status": "missed" }
  ],
  "tomorrowEvents": [
    {
      "time": "08:30",
      "title": "工廠端同步會議",
      "type": "meeting",
      "preparation": "確認 NestBuddy MVP module spec"
    },
    {
      "time": "15:30",
      "title": "Personal errand",
      "type": "personal",
      "preparation": "記得帶證件"
    }
  ],
  "wakeUpSuggestion": {
    "suggestedTime": "07:30",
    "reason": "明天 08:30 有第一個重點行程，建議預留 60 分鐘準備。",
    "cta": "設定 07:30 鬧鐘"
  },
  "preparationChecklist": [
    { "title": "確認會議資料", "completed": false },
    { "title": "準備識別證", "completed": false },
    { "title": "手機充電", "completed": true }
  ]
}
```

## Smart Home Control Mock Data
```json
{
  "devices": [
    { "room": "Bedroom", "device": "Main Light", "status": "on", "brightness": 65, "colorTemperature": "warm", "connection": "online" },
    { "room": "Bedroom", "device": "Bedside Light", "status": "on", "brightness": 18, "colorTemperature": "warm", "connection": "online" },
    { "room": "Living Room", "device": "Main Light", "status": "on", "brightness": 45, "colorTemperature": "neutral", "connection": "online" },
    { "room": "Bedroom", "device": "Air Conditioner", "status": "on", "temperature": 25, "connection": "online" }
  ],
  "smartScenes": ["Sleep Mode", "Work Mode", "Movie Mode"],
  "aiRecommendedScene": {
    "scene": "Sleep Mode",
    "reason": "現在接近睡前時間，臥室燈仍開啟。"
  }
}
```

## Sleep Environment Scenario Mock Data
```json
{
  "sleepReadiness": "almost_ready",
  "conditions": {
    "timeAfter23": true,
    "phoneNoMovement15Min": true,
    "phoneScreenOff": true,
    "bedroomMainLightOn": true
  },
  "beforeState": {
    "bedroomMainLight": "on",
    "deskLamp": "off",
    "phoneMovement": "inactive_15_min",
    "phoneScreen": "off",
    "sleepMode": "inactive"
  },
  "afterState": {
    "bedroomMainLight": "off",
    "deskLamp": "off",
    "phoneMovement": "inactive_15_min",
    "phoneScreen": "off",
    "sleepMode": "active"
  }
}
```

## AI Life Reminder Mock Data
```json
{
  "summary": "今晚還有 2 個提醒需要確認。",
  "reminders": [
    { "title": "喝水", "time": "22:00", "type": "wellness", "state": "missed" },
    { "title": "設定明早鬧鐘", "time": "22:40", "type": "bedtime", "state": "upcoming" },
    { "title": "明天帶識別證", "time": "23:00", "type": "schedule", "state": "idle" },
    { "title": "關閉客廳燈", "time": "23:10", "type": "home", "state": "idle" }
  ],
  "aiSuggestion": "先處理鬧鐘和客廳燈就好，其他低優先事項明早再看也可以。"
}
```

## Personal Reminders Scenario Mock Data
```json
{
  "checklist": [
    { "title": "設定明早鬧鐘", "priority": "high", "completed": false },
    { "title": "確認明天要帶的東西", "priority": "medium", "completed": false },
    { "title": "關閉客廳燈", "priority": "medium", "completed": false },
    { "title": "把不急的訊息留到明天回", "priority": "low", "completed": true }
  ],
  "completionMessage": "今晚安心清單已完成。你已經完成睡前的重要準備事項。"
}
```

## Coming Soon Modules Mock Data
```json
{
  "comingSoonModules": [
    { "title": "Health Monitor", "status": "coming_soon", "enabled": false },
    { "title": "Family Space", "status": "coming_soon", "enabled": false },
    { "title": "Car Mode", "status": "coming_soon", "enabled": false },
    { "title": "AI Mood Analysis", "status": "coming_soon", "enabled": false }
  ]
}
```

## Light / Dark Mode State
```json
{
  "lightModePreset": "Atmospheric Glassmorphism",
  "darkModePreset": "Nocturnal Clarity",
  "currentMode": "light",
  "nightLowBrightness": false
}
```

## Mobile Bottom Navigation State
```json
{
  "items": ["Home", "Devices", "Tasks", "Settings"],
  "active": "Home",
  "settingsEntry": "profile_or_top_right"
}
```

## State Definition
Mock states should support idle, upcoming, missed, completed, paused, online, offline, processing, and error.

## Mobile / RWD Behavior
The same mock data should support desktop cards, tablet cards, and mobile vertical flows.

## Stitch / Cursor / Codex Usage Notes
- Stitch can use this data to populate realistic screens.
- Cursor can use this as frontend mock data.
- Codex should keep mock data lightweight and demo-oriented.
