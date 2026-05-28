# ASSET_GUIDELINE

## 文件用途
定義 AI Life Assistant 的 Logo、icon、illustration、empty state image、Smart Home 情境圖片、AI Assistant 視覺元素與 Stitch / AI 生成素材規則。

本文件用於讓 Stitch、Cursor、Codex 或其他生成工具在產出素材時保持一致，不是單純圖片清單。

---

## 1. 整體視覺方向

AI Life Assistant 的素材應呈現日常智慧家庭感，視覺重點是安定、清楚、低干擾，而不是科幻展示。

### 可接受方向
- Apple Home inspired, but not copied。
- Soft Glassmorphism。
- Calm Technology。
- 日常智慧家庭感。
- 明亮但不刺眼。
- 夜間畫面低亮度、舒適。
- 生活化、可信任、安靜可靠。

### 不可接受方向
- 過度科幻。
- Cyberpunk / neon dashboard。
- 複雜 3D 中控室。
- 像純聊天機器人產品。
- 夜間畫面太刺眼。
- 過度可愛或幼態化的 mascot。
- 大量高飽和漸層與炫光。

---

## 2. App Logo 使用規則

### Logo 氣質
Logo 應傳達 AI 生活助理與智慧家庭的結合，適合出現在 Splash Screen、App Icon、Header 與設定頁中。

### 建議方向
- 簡潔幾何符號。
- 可包含 home、light、spark、assistant signal 等抽象元素。
- 不要直接使用機器人臉作為主 logo。
- Light / Dark Mode 都需清楚可辨識。

### 使用規則
- App icon 需在小尺寸下仍可辨識。
- Logo 不應依賴細小文字。
- 避免複雜陰影或過度透明。
- Dark Mode 下可使用柔和發光，但 glow 不應過強。

---

## 3. Icon Style

### 風格
- Rounded line icon 或 soft filled icon。
- 線條需清楚，不使用過細 stroke。
- 圖示語意需直覺，避免抽象到難以理解。

### 建議規格
- 常用 icon 尺寸：20px、24px、32px。
- Mobile bottom nav icon 建議 24px。
- Stroke 建議 1.75–2px。
- Active state 可使用 preset accent color。

### 圖示類型
- Home。
- Dashboard。
- AI Chat / Assistant。
- Notification / Reminder。
- Settings。
- Light。
- Air Conditioner。
- Sleep Mode。
- Calendar。
- Weather。
- Voice Input。

### 注意事項
- 不要只靠顏色表達狀態。
- Icon 需搭配 label 或 accessible name。
- Error / warning icon 不要過度警示化。

---

## 4. Illustration Style

### 風格方向
Illustration 應偏生活化、安靜、溫和，讓使用者感覺產品在協助整理生活，而不是監控生活。

### 建議元素
- 柔和的居家空間。
- 燈光、窗景、桌面、床邊、手機等日常物件。
- 抽象 AI 光點或柔和 assistant aura。
- Calendar、reminder、smart home device 的輕量視覺化。

### 避免
- 機器人角色過度擬人。
- 太像 SaaS dashboard 插畫。
- 太多人物群像。
- 強烈 futuristic control room。
- 高飽和 neon cyber style。

---

## 5. Empty State Image Style

### 使用情境
- 沒有提醒。
- 沒有連接設備。
- 沒有通知。
- 搜尋無結果。
- Calendar 尚未同步。

### 風格
- 小尺寸、低干擾。
- 使用 soft glass / light object。
- 情緒要安定，不要讓空狀態像錯誤。

### 文案搭配
Empty state image 需搭配簡短說明與 CTA。

範例：
```text
今天沒有新的提醒。
你可以放心安排自己的節奏。
```

```text
還沒有連接智慧設備。
連接後，你可以在這裡快速控制燈光與情境模式。
```

---

## 6. Smart Home 情境圖片規則

### 使用場景
- Home Dashboard smart home summary。
- Smart Home Control 模組。
- Sleep Environment。
- Device onboarding。

### 圖片方向
- 真實但簡化的居家空間。
- 低亮度臥室、客廳、桌面、燈光控制。
- 智慧燈具、空調、門鎖等可用抽象 icon 或簡化 3D object 表示。

### 夜間場景
- 使用低亮度背景。
- 避免大面積純白燈光。
- 燈光 glow 需柔和，不能刺眼。
- 適合 Sleep Mode、關燈、放鬆音樂等情境。

---

## 7. AI Assistant 視覺元素規則

