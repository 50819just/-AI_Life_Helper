# ACCESSIBILITY_RULE

## 文件用途
定義可讀性、操作性與夜間舒適性的基本規則。

## 初版規格
- 主要文字需達到足夠對比。
- 不只依賴顏色表示 On / Off。
- 所有互動元件需有 hover、focus、pressed、disabled 狀態。
- 動畫不可閃爍，避免夜間刺激。

## UX 規則
- 智慧家庭控制需要明確狀態文字。
- 提醒與錯誤訊息應溫和但清楚。
- Mobile 需支援單手操作。

## Responsive 規則
- Desktop 支援鍵盤 focus。
- Tablet 與 Mobile touch target 不低於 44px。
- Mobile Bottom Nav icon 需搭配 label。

## Stitch MCP 可理解描述
Design accessible smart home AI screens with readable contrast, labels for device states, focus states, touch targets, and low brightness dark mode.

## i18n / Localization Accessibility
- 語言切換控制需有清楚 label，例如「語言 / Language」。
- 中英文文案長度不同，元件需允許文字換行或彈性寬度，避免截斷重要資訊。
- 不要只用國旗代表語言，需搭配文字標籤：繁體中文、English。
- i18n key 命名需語意清楚，避免使用畫面位置作為唯一命名依據。
