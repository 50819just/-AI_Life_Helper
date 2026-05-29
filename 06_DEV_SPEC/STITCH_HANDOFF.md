# STITCH_HANDOFF

## 文件用途
整理交給 Stitch MCP 生成畫面前需要遵守的描述格式、設計系統來源與限制。

## Stitch-first 設計系統來源
- Design rules：`03_DESIGN_SYSTEM/DESIGN_SYSTEM_RULES.md`
- Light Mode preset：`03_DESIGN_SYSTEM/STITCH_PRESET_ATMOSPHERIC_GLASSMORPHISM_LIGHT_MODE.md`
- Dark Mode preset：`03_DESIGN_SYSTEM/STITCH_PRESET_NOCTURNAL_CLARITY_DARK_MODE.md`
- 元件規則：`03_DESIGN_SYSTEM/COMPONENT_RULE.md`
- 字體與 spacing：`03_DESIGN_SYSTEM/TYPOGRAPHY_SPACING.md`
- Responsive：`06_DEV_SPEC/RESPONSIVE_RULE.md`
- UI screen：`04_UI_SCREEN/`
- Flow split：`02_UX_FLOW/PART_1_HOME_DASHBOARD_MODULE_LIBRARY_FLOW.md`、`02_UX_FLOW/PART_2_MODULE_FLOW.md`

## 核心原則
- 以 Stitch preset 作為主要視覺 token source。
- 不要另外生成一套和 Stitch preset 競爭的色票。
- Light Mode 使用 Atmospheric Glassmorphism preset。
- Dark Mode 使用 Nocturnal Clarity preset。
- 目前生成順序一律 **Light Mode first**；Dark / Night / Nocturnal 版本只有在 Light 版確認通過、且明確要求後才處理。
- `DESIGN_SYSTEM_RULES.md` 只作為產品氣質、元件、responsive、i18n 與限制規則。
- 保持 Apple Home inspired，但避免直接複製。
- AI 生活助理感要安定、清楚、低干擾。
- 不要生成過度科幻、neon、複雜 3D 或高亮 dashboard。
- 智慧燈光控制需要夜間低亮度版本。

## Flow 分段規則
- PART 1：只處理 Splash、Home / Dashboard（合併首頁）、Ask AI / AI Chat Center、Settings、Module Library。
- PART 2：只處理 Tomorrow Briefing、Smart Home Control、AI Life Reminder 三個模組內部流程。
- 交給 Stitch 生成畫面時，不要一次把 PART 1 和 PART 2 全部塞進同一個 prompt，避免畫面資訊過載。

## Responsive 規則
- 每次生成至少考慮 Desktop 1440、Tablet 1024、Mobile 375。
- Mobile Bottom Navigation 固定使用：Home、Devices、Tasks、Settings。
- Ask AI 是獨立 floating button / floating input entry，不放進 bottom navigation。
- Desktop 使用 left sidebar；第一個主要 action 固定為 `New Chat`，首頁入口現行為 `Dashboard`。
- 不要讓 Stitch 自行混合 Dashboard / AI Chat / Notification 版本。

## Stitch MCP 可理解描述
Use Stitch presets as the primary design system token source. For Light Mode, follow Atmospheric Glassmorphism. For Dark Mode, follow Nocturnal Clarity. Use DESIGN_SYSTEM_RULES only as product tone, component, responsive, i18n, and safety constraints. Generate calm responsive AI smart home product screens with soft glassmorphism, readable hierarchy, and low-distraction lifestyle UI.

### Current Generation Priority
Generate Light Mode screens first by default. Do not generate Dark Mode, Night Mode, or Nocturnal variants unless the Light Mode screen has been approved and the user explicitly asks for a dark version.


## Confirmed Home References

```txt
Desktop Home screen:
https://stitch.withgoogle.com/projects/8270097307517936032?node-id=d14af8a5673d4fe4b04ff39151a18759
Screen ID: d14af8a5673d4fe4b04ff39151a18759

Mobile Home screen:
https://stitch.withgoogle.com/projects/8270097307517936032?node-id=e4d9ae36311c4cdd87959fc9792ce26a
Screen ID: e4d9ae36311c4cdd87959fc9792ce26a
```

Use these as the nearest approved Home direction. Do not create a new Stitch project.

## Existing Stitch Project Visual Source
- Existing Stitch project：`https://stitch.withgoogle.com/projects/8270097307517936032`。
- Project ID：`8270097307517936032`。
- 後續若要沿用既有設計，優先以上方 confirmed Desktop / Mobile Home screen 的 Light Mode 視覺、字體大小、卡片比例與 glassmorphism 強度為主。
- 目前此 project 在介面上可能較卡；不要依賴使用者未看見的 `Night Dashboard / Nocturnal` 名稱作為操作前提。若要找參考，優先使用使用者明確提供的 screen URL / node-id。
- 本地 specs 仍作為產品範圍、module flow、navigation 與 generation boundary 的依據。
- 詳細歸位與使用策略見：`06_DEV_SPEC/STITCH_EXISTING_PROJECT_AUDIT.md`。
- 不要再任意新建新的 Stitch project 或讓 Stitch 發明新的 design system 名稱，除非明確要求重新探索。




