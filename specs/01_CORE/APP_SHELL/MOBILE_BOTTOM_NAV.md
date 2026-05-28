# MOBILE_BOTTOM_NAV

## 文件用途

定義 AI Life Assistant 的 mobile bottom navigation 規則。

## Reference Screen

手機版 bottom function bar 主要參考：

```txt
https://stitch.withgoogle.com/projects/8270097307517936032?node-id=0d2cfb3564db43f19a8cb4b2bf46cece
Mobile Dashboard (Liquid Glass)
```

此 reference 的手機版結構為：

- Top header：品牌 / notification / profile
- Main content：Home dashboard cards
- Floating AI button：Ask AI
- Bottom function bar：Home / Devices / Tasks / Settings

## Fixed Mobile Bottom Function Bar

Mobile 不使用 desktop left sidebar。手機版改用底部功能列。

Mobile bottom function bar 固定為四項：

```txt
Home / Devices / Tasks / Settings
```

AI Chat / Ask AI 不放在 bottom function bar，改成獨立 floating action button。

## Item Meaning

| Item | Destination |
|---|---|
| Home | Home / Dashboard Summary |
| Devices | Smart Home Control |
| Tasks | AI Life Reminder / Personal Reminders |
| Settings | Settings / Preferences |

## Floating AI Button

AI Chat / Ask AI 使用獨立 floating action button。

Default label:

```txt
Ask AI
```

或中文版：

```txt
問問 AI
```

Floating AI button 行為：

- 進入 AI Assistant / AI Chat
- 可放在主內容右下或 bottom bar 上方
- 不取代 Home / Devices / Tasks / Settings
- 不與 bottom function bar 合併
- 不在手機底部功能列中新增 AI Assistant item

## Active State

| Screen | Active Nav Item |
|---|---|
| Home / Dashboard Summary | Home |
| AI Chat / Assistant | None; opened by floating Ask AI |
| Smart Home Control | Devices |
| Sleep Environment scenario | Devices |
| AI Life Reminder | Tasks |
| Personal Reminders scenario | Tasks |
| Settings | Settings |

## Do Not Include

Mobile bottom navigation 不包含：

```txt
Dashboard
Notification
AI Assistant
Health Monitor
Family Space
Car Mode
AI Mood Analysis
```

## Rules

- Dashboard Summary 是 Home 的摘要區塊，不是獨立 bottom nav。
- Notification 可以出現在 badge、Reminder state、Home summary，但不是 bottom nav。
- Settings 在 mobile 可作為 bottom function bar 第四項；desktop 可放 sidebar bottom utility 或 profile menu。
- AI Assistant / Ask AI 不作為 mobile bottom function bar item，使用 floating action button。
- Coming Soon modules 不進主導航。

## Stitch 生成注意

避免生成：

```txt
Home / Dashboard / AI Chat / Notification / Settings
```

必須使用：

```txt
Home / Devices / Tasks / Settings
```

並另外放置 floating AI button：

```txt
Ask AI
```
