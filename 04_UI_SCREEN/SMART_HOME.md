# SMART_HOME

## 文件用途
定義 Smart Home Control / 智慧家庭控制畫面的設備控制、AI 建議情境、簡易場景與 responsive 呈現。

## 定位
Smart Home Control 是三個正式 Demo Modules 之一。它展示基本智慧家庭控制，不是完整智慧家庭平台，也不是 automation builder。

## 主要區塊
1. Page Header
   - 智慧家庭控制
   - 副標：用 AI 幫你快速調整家裡的光線與情境
   - Context chip：客廳 · 臥室 · 睡前模式可用

2. AI Recommended Scene
   - AI 建議情境
   - 例如：晚間放鬆
   - 說明：建議將客廳燈調至 45%，色溫偏暖，降低睡前刺激。
   - CTA：套用建議

3. Device Dashboard
   - 客廳主燈：開啟 / 亮度 / 色溫
   - 臥室燈：開啟 / 亮度 / 色溫
   - 書桌燈：關閉
   - 空調（可選）

4. Lighting Controls
   - Brightness slider
   - Color temperature slider
   - Selected room / device

5. Simple Scenes
   - 專注
   - 放鬆
   - 睡前 / Sleep Mode
   - 全部關燈

6. Sleep Mode Mini Section
   - Sleep Environment 是子情境，不是整個 module。
   - 可示範關閉高亮設備、保留柔和夜燈。

## UX 規則
- 切換設備後需顯示 Processing，避免使用者重複點擊。
- Off 狀態仍需可辨識。
- On / Off 不只靠顏色，需搭配文字或 icon。
- 高影響操作，例如全部關燈，需有清楚狀態回饋或簡短確認。
- 不生成完整 automation builder、security dashboard 或大量設備分類。

## Responsive 規則
- Desktop：left sidebar + main content；AI recommendation 與 device dashboard 可並排。
- Tablet：AI recommendation 置頂，設備卡 2 欄。
- Mobile：單欄；AI recommendation → device cards → lighting controls → scenes。
- Mobile slider thumb 與 tap target 要易點擊，至少 44px hit area。
- Mobile active nav item：Devices。
- Ask AI 使用 floating entry，不放 bottom nav。

## Visual Rules
- Light Mode 使用 softened Atmospheric Glassmorphism：warm white、pale mint、soft teal、soft blue、lavender / blue shadow。
- 不用純黑、大面積死黑、黑色 sidebar、黑色 device cards、高飽和綠色。
- Dark Mode 明天使用 stable Nocturnal Clarity system，不在 Light pass 混用。

## Stitch MCP 可理解描述
Create a Smart Home Control screen for AI Life Assistant in Light Mode. Use a light glass sidebar on desktop, no black surfaces, no automation builder. Include AI recommended scene, device dashboard, light on/off, brightness, color temperature, simple scenes, and Sleep Mode as a sub-scenario. Mobile uses bottom nav Home / Devices / Tasks / Settings with Ask AI as a floating entry.
