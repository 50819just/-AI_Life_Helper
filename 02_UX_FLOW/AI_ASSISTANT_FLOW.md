# AI_ASSISTANT_FLOW

## 文件用途
定義 AI 助理的對話、提醒建立與智慧家庭控制意圖流程。

## 初版規格
- 使用者輸入自然語言。
- AI 判斷意圖：問答、建立提醒、查行程、控制設備。
- 若牽涉設備控制，先確認目標設備與狀態。
- 執行後提供簡短回饋與可復原選項。

## UX 規則
- AI 回覆要短、清楚、可操作。
- 高影響操作需二次確認，例如「關閉所有燈」。
- 不確定設備或時間時，AI 應追問而不是猜測。

## Responsive 規則
- Desktop：對話區可與 Context Panel 並排。
- Tablet：對話區為主，Context Panel 可折疊。
- Mobile：全螢幕對話，底部輸入列需避開 Bottom Nav。

## Stitch MCP 可理解描述
Create an AI assistant conversation screen for home management, with input bar, suggested actions, contextual cards for reminders and devices, calm non-sci-fi visual style.
