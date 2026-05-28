# SMART_HOME

## 文件用途
定義 Smart Home 畫面的設備控制與房間管理結構。

## 初版規格
- 主要區塊：Room Filter、Device Grid、Scene Shortcuts、Status Feedback。
- 設備卡需顯示名稱、房間、狀態、toggle。
- 支援燈光 On / Off 與夜間低亮度狀態。

## UX 規則
- 切換設備後需顯示 Processing，避免使用者重複點擊。
- Off 狀態仍需可辨識。
- 夜間模式避免高亮背景與刺眼光暈。

## Responsive 規則
- Desktop：Room sidebar + Device grid。
- Tablet：Room chips + 2-column device grid。
- Mobile：Room chips + single-column cards。

## Stitch MCP 可理解描述
Smart Home control screen with room filters, device cards, lighting state, muted night dark mode, Apple Home inspired soft cards.
