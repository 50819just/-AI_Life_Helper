# STITCH_EXISTING_PROJECT_AUDIT

## 文件用途
記錄既有 Stitch project 的使用策略與畫面歸位方式，避免後續重複新建專案或讓 Stitch 重新發明視覺語言。

## Existing Stitch Project

```txt
Project URL: https://stitch.withgoogle.com/projects/8270097307517936032
Project ID: 8270097307517936032
```

## 核心決策

目前設計策略調整為：

```txt
既有 Stitch project = 視覺 source of truth
本地 specs = 產品架構 / flow / scope / navigation / 內容邊界
```

也就是：

- 顏色、字體大小、卡片比例、玻璃質感、Light / Dark mode 視覺感：優先參考既有 Stitch project。
- 三個正式 Demo Module、Coming Soon、Mobile bottom navigation、不要展開完整商業產品：依照本地 specs。
- 不再新建一套獨立視覺系統，不再讓 Stitch 重新命名或發明新的 design system。
- 目前實作順序一律 **先做亮色版**；Dark / Night / Nocturnal 以既有 Nocturnal Clarity 作為穩定 system，亮色版確認後接續處理。
- `8270097307517936032` 在 Stitch 介面中可能較卡，不要把使用者看不到的 screen 名稱當成已可操作狀態。

---

## Visual Source of Truth

既有 Stitch project 內已有多種視覺方向，但後續生成或修正畫面時，預設先沿用 Light Mode 視覺。Dark Mode 是後續正式 UI pass，使用既有 Nocturnal Clarity 穩定 system，不另創新的 dark design system。

### Light Mode
可參考既有畫面中：

- Refined Light Dashboard
- Home Index Hub
- Mobile Dashboard / Light variants
- Lumina / Liquid Glass 類型中較乾淨、可讀性高的版本

Light mode 視覺原則：

- 明亮但不刺眼
- Soft / Liquid / Atmospheric Glassmorphism
- 卡片透明但文字清楚
- 保持生活型 AI 產品感，不要變成 SaaS dashboard

### Dark Mode / Nocturnal Clarity（穩定系統，下一輪生成）
可參考既有畫面中：

- Night Dashboard
- Nocturnal Clarity variants
- Night AI Chat
- Night Reminders Checklist
- Sleep Detail

Dark mode 視覺原則：

- 低亮度
- 深藍 / 深色玻璃層次
- 柔和 mint glow
- 適合夜間、睡前與智慧家庭控制
- 不要 neon、不要 cyberpunk、不要刺眼高光

> 操作注意：Dark UI 明天以 Nocturnal Clarity 穩定系統接續；不要重發明暗色設計，也不要把 Light 的柔和配色硬套進 Dark。

---

## Screen Repositioning Strategy

| Existing Stitch Screen 類型 | 新定位 | 處理方式 |
|---|---|---|
| Home Index Hub / Dashboard | Home / Dashboard（合併首頁） 正式入口 | 從 Light 候選中挑主版，對齊現行首頁 |
| Mobile Dashboard | Mobile Home candidate | 保留作 mobile 參考，檢查 bottom nav |
| Night Dashboard | Dark Mode Home candidate | 保留作 dark mode 視覺參考 |
| AI Schedule Secretary | Tomorrow Briefing | 改名 / 對齊 Tomorrow Briefing spec |
| Smart Home Control Hub | Smart Home Control | 保留為正式 Demo Module 候選 |
| Sleep Detail | Sleep Environment scenario | 降級為 Smart Home Control 子情境 |
| AI Life Reminder Assistant | AI Life Reminder | 保留為正式 Demo Module 候選 |
| Night Reminders Checklist / Checklist | Personal Reminders scenario | 降級為 AI Life Reminder 子情境 |
| AI Chat variants | AI Assistant / AI Chat Entry | 保留，但需統一 Light / Dark 與 nav；desktop sidebar 不放成 primary nav |
| Settings variants | Settings secondary page | 保留，但 Settings 不放 mobile bottom nav |
| Splash Screen | Splash / Welcome | 可保留作產品開場 |
| Dashboard Analytics Overview | 風險畫面 | 若太像 BI / SaaS dashboard，避免當主版 |
| 簡體中文 variants | 語言風險 | 初版以繁體中文 / English 為主，簡體版不可當主交付 |

---

## Keep / Refine / Scenario / Avoid

### Keep as primary candidates
- Home Index Hub（繁體中文或較乾淨版本）
- Refined Light Dashboard
- Smart Home Control Hub（繁體中文優先）
- AI Life Reminder Assistant（繁體中文優先）
- AI Schedule Secretary（繁體中文優先）

### Keep as scenario references
- Sleep Detail
- Night Reminders Checklist
- Checklist

### Keep as secondary pages
- AI Chat Center / AI Chat variants
- Settings / AI Personalization variants
- Splash Screen & Welcome

### Avoid as primary if too broad
- Dashboard Analytics Overview
- 太像 SaaS / BI dashboard 的版本
- 太多簡體中文的版本
- 過度 Liquid Glass、影響可讀性的版本

---

## Generation Boundary for Existing Stitch Project

後續如果要用 MCP 修改或生成 variants，請遵守：

```txt
Use the existing Stitch project visual language as the primary visual reference.
Do not create a new visual identity.
Do not create a new design system name.
Do not expand demo modules into full commercial product systems.
Only refine the selected screen or selected module.
Keep Coming Soon modules as disabled or preview cards only.
```

---

## Relation to Local Specs

### Visual follows Stitch
- 顏色
- 字體大小
- 卡片比例
- Glassmorphism 強度
- Light / Dark mode 感覺

### Scope follows local specs
- `specs/00_PROJECT/DEMO_SCOPE.md`
- `specs/00_PROJECT/GENERATION_BOUNDARY.md`
- `specs/01_CORE/HOME_DASHBOARD.md`
- `specs/01_CORE/NAVIGATION_RULES.md`
- `specs/02_MODULES/TOMORROW_BRIEFING.md`
- `specs/02_MODULES/SMART_HOME_CONTROL.md`
- `specs/02_MODULES/AI_LIFE_REMINDER.md`

---

## Recommended Next Step

不要再新建 Stitch project。

下一步應該是：

1. 在既有 project `8270097307517936032` 中挑選 Home 的 Light 主候選。
1.5. 第一輪只挑 Light Mode 候選；Dark / Night 候選先不要處理。
2. 檢查是否符合 mobile bottom navigation：

```txt
Home / Devices / Tasks / Settings
```

3. 再依序挑選三個正式 Demo Module 的主候選：
   - Tomorrow Briefing
   - Smart Home Control
   - AI Life Reminder
4. 最後才做 refine，不要一次生成全部。
