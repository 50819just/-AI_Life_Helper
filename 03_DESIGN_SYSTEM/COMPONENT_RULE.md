# COMPONENT_RULE

## 文件用途
定義共用元件的視覺與互動規則，供後續 UI screen 與開發交接使用。

## 初版規格
- Card：圓角 20–28px，soft glass background，細邊框。
- Device Card：包含 icon、設備名稱、房間、狀態、主要 toggle。
- Module Card：首頁入口，顯示模組名稱、短描述、狀態摘要。
- Bottom Navigation：Mobile 固定四項 Home / AI Assistant / Smart Home / Reminder。
- Reminder Item：標題、時間、優先程度、完成狀態。

## UX 規則
- 卡片可點擊區域需清楚，不只 icon 可點。
- Toggle 狀態需有文字或 icon 輔助，不只靠顏色。
- 重要操作需提供 pressed / loading / success / error 狀態。

## Responsive 規則
- Desktop 卡片可 3–4 欄。
- Tablet 卡片 2 欄。
- Mobile 卡片單欄，touch target 至少 44px。

## Stitch MCP 可理解描述
Create reusable soft glass cards, device toggles, module cards, reminder rows, mobile bottom navigation with four fixed items, calm and readable component system.
