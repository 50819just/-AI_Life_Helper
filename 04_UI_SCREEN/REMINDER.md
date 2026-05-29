# REMINDER

## 文件用途
定義 NestBuddy 中 Reminder 頁面的 UI Screen Spec，包含頁面用途、資訊架構、主要區塊、提醒狀態、空狀態、AI 建議邏輯與 Light / Dark Mode 注意事項。

Reminder 是三個主模組之一，不只是提醒清單，而是協助使用者管理日常生活節奏、準備事項與低壓提醒的核心頁面。

---

## 1. 頁面主要用途

Reminder 頁面的核心目標是讓使用者快速知道：

1. 現在有哪些提醒需要注意。
2. 接下來有哪些即將到來的提醒。
3. 是否有錯過的提醒需要處理。
4. 哪些提醒已完成，可以安心結束。
5. AI 是否能根據生活情境提供更好的提醒建議。

頁面應保持溫和、清楚、低壓，不應讓使用者因提醒而感到被責備或被監控。

---

## 2. 頁面資訊架構

```text
Reminder
│
├── Header
│   ├── Page Title
│   ├── Date / Today Context
│   ├── Add Reminder Button
│   └── Filter / Search Entry
│
├── AI Reminder Summary Card
│   ├── Today Reminder Count
│   ├── Next Important Reminder
│   ├── Missed Reminder Notice
│   └── AI Suggestion
│
├── Reminder List
│   ├── Upcoming Reminder
│   ├── Missed Reminder
│   ├── Active Reminder
│   ├── Paused Reminder
│   └── Completed Reminder
│
├── Empty State
│   ├── No Reminder Message
│   ├── AI Suggestion
│   └── Create Reminder CTA
│
└── Bottom Navigation
    ├── Home
    ├── AI Assistant / AI Chat
    ├── Smart Home / Dashboard（合併首頁）
    ├── Reminder
    └── Settings or Notification, depending on nav version
```

---

## 3. UI 區塊規格

## 3.1 Header

### 內容
- 頁面標題：Reminder / 提醒。
- 今日日期或日常情境，例如「Today」或「今天」。
- Add Reminder 入口。
- Filter / Search 入口，可選。

### 規則
- Add Reminder 應是清楚的主要操作。
- Header 不應過高，避免壓縮提醒列表空間。
- Mobile 上可使用 compact header。

---

## 3.2 AI Reminder Summary Card

### 目的
讓使用者一眼看到今日提醒狀態與 AI 建議。

### 內容
- 今日提醒總數。
- 下一個重要提醒。
- 錯過提醒數量。
- AI 低壓建議。

### 範例文案
```text
今天還有 3 個提醒，下一個是 18:30 的晚餐前吃藥。
你有 1 個提醒剛剛錯過，可以選擇延後或標記完成。
```

### 視覺規則
- 使用 glass card。
- 不使用大面積紅色警告。
- 若有錯過提醒，以小型 badge 或 muted alert 呈現。

---

## 3.3 Reminder List

### 目的
呈現所有與當日或近期有關的提醒，並支援快速操作。

### Reminder Item 必備資訊
- Reminder title。
- Time / Date。
- Category 或 icon。
- Status。
- Quick action：完成、延後、暫停。

### 建議分類
- Today。
- Upcoming。
- Missed。
- Completed。

### 互動規則
- 點擊 item 進入 detail 或展開操作。
- Swipe action 可用於 Mobile，但不可作為唯一操作方式。
- 完成與刪除需視覺上明確區分。

---

## 3.4 Upcoming Reminder

### 定義
即將到來但尚未觸發的提醒。

### UI 呈現
- 使用一般卡片或列表列。
- 顯示剩餘時間，例如「in 20 min」。
- 若提醒重要，可加上 subtle highlight。

### 範例
```text
18:30｜吃藥提醒｜in 20 min
```

---

## 3.5 Missed Reminder

### 定義
已超過提醒時間，但尚未完成或處理。

### UI 呈現
- 不使用壓迫式紅色大卡。
- 使用 muted amber / soft alert icon。
- 提供補救操作：延後、完成、忽略一次。

### 範例文案
```text
你有一個剛錯過的提醒：喝水。
要延後 30 分鐘，還是標記為已完成？
```

### 規則
- 錯過提醒不應被描述為失敗。
- 若有多個錯過提醒，應合併成摘要，避免壓力。

---

## 3.6 Completed Reminder

### 定義
使用者已完成的提醒。

### UI 呈現
- 使用淡化狀態。
- 可顯示 check icon。
- 可收合在 Completed 區塊。

