# PRODUCT_OVERVIEW

## 文件用途
定義 NestBuddy / 巢伴的產品方向、使用情境、設計原則與初版範圍，作為後續 UX、UI 與開發規格的共同基準。

## 初版規格
- 產品類型：生活型 AI 助理與智慧家庭控制產品。
- 核心能力：AI 對話、今日摘要、提醒管理、行程輔助、智慧燈光與家電快速控制。
- 設計語氣：Apple Home inspired、日常、安定、低干擾、不過度科幻。
- 畫面基準：以現行 Light Mode 為主，Home 與 Dashboard 已融合為單一首頁入口；Dark Mode 先保留既有系統，不在此輪改版。

## UX 規則
- 使用者應能在 5 秒內理解今日狀態與家中重點設備狀態。
- AI 助理應以「提醒、整理、協助控制」為主，不搶走使用者主控權。
- 智慧家電操作需要清楚顯示 On / Off / Processing / Error 狀態。
- 夜間情境避免高亮、強對比與突兀動畫。

## Responsive 規則
- Desktop 以首頁摘要、Ask AI、三個正式模組卡與模組入口為主。
- Tablet 以雙欄或重點卡片堆疊為主。
- Mobile 以 Bottom Navigation 串接核心任務，單欄呈現。

## Stitch MCP 可理解描述
建立一個 calm smart home AI homepage，首頁聚合 AI greeting、Ask AI input、today summary、smart home quick controls、reminder preview 與三個正式模組卡，整體視覺柔和、清楚、像 Apple Home 但不要直接複製。

## i18n / 語言規格
- 產品需預留多國語系 i18n 架構，但 MVP 初版只實作中文與 English。
- UI 需提供中英切換入口，讓使用者可在繁體中文與英文之間切換。
- 所有固定 UI 文案、按鈕、狀態文字、提醒訊息與 AI 系統提示需避免硬編碼，需能透過語系 key 管理。
- 初版預設語言可依系統語言判斷；若無法判斷，預設使用繁體中文。
