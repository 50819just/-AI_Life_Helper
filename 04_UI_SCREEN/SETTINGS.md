# SETTINGS

## 文件用途
定義 Settings 的內容範圍，並確認 Settings 是 mobile bottom function bar 第四項；desktop 可放 sidebar bottom utility 或 profile menu。

## 初版規格
- 入口：Mobile bottom nav 第四項、desktop sidebar bottom utility、Home 右上角、Profile、更多選單。
- 內容：帳號、主題模式、通知偏好、智慧設備連線、AI 偏好。
- Mobile 中屬於 Bottom Nav 核心四項之一；desktop 中不是 primary nav。

## UX 規則
- Settings 不應干擾日常快速任務。
- 主題與夜間低亮度偏好需容易找到。
- 設備連線錯誤需提供清楚修復方向。

## Responsive 規則
- Desktop 可作獨立設定頁。
- Tablet 使用分組卡片。
- Mobile 使用列表與分段頁。

## Stitch MCP 可理解描述
Settings screen is the fourth mobile bottom navigation item and a desktop sidebar bottom utility entry. Include theme, notification, account, device connection, language, and AI preferences.

## i18n / Language Setting
- Settings 需包含 Language / 語言設定區塊。
- 初版只提供兩個選項：繁體中文、English。
- 可用 segmented control、select row 或 toggle-style language button 呈現。
- 語言切換後需立即更新 UI 固定文案；若 AI 回覆語言另有設定，可放在 AI Personality / AI Preference 中補充。
- 不要在初版顯示其他語言，避免造成已支援多國語言的誤解。