## Current Generated Core Screens

Use these screens as the current working set for the Light Mode demo flow.

```txt
Refined Desktop Home:
https://stitch.withgoogle.com/projects/8270097307517936032?node-id=bda8c58535a74f9b8d4b2760c2e92683
Screen ID: bda8c58535a74f9b8d4b2760c2e92683

Tomorrow Briefing / 明日簡報 detail:
https://stitch.withgoogle.com/projects/8270097307517936032?node-id=b8c5c55b800740b6898acbc756b0e5dd
Screen ID: b8c5c55b800740b6898acbc756b0e5dd

Smart Home Control / 智慧家庭控制 detail:
https://stitch.withgoogle.com/projects/8270097307517936032?node-id=5f1ba0c0ade24ef986318a0ced7a4042
Screen ID: 5f1ba0c0ade24ef986318a0ced7a4042

AI Life Reminder / AI 生活提醒 detail:
https://stitch.withgoogle.com/projects/8270097307517936032?node-id=adadd1a4e18e4294ab9f672cef1d65bb
Screen ID: adadd1a4e18e4294ab9f672cef1d65bb
```

Note: keep using Refine / Generate variants, not broad Reimagine, unless explicitly exploring a new direction.

## Paste-ready Stitch Prompt: Tomorrow Briefing Detail Page

```txt
Use existing Stitch project 8270097307517936032. Do not create a new project.
Create one Light Mode screen only: Tomorrow Briefing / 明日簡報 detail page.
Style must continue the confirmed Home direction: Atmospheric Glassmorphism Light Mode, warm white, pale mint, soft teal, soft blue, lavender / blue shadow, and restrained obsidian text.

This is a Product-like Demo Prototype, not a full calendar SaaS.
Tomorrow Briefing is a bedtime tomorrow-preparation flow.
Core question: 我現在可以安心睡了嗎？明天準備好了嗎？

Desktop rules:
- Keep the left sidebar app shell consistent with Home.
- Sidebar first primary action is New Chat. Keep New Chat in English.
- Keep Ask AI in English when it appears, but do not place it in the desktop sidebar primary nav.
- Other interface copy should mainly use Traditional Chinese.
- Sidebar bottom appearance control is a solid pill button labeled 亮色模式. Do not use a sliding toggle.

Mobile rules if a mobile version is generated:
- No left sidebar.
- Bottom nav fixed to Home / Devices / Tasks / Settings.
- Ask AI is an independent floating button / floating input entry, not inside bottom nav.

Tomorrow Briefing content:
- Header: 明日簡報
- Bedtime reassurance summary: 明天準備好了，可以放心休息
- Tomorrow first important event card
- AI suggested wake-up time card
- One-tap alarm setup CTA
- Tomorrow preparation checklist
- Completion / ready-for-rest state

Do not create:
- full calendar dashboard
- calendar SaaS
- productivity analytics
- full task manager
- dark mode
- extra coming soon module pages

Generate only one screen in this pass.
```


## Light Mode Color Guardrails

When generating or refining Stitch screens, do not rely blindly on the Atmospheric Glassmorphism default black tokens.

Use this softened Light Mode palette:
- warm white background
- pale mint ambient glow
- soft teal accents
- soft blue translucent surfaces
- lavender / blue shadows
- misty glass cards
- obsidian / slate text only for readable typography

Avoid:
- pure black `#000000`
- large dead-black surfaces
- black sidebar background
- black module cards
- huge black primary buttons
- high-saturation green

Preferred dark values, only when needed:
- `#1E293B`
- `#334155`

Primary CTAs should be soft teal / pale mint glass buttons with slate text, not heavy black blocks.

## Dark Mode Stability Lock

Dark Mode should keep using the existing Stitch / Nocturnal Clarity system as the stable source of truth. Do not soften Dark Mode into the Light palette.

Dark UI direction:
- Source: `03_DESIGN_SYSTEM/STITCH_PRESET_NOCTURNAL_CLARITY_DARK_MODE.md`
- Keep deep navy / nocturnal glass structure.
- Keep mint glow restrained and readable.
- Avoid neon, cyberpunk, high-saturation glow, or random black blocks.
- Tomorrow's Dark UI pass should refine screens from the stable Nocturnal Clarity system, not invent a new dark design system.
