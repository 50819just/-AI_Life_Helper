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
- `DESIGN_SYSTEM_RULES.md` 只作為產品氣質、元件、responsive、i18n 與限制規則。
- 保持 Apple Home inspired，但避免直接複製。
- AI 生活助理感要安定、清楚、低干擾。
- 不要生成過度科幻、neon、複雜 3D 或高亮 dashboard。
- 智慧燈光控制需要夜間低亮度版本。

## Flow 分段規則
- PART 1：只處理 Splash、Home Dashboard、Dashboard Overview、AI Chat Center、Settings、Module Library。
- PART 2：只處理 Tomorrow Briefing、Smart Home Control、AI Life Reminder 三個模組內部流程。
- 交給 Stitch 生成畫面時，不要一次把 PART 1 和 PART 2 全部塞進同一個 prompt，避免畫面資訊過載。

## Responsive 規則
- 每次生成至少考慮 Desktop 1440、Tablet 1024、Mobile 375。
- 若使用 Bottom Navigation，需先在 prompt 指定版本：
  - Part 1 完整導覽：Home、Dashboard、AI Chat、Notification、Settings。
  - MVP 核心任務導覽：Home、AI Assistant、Smart Home、Reminder。
- 不要讓 Stitch 自行混合兩套 Bottom Navigation。

## Stitch MCP 可理解描述
Use Stitch presets as the primary design system token source. For Light Mode, follow Atmospheric Glassmorphism. For Dark Mode, follow Nocturnal Clarity. Use DESIGN_SYSTEM_RULES only as product tone, component, responsive, i18n, and safety constraints. Generate calm responsive AI smart home product screens with soft glassmorphism, readable hierarchy, and low-distraction lifestyle UI.