### 範例文案
```text
已完成 4 個提醒，今天的生活節奏很穩。
```

### 規則
- 完成狀態可以帶一點正向回饋，但不要過度遊戲化。
- 不使用誇張動畫或大量 confetti。

---

## 3.7 Empty State

### 使用情境
- 今天沒有提醒。
- 搜尋沒有結果。
- 某分類沒有內容，例如沒有錯過提醒。

### 空狀態文案

#### 沒有今日提醒
```text
今天沒有新的提醒。
你可以放心安排自己的節奏。
```

#### 沒有錯過提醒
```text
目前沒有錯過的提醒。
```

#### 沒有完成提醒
```text
完成的提醒會出現在這裡。
```

#### 搜尋無結果
```text
找不到符合的提醒，可以試著換個關鍵字。
```

### CTA
- Add Reminder。
- Ask AI to create reminder。
- Create routine reminder。

---

## 4. 提醒狀態定義

| 狀態 | 英文 key | 定義 | UI 呈現 | 可用操作 |
|---|---|---|---|---|
| 未開始 | `idle` | 已建立但尚未接近觸發時間 | 一般列表狀態 | 編輯、暫停、刪除 |
| 即將到來 | `upcoming` | 接近觸發時間 | subtle highlight、倒數時間 | 完成、延後、查看 |
| 已錯過 | `missed` | 超過提醒時間且未處理 | muted alert、補救按鈕 | 延後、完成、忽略一次 |
| 已完成 | `completed` | 使用者已完成提醒 | 淡化、check icon | 還原、查看 |
| 已暫停 | `paused` | 暫時停止通知 | paused badge、低視覺權重 | 恢復、編輯 |

---

## 5. AI 如何給出提醒建議

AI 建議應根據：

- 使用者今日行程。
- 已有提醒。
- 時間情境，例如早晨、出門前、睡前。
- Smart Home 狀態，例如燈還開著、空調仍運作。
- 使用者過去常建立的提醒類型。

### 建議範例

```text
你明天早上有會議，要不要今晚先設定「帶筆電」提醒？
```

```text
你通常睡前會關客廳燈，要不要建立一個 23:30 的睡前檢查提醒？
```

```text
你今天還沒有喝水提醒，要不要新增一個下午提醒？
```

### 規則
- AI 建議應可被忽略。
- 不要連續彈出多個建議。
- 健康相關提醒不得做醫療判斷。
- 建立提醒前需確認時間與內容。

---

## 6. 手機版 Bottom Navigation 對應狀態

Reminder 作為主模組時，Mobile Bottom Navigation 中 Reminder tab 需呈現 active 狀態。

### MVP 核心任務版本
```text
Home / Devices / Tasks / Settings
```

### Part 1 完整導覽版本
```text
Home / Dashboard（合併首頁） / AI Chat / Notification / Settings
```

若使用 Part 1 完整導覽，Reminder 可透過 Notification、Home Module Library 或 AI Chat 進入；若 Reminder 是主模組頁，需在 prompt 中明確指定對應導航策略，避免 Stitch 混用兩套 Bottom Navigation。

---

## 7. Light / Dark Mode 注意事項

### Light Mode
- 使用 `STITCH_PRESET_ATMOSPHERIC_GLASSMORPHISM_LIGHT_MODE.md`。
- 卡片可使用 frosted white glass。
- 重要提醒可使用 soft contrast，但不要大面積警示色。
- 空狀態插圖可明亮、柔和，但不刺眼。

### Dark Mode
- 使用 `STITCH_PRESET_NOCTURNAL_CLARITY_DARK_MODE.md`。
- 夜間提醒需降低亮度與通知壓力。
- Missed Reminder 不使用強烈紅色 glow。
- Sleep-related reminders 應更安靜、低干擾。

---

## 8. Stitch MCP 可理解描述

Create a Reminder screen for NestBuddy as a core module, not just a simple list. Include header, AI reminder summary card, reminder list, upcoming reminders, missed reminders, completed reminders, paused reminders, and empty states. Use Stitch presets as design token source. Keep reminders calm, readable, low-pressure, and lifestyle-oriented. Missed reminders should feel recoverable, not like failure. Support light and dark mode with soft glassmorphism and clear mobile navigation state.


## Current Module Lock
- 此畫面對應 AI Life Reminder / AI 生活提醒正式 demo module。
- Mobile active nav item: Tasks。
- Light Mode 使用 softened Atmospheric Glassmorphism，避免純黑、黑卡、黑 sidebar。
- Dark Mode 明天使用 stable Nocturnal Clarity system。
- 不做醫療系統、健康管理平台或嚴格 todo app。