AI Assistant 不應被設計成傳統聊天機器人頭像，而應是產品中的智慧輔助層。

### 可用元素
- 柔和光點。
- Subtle orb。
- Small assistant spark。
- Calm gradient aura。
- 語音波形的低調版本。
- Context-aware suggestion chips。

### 避免元素
- 大型機器人臉。
- 科幻全息投影。
- 強烈 AI brain / circuit board。
- 過度擬人的客服角色。

### 使用規則
- AI 視覺元素應輔助內容，不搶走主要資訊。
- 在 Dark Mode 中 glow opacity 需降低。
- 在提醒與睡眠場景中，AI 視覺需更低調。

---

## 8. Stitch / AI 生成素材 Prompt 規則

### Prompt 必須包含
- Product context：AI Life Assistant, calm smart home assistant。
- Style：soft glassmorphism, Apple Home inspired, calm technology。
- Mode：Light Mode or Dark Mode。
- Scene：home dashboard, reminder, sleep environment, smart home control 等。
- Constraint：no cyberpunk, no neon, no complex sci-fi dashboard。

### Light Mode Prompt 範例
```text
Create a calm light mode illustration for AI Life Assistant, a smart home lifestyle assistant. Use soft glassmorphism, frosted white surfaces, gentle morning light, subtle mint and blue accents, Apple Home inspired but not copied. The scene should feel daily, premium, readable, and low-distraction. Avoid neon, cyberpunk, robot mascot, and complex 3D dashboard.
```

### Dark Mode Prompt 範例
```text
Create a dark mode illustration for AI Life Assistant sleep environment. Use deep navy background, soft glass panels, subtle mint glow, low brightness smart home lighting, and calm night atmosphere. The image should feel quiet and comfortable for bedtime. Avoid bright neon, sci-fi control room, harsh contrast, and overly glowing elements.
```

### Empty State Prompt 範例
```text
Create a small empty state illustration for no reminders today. Use calm lifestyle style, soft glassmorphism, minimal objects, gentle light, and reassuring mood. It should feel peaceful, not like an error. Avoid warning symbols, robots, neon, and clutter.
```

---

## 9. 圖片比例建議

| 用途 | 建議比例 | 建議尺寸 | 說明 |
|---|---:|---:|---|
| Desktop Hero | 16:9 或 21:9 | 1440×810 / 1920×820 | 用於首頁或大型展示區 |
| Mobile Screen | 9:16 | 1080×1920 | 用於手機畫面、onboarding |
| Card Illustration | 4:3 或 1:1 | 800×600 / 800×800 | 用於模組卡片與摘要卡 |
| Empty State | 1:1 或 4:3 | 640×640 / 800×600 | 小型低干擾插圖 |
| App Icon | 1:1 | 1024×1024 | 需可縮小辨識 |
| Wide Dashboard Background | 16:6 | 1600×600 | 只作背景氛圍，不放重要文字 |

---

## 10. Light Mode / Dark Mode 圖片注意事項

### Light Mode
- 明亮但不刺眼。
- 背景可有柔和漸層，但不可影響文字可讀性。
- White glass surface 需保留清楚邊界。
- 不要讓高光與卡片混在一起。

### Dark Mode
- 保持低亮度。
- Glow 必須收斂。
- 不使用大面積純黑搭配純白強對比。
- 夜間智慧家庭圖片需呈現舒適與安定，不是科技感壓迫。

---

## 11. 檔案命名建議

### 命名格式
```text
[screen-or-module]_[asset-type]_[mode]_[version].[ext]
```

### 範例
```text
home_hero_light_v1.png
home_hero_dark_v1.png
reminder_empty_light_v1.png
sleep_environment_card_dark_v1.png
smart_home_device_icon_light_v1.svg
```

### 規則
- 使用英文小寫與底線。
- mode 使用 `light` / `dark`。
- version 使用 `v1`, `v2`。
- 不要使用空格或模糊名稱，例如 `final-final.png`。

---

## 12. Stitch MCP 可理解描述

Generate assets for AI Life Assistant with a calm smart home lifestyle direction. Use Apple Home inspired soft glassmorphism, calm technology, daily home scenarios, readable composition, and light/dark mode compatibility. Avoid cyberpunk, neon, robot mascot, pure chatbot identity, overly futuristic dashboard, and bright night scenes. Assets should support Home, Reminder, Smart Home, Sleep Environment, and AI Assistant modules with consistent visual language.
