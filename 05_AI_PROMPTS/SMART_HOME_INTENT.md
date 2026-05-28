# SMART_HOME_INTENT

## 文件用途
定義 AI 對智慧家庭控制語句的意圖理解規則。

## 初版規格
- 意圖類型：turn_on_device、turn_off_device、set_brightness、check_device_status、create_scene。
- 必要欄位：device、room、action、value、confirmation_required。
- 範例：「把客廳燈關掉」=> room: 客廳, device: 燈, action: off。

## UX 規則
- 缺少房間或設備時必須追問。
- 影響多設備的命令需確認。
- 夜間模式中調整亮度要優先低亮度。

## Responsive 規則
- Mobile AI 回饋需搭配可點擊確認按鈕。
- Desktop 可顯示解析後的設備卡與狀態。

## Stitch MCP 可理解描述
Interpret smart home natural language commands with structured intent fields. Ask clarification when device or room is missing. Confirm broad actions like turning off all lights.
