# HEADER_NAV

## 文件用途

定義 NestBuddy 的 Header、Top Nav、Left Sidebar / App Shell 規則。

## Header / Top Nav 定位

Header / Top Nav 是產品框架，用來提供目前位置、使用者入口與輔助操作。它不是 Home 或 module 的主要內容。

Header / Top Nav 可以包含：

- Product name / logo：NestBuddy
- Current page / breadcrumb
- User profile / avatar
- Settings entry：右上角 icon、Profile、More menu
- Notification badge：只作狀態提示，不作主導航
- Search pill / quick search
- Connection status indicator
- Current time display

Header / Top Nav 不應包含：

- 完整 Dashboard navigation
- Coming Soon modules 的主入口
- Settings 作為 desktop primary nav（mobile 則固定為 bottom nav 第四項）
- Notification 作為獨立 mobile bottom navigation 項目

## Desktop Navigation

Desktop 可以使用以下任一種框架：

- Left sidebar / app shell
- Top navigation
- Hybrid app shell：左側 nav + 上方狀態列

## Reference Screen Alignment

若使用以下 Stitch screen 作為視覺參考：

```txt
https://stitch.withgoogle.com/projects/8270097307517936032?node-id=5f1ba0c0ade24ef986318a0ced7a4042
Smart Home Control Hub（繁體中文）
```

可保留它的視覺框架方向：

- 左側 sidebar / app shell
- 上方 header / top bar
- 產品名稱區
- 使用者問候 / profile 區
- Search 圓角輸入框
- 連線狀態綠燈
- 現在時間顯示
- 清楚的 icon + label nav item
- 玻璃卡片與明亮 light mode 氣質

但 nav label 需要依本專案規則調整，不直接照抄原畫面的 Dashboard / Notification 主導航。

若從既有 Stitch 畫面 duplicate 修改，優先保留：

- 原本 app shell
- 左側 nav
- top bar
- 字體、spacing、卡片比例
- glassmorphism 強度

## Desktop Nav 建議項目

Desktop nav 可包含核心區域入口，但不可把 Coming Soon 當完整功能入口。

建議主項：

```txt
Dashboard / Home
Smart Home
Reminder
```

可作次級入口：

```txt
Settings
Profile
Help
```

不建議作主導航：

```txt
Dashboard
Notification
Health Monitor
Family Space
Car Mode
AI Mood Analysis
```

若 reference screen 原本包含：

```txt
首頁 / 儀表板 / AI 聊天 / 通知 / 設定
```

請對齊為：

```txt
Home / Devices / Tasks / Settings
```

Settings 可保留為 sidebar 底部、Profile menu 或右上角 icon；Notification 可保留為 badge，不作主導航。

Dashboard 可以是 Home 的 summary section 或次級 overview，不是 MVP 主導航；現行畫面中 sidebar 的 `Dashboard` 代表首頁入口。
Notification 可以是 badge / state，不是主導航。
Coming Soon modules 只在 Module Library 內做 preview / disabled card，不直接出現在 Home 主卡片區。

## Stitch 生成注意

- 不要讓 Stitch 自行發明一套新的 nav。
- 若 reference screen 已有穩定左側 nav，先 duplicate 後保留，再刪改內容。
- 不要為了新 module 重做整個 app shell。
