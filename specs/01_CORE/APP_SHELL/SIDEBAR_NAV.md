# SIDEBAR_NAV

## 文件用途

定義 NestBuddy 桌面版 Left Sidebar / App Shell 的結構與規則。

左側 Sidebar 是 desktop app shell 的核心導航框架，優先於 top nav 作為主要 desktop navigation reference。

## Reference Screen

主要參考這張 Stitch screen 的 sidebar 結構：

```txt
https://stitch.withgoogle.com/projects/8270097307517936032?node-id=8fbad35c88c7427486530b5bbcf16b7f
AI Chat - Confirmation (Lumina Ambient Desktop Refined)
```

可保留的 sidebar 方向：

- 上方品牌區
- 第一個主要 action 是 New Chat
- 中間是主要功能 nav list
- 底部是 secondary utility / account 區
- 底部保留亮色模式 pill，dark mode 先作為既有系統參考，不在這輪主畫面重做
- icon + label 的清楚列表形式
- 明亮、成熟、乾淨的 desktop product shell

## Sidebar Structure

建議 sidebar 結構：

```txt
Left Sidebar
├─ Brand Area
│  ├─ 巢伴
│  └─ Premium Assistant / 生活助理
├─ Primary Action
│  └─ New Chat
├─ Primary Navigation
│  ├─ Dashboard
│  ├─ 智慧家庭
│  └─ 生活提醒
├─ Secondary Navigation（選配）
│  ├─ 歷史紀錄
│  ├─ 模組庫
│  └─ 探索
└─ Bottom Utility
   ├─ 亮色模式（實心 pill button）
   ├─ 設定
   ├─ 說明
   └─ 帳號 / 登出
```

## Required Sidebar Rules

### 1. New Chat First

Sidebar 上方第一個主要 action 必須是：

```txt
New Chat
```

New Chat 是 AI Assistant / AI Chat 的快速入口，不等於 Home，也不取代 Home。

### 2. Primary Navigation

Primary nav 應對齊本專案四個核心入口：

```txt
Dashboard / Home
智慧家庭
生活提醒
```

不要把 Ask AI、Notification、Settings 放成 primary nav。

### 3. Bottom Utility

Sidebar 最下方應放 utility / account 類操作。

可包含：

```txt
亮色模式
設定
說明
帳號 / 登出
```

其中外觀控制在現行畫面只保留一顆實心 pill button：

```txt
亮色模式
```

這顆按鈕應是 solid filled control，不是 outline、不是純文字、不是鬆散的雙按鈕切換。

### 4. Settings Rule

Settings 可放在 desktop sidebar bottom utility 或 profile menu；在 mobile 則固定為 bottom function bar 第四項。Settings 不是 desktop primary nav。

### 5. Notification Rule

Notification 可作為 top bar badge 或狀態提示，不作為 sidebar primary nav。

## Reference Screen Mapping

Reference screen 原始 sidebar 可能包含：

```txt
New Chat
Assistant
Automations
Analytics
Devices
Settings
Help
Sign Out
History
Library
Explore
```

在 NestBuddy demo prototype 中應對齊為：

```txt
New Chat
Dashboard
智慧家庭
生活提醒
歷史紀錄（選配）
模組庫（選配）
探索（選配）
亮色模式（實心 pill button）
設定
說明
帳號 / 登出
```

## Do Not

不要在 sidebar primary nav 放：

```txt
Ask AI
Notification
Health Monitor
Family Space
Car Mode
AI Mood Analysis
Full Automation Builder
Analytics as primary page
```

Analytics / Automations 若出現，只能作為 disabled preview、secondary、或後續商業產品想像，不是目前 demo 主線。

## Stitch Generation Notes

- 若 reference screen 已有此 sidebar，優先 duplicate，再刪改內容區，不要重做 sidebar。
- 保留 sidebar 的 spacing、icon label pattern、bottom utility 結構。
- 生成新 module screen 時，只改主內容區，sidebar 優先保持一致。
- 一律先做 Light Mode；Light / Dark toggle 可出現，但不代表要同時生成 dark screen。
