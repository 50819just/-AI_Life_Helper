# APP_SHELL

## 文件用途

集中管理 NestBuddy 的全域產品框架規則，包含 Header、Navigation、Mobile Bottom Navigation 與 Footer。

這個資料夾是 App Shell / Nav / Footer 的主要規格來源。其他 Home、Module、Stitch handoff 文件若需要引用 nav 或 footer 規則，應指向本資料夾，避免重複散落。

## Source of Truth

```txt
specs/01_CORE/APP_SHELL/
├─ README.md
├─ HEADER_NAV.md
├─ SIDEBAR_NAV.md
├─ MOBILE_BOTTOM_NAV.md
└─ FOOTER.md
```

## 核心原則

- Header / Nav / Footer 是產品框架，不是單一 module 的內容。
- Home、Devices、Tasks、Settings 都應共用一致的 app shell 規則，且現行首頁已將 Home / Dashboard 融合。
- Mobile bottom function bar 固定為四項：Home / Devices / Tasks / Settings。
- AI Chat / Ask AI 在 mobile 使用獨立 floating action button，不放 bottom function bar。
- Settings 在 mobile 可作為 bottom function bar 第四項；desktop 可放 sidebar bottom utility 或 profile menu。
- Dashboard 不放 mobile bottom navigation；Dashboard Summary（Home 內摘要區） 是 Home 裡的摘要區塊，desktop sidebar 的 Dashboard 是首頁入口。
- Coming Soon modules 不進全域主導航。
- Footer 是輔助資訊，可有可無，不承擔主要任務 CTA。

## 使用方式

- 設計 Home 或 Module screen 前，先看 `SIDEBAR_NAV.md`、`HEADER_NAV.md` 與 `MOBILE_BOTTOM_NAV.md`。
- 若畫面需要底部資訊，再看 `FOOTER.md`。
- 若從 Stitch 舊畫面 duplicate 修改，優先保留既有 app shell、左側 nav、top bar，再改內容區。
