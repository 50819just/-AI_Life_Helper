# HOME

## 文件用途
定義 NestBuddy 首頁的資訊架構、主要區塊、UX 規則與 responsive 呈現。此文件供後續 UI 產生與 Stitch MCP 理解首頁需求。

## 初版規格
首頁包含以下 6 個主要區塊：

0. Header / Nav
   - 詳細規則集中在 `specs/01_CORE/APP_SHELL/`。
   - Home 只引用 app shell 規則，不在本檔重複定義。

1. AI Greeting
   - 顯示溫和問候，例如「早安，今天有 3 件事需要留意」。
   - 可附一行 AI 生活摘要。
   - 可加入時間 / 天氣 / 今日情境，例如「09:30 · 晴朗 · 今天適合先整理三件事」。

2. Ask AI
   - 顯示 `AI Ask anything` placeholder。
   - 顯示三個情境建議：`我想早起`、`關燈`、`提醒生活`。
   - 顯示分類 chips：`個人`、`家庭`、`工作`。
   - 與首頁內容整合，但不變成完整聊天頁。

3. Today Summary
   - 顯示今日行程、提醒、家庭狀態重點。
   - 現行卡片命名以 `環境 / 濕度`、`睡眠分析`、`快速動作` 為主。
   - 內容要短，適合一眼掃讀。

4. Smart Home Quick Control
   - 顯示常用設備，例如客廳燈、臥室燈、空調。
   - 支援 On / Off / Processing / Error 狀態。
   - 夜間關燈情境避免亮色突兀。

5. Module List
   - 顯示三個常用模組與一顆低調的「更多模組 →」入口。
   - 常用模組只放 Tomorrow Briefing / 明日簡報、Smart Home Control / 智慧家庭控制、AI Life Reminder / AI 生活提醒。
   - Mobile Bottom Nav 已有入口時，首頁 Module List 可作為摘要卡片，而非重複導覽。
   - 更多模組入口指向 Module Library / More Modules，不直接替 Coming Soon 模組生成完整頁。
   - 不要在 Home 展開 Coming Soon card grid。

6. Footer（選配）
   - 詳細規則集中在 `specs/01_CORE/APP_SHELL/FOOTER.md`。
   - 若畫面已經很長，Footer 可省略或保持極輕量。

## UX 規則
- 首頁優先讓使用者安心知道「今天狀況」與「家中設備狀態」。
- AI Greeting 不要過度擬人或冗長，保持生活助理感。
- Home 是產品首頁 / 入口 / 導覽中心；Dashboard Summary（Home 內摘要區） 是 Home 內的狀態摘要區塊，不預設作為獨立主導航頁。
- 現行畫面中，Desktop sidebar 的 `Dashboard` 即代表 Home 入口，避免做出兩套衝突導航。
- AI Chat button / Ask AI 入口可以出現在 Home，但不要壓過三個正式 demo modules。
- Home 中央可使用 AI Chat input / Ask AI input 作為主要互動入口；輸入框以 `AI Ask anything` 為預設提示文字，下面可搭配 `我想早起`、`關燈`、`提醒生活` 建議按鈕與 `個人 / 家庭 / 工作` chips。
- 主畫面結構可加入時間、天氣、今日節奏、schedule overview、quick actions，使 Home 更像生活工作台，但仍保持摘要層級。
- 常用模組可以直接進入正式 demo flow；更多模組只進入 Module Library / More Modules。
- Coming Soon 模組只做 preview / disabled card，不生成完整 detail page。
- Header / nav / footer 的詳細規則以 `specs/01_CORE/APP_SHELL/` 為準。
- Smart Home Quick Control 的狀態回饋要即時、清楚、低干擾。
- 夜間模式下，避免大面積白色、亮黃或強光暈。
- Settings 是 Mobile Bottom Nav 第四項；desktop 可放 sidebar bottom utility 或 profile menu。

## Responsive 規則
- Desktop 1440px：建議 12 欄 grid；AI Greeting 橫跨上方；Today Summary 與 Smart Home Quick Control 並排；Reminder Preview 可放右側或下方。
- Tablet 1024px：建議 2 欄；Greeting 置頂；Summary 與 Quick Control 分列；Reminder Preview 下移。
- Mobile 375px：單欄；順序為 AI Greeting > Ask AI floating entry > Today Summary > Smart Home Quick Control > Reminder Preview > Module List > 更多模組 →；底部固定 function bar 為 Home / Devices / Tasks / Settings，AI Chat / Ask AI 使用獨立 floating button。

## 中文版 Home 結構

```txt
Home / 首頁（合併首頁）
├─ Header / Nav
│  └─ See specs/01_CORE/APP_SHELL/
├─ AI Greeting / AI 問候
│  └─ 例如：Hi 哲宇，今天過得還好嗎？09:30 · 晴朗
├─ Ask AI / AI Chat Entry
│  ├─ Desktop 可在中央作為輸入框
│  ├─ placeholder：AI Ask anything
│  ├─ 建議按鈕：我想早起 / 關燈 / 提醒生活
│  └─ 類別 chips：個人 / 家庭 / 工作
├─ Dashboard Summary（Home 內摘要區） / 狀態摘要
│  ├─ 環境 / 濕度
│  ├─ 睡眠分析
│  └─ 快速動作
├─ 常用模組
│  ├─ 明日簡報
│  ├─ 智慧家庭控制
│  └─ AI 生活提醒
└─ 更多模組
   └─ Module Library / More Modules
      ├─ 已開放模組
      └─ Coming Soon preview cards（只在 Module Library 內）
└─ Footer（選配；See specs/01_CORE/APP_SHELL/FOOTER.md）
```

更多模組不直接代表完整功能頁。若點擊 Health Monitor、Family Space、Car Mode、AI Mood Analysis 等未開放模組，應顯示 Coming Soon / preview 狀態，而不是完整產品頁。

## Stitch MCP 可理解描述
Create a responsive Light Mode Home screen for NestBuddy in existing Stitch project 8270097307517936032. Use Atmospheric Glassmorphism Light Mode with warm white, pale mint, soft teal, soft blue, lavender / blue shadow, and restrained obsidian text. Include Hi 哲宇 greeting, time/weather context, Ask AI command bar with `AI Ask anything`, suggestion buttons (`我想早起` / `關燈` / `提醒生活`), category chips (`個人` / `家庭` / `工作`), today summary, quick status, exactly three formal module cards, and a low-key `更多模組 →` entry below the cards. Desktop uses a left sidebar with `New Chat` as the first action and a solid `亮色模式` pill button; the sidebar home entry is `Dashboard`. Mobile uses bottom navigation `Home / Devices / Tasks / Settings`; Ask AI is an independent floating entry. Do not show Coming Soon cards directly on Home.
