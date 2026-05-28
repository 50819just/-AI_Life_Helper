# SMART_HOME_FLOW

## 文件用途
定義智慧家電與燈光控制的主要操作流程，特別納入 Dark Mode 與夜間低亮度需求。

## 初版規格
1. 使用者進入 Smart Home。
2. 選擇房間或設備分類。
3. 查看設備 On / Off 狀態。
4. 點擊設備卡片或控制元件切換狀態。
5. 系統回饋 Processing，完成後更新狀態。

## UX 規則
- 燈光 Off 狀態不可使用過暗到不可辨識的灰色。
- Dark Mode 不使用刺眼純白光暈。
- 夜間控制避免突然大面積亮色。
- 錯誤狀態要清楚，但不使用過度警示的紅色鋪滿畫面。

## Responsive 規則
- Desktop：房間列表與設備 grid 並排。
- Tablet：房間 filter 橫向排列，設備 2 欄。
- Mobile：房間 chips + 單欄設備卡，主要控制區拇指可達。

## Stitch MCP 可理解描述
Smart Home screen with room filters, device cards, light controls, on/off state colors, low brightness dark mode, soft glassmorphism cards, Apple Home inspired layout.
