# HOME_DASHBOARD

## Document Purpose
Define Home / Dashboard（合併首頁） as the formal product entry and demo navigation surface for NestBuddy. Home should look like a polished product entry screen while keeping the demo scope focused on three core modules.

## Current Stitch Source

Use the existing Stitch project only. Do not create a new Stitch project.

```txt
Project URL: https://stitch.withgoogle.com/projects/8270097307517936032
Project ID: 8270097307517936032
Confirmed Desktop Home screen:
https://stitch.withgoogle.com/projects/8270097307517936032?node-id=d14af8a5673d4fe4b04ff39151a18759
Confirmed Mobile Home screen:
https://stitch.withgoogle.com/projects/8270097307517936032?node-id=e4d9ae36311c4cdd87959fc9792ce26a
```

## Scope
Home / Dashboard（合併首頁） includes:
- Desktop left sidebar app shell
- Mobile bottom function bar
- AI Greeting / personal daily context
- Ask AI command bar or floating entry
- Dashboard Summary（Home 內摘要區） / quick status
- Three formal module cards only
- Low-key More Modules entry

Home / Dashboard（合併首頁） does **not** include:
- A full SaaS dashboard
- Full module flows inside Home
- Coming Soon card grid on Home
- Coming Soon modules in primary navigation
- A separate Dashboard primary nav item

## Page Purpose
Home is the product home / entry / navigation surface. It helps users quickly understand what NestBuddy can do and gives clear access to the three core demo modules.

Home is not a pure landing page and not a full enterprise dashboard.

## 中文版定位

Home 是 NestBuddy 的「產品首頁 / 主要入口 / 導覽中心」。

Home 可以出現：
- Hi 哲宇 greeting
- 時間 / 天氣 / 今日狀態，例如：`09:30 · 晴朗 · 今天適合先整理三件事`
- Ask AI command bar
- Ask AI 建議按鈕：`我想早起` / `關燈` / `提醒生活`
- Ask AI 分類 chips：`個人` / `家庭` / `工作`
- 今日節奏 / 快速狀態
- 常用模組
- 更多模組入口
- Header / Nav / Footer 等產品框架元素

Home 不等於完整 Dashboard。Dashboard 在本專案中預設作為 Home 裡的一個 summary section，而不是獨立主導航頁。
目前現行畫面中，Desktop sidebar 的 `Dashboard` 代表 Home 入口；Home 與 Dashboard 已合併成同一個首頁視圖。

建議資訊架構：

```txt
Home
├─ Desktop: Left Sidebar / Mobile: Bottom Function Bar
├─ AI Greeting / Hero
├─ Ask AI / AI Chat Entry
│  ├─ Desktop: command bar / input entry
│  └─ Mobile: independent floating button / floating input entry
├─ Dashboard Summary（Home 內摘要區） / 今日節奏 / 快速狀態
│  ├─ 環境 / 濕度
│  ├─ 睡眠分析
│  └─ 快速動作
├─ 常用模組 / Frequent Modules
│  ├─ Tomorrow Briefing / 明日簡報
│  ├─ Smart Home Control / 智慧家庭控制
│  └─ AI Life Reminder / AI 生活提醒
├─ 更多模組 →
│  └─ Module Library / More Modules
└─ Footer（選配）
```

「更多模組 →」應指向 Module Library / More Modules，而不是直接在 Home 展開 Coming Soon 模組。

## Header / Nav / Footer Reference

Header、Navigation、Mobile Bottom Navigation 與 Footer 的詳細規則集中放在：

```txt
specs/01_CORE/APP_SHELL/
├─ HEADER_NAV.md
├─ SIDEBAR_NAV.md
├─ MOBILE_BOTTOM_NAV.md
└─ FOOTER.md
```

Home 只引用這些 app shell 規則，不在本檔重複定義。

## Desktop Home Rules

Desktop Home uses a left sidebar.

Required sidebar behavior:
- Sidebar first primary action is `New Chat`.
- `New Chat` stays English. Do not translate it.
- `Dashboard` 是 desktop sidebar 的首頁入口；`Ask AI` 不放在 sidebar primary nav。
- Other interface copy should mainly use Traditional Chinese.
- Sidebar bottom appearance control is not a sliding toggle.
- It is a solid pill button with the label `亮色模式`.
- Do not use a switch-style light/dark toggle on the current Light Mode screen.

## Mobile Home Rules

Mobile Home does not use a left sidebar.

Mobile bottom function bar is fixed to four items:

```txt
Home / Devices / Tasks / Settings
```

Ask AI is an independent floating button / floating input entry. It must not be placed inside the bottom navigation.

## Home as Product Entry
Home should create a polished first impression:
- Personal greeting
- Calm product tone
- Current day context
- Summary of schedule, reminders, and home status

Example:

```text
Hi 哲宇，今天過得還好嗎？
```

