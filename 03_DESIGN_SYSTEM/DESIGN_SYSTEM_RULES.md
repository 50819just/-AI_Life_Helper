# DESIGN_SYSTEM_RULES

## 文件用途
此文件是 NestBuddy 的設計系統總規則，負責定義 Stitch preset 的使用方式、產品氣質限制、元件規則與 responsive 原則。

本專案的視覺 token 以 Stitch preset 為主；此文件不再另外定義一套獨立色票，避免 Light / Dark mode token 互相干擾。

---

## Source of Truth

### 主要視覺來源
- Light Mode：`03_DESIGN_SYSTEM/STITCH_PRESET_ATMOSPHERIC_GLASSMORPHISM_LIGHT_MODE.md`
- Dark Mode：`03_DESIGN_SYSTEM/STITCH_PRESET_NOCTURNAL_CLARITY_DARK_MODE.md`

### 輔助規則來源
- `03_DESIGN_SYSTEM/COMPONENT_RULE.md`：元件與互動規則
- `03_DESIGN_SYSTEM/TYPOGRAPHY_SPACING.md`：字體階層與 spacing 原則
- `06_DEV_SPEC/RESPONSIVE_RULE.md`：Desktop / Tablet / Mobile 響應式規則
- `06_DEV_SPEC/ACCESSIBILITY_RULE.md`：可讀性、觸控與 i18n accessibility 規則

---

## Stitch-first 使用規則

### 1. Light Mode
- 使用 `STITCH_PRESET_ATMOSPHERIC_GLASSMORPHISM_LIGHT_MODE.md` 作為 light mode 的主要 token 來源。
- 採用 softened Atmospheric Glassmorphism：warm white、pale mint、soft teal、soft blue、lavender / blue shadow。
- 避免純黑、大面積死黑、黑色 sidebar、黑色卡片與高飽和綠色。
- Obsidian / slate 只用於文字、icon 或小面積 emphasis。

### 2. Dark Mode
- 使用 `STITCH_PRESET_NOCTURNAL_CLARITY_DARK_MODE.md` 作為 dark mode 的主要 token 來源。
- Dark / Nocturnal Clarity 目前是穩定 system，明天的 Dark UI pass 以此為 source of truth。
- 可使用 deep navy background、restrained mint glow、pale frost secondary、glass surface layers。
- 夜間與睡眠場景要保持低亮度，不要做成高亮 neon、科幻 dashboard 或新的暗色設計系統。

### 3. 不要混用兩套 token
- 不要在同一個畫面同時混用 Light preset 與 Dark preset 的背景 / surface / primary token。
- Light Mode 與 Dark Mode 可共用元件結構，但色彩 token 必須依模式切換。
- 原本 `COLOR_SYSTEM.md` 僅作為歷史參考與產品限制，不作為 Stitch 主要 token source。

---

## Product Tone

NestBuddy 的畫面氣質需保持：
- 安定、日常、可靠
- Calm smart home assistant
- Apple Home inspired, but not copied
- Soft glassmorphism
- 高可讀性、低干擾
- 不過度科幻、不 neon、不做複雜 3D dashboard

AI 應像安靜可靠的生活助理，而不是強烈存在感的科技展示。

---

## Component Rules

### Card
- 使用 soft glass card。
- 圓角需柔和，建議 16–28px。
- 卡片需有清楚層級，但不要過度陰影。
- 卡片內距以 16–24px 為基準。

### Module Card
- 用於 Home / Module Library。
- 需包含：模組名稱、短描述、狀態摘要、進入提示。
- Coming Soon 模組需視覺降級，不可和可用模組同等強度。

### Device Card
- 用於 Smart Home Control。
- 需包含：設備名稱、房間、狀態、主要 toggle。
- On / Off 不可只靠顏色區分，需搭配文字或 icon。

### Reminder Item
- 需包含：提醒標題、時間、優先程度、完成狀態。
- 錯過提醒需溫和提示，不要用壓迫式警告。

### Bottom Navigation
- Mobile Bottom Navigation 固定四項：Home、Devices、Tasks、Settings。
- Ask AI / AI Assistant 不放在 bottom nav，使用獨立 floating button / floating input entry。
- Dashboard 是 Home 的 summary section，不是 mobile bottom nav item。
- Notification 可作為 badge / reminder state，不是 mobile bottom nav item。

---

## Responsive Rules

### Desktop 1440
- 可使用多欄 dashboard 與較完整資訊密度。
- 適合呈現 Home summary + Dashboard cards + Module Library。

### Tablet 1024
- 使用 2 欄卡片為主。
- 重要摘要置頂，次要模組往下排列。

### Mobile 375
- 單欄優先。
- Bottom navigation 需固定且清楚。
- Touch target 至少 44px。
- 不要塞入桌面版完整 dashboard。

---

## i18n Rules

- 架構需預留多國語系 i18n。
- MVP 初版只支援繁體中文與 English。
- Settings 需有 Language / 語言切換入口。
- 不要顯示其他語言，避免誤會已完整支援多國。
- 不要只用國旗表示語言，需搭配文字：繁體中文、English。

---

## Stitch Prompt Guidance

給 Stitch 生成畫面時，建議這樣指定：

```text
Use Stitch preset as the primary design system token source.
For Light Mode, follow STITCH_PRESET_ATMOSPHERIC_GLASSMORPHISM_LIGHT_MODE.md.
For Dark Mode, follow STITCH_PRESET_NOCTURNAL_CLARITY_DARK_MODE.md.
Use DESIGN_SYSTEM_RULES.md only as product tone, component, responsive, i18n, and safety constraints.
Do not create an additional color palette outside the Stitch presets.
Keep the UI calm, readable, lifestyle-oriented, and low-distraction.
```

## Dark Mode Stability Lock

Dark Mode should keep using the existing Stitch / Nocturnal Clarity system as the stable source of truth. Do not soften Dark Mode into the Light palette.

Dark UI direction:
- Source: `03_DESIGN_SYSTEM/STITCH_PRESET_NOCTURNAL_CLARITY_DARK_MODE.md`
- Keep deep navy / nocturnal glass structure.
- Keep mint glow restrained and readable.
- Avoid neon, cyberpunk, high-saturation glow, or random black blocks.
- Tomorrow's Dark UI pass should refine screens from the stable Nocturnal Clarity system, not invent a new dark design system.
