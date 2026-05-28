# PART 1 — Home / Dashboard / Module Library Flow

## 文件用途
把 AI Life Assistant 的入口層、首頁、Ask AI、Settings 與 Module Library 拆成第一段流程，避免和三個正式模組內部細節混在一起。

## Current Scope Lock

```txt
Project type: Product-like Demo Prototype
Stitch project: 8270097307517936032
Light UI: softened Atmospheric Glassmorphism
Dark UI: stable Nocturnal Clarity system, next pass
```

PART 1 只處理產品入口與全域框架，不展開完整商業產品功能。

## Flow Scope
此段只處理：
- Splash Screen（選配）
- Home / 首頁
- Ask AI / AI Chat Center
- Settings
- Module Library / More Modules

模組內部細節請放在 `PART_2_MODULE_FLOW.md`。

---

## AI LIFE ASSISTANT — Entry & Core Navigation

```text
AI LIFE ASSISTANT
│
├── 0. Splash Screen（選配）
│   ├── App Logo
│   ├── AI Loading
│   ├── Time / Weather
│   └── Enter Home
│
├── 1. Home / 首頁
│   │
│   ├── Desktop App Shell
│   │   ├── Left Sidebar
│   │   ├── New Chat（English, first primary action）
│   │   ├── Ask AI（English）
│   │   └── 亮色模式（solid pill button）
│   │
│   ├── Mobile App Shell
│   │   ├── Bottom Nav: Home / Devices / Tasks / Settings
│   │   └── Floating Ask AI entry
│   │
│   ├── Greeting / 今日情境
│   │   ├── Hi Darius
│   │   ├── Time / Weather
│   │   └── 今日節奏一句話
│   │
│   ├── Ask AI Command Bar
│   │
│   ├── Dashboard Summary / 快速狀態
│   │   ├── 明日準備摘要
│   │   ├── 智慧家庭狀態
│   │   └── 今日提醒摘要
│   │
│   ├── 常用模組 / Formal Demo Modules
│   │   ├── 1. Tomorrow Briefing / 明日簡報
│   │   ├── 2. Smart Home Control / 智慧家庭控制
│   │   └── 3. AI Life Reminder / AI 生活提醒
│   │
│   └── 更多模組 →
│       └── Module Library / More Modules
│           ├── Available Modules：三個正式 demo modules
│           └── Coming Soon Preview：健康監測 / 家庭空間 / 車載模式 / 情緒分析
│
├── 2. Ask AI / AI Chat Center
│   ├── Text Input
│   ├── Suggested Actions
│   ├── Context Cards
│   └── Recent Conversations
│
└── 3. Settings
    ├── Account
    ├── Appearance
    ├── Notification
    ├── Language / 語言
    ├── Device Connection
    └── AI Preferences
```

---

## UX Notes

### 0. Splash Screen
- 目的：建立產品第一印象，快速顯示時間、天氣與 AI 正在準備。
- 不要停留太久，應可自然進入 Home。
- 視覺應安定、低干擾，不要做成科幻 loading。

### 1. Home / 首頁
- Home 是產品首頁 / 入口 / 導覽中心，不是完整 SaaS dashboard。
- Dashboard Summary 是 Home 內的狀態摘要區塊，不預設成獨立主導航頁。
- 常用模組只放三個正式 demo modules：明日簡報、智慧家庭控制、AI 生活提醒。
- `更多模組 →` 是低調入口，不是第四張卡。
- Coming Soon modules 不直接出現在 Home 卡片區，只出現在 Module Library / More Modules。

### 2. Ask AI / AI Chat Center
- 目的：集中處理文字、智慧指令與近期對話。
- Mobile 使用 floating Ask AI，不放進 bottom nav。
- 控制家電、設定鬧鐘、建立提醒等高影響操作需清楚確認。

### 3. Settings
- Settings 是 mobile bottom nav 第四項。
- Desktop 可放 sidebar bottom utility、profile 或右上角入口。
- Settings 不進 desktop primary nav。

## Mobile Usability Notes
- Mobile bottom nav 固定為 `Home / Devices / Tasks / Settings`。
- Bottom nav 必須保留 label，不只顯示 icon。
- Floating Ask AI 不得遮住 bottom nav 或主要 CTA。
- Home mobile 一次只呈現最重要入口；不要把 Coming Soon grid 展開在首頁。
- 所有主要 touch target 至少 44px，建議 48px。

## Visual Notes
- Light UI：使用 softened Atmospheric Glassmorphism，避免詭異黑色。
- Dark UI：明天以 stable Nocturnal Clarity system 接續，不在此 Light pass 亂改。
- 不要純黑、大面積死黑、黑色 sidebar、黑色卡片、高飽和綠色。

## Stitch Prompt Summary
Generate the entry and navigation flow for AI Life Assistant in existing Stitch project `8270097307517936032`. Use Light Mode first with softened Atmospheric Glassmorphism. Desktop uses left sidebar with `New Chat`, mobile uses bottom nav `Home / Devices / Tasks / Settings` and a floating `Ask AI` entry. Home shows exactly three formal demo module cards and a low-key `更多模組 →` entry. Coming Soon modules appear only inside Module Library. Do not create a new project, dark variant, full SaaS dashboard, or heavy black UI.
