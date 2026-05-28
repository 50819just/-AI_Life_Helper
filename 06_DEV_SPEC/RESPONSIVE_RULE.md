# RESPONSIVE_RULE

## 文件用途
定義 AI Life Assistant 在 Desktop、Tablet、Mobile 三種主要寬度下的版面、導覽與元件規則。

## 初版規格

### Desktop — 1440px
- Layout：12 欄 grid，最大內容寬度可控制在 1200–1280px。
- Navigation：可使用側邊導覽或頂部導覽，需保留 Home、AI Assistant、Smart Home、Reminder、Settings。
- Home：AI Greeting 置頂，Today Summary、Smart Home Quick Control、Reminder Preview 可並排。
- Smart Home：房間列表與設備 grid 可同時顯示。

### Tablet — 1024px
- Layout：8 欄 grid 或 2 欄 card layout。
- Navigation：可使用 top nav、side rail 或 compact nav。
- Home：重要摘要置頂，卡片 2 欄排列。
- Smart Home：room filter 使用 chips，設備卡 2 欄。

### Mobile — 375px
- Layout：單欄，左右安全邊距 16px。
- Navigation：固定 Bottom Navigation，僅包含 Home、AI Assistant、Smart Home、Reminder。
- Settings：不放 Bottom Nav，改由右上角 icon、profile 或更多選單進入。
- Touch Target：主要互動區不小於 44px。
- Smart Home：設備卡單欄，常用控制放在拇指容易點擊的位置。

## UX 規則
- Responsive 不是單純縮小，而是重新排序重要性。
- Mobile 首頁優先：Greeting、Today Summary、Quick Control、Reminder Preview。
- 智慧家庭控制在任何尺寸都要清楚顯示 On / Off / Processing / Error。
- Dark Mode 與夜間低亮度規則在所有尺寸都要成立。

## Responsive 規則
- Desktop 1440px：資訊密度可較高，但仍保留 calm spacing。
- Tablet 1024px：以雙欄與可折疊內容維持清楚。
- Mobile 375px：單欄、Bottom Nav、減少裝飾、提高可點擊性。

## Stitch MCP 可理解描述
Generate responsive web screens for Desktop 1440px, Tablet 1024px, and Mobile 375px. Desktop uses spacious dashboard grid, tablet uses two-column cards, mobile uses single-column layout with bottom navigation containing only Home, AI Assistant, Smart Home, Reminder. Settings must not appear in mobile bottom nav.
