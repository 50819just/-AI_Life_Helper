# PART 2 — Module Flow

## 文件用途
把 AI Life Assistant 的三個核心模組拆成第二段流程，專門處理模組內部功能，不和 Home、Settings、Module Library 混在一起。

## Current Scope Lock

三個正式 Demo Modules：
1. Tomorrow Briefing / 明日簡報
2. Smart Home Control / 智慧家庭控制
3. AI Life Reminder / AI 生活提醒

這三個模組都要有完整 demo flow，但不展開成完整商業產品功能。

## Visual Lock
- Light UI：softened Atmospheric Glassmorphism。避免純黑、大面積死黑、黑色 sidebar、黑色卡片、高飽和綠色。
- Dark UI：Nocturnal Clarity 是目前穩定 system，明天再做 dark pass，不在 Light pass 混入。
- Desktop module screen 沿用 left sidebar app shell。
- Mobile module screen 沿用 bottom nav `Home / Devices / Tasks / Settings`，Ask AI 另用 floating entry。

---

## 1. Tomorrow Briefing / 明日簡報

```text
Tomorrow Briefing / 明日簡報
│
├── Sleep-time Context
│   ├── 目前時間 / 睡前情境
│   ├── 明天是否有重要行程
│   └── AI 主動整理明天重點
│
├── Tomorrow First Important Event
│   ├── 明天第一個重要行程
│   ├── 時間
│   ├── 地點 / 線上會議
│   └── 準備提醒
│
├── AI Wake-up Suggestion
│   ├── 建議起床時間
│   ├── 建議原因
│   ├── 準備緩衝時間
│   └── 一鍵設定鬧鐘
│
├── Preparation Checklist
│   ├── 會議資料
│   ├── 筆電 / 手機充電
│   ├── 會議連結
│   └── 其他 3–5 個低壓提醒
│
└── Completion State
    ├── 鬧鐘已設定
    ├── 準備清單已確認
    └── 明日準備完成，可以放心休息
```

### UX Notes
- 核心問題：我現在可以安心睡了嗎？明天準備好了嗎？
- 不要設計成完整 Calendar Dashboard、行事曆 SaaS 或 Productivity Analysis。
- 首屏優先顯示「明天第一個重要行程」與「是否需要早起」。
- Demo 必須有閉環：設定鬧鐘 / 確認清單 / 明日準備完成。

### Mobile Notes
- 單欄順序：標題 → 安心摘要 → 第一個重要行程 → 起床建議 → 鬧鐘 CTA → checklist → completion。
- 鬧鐘 CTA 不可藏在文字連結；需是 44–48px 以上可點擊按鈕。

---

## 2. Smart Home Control / 智慧家庭控制

```text
Smart Home Control / 智慧家庭控制
│
├── Device Dashboard
│   ├── 客廳主燈
│   ├── 臥室燈
│   ├── 書桌燈
│   └── 空調（可選）
│
├── Lighting Control
│   ├── ON / OFF
│   ├── Brightness
│   └── Color Temperature
│
├── Simple Scenes
│   ├── 專注
│   ├── 放鬆
│   ├── 睡前 / Sleep Mode
│   └── 全部關燈
│
├── AI Recommended Scene
│   ├── 晚間放鬆
│   ├── 睡前低刺激光線
│   └── 套用建議
│
└── Device Status
    ├── Online
    ├── Offline
    ├── Processing
    └── Error
```

### UX Notes
- 展示範圍是基本 device dashboard、燈光控制、simple scenes、Sleep Mode、AI recommended scene。
- Sleep Environment 是子情境，不是整個 Smart Home Control。
- 不做完整智慧家庭平台、automation builder、security dashboard 或設備 marketplace。
- 高影響操作，例如全部關燈，可提供簡短確認。

### Mobile Notes
- 主要控制要放在拇指容易點擊區。
- Slider thumb 要夠大，避免亮度 / 色溫控制難拖曳。
- On / Off 不只靠顏色，也要有文字或 icon。

---

## 3. AI Life Reminder / AI 生活提醒

```text
AI Life Reminder / AI 生活提醒
│
├── Today Reminders
│   ├── 喝水提醒
│   ├── 久未移動提醒
│   ├── 行程提醒
│   └── 睡前提醒
│
├── AI Suggestion
│   ├── 今日節奏建議
│   ├── 補水 / 走動提醒
│   └── 可加入提醒
│
├── Reminder States
│   ├── Completed
│   ├── Missed
│   ├── Upcoming
│   └── Paused
│
├── Bedtime Reminder
│   ├── 收拾桌面
│   ├── 充電
│   └── 明日行程確認
│
└── Personal Checklist
    ├── 水壺
    ├── 鑰匙
    ├── 筆電
    └── 文件
```

### UX Notes
- 主要目的：提供溫和生活提醒與 AI 輔助，不是監控或施壓。
- 不做健康管理平台、醫療系統、嚴格 todo app 或長 backlog。
- Missed state 要像可恢復狀態，不像失敗警告。
- Personal Reminders 是子情境，不是整個 AI Life Reminder。

### Mobile Notes
- 完成、延後、暫停要清楚分開，避免誤按。
- Reminder list 不要太密；每個 item 至少 44px 高。
- AI suggestion 放在上方，但不要壓過提醒清單。

---

## Stitch Prompt Summary
Generate module-level screens one at a time in existing Stitch project `8270097307517936032`. Use Light Mode first with softened Atmospheric Glassmorphism and the existing app shell. Keep Dark Mode for the next Nocturnal Clarity pass. Include only three formal modules: Tomorrow Briefing, Smart Home Control, and AI Life Reminder. Avoid full SaaS, full calendar, full smart home platform, health platform, medical system, automation builder, neon, sci-fi, and heavy black UI.
