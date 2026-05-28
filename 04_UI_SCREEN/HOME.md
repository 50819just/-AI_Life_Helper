# HOME

## 文件用途
定義 AI Life Assistant 首頁的資訊架構、主要區塊、UX 規則與 responsive 呈現。此文件供後續 UI 產生與 Stitch MCP 理解首頁需求。

## 初版規格
首頁包含以下 5 個主要區塊：

1. AI Greeting
   - 顯示溫和問候，例如「早安，今天有 3 件事需要留意」。
   - 可附一行 AI 生活摘要。

2. Module List
   - 顯示 AI Assistant、Smart Home、Reminder 等主要模組入口。
   - Mobile Bottom Nav 已有入口時，首頁 Module List 可作為摘要卡片，而非重複導覽。

3. Today Summary
   - 顯示今日行程、提醒、家庭狀態重點。
   - 內容要短，適合一眼掃讀。

4. Smart Home Quick Control
   - 顯示常用設備，例如客廳燈、臥室燈、空調。
   - 支援 On / Off / Processing / Error 狀態。
   - 夜間關燈情境避免亮色突兀。

5. Reminder Preview
   - 顯示今日最接近或最重要的 3 筆提醒。
   - 提供進入 Reminder 頁面的入口。

## UX 規則
- 首頁優先讓使用者安心知道「今天狀況」與「家中設備狀態」。
- AI Greeting 不要過度擬人或冗長，保持生活助理感。
- Smart Home Quick Control 的狀態回饋要即時、清楚、低干擾。
- 夜間模式下，避免大面積白色、亮黃或強光暈。
- Setting 不出現在 Mobile Bottom Nav，可放右上角 icon。

## Responsive 規則
- Desktop 1440px：建議 12 欄 grid；AI Greeting 橫跨上方；Today Summary 與 Smart Home Quick Control 並排；Reminder Preview 可放右側或下方。
- Tablet 1024px：建議 2 欄；Greeting 置頂；Summary 與 Quick Control 分列；Reminder Preview 下移。
- Mobile 375px：單欄；順序為 AI Greeting > Today Summary > Smart Home Quick Control > Reminder Preview > Module List；底部固定 Bottom Navigation。

## Stitch MCP 可理解描述
Create a responsive Home screen for AI Life Assistant. The design is Apple Home inspired with soft glassmorphism, calm technology, high readability, light and dark mode. Include AI greeting, module list, today summary, smart home quick controls, and reminder preview. Mobile uses bottom navigation with Home, AI Assistant, Smart Home, Reminder only. Settings is not in bottom nav.
