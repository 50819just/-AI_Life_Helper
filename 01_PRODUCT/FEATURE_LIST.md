# FEATURE_LIST

## 文件用途
列出 MVP 需要優先支持的功能模組，幫助產品、設計與開發確認初版範圍。

## 初版規格
- Home / Dashboard（合併首頁）：AI Greeting、Ask AI input、今日摘要、智慧家庭快捷控制、提醒預覽、三個正式模組入口。
- Ask AI / AI Assistant：自然語言詢問、生活建議、提醒建立、家電控制意圖理解；mobile 以 floating entry 進入，不放 bottom nav。
- Smart Home：設備列表、房間分類、燈光控制、On / Off 狀態、夜間操作。
- AI Life Reminder：今日提醒、睡前提醒、喝水提醒、久未移動提醒、行程提醒、personal checklist、completed / missed / paused states。
- Settings：Mobile Bottom Nav 第四項；包含帳號、偏好、主題、設備連線設定。

## UX 規則
- 每個功能入口需避免資訊過載。
- 使用者需要可以從 Home 快速完成最常用任務。
- 危險或影響環境的操作，例如關閉大量設備，需有清楚狀態回饋。

## Responsive 規則
- Mobile Bottom Nav 固定四項：Home、Devices、Tasks、Settings。
- Settings 固定為 mobile bottom nav 第四項；desktop 可由 sidebar bottom utility、右上角 icon 或 profile card 進入。
- Desktop 可使用側邊導覽或頂部導覽，但需保留核心四模組一致性。

## Stitch MCP 可理解描述
產生一套生活 AI 產品資訊架構，以 Home / Dashboard（合併首頁）為中心連到三個正式 demo modules：明日簡報、智慧家庭控制、AI 生活提醒。Mobile bottom nav 使用 Home / Devices / Tasks / Settings，Ask AI 以獨立 floating entry 進入。

## i18n / 中英切換
- MVP 需支援繁體中文 / English 兩種語言。
- Settings 需提供 Language / 語言切換按鈕或選項。
- 架構上需保留擴充多國語系能力，但初版不要加入超出中英以外的語言選項。
- 中英切換需套用於：Bottom Navigation、Settings、Home cards、Reminder、Smart Home、AI Chat 介面文案。
