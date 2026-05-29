# AI_ASSISTANT

## 文件用途
定義 AI Assistant 畫面的內容結構與互動行為。

## 初版規格
- 主要區塊：Conversation Area、Suggested Actions、Input Bar、Context Cards。
- Suggested Actions 目前可對齊現行畫面：`我想早起`、`關燈`、`提醒生活`。
- Input placeholder 目前固定為 `AI Ask anything`。
- Categories chips 目前為 `個人`、`家庭`、`工作`，並可置於 Ask AI 大區塊外。
- Context Cards 顯示 AI 可操作或引用的提醒、設備、行程摘要。

## UX 規則
- 對話以任務完成為中心，不做無必要長篇回答。
- 控制智慧家電前需確認設備與狀態。
- 高影響操作要有確認與撤銷。

## Responsive 規則
- Desktop：Conversation + Context Panel。
- Tablet：Context Panel 可摺疊。
- Mobile：Ask AI 由 floating entry 進入；聊天輸入列固定底部但需高於 Bottom Nav 與 safe area。

## Stitch MCP 可理解描述
AI Assistant screen with calm chat UI, suggested action chips, context cards for reminders and smart home devices, soft glass surfaces, non-sci-fi style.


## Visual Rules
- Light Mode 使用 softened Atmospheric Glassmorphism，並以現行藍色漸層 CTA、白字、白 icon 為主，避免純黑與大面積死黑。
- Dark Mode 先保留既有 stable Nocturnal Clarity system。
- `New Chat` 與 `Ask AI` 固定英文；其他介面文字以繁體中文為主。