## Home as Demo Navigation
Home should guide users into:
1. Tomorrow Briefing / 明日簡報
2. Smart Home Control / 智慧家庭控制
3. AI Life Reminder / AI 生活提醒

Each module card should show a short summary and one clear entry action.

## AI Greeting
AI Greeting should be warm, concise, and contextual.

Examples:
- 「Hi 哲宇，今天過得還好嗎？」
- 「今晚可以先整理明天的行程，再進入睡眠模式。」
- 「09:30 · 晴朗 · 今天適合先整理三件事」

## Ask AI Entry
Ask AI should be visible but should not dominate the whole page.

Required label:

```txt
Ask AI
```

Current placeholder:

```txt
AI Ask anything
```

Current helper prompts:

```txt
沒想法嗎？給你建議
我想早起 / 關燈 / 提醒生活
```

The entry opens AI Assistant / AI Chat, not a full unrelated chatbot product.

## Dashboard Summary（Home 內摘要區）

### Today Summary
Shows short daily context.

### Tomorrow Schedule Summary
Shows the next important event or preparation insight.

### Reminder Summary
Shows upcoming, missed, or completed reminder status.

### Smart Home Status Summary
Shows key device state, especially lights and sleep readiness.

## Frequent Modules / 常用模組

常用模組只放三個正式 Demo modules：
1. Tomorrow Briefing / 明日簡報
2. Smart Home Control / 智慧家庭控制
3. AI Life Reminder / AI 生活提醒

These three cards are the main Home module cards and should feel clear, formal, and product-like.

Each frequent module card should include:
- Module name
- One-line value proposition
- Current status or preview
- One clear entry action

Do not place full module flows inside Home.

## More Modules / 更多模組

「更多模組」不是一個大區塊，也不是 Coming Soon card grid。它只是一顆低調按鈕 / 入口。

Correct placement:
- Under the three frequent module cards.

Required label:

```txt
更多模組 →
```

Visual treatment:
- Low-key, subtle but visible.
- Can be a glass secondary button or text button.
- Do not make it the fourth module card.
- Do not expand Coming Soon cards on Home.

## Coming Soon Modules

Coming Soon modules include:
- 健康監測
- 家庭空間
- 車載模式
- 情緒分析

Rules:
- They do not appear directly in the Home module card area.
- They only appear through `更多模組 →` into Module Library / 模組總覽.
- They do not enter primary navigation.
- They do not receive complete detail pages in the current demo scope.

## Light Mode Priority
- Current priority is Light Mode only.
- Light Mode uses Atmospheric Glassmorphism Light Mode.
- Do not generate Dark Mode / Night Mode unless the Light Mode screen has been approved and explicitly requested.

## Desktop / Tablet / Mobile Layout

### Desktop
- Left sidebar app shell.
- Multi-column product home layout.
- AI greeting and Ask AI command bar can be wide.
- Three formal module cards can appear as a card grid.
- `更多模組 →` sits below the three cards.

### Tablet
- Summary first, then two-column module cards.
- Keep the three formal modules visually dominant.

### Mobile
- No left sidebar.
- One-column vertical flow.
- AI Greeting → Ask AI floating entry → Summary → Three Module Cards → 更多模組 →.
- Bottom navigation fixed to `Home / Devices / Tasks / Settings`.

## State Definition
| State | Meaning | Home Treatment |
|---|---|---|
| Normal | All three demo modules available | Show module cards normally |
| Needs attention | Reminder or smart home issue exists | Use subtle badge / summary |
| Coming Soon | Future module | Only in Module Library preview, not Home card grid |
| Empty | No reminders or events | Calm empty message |

## Stitch Scope Limit
When generating Home:
- Do not put all module details on Home.
- Do not generate full Coming Soon pages.
- Do not use Coming Soon modules as Home cards.
- Do not create a large enterprise dashboard.
- Do not create a new Stitch project.

## Stitch / Cursor / Codex Usage Notes
- Stitch should generate Home as a product entry and demo navigation surface.
- Cursor should route module cards to existing demo module screens.
- Codex should preserve sidebar, mobile bottom navigation, More Modules boundary, and Light Mode priority.

## Stitch MCP Description
Create a Light Mode Home screen for NestBuddy in the existing Stitch project `8270097307517936032`. The design should follow Atmospheric Glassmorphism Light Mode: warm white, pale mint, soft teal, soft blue, lavender / blue shadow, and obsidian text only for readable text or primary buttons. Desktop uses a left sidebar with `New Chat` as the first action and a solid `亮色模式` pill button at the bottom. Mobile uses bottom navigation `Home / Devices / Tasks / Settings` with `Ask AI` as an independent floating entry. Home includes Hi 哲宇 greeting, time/weather/daily context, Ask AI command bar, quick status, exactly three formal module cards, and a low-key `更多模組 →` entry under the cards. Do not show Coming Soon cards directly on Home.
