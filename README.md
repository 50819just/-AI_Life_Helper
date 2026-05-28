# AI Life Assistant / AI 生活小幫手

## 專案定位
AI Life Assistant 是一個結合 AI 助理、智慧家電控制、AI 提醒與行程管理的生活型產品。整體設計方向參考 Apple Home 的日常智慧家庭感，採用高可讀性、Soft Glassmorphism、Light / Dark Mode 與 Calm Technology 原則。

## Workspace 文件架構
- `01_PRODUCT/`：產品定位、核心功能與範圍
- `02_UX_FLOW/`：主要使用流程與任務路徑
- `03_DESIGN_SYSTEM/`：色彩、元件、排版與狀態規則
- `04_UI_SCREEN/`：畫面資訊架構與區塊規格
- `05_AI_PROMPTS/`：AI 助理與智慧家庭意圖理解提示詞
- `06_DEV_SPEC/`：Responsive、Accessibility 與開發交接規格
- `07_ASSETS/`：圖示、插圖、品牌與素材規則

## 初版設計原則
- 不過度科幻，讓 AI 像安靜可靠的生活助理。
- 智慧家電控制要支援夜間低亮度操作，尤其是關燈與 Dark Mode 情境。
- Mobile Bottom Navigation 僅放：Home、Devices、Tasks、Settings。
- Settings 是 mobile bottom function bar 第四項；desktop 也可從 sidebar bottom utility、Profile 或右上入口進入。

## Current Design Lock

- 目前只使用 Stitch project `8270097307517936032`，不要新建 project。
- 目前優先做 Light Mode；Dark Mode 明天接著做。
- Light Mode 採用 softened Atmospheric Glassmorphism：warm white、pale mint、soft teal、soft blue、lavender / blue shadow。
- 避免純黑、大面積死黑、黑色 sidebar、黑色卡片與高飽和綠色。
- Desktop 使用 left sidebar；Mobile 使用 bottom nav `Home / Devices / Tasks / Settings`。
- Ask AI 是獨立入口，不放入 mobile bottom nav。

## Stitch MCP 使用提醒
後續若要交給 Stitch MCP 產生 UI，請優先讀取 `04_UI_SCREEN/` 的畫面描述、`03_DESIGN_SYSTEM/` 的視覺規則，以及 `06_DEV_SPEC/RESPONSIVE_RULE.md` 的尺寸規格。

## GitHub Pages 展示設定

本專案使用 Vite，若部署到 GitHub Pages project site，production build 已在 `vite.config.js` 設定：

```js
base: command === 'build' ? '/-AI_Life_Helper/' : '/'
```

注意：若 GitHub repo 名稱不是 `-AI_Life_Helper`，需要同步調整 `vite.config.js` 的 `base` 路徑。

建議部署流程：

```bash
npm run build
```

GitHub Pages 可使用 GitHub Actions 部署 `dist/`，或依後續 repo 設定調整。`public/.nojekyll` 會在 build 時輸出到 `dist/.nojekyll`，避免 Pages 使用 Jekyll 處理靜態檔。

