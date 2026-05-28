# COLOR_SYSTEM

## 文件用途
此文件已調整為 Stitch-first 色彩索引，不再作為獨立色票來源。

AI Life Assistant 的 Light / Dark mode 色彩 token 以 Stitch preset 為主，避免專案自訂色票與 Stitch token 互相干擾。

---

## Primary Token Sources

### Light Mode
- Source：`03_DESIGN_SYSTEM/STITCH_PRESET_ATMOSPHERIC_GLASSMORPHISM_LIGHT_MODE.md`
- Style：Atmospheric Glassmorphism / Early Morning Clarity
- Direction：soft light background、frosted white glass surfaces、obsidian text / actions、mint and indigo accents

### Dark Mode
- Source：`03_DESIGN_SYSTEM/STITCH_PRESET_NOCTURNAL_CLARITY_DARK_MODE.md`
- Style：Nocturnal Clarity / Dark mode glassmorphism
- Direction：deep navy background、mint primary glow、pale frost secondary、glass surface layers

---

## Product Color Constraints

即使以 Stitch preset 為主，仍需遵守以下產品限制：

- 色彩必須協助使用者理解狀態，而不是只做裝飾。
- Dark Mode 的目標是舒適操作，不是營造科幻感。
- 夜間使用時，最亮元素應該是必要操作與狀態，不是背景效果。
- 避免 neon、高飽和大面積光暈、複雜 3D dashboard。
- 智慧家庭設備 On / Off / Processing / Error 狀態需清楚可辨識。
- Error 不應大面積鋪滿紅色，優先使用文字、icon 或細邊框提示。

---

## Device State Guidance

### Device On
- 可使用 preset 中的 primary / secondary accent。
- 燈光類設備可使用溫暖、柔和的小面積光暈。
- Dark Mode 下需降低 glow 強度，避免夜間刺眼。

### Device Off
- 使用低調但可讀的 neutral / surface variant。
- 不可暗到無法辨識，也不可只靠顏色傳達狀態。

### Processing
- 可使用 subtle shimmer、spinner 或狀態文字。
- 動畫以 150–240ms 為主，不使用閃爍。

### Error
- 使用 muted error token。
- 不做大面積警示背景。

---

## Stitch MCP 可理解描述
Use Stitch presets as the primary color token source. Light Mode follows Atmospheric Glassmorphism. Dark Mode follows Nocturnal Clarity. Do not create a separate competing palette. Keep AI Life Assistant calm, readable, lifestyle-oriented, low-distraction, and comfortable for smart home night usage.
