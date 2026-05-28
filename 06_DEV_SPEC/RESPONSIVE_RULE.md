# RESPONSIVE_RULE

## 文件用途
定義 AI Life Assistant 在 Desktop、Tablet、Mobile 三種主要寬度下的版面、導覽、可點擊性與手機易用性規則。

## Current Source of Truth

目前專案是 Product-like Demo Prototype。Responsive 規則以「展示三個正式 demo modules」為主，不展開完整商業產品功能。

```txt
Desktop: left sidebar app shell
Tablet: compact two-column / adaptive cards
Mobile: bottom function bar + floating Ask AI
```

## Desktop — 1440px / 2560 Stitch Canvas
- Layout：12 欄 grid，內容主區保持寬鬆，不做高密度 SaaS dashboard。
- Navigation：使用 left sidebar 作為主要 app shell。
- Sidebar 第一個主要 action 固定為 `New Chat`，不翻譯。
- `Ask AI` 固定英文，不翻譯。
- Sidebar bottom appearance control 是實心 pill button：`亮色模式`。
- Home：Hi Darius greeting、Ask AI command bar、今日節奏 / 快速狀態、三個正式模組卡、低調 `更多模組 →`。
- Module detail：沿用 sidebar，只替換主內容區。

## Tablet — 1024px
- Layout：8 欄 grid 或 2 欄 card layout。
- Navigation：可用 compact sidebar / top app shell，但不得混入 Coming Soon modules 作為主導航。
- 重要資訊置頂：頁面標題、AI 建議、主要 CTA。
- 次要卡片往下排列，避免左右資訊過密。
- 控制項需保留 44px 以上觸控高度。

## Mobile — 375px
- Layout：單欄，左右安全邊距 16–20px。
- Navigation：固定 bottom function bar，四項為：

```txt
Home / Devices / Tasks / Settings
```

- Ask AI 是獨立 floating button / floating input entry，不放入 bottom nav。
- Bottom nav label 不省略；icon 必須搭配文字。
- 主要 CTA 需放在拇指容易觸及區域，避免貼到螢幕最底被系統手勢干擾。
- 底部固定元素需預留 safe-area bottom padding。
- 任何主要 tap target 不小於 44px；建議 48px。
- 卡片間距至少 12–16px，避免誤觸。
- 文字層級需比 desktop 更簡短，避免卡片塞滿說明文字。
- Home mobile 順序：Greeting → Ask AI floating entry → 今日狀態 → 三個正式模組 → `更多模組 →`。
- Module mobile 順序：Page title → AI suggestion / hero → primary action → core list / controls → completion state。

## Mobile Usability Rules
- 一屏只放一個主要決策，不要同時塞三個以上同權重 CTA。
- Floating Ask AI 不得遮住 bottom nav、主要 CTA 或 checklist item。
- Smart Home 控制需避免滑桿太細；亮度 / 色溫 slider 高度與 thumb 要容易拖曳。
- Reminder 完成 / 延後 / 暫停操作要清楚分開，避免誤按。
- Tomorrow Briefing 的鬧鐘 CTA 必須明確，不要藏在文字連結。
- Settings 在 mobile 是第四個 bottom nav item；不再視為隱藏次級入口。

## Color / Mode Behavior
- 目前 UI generation 一律 Light Mode first。
- Light Mode 使用 softened Atmospheric Glassmorphism：warm white、pale mint、soft teal、soft blue、lavender / blue shadow。
- 不得產生純黑、大面積死黑、黑色 sidebar 或黑色卡片。
- Dark Mode 明天再做；不得在 Light Mode pass 順手產 dark / night variant。

## Stitch MCP 可理解描述
Generate responsive screens for Desktop, Tablet, and Mobile. Desktop uses a light glass left sidebar with `New Chat` and a solid `亮色模式` pill. Mobile uses bottom navigation `Home / Devices / Tasks / Settings` and an independent floating `Ask AI` entry. Prioritize thumb-friendly tap targets, safe-area spacing, single-column clarity, and low cognitive load. Use softened Atmospheric Glassmorphism Light Mode and avoid pure black or heavy black surfaces.
