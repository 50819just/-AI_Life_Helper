# ACCESSIBILITY_RULE

## 文件用途
定義 AI Life Assistant 的可讀性、操作性、手機易用性、Light / Dark 舒適度與 i18n accessibility 基本規則。

## Core Accessibility Rules
- 主要文字需達到足夠對比，但 Light Mode 不使用純黑作為大面積視覺元素。
- Light Mode 文字建議使用 softened slate / obsidian：`#1E293B`、`#334155`。
- 不只依賴顏色表示 On / Off / Completed / Missed / Paused。
- 所有互動元件需有 hover、focus、pressed、disabled 狀態。
- 動畫不可閃爍；避免夜間或睡前場景刺激。
- Error 不做大面積紅色警示，使用 icon、文字、細邊框或小 badge 提示。

## Mobile Usability
- Mobile 需支援單手操作。
- Touch target 不低於 44px，主要 CTA 建議 48px。
- Bottom nav icon 必須搭配 label。
- Floating Ask AI 不得遮住 bottom nav、主要 CTA 或 checklist item。
- 底部固定元素需考慮 safe-area bottom padding。
- 滑桿、toggle、checkbox 的 hit area 要大於視覺尺寸。

## Navigation Accessibility
- Mobile bottom nav 固定四項：`Home / Devices / Tasks / Settings`。
- Ask AI 是獨立 floating entry，不放 bottom nav。
- Dashboard / Notification 不作 mobile bottom nav item。
- Settings 是 mobile bottom nav 第四項；desktop 可放 sidebar bottom utility 或 profile menu。

## Module Accessibility

### Tomorrow Briefing
- 鬧鐘 CTA 必須明確可點擊，不使用過小文字連結。
- Completion state 要清楚表達「可以放心休息」，避免過度遊戲化。

### Smart Home Control
- 智慧家庭控制需要明確狀態文字。
- On / Off / Processing / Error 不只靠顏色。
- 高影響操作如全部關燈需有清楚回饋或確認。

### AI Life Reminder
- 提醒與錯過狀態應溫和但清楚。
- Missed 不要呈現為責備，應提供延後、完成、忽略一次等恢復動作。

## Light / Dark Accessibility
- Light UI：softened Atmospheric Glassmorphism，避免純黑、大面積死黑、黑色 sidebar、黑色卡片。
- Dark UI：使用 stable Nocturnal Clarity system，保持低亮度、可讀、低刺激。
- Dark Mode 不等於 neon / cyberpunk；mint glow 必須克制。

## i18n / Localization Accessibility
- 語言切換控制需有清楚 label，例如「語言 / Language」。
- MVP 初版只顯示：繁體中文、English。
- 中英文文案長度不同，元件需允許文字換行或彈性寬度，避免截斷重要資訊。
- 不要只用國旗代表語言，需搭配文字標籤：繁體中文、English。
- i18n key 命名需語意清楚，避免使用畫面位置作為唯一命名依據。

## Stitch MCP 可理解描述
Design accessible AI Life Assistant screens with readable slate text, clear labels, focus states, 44–48px touch targets, mobile safe-area spacing, visible bottom navigation labels, independent floating Ask AI, and clear device/reminder states. Light Mode avoids pure black and heavy black surfaces. Dark Mode uses the stable Nocturnal Clarity system with low-brightness comfort.
