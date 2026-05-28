# PART 1 — Home / Dashboard / Module Library Flow

## 文件用途
把 AI Life Assistant 的入口層、首頁儀表板、模組入口與主要全域頁面拆成第一段流程，避免和模組內部細節混在一起。

## Flow Scope
此段只處理：
- Splash Screen
- Home Dashboard
- Dashboard Overview
- AI Chat Center
- Settings
- Module Library 的入口與分類

模組內部細節請放在 `PART_2_MODULE_FLOW.md`。

---

## AI LIFE ASSISTANT — Entry & Core Navigation

```text
AI LIFE ASSISTANT
│
├── 0. Splash Screen
│   ├── App Logo
│   ├── AI Loading
│   ├── Time / Weather
│   └── Enter Home
│
├── 1. Home Dashboard
│   │
│   ├── Header
│   │   ├── User Profile
│   │   ├── Greeting Message
│   │   ├── Notification Bell
│   │   └── AI Quick Input
│   │
│   ├── AI Summary Card
│   │   ├── Today Schedule
│   │   ├── Weather
│   │   ├── AI Suggestion
│   │   └── Reminder Overview
│   │
│   ├── Quick Actions
│   │   ├── Turn Off Lights
│   │   ├── Sleep Mode
│   │   ├── Tomorrow Briefing
│   │   └── AI Quick Command
│   │
│   ├── Module Library
│   │   ├── 1. Tomorrow Briefing
│   │   ├── 2. Smart Home Control
│   │   ├── 3. AI Life Reminder
│   │   └── Coming Soon
│   │       ├── Health Monitor
│   │       ├── Family Space
│   │       ├── Car Mode
│   │       └── AI Mood Analysis
│   │
│   └── Bottom Navigation
│       ├── Home
│       ├── Dashboard
│       ├── AI Chat
│       ├── Notification
│       └── Settings
│
├── 2. Dashboard Overview
│   ├── Device Status
│   ├── AI Status
│   ├── Calendar Status
│   ├── Connected Devices
│   ├── Sleep Analysis
│   ├── Reminder Statistics
│   └── Weekly Activity
│
├── 3. AI Chat Center
│   ├── Voice Input
│   ├── Text Input
│   ├── AI Suggestions
│   ├── Smart Command
│   └── Recent Conversations
│
└── 4. Settings
    ├── User Preference
    ├── AI Personality
    ├── Notification
    ├── Permission
    ├── Appearance
    └── Connected Accounts
```

---

## UX Notes

### 0. Splash Screen
- 目的：建立產品第一印象，快速顯示時間、天氣與 AI 正在準備。
- 不要停留太久，應可自然進入 Home。
- 視覺應安定、低干擾，不要做成科幻 loading。

### 1. Home Dashboard
- 目的：讓使用者一進來就知道「現在要注意什麼」與「可以快速做什麼」。
- Home 不要變成完整報表，重點是摘要與入口。
- Module Library 是主要功能入口，不要在首頁塞滿模組內部細節。

### 2. Dashboard Overview
- 目的：給進階狀態總覽，適合放統計、設備狀態、AI 狀態、週活動。
- 和 Home 的差異：Home 是生活摘要，Dashboard 是狀態總覽。

### 3. AI Chat Center
- 目的：集中處理語音、文字、智慧指令與近期對話。
- AI Chat Center 可以作為所有模組的共用助理入口。

### 4. Settings
- 目的：管理偏好、權限、外觀、通知、連接帳號與 AI Personality。
- 不應干擾主要任務流程。

---

## Stitch Prompt Summary

Generate the core navigation and home-level flow for AI Life Assistant. Focus on Splash Screen, Home Dashboard, Dashboard Overview, AI Chat Center, Settings, and Module Library. Keep module internals separate. Use calm AI smart home style, soft glassmorphism, clear cards, readable hierarchy, light/dark mode, and non-sci-fi visual language.
