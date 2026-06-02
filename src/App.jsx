import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import bedroomAcOff from './assets/devices/bedroom-ac-off.png'
import bedroomAcOn from './assets/devices/bedroom-ac-on.png'
import bedroomBedsideLampOff from './assets/devices/bedroom-bedside-lamp-off.png'
import bedroomBedsideLampOn from './assets/devices/bedroom-bedside-lamp-on.png'
import bedroomMainLightOff from './assets/devices/bedroom-main-light-off.png'
import bedroomMainLightOn from './assets/devices/bedroom-main-light-on.png'
import livingRoomWarmLightOff from './assets/devices/living-room-warm-light-off.png'
import livingRoomWarmLightOn from './assets/devices/living-room-warm-light-on.png'
import nestBuddyLogo from './assets/devices/巢伴NestBuddy-logo.jpg'

const summaryCards = [
  {
    title: '環境',
    value: '30%',
    caption: '濕度',
    icon: 'water_drop',
    accent: 'secondary',
  },
  {
    title: '睡眠分析',
    value: '7.5',
    caption: '小時',
    note: '優質 +12%',
    icon: 'bedtime',
    accent: 'sleep',
  },
  {
    title: '快速動作',
    value: '3',
    caption: '個快捷動作',
    actions: ['設定明日鬧鐘', '關閉臥室燈', '開啟專注模式'],
    icon: 'bolt',
    accent: 'actions',
  },
]

const humidityReadings = [
  { value: '30%', bar: 58 },
  { value: '32%', bar: 62 },
  { value: '29%', bar: 56 },
  { value: '31%', bar: 60 },
]

const indoorTemperatureReadings = [
  { value: '26.5°', bar: 64 },
  { value: '27.5°', bar: 70 },
  { value: '25.5°', bar: 58 },
  { value: '24.8°', bar: 54 },
]

const modules = [
  {
    id: 'briefing',
    page: 'briefing',
    title: '明日簡報',
    icon: 'calendar_month',
    description: '睡前確認明天第一件重要事、起床建議與準備清單。',
    entries: [
      { time: '10:00', title: 'Design Sync', sub: 'Product Team' },
      { time: '14:30', title: 'AI Model Review', sub: 'Tech Hub' },
    ],
    insight: '明天行程緊湊，建議今晚提前整理簡報資料。',
  },
  {
    id: 'devices',
    page: 'devices',
    title: '智慧家庭控制',
    icon: 'home',
    description: '查看燈光、空調與睡眠模式，保持低干擾的家中狀態。',
    controls: [
      { label: '客廳燈光', state: 'on' },
      { label: '空調', state: '24°C' },
    ],
    insight: '正在監測中：目前溫度 24.5°C',
  },
  {
    id: 'tasks',
    page: 'tasks',
    title: 'AI 生活提醒',
    icon: 'notifications_active',
    description: '用溫和提醒整理今日任務、睡前準備與可恢復的 missed state。',
    reminders: [
      { time: '10:30', label: '喝水提醒', state: 'done', caption: '已完成' },
      { time: '13:00', label: '午餐後散步', state: 'missed', caption: '可延後補完成' },
      { time: '15:30', label: '久未移動提醒', state: 'upcoming', caption: '即將提醒' },
      { time: '22:30', label: '睡前整理提醒', state: 'upcoming', caption: '即將提醒' },
    ],
    insight: '今日完成度 33%',
  },
]

const deviceCards = [
  { name: '主燈', room: '臥室', state: 'on', meta: '亮度 42%', icon: 'lightbulb' },
  { name: '客廳燈光', room: '客廳', state: 'on', meta: '暖白光', icon: 'light' },
  { name: '空調', room: '臥室', state: 'on', meta: '24°C · 自動', icon: 'ac_unit' },
  { name: '床頭燈', room: '臥室', state: 'off', meta: '已關閉', icon: 'bedroom_parent' },
]

const deviceImages = {
  主燈: {
    on: bedroomMainLightOn,
    off: bedroomMainLightOff,
  },
  客廳燈光: {
    on: livingRoomWarmLightOn,
    off: livingRoomWarmLightOff,
  },
  空調: {
    on: bedroomAcOn,
    off: bedroomAcOff,
  },
  床頭燈: {
    on: bedroomBedsideLampOn,
    off: bedroomBedsideLampOff,
  },
}

const morningMock = {
  calendar: {
    eventName: 'HP meeting',
    startTime: '09:00',
    suggestedDepartTime: '08:30',
    suggestedWakeTime: '07:50',
  },
  alarms: ['07:50 起床提醒', '08:00 二次提醒'],
  chargeStatus: {
    iPhone: '未充電',
    AppleWatch: '未充電',
  },
  smartHomeDetection: ['客廳攝像頭', '客廳空調狀態感測'],
}

const morningStepDurations = {
  wakePlan: 6000,
  alarmPrep: 5000,
  smartHome: 12000,
}

const morningTimeline = {
  wakePlanStart: 0,
  alarmPrepStart: morningStepDurations.wakePlan,
  smartHomeStart: morningStepDurations.wakePlan + morningStepDurations.alarmPrep,
  total: morningStepDurations.wakePlan + morningStepDurations.alarmPrep + morningStepDurations.smartHome,
}

const morningSteps = [
  {
    id: 'wake-plan',
    title: '安排起床時間',
    icon: 'alarm',
    processing: '正在讀取 Google Calendar、分析明日最早行程與平日作息節奏...',
    completed: '鬧鐘已建立，裝置充電狀態已檢查',
  },
  {
    id: 'alarm-sleep-mode',
    title: '啟動鬧鐘與睡眠準備',
    icon: 'bedtime',
    processing: '正在啟動手機鬧鐘、建立睡眠模式，並同步最近任務紀錄...',
    completed: '鬧鐘已啟動，睡眠模式已建立，任務紀錄已同步至側邊欄。',
  },
  {
    id: 'smart-home-shutdown',
    title: '連接智慧家具',
    icon: 'home_iot_device',
    processing: '正在連接智慧家具，確認客廳燈光與空調狀態...',
    completed: '客廳燈已關閉，客廳空調已關閉。',
  },
]

const smartHomeDeviceStages = [
  {
    id: 'living-room-light',
    start: 0,
    duration: 3600,
    source: '客廳攝影機',
    title: '客廳燈光',
    icon: 'lightbulb',
    before: '已開啟 · 亮度 42%',
    after: '已關閉 · AI 助理於 22:45 關閉',
    loading: '正在透過客廳攝影機確認燈光狀態...',
    done: '客廳燈光已關閉',
    onImage: livingRoomWarmLightOn,
    offImage: livingRoomWarmLightOff,
  },
  {
    id: 'living-room-ac',
    start: 3800,
    duration: 3600,
    source: '客廳空調狀態感測',
    title: '客廳空調',
    icon: 'ac_unit',
    before: '已開啟 · 25°C',
    after: '已關閉 · AI 助理於 22:45 關閉',
    loading: '正在讀取空調運轉狀態與室內溫度...',
    done: '客廳空調已關閉',
    onImage: bedroomAcOn,
    offImage: bedroomAcOff,
  },
  {
    id: 'bedroom-light',
    start: 7600,
    duration: 3600,
    source: '臥室攝影機',
    title: '臥室燈光',
    icon: 'lightbulb',
    before: '已開啟 · 暖白光',
    after: '已關閉 · 睡眠模式已接管',
    loading: '正在把臥室攝影機畫面搬進睡前檢查...',
    done: '臥室燈光已關閉',
    onImage: bedroomMainLightOn,
    offImage: bedroomMainLightOff,
  },
]

function clamp(value, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value))
}

function getMorningFlowView(elapsed = 0) {
  const stepElapsed = [
    elapsed - morningTimeline.wakePlanStart,
    elapsed - morningTimeline.alarmPrepStart,
    elapsed - morningTimeline.smartHomeStart,
  ]
  const stepDurations = [morningStepDurations.wakePlan, morningStepDurations.alarmPrep, morningStepDurations.smartHome]
  const steps = morningSteps.map((step, index) => {
    const progress = clamp((stepElapsed[index] / stepDurations[index]) * 100)
    const status = progress >= 100 ? 'success' : progress > 0 ? 'processing' : 'pending'
    return { ...step, progress, status }
  })
  const step3Elapsed = Math.max(0, elapsed - morningTimeline.smartHomeStart)
  const smartHomeComplete = elapsed >= morningTimeline.total
  const smartHomeChecks = smartHomeDeviceStages.map((stage) => {
    const rawProgress = ((step3Elapsed - stage.start) / stage.duration) * 100
    const progress = clamp(rawProgress)
    const status = progress >= 100 ? 'success' : progress > 0 ? 'processing' : 'pending'
    return {
      ...stage,
      progress,
      status,
      image: status === 'success' ? stage.offImage : stage.onImage,
      meta: status === 'success' ? stage.after : stage.before,
    }
  })
  const activeSmartHomeCheck = [...smartHomeChecks].reverse().find((check) => check.status !== 'pending') || smartHomeChecks[0]

  return {
    steps,
    currentStep: steps.findIndex((step) => step.status === 'processing'),
    sidebarVisible: elapsed >= morningTimeline.alarmPrepStart + morningStepDurations.alarmPrep * 0.4,
    smartHomeStarted: elapsed >= morningTimeline.smartHomeStart,
    smartHomeComplete,
    smartHomeChecks,
    activeSmartHomeCheck,
    deviceStatus: {
      livingRoomLight: smartHomeChecks[0]?.status === 'success' ? 'off' : 'on',
      livingRoomAC: smartHomeChecks[1]?.status === 'success' ? 'off' : 'on',
      bedroomLight: smartHomeChecks[2]?.status === 'success' ? 'off' : 'on',
    },
    visibleMessages: [
      { at: 0, type: 'user', text: '我想早起。' },
      {
        at: 900,
        type: 'assistant',
        text: '我幫你查了一下 Google Calendar，明天 HP meeting 9:00 開始。依照通勤與準備時間，建議你 7:50 起床，8:30 出發。',
      },
      { at: 5200, type: 'system-status', text: '07:50 與 08:00 鬧鐘已建立。' },
      {
        at: 6600,
        type: 'assistant',
        tone: 'warning',
        text: '我也偵測到 iPhone 與 Apple Watch 目前尚未充電，睡前記得幫它們補電，明天比較安心。',
      },
      {
        at: 9600,
        type: 'assistant',
        text: '接著我會啟動鬧鐘與睡眠模式，並把任務紀錄同步到左側。',
      },
      { at: 10800, type: 'system-status', text: '睡眠模式已啟用，Sidebar 任務紀錄已建立。' },
      {
        at: 11600,
        type: 'assistant',
        text: '我會一個裝置一個裝置確認：先看客廳攝影機關閉燈光，再檢查空調，最後搬到臥室攝影機確認燈光狀態。',
      },
      { at: 15000, type: 'system-status', text: '客廳燈光已關閉。' },
      { at: 18800, type: 'system-status', text: '客廳空調已關閉。' },
      { at: 22600, type: 'system-status', text: '臥室燈光已關閉，睡眠環境已完成。' },
      {
        at: 23200,
        type: 'assistant',
        text: '晚安，睡前準備都完成了。客廳燈與空調已關閉，鬧鐘也設定好了。祝你有個愉快又安心的夜晚。',
      },
    ].filter((message) => elapsed >= message.at),
  }
}

const reminderItems = [
  {
    id: 'drink-water',
    title: '喝水提醒',
    time: '10:30',
    status: 'completed',
    description: '已完成',
    category: 'health',
    icon: 'water_drop',
    actionLabel: '已完成',
  },
  {
    id: 'after-lunch-walk',
    title: '午餐後散步',
    time: '13:00',
    status: 'pending',
    description: '待處理',
    category: 'health',
    icon: 'directions_walk',
    actionLabel: '稍後提醒',
  },
  {
    id: 'move-break',
    title: '久未移動提醒',
    time: '15:30',
    status: 'pending',
    description: '待處理',
    category: 'activity',
    icon: 'self_improvement',
    actionLabel: '稍後提醒',
  },
  {
    id: 'bedtime-prepare',
    title: '睡前整理提醒',
    time: '22:30',
    status: 'pending',
    description: '待處理',
    category: 'night',
    icon: 'bedtime',
    actionLabel: '查看清單',
  },
]

const mockProgress = {
  monthly: {
    total: 65,
    completed: 42,
    pending: 18,
    recoverable: 5,
    completionRate: 68,
    streakDays: 4,
  },
  recentDays: [
    { date: '05/27', label: '一', status: 'completed', completionRate: 100 },
    { date: '05/28', label: '二', status: 'partial', completionRate: 70 },
    { date: '05/29', label: '三', status: 'partial', completionRate: 60 },
    { date: '05/30', label: '四', status: 'recoverable', completionRate: 45 },
    { date: '05/31', label: '五', status: 'completed', completionRate: 100 },
    { date: '06/01', label: '六', status: 'partial', completionRate: 75 },
    { date: '06/02', label: '日', status: 'today', completionRate: 25 },
  ],
}

const headlineTickerItems = [
  '今天的生活提醒已同步完成，AI 會幫你整理真正需要注意的事項。',
  '午餐後散步可以延後，不算失敗，晚點完成也可以。',
  '目前有 1 項提醒快到時間，我會在適合的時間再提醒你。',
  '今晚安心清單已準備好，睡前只需要確認三件重要事項。',
  '手機電量、明日行程與生活提醒都會由 AI 幫你一起整理。',
  '已完成的提醒會自動收起，未完成的事項可以稍後補上。',
  '今天不用急，先處理最重要的提醒就好。',
  'AI 會根據時間、行程與生活狀態，幫你調整提醒順序。',
]


const demoCurrentMinutes = 12 * 60 + 40

function getReminderMinutes(time) {
  const [hour, minute] = time.split(':').map(Number)
  return hour * 60 + minute
}

function isReminderDueSoon(reminder) {
  if (reminder.status === 'completed') return false
  const minutesUntilReminder = getReminderMinutes(reminder.time) - demoCurrentMinutes
  return minutesUntilReminder >= 0 && minutesUntilReminder <= 30
}

function getDailyReminderProgress(reminders) {
  const total = reminders.length
  const completed = reminders.filter((item) => item.status === 'completed').length
  const pending = reminders.filter((item) => ['pending', 'snoozed'].includes(item.status)).length
  const recoverable = reminders.filter((item) => ['recoverable', 'missed'].includes(item.status)).length
  const dueSoon = reminders.filter(isReminderDueSoon).length
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

  return { total, completed, pending, recoverable, dueSoon, completionRate }
}

const sleepChecklistItems = [
  {
    id: 'phone-charge',
    title: '手機電量偏低',
    reason: '偵測到手機電量低於 20%，建議睡前充電，避免明天通勤不方便。',
    status: 'pending',
    icon: 'battery_alert',
    actionLabel: '已充電',
  },
  {
    id: 'badge',
    title: '明天會議要帶識別證',
    reason: '明天早上有會議，建議先把識別證放進包包。',
    status: 'pending',
    icon: 'badge',
    actionLabel: '已放入包包',
  },
  {
    id: 'trash',
    title: '倒垃圾提醒尚未完成',
    reason: '今晚 20:30 的倒垃圾提醒還沒完成，可以現在處理或延後。',
    status: 'pending',
    icon: 'delete',
    actionLabel: '已完成',
  },
]

const prepItems = ['確認會議資料', '準備識別證', '手機充電', '設定明早鬧鐘']

const comingSoon = [
  { title: '健康監測', icon: 'monitor_heart' },
  { title: '家庭空間', icon: 'meeting_room' },
  { title: '車載模式', icon: 'directions_car' },
  { title: '情緒分析', icon: 'mood' },
]

const reminderRoutineStepTemplate = [
  {
    id: 'calendar',
    title: '搜尋明日行程',
    icon: 'calendar_month',
    processing: '正在讀取 Google Calendar，確認明天早上的第一個行程...',
    completed: '明日第一個行程：09:00 專案同步會議，建議出門時間 08:20。',
  },
  {
    id: 'reminders',
    title: '檢查生活提醒',
    icon: 'notifications_active',
    processing: '正在檢查今天尚未完成的生活提醒，並過濾不重要的項目...',
    completed: '今晚真正需要注意 3 項，可延後事項 1 項，已略過低優先提醒 1 項。',
  },
  {
    id: 'battery',
    title: '檢查裝置電量',
    icon: 'battery_alert',
    processing: '正在檢查手機、Apple Watch、隨身充與耳機電量...',
    completed: '裝置電量已檢查，明天出門會用到的設備都整理好了。',
  },
  {
    id: 'peace-list',
    title: '產生今晚安心清單',
    icon: 'auto_awesome',
    processing: '正在根據明日行程、生活提醒與裝置狀態，整理今晚最重要的 3 件事...',
    completed: '今晚安心清單已完成，現在只需要照著三張卡片慢慢收尾就好。',
  },
]

const reminderRoutineBatteryStatus = {
  iPhone: { percent: 18, status: 'low', charging: false },
  appleWatch: { percent: 24, status: 'low', charging: false },
  powerBank: { percent: 12, status: 'low', charging: false },
  earbuds: { percent: 35, status: 'medium', charging: false },
}

const reminderRoutineChecklistTemplate = [
  {
    id: 'battery',
    title: '手機與裝置充電',
    caption: 'iPhone 目前 18%，Apple Watch 24%，隨身充 12%。建議睡前先把主要裝置接上電源。',
    tag: '高優先',
    actionPrimary: '已完成',
    actionSecondary: '稍後提醒',
  },
  {
    id: 'meeting-items',
    title: '明日會議準備',
    caption: '明天 09:00 有專案同步會議，建議今晚先把識別證、鑰匙與筆電充電器放進包包。',
    tag: '明日準備',
    actionPrimary: '已完成',
    actionSecondary: '稍後提醒',
  },
  {
    id: 'trash',
    title: '倒垃圾提醒',
    caption: '今晚 20:30 的倒垃圾提醒尚未完成，如果今天還來得及，可以先處理。',
    tag: '生活事項',
    actionPrimary: '已完成',
    actionSecondary: '明天提醒',
  },
]

function createReminderRoutineSteps() {
  return reminderRoutineStepTemplate.map((step) => ({
    ...step,
    status: 'pending',
    progress: 0,
  }))
}

function createReminderRoutineChecklist() {
  return reminderRoutineChecklistTemplate.map((item) => ({
    ...item,
    status: 'pending',
  }))
}

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light'
  return window.localStorage.getItem('a-life-theme') || 'light'
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme)
  const [page, setPage] = useState(() => {
    if (typeof window === 'undefined') return 'home'
    const hashPage = window.location.hash.replace('#', '')
    return pageMap[hashPage] ? hashPage : 'home'
  })
  const [now, setNow] = useState(() => new Date())
  const [sleepModeActive, setSleepModeActive] = useState(false)
  const [deviceStates, setDeviceStates] = useState(deviceCards)
  const [askText, setAskText] = useState('')
  const [askCategory, setAskCategory] = useState('家庭')
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [mobileSearchText, setMobileSearchText] = useState('')
  const [morningFlow, setMorningFlow] = useState({
    active: false,
    elapsed: 0,
    completed: false,
  })
  const [smartHomeReadyVisible, setSmartHomeReadyVisible] = useState(false)
  const [reminderFlowRequestId, setReminderFlowRequestId] = useState(0)

  useEffect(() => {
    document.documentElement.className = theme
    window.localStorage.setItem('a-life-theme', theme)
  }, [theme])

  useEffect(() => {
    const tick = () => setNow(new Date())
    tick()
    const timer = window.setInterval(tick, 30000)
    return () => window.clearInterval(timer)
  }, [])

  const isDark = theme === 'dark'
  const pageMeta = pageMap[page] || pageMap.home

  const currentTime = useMemo(() => {
    return now
      .toLocaleTimeString('zh-TW', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
      .replace(/^0/, '')
  }, [now])

  const currentFullDateTime = useMemo(() => {
    const date = now
      .toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\//g, '/')

    return `${date} ${currentTime}`
  }, [currentTime, now])

  const goToPage = useCallback((target) => {
    setPage(target)
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
  }, [])

  const resetToInitialHome = useCallback(() => {
    setTheme('light')
    setPage('home')
    setSleepModeActive(false)
    setDeviceStates(deviceCards)
    setAskText('')
    setAskCategory('家庭')
    setMobileSearchOpen(false)
    setMobileSearchText('')
    setSmartHomeReadyVisible(false)
    setMorningFlow({
      active: false,
      elapsed: 0,
      completed: false,
    })
    setReminderFlowRequestId(0)
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
  }, [])

  const startPersonalReminderFlow = useCallback(() => {
    setPage('tasks')
    setReminderFlowRequestId((value) => value + 1)
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
  }, [])

  const toggleDeviceState = (name) => {
    setDeviceStates((current) =>
      current.map((device) => {
        if (device.name !== name) return device
        return { ...device, state: device.state === 'on' ? 'off' : 'on' }
      }),
    )
  }

  const setSleepScene = useCallback((active, options = {}) => {
    setSleepModeActive(active)
    setTheme(active ? 'dark' : 'light')
    setDeviceStates(
      active
        ? options.allOff
          ? [
              { name: '主燈', room: '臥室', state: 'off', meta: '已關閉', icon: 'lightbulb' },
              { name: '客廳燈光', room: '客廳', state: 'off', meta: '已關閉', icon: 'lightbulb' },
              { name: '空調', room: '臥室', state: 'off', meta: '已關閉', icon: 'ac_unit' },
              { name: '床頭燈', room: '臥室', state: 'off', meta: '已關閉', icon: 'lightbulb' },
            ]
          : [
              { name: '主燈', room: '臥室', state: 'off', meta: '已關閉', icon: 'lightbulb' },
              { name: '客廳燈光', room: '客廳', state: 'off', meta: '已關閉', icon: 'lightbulb' },
              { name: '空調', room: '臥室', state: 'on', meta: '24°C · 自動', icon: 'ac_unit' },
              { name: '床頭燈', room: '臥室', state: 'on', meta: '夜燈模式', icon: 'lightbulb' },
            ]
        : deviceCards,
    )
    goToPage('devices')
  }, [goToPage])

  const startMorningConversation = () => {
    setAskText('我想早起')
    setTheme('light')
    setSleepModeActive(false)
    setDeviceStates(deviceCards)
    setSmartHomeReadyVisible(false)
    setMorningFlow({
      active: true,
      elapsed: 0,
      completed: false,
    })
    goToPage('assistant')
  }

  const handleAskSubmit = () => {
    const normalizedAsk = askText.trim()
    if (!normalizedAsk) return

    if (normalizedAsk.includes('早起')) {
      startMorningConversation()
      return
    }

    goToPage('assistant')
  }

  const handleMobileSearchSubmit = (event) => {
    event.preventDefault()
    const normalizedSearch = mobileSearchText.trim()
    if (!normalizedSearch) return
    setAskText(normalizedSearch)
    setMobileSearchOpen(false)
    goToPage('assistant')
  }

  useEffect(() => {
    if (!morningFlow.active || morningFlow.completed) return undefined

    const flowTimer = window.setInterval(() => {
      setMorningFlow((current) => {
        if (!current.active || current.completed) return current
        return {
          ...current,
          elapsed: Math.min(current.elapsed + 120, morningTimeline.total + 1200),
        }
      })
    }, 120)

    return () => window.clearInterval(flowTimer)
  }, [morningFlow.active, morningFlow.completed])

  useEffect(() => {
    if (!morningFlow.active || morningFlow.completed || morningFlow.elapsed < morningTimeline.total) return undefined

    const activateTimer = window.setTimeout(() => {
      setSleepScene(true, { allOff: true })
      setSmartHomeReadyVisible(true)
      setMorningFlow((current) => ({ ...current, completed: true, elapsed: morningTimeline.total + 1200 }))
    }, 900)

    return () => window.clearTimeout(activateTimer)
  }, [morningFlow.active, morningFlow.completed, morningFlow.elapsed, setSleepScene])

  useEffect(() => {
    const livingRoomLightClosedAt = morningTimeline.smartHomeStart + smartHomeDeviceStages[0].duration + 400
    if (!morningFlow.active || morningFlow.completed || morningFlow.elapsed < livingRoomLightClosedAt || theme === 'dark') return undefined

    const darkModeTimer = window.setTimeout(() => {
      setSleepModeActive(true)
      setTheme('dark')
    }, 0)

    return () => window.clearTimeout(darkModeTimer)
  }, [morningFlow.active, morningFlow.completed, morningFlow.elapsed, theme])

  const morningFlowView = getMorningFlowView(morningFlow.elapsed)
  const morningAutoFollowTick = Math.floor(morningFlow.elapsed / 900)

  useEffect(() => {
    if (!smartHomeReadyVisible) return undefined

    const hideTimer = window.setTimeout(() => {
      setSmartHomeReadyVisible(false)
    }, 5000)

    return () => window.clearTimeout(hideTimer)
  }, [smartHomeReadyVisible])

  useEffect(() => {
    if (!morningFlow.active || page !== 'assistant') return undefined

    const scrollTimer = window.setTimeout(() => {
      document.querySelector('.chat-demo-card')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 180)

    return () => window.clearTimeout(scrollTimer)
  }, [morningFlow.active, page])

  useEffect(() => {
    if (!morningFlow.active || morningFlow.completed || page !== 'assistant') return undefined

    const followTimer = window.setTimeout(() => {
      const target = morningFlowView.smartHomeStarted
        ? document.querySelector('.smart-device-focus')
        : document.querySelector('.chat-thread > :last-child')

      target?.scrollIntoView({
        behavior: 'smooth',
        block: morningFlowView.smartHomeStarted ? 'center' : 'nearest',
      })
    }, 120)

    return () => window.clearTimeout(followTimer)
  }, [morningAutoFollowTick, morningFlow.active, morningFlow.completed, morningFlowView.smartHomeStarted, page])

  return (
    <div className="shell">
      {mobileSearchOpen ? (
        <form className="mobile-brand-bar mobile-search-bar glass" role="search" onSubmit={handleMobileSearchSubmit}>
          <Icon name="search" small aria-hidden="true" />
          <input
            type="search"
            value={mobileSearchText}
            onChange={(event) => setMobileSearchText(event.target.value)}
            placeholder="搜尋或直接問 Chat"
            aria-label="搜尋"
            autoFocus
          />
          <button type="button" onClick={() => setMobileSearchOpen(false)} aria-label="關閉搜尋">
            <Icon name="close" small aria-hidden="true" />
          </button>
        </form>
      ) : (
        <div className="mobile-brand-bar glass">
          <button className="mobile-brand-main" type="button" onClick={resetToInitialHome} aria-label="回到 NestBuddy 巢伴首頁初始狀態">
            <span className="mobile-brand-logo">
              <img src={nestBuddyLogo} alt="" />
            </span>
            <span className="mobile-brand-copy">
              <small>NESTBUDDY</small>
              <strong>巢伴</strong>
            </span>
          </button>
          <button className="mobile-search-toggle" type="button" onClick={() => setMobileSearchOpen(true)} aria-label="開啟搜尋">
            <Icon name="search" small aria-hidden="true" />
          </button>
        </div>
      )}

      <aside className="sidebar glass">
        <button className="brand" type="button" onClick={resetToInitialHome} aria-label="回到 NestBuddy 巢伴首頁初始狀態">
          <div className="brand-icon" aria-hidden="true">
            <img src={nestBuddyLogo} alt="" />
          </div>
          <div>
            <p className="brand-kicker">NESTBUDDY</p>
            <h1>巢伴</h1>
          </div>
        </button>

        <button className="new-chat" type="button" onClick={() => goToPage('assistant')}>
          <span className="rail-fallback" aria-hidden="true">+</span>
          <Icon name="add" data-rail-icon="+" />
          <span>新對話</span>
        </button>

        <nav className="side-nav" aria-label="桌面導覽">
          <NavButton active={page === 'home'} icon="dashboard" label="首頁" onClick={() => goToPage('home')} />
          <NavButton active={page === 'devices'} icon="devices" label="智慧家庭" onClick={() => goToPage('devices')} />
          <NavButton active={page === 'tasks'} icon="task_alt" label="生活提醒" onClick={() => goToPage('tasks')} />
        </nav>

        {morningFlowView.sidebarVisible ? (
          <SidebarMorningTask completed={morningFlow.completed} onOpenChat={() => goToPage('assistant')} />
        ) : null}

        <div className="side-footer">
          <button className="mode-pill" type="button" onClick={() => setTheme(isDark ? 'light' : 'dark')}>
            <span className="rail-fallback" aria-hidden="true">{isDark ? '☀' : '☾'}</span>
            <Icon name={isDark ? 'light_mode' : 'dark_mode'} data-rail-icon={isDark ? '☀' : '☾'} />
            <span>{isDark ? '淺色模式' : '深色模式'}</span>
          </button>

          <div className="utility-links">
            <button type="button" onClick={() => goToPage('settings')} className={page === 'settings' ? 'active' : ''}>
              <span className="rail-fallback" aria-hidden="true">⚙</span>
              <Icon name="settings" data-rail-icon="⚙" />
              <span>設定</span>
            </button>
            <a href="#help">
              <span className="rail-fallback" aria-hidden="true">?</span>
              <Icon name="help" data-rail-icon="?" />
              <span>說明</span>
            </a>
          </div>
        </div>
      </aside>

      <main className="content" id="home">
        <div className="content-inner">
          <header className="header">
            <LiveStatusRow currentTime={currentTime} className="mobile-main-status-row" />
            <div className="headline">
              <p className="page-kicker">{pageMeta.kicker}</p>
              <h2>{pageMeta.title}</h2>
              <LiveStatusRow currentTime={currentTime} className="headline-status-row" />
              <div className="headline-soft-rule" aria-label="生活提醒同步狀態">
                <div className="headline-ticker-track">
                  {[...headlineTickerItems, ...headlineTickerItems].map((item, index) => (
                    <span key={`${item}-${index}`}>{item}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="header-tools">
              <label className="search-pill" aria-label="搜尋">
                <Icon name="search" small />
                <input type="search" placeholder="搜尋" aria-label="搜尋" />
              </label>

              <LiveStatusRow currentTime={currentTime} className="header-status" />
            </div>
          </header>

          {page === 'home' ? (
            <HomePage
              goToPage={goToPage}
              askText={askText}
              askCategory={askCategory}
              onChangeText={setAskText}
              onPickCategory={setAskCategory}
              onPickPrompt={(prompt) => setAskText(prompt)}
              onSubmit={handleAskSubmit}
            />
          ) : null}
          {page === 'assistant' ? <AssistantPage morningFlow={morningFlow} morningFlowView={morningFlowView} goToPage={goToPage} /> : null}
          {page === 'briefing' ? <BriefingPage /> : null}
          {page === 'devices' ? (
            <DevicesPage
              currentTime={currentTime}
              sleepModeActive={sleepModeActive}
              smartHomeReadyVisible={smartHomeReadyVisible}
              onEnableSleepMode={() => setSleepScene(true)}
              onDisableSleepMode={() => setSleepScene(false)}
              deviceStates={deviceStates}
              onToggleDevice={toggleDeviceState}
            />
          ) : null}
          {page === 'tasks' ? (
            <TasksPage
              currentFullDateTime={currentFullDateTime}
              onStartReminderChat={startPersonalReminderFlow}
              reminderFlowRequestId={reminderFlowRequestId}
            />
          ) : null}
          {page === 'settings' ? <SettingsPage goToPage={goToPage} setTheme={setTheme} theme={theme} /> : null}
          {page === 'modules' ? <ModuleLibraryPage /> : null}

          <footer className="footer">
            <p>NestBuddy-AiLife · 巢伴 v1.0</p>
          </footer>
        </div>
      </main>

      <nav className="bottom-nav glass" aria-label="手機底部導覽">
        <BottomNavButton active={page === 'home'} icon="home" label="首頁" onClick={() => goToPage('home')} />
        <BottomNavButton active={page === 'devices'} icon="devices" label="家電" onClick={() => goToPage('devices')} />
        <BottomNavButton active={page === 'tasks' && reminderFlowRequestId > 0} icon="auto_awesome" label="Chat" onClick={startPersonalReminderFlow} featured />
        <BottomNavButton active={page === 'tasks' && reminderFlowRequestId === 0} icon="task_alt" label="提醒" onClick={() => goToPage('tasks')} />
        <BottomNavButton active={page === 'settings'} icon="settings" label="設定" onClick={() => goToPage('settings')} />
      </nav>
    </div>
  )
}

const pageMap = {
  home: { kicker: 'HOME / 首頁', title: 'Hi 哲宇，今天過得還好嗎？' },
  assistant: { kicker: '問問 AI', title: '想整理什麼，直接問我就好。' },
  briefing: { kicker: 'TOMORROW / 明日簡報', title: '明天準備好了，可以放心休息。' },
  devices: { kicker: 'SMART HOME / 智慧家具', title: '智慧家具' },
  tasks: { kicker: 'TASKS / 生活提醒', title: '今天的提醒慢慢整理，不用急。' },
  settings: { kicker: 'SETTINGS / 設定', title: '偏好與模式放在這裡，清楚一點。' },
  modules: { kicker: 'MODULE LIBRARY / 更多模組', title: '更多模組先低調預覽，不展開成完整功能。' },
}

const categoryTabs = [
  { label: '個人', icon: 'person' },
  { label: '家庭', icon: 'home' },
  { label: '工作', icon: 'work' },
]

const railIconMap = {
  dashboard: '⌂',
  devices: '▣',
  task_alt: '✓',
}

const bottomNavIconMap = {
  home: '⌂',
  devices: '▣',
  auto_awesome: '✦',
  task_alt: '✓',
  settings: '⚙',
}


const iconPaths = {
  add: [<path key="1" d="M12 5v14" />, <path key="2" d="M5 12h14" />],
  dashboard: [<rect key="1" x="4" y="4" width="7" height="7" rx="2" />, <rect key="2" x="13" y="4" width="7" height="7" rx="2" />, <rect key="3" x="4" y="13" width="7" height="7" rx="2" />, <rect key="4" x="13" y="13" width="7" height="7" rx="2" />],
  home: [<path key="1" d="M4 11.5 12 5l8 6.5" />, <path key="2" d="M6.5 10.5V20h11v-9.5" />, <path key="3" d="M10 20v-5h4v5" />],
  devices: [<rect key="1" x="4" y="5" width="11" height="14" rx="2" />, <path key="2" d="M17 8h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2" />, <path key="3" d="M8 16h3" />],
  task_alt: [<circle key="1" cx="12" cy="12" r="8" />, <path key="2" d="m8.8 12.2 2.1 2.1 4.6-5" />],
  settings: [<circle key="1" cx="12" cy="12" r="3" />, <path key="2" d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.4 1a7 7 0 0 0-1.7-1L14.5 3h-5l-.4 3a7 7 0 0 0-1.7 1l-2.4-1-2 3.4 2 1.5a7 7 0 0 0 0 2L3 14.5l2 3.4 2.4-1a7 7 0 0 0 1.7 1l.4 3h5l.4-3a7 7 0 0 0 1.7-1l2.4 1 2-3.4-2-1.5c.1-.3.1-.7.1-1Z" />],
  search: [<circle key="1" cx="10.5" cy="10.5" r="5.5" />, <path key="2" d="m15 15 5 5" />],
  close: [<path key="1" d="m6 6 12 12" />, <path key="2" d="m18 6-12 12" />],
  dark_mode: [<path key="1" d="M18.5 15.7A7.2 7.2 0 0 1 8.3 5.5 7.8 7.8 0 1 0 18.5 15.7Z" />],
  light_mode: [<circle key="1" cx="12" cy="12" r="3.2" />, <path key="2" d="M12 3.5v1.8M12 18.7v1.8M5.6 5.6l1.3 1.3M17.1 17.1l1.3 1.3M3.5 12h1.8M18.7 12h1.8M5.6 18.4l1.3-1.3M17.1 6.9l1.3-1.3" />],
  auto_awesome: [<path key="1" d="m12 4.5 1.25 4.25L17.5 10l-4.25 1.25L12 15.5l-1.25-4.25L6.5 10l4.25-1.25L12 4.5Z" />, <path key="2" d="m18.5 15.5.55 1.45 1.45.55-1.45.55-.55 1.45-.55-1.45-1.45-.55 1.45-.55.55-1.45Z" />],
  arrow_upward: [<path key="1" d="M12 19V5" />, <path key="2" d="m6 11 6-6 6 6" />],
  mic: [<path key="1" d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3Z" />, <path key="2" d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" />],
  arrow_right: [<path key="1" d="M5 12h14" />, <path key="2" d="m13 6 6 6-6 6" />],
  arrow_forward: [<path key="1" d="M5 12h14" />, <path key="2" d="m13 6 6 6-6 6" />],
  wb_twilight: [<path key="1" d="M4 16h16" />, <path key="2" d="M7 16a5 5 0 0 1 10 0" />, <path key="3" d="M12 5v2M5 9l1.5 1.5M19 9l-1.5 1.5" />],
  lightbulb: [<path key="1" d="M9 18h6" />, <path key="2" d="M10 21h4" />, <path key="3" d="M8 10a4 4 0 1 1 8 0c0 2-1.2 3-2 4H10c-.8-1-2-2-2-4Z" />],
  lightbulb_outline: [<path key="1" d="M9 18h6" />, <path key="2" d="M10 21h4" />, <path key="3" d="M8 10a4 4 0 1 1 8 0c0 2-1.2 3-2 4H10c-.8-1-2-2-2-4Z" />],
  notifications_active: [<path key="1" d="M6 17h12l-1.2-2V11a4.8 4.8 0 0 0-9.6 0v4L6 17Z" />, <path key="2" d="M10 19a2 2 0 0 0 4 0" />, <path key="3" d="M4 9a7 7 0 0 1 2-4M20 9a7 7 0 0 0-2-4" />],
  person: [<circle key="1" cx="12" cy="8" r="3" />, <path key="2" d="M5 20a7 7 0 0 1 14 0" />],
  work: [<rect key="1" x="4" y="7" width="16" height="12" rx="2" />, <path key="2" d="M9 7V5h6v2M4 12h16" />],
  water_drop: [<path key="1" d="M12 3s6 6.2 6 11a6 6 0 0 1-12 0c0-4.8 6-11 6-11Z" />],
  bedtime: [<path key="1" d="M20 15.5A8 8 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" />],
  bolt: [<path key="1" d="M13 2 4 14h7l-1 8 10-13h-7l1-7Z" />],
  calendar_month: [<rect key="1" x="4" y="5" width="16" height="15" rx="2" />, <path key="2" d="M8 3v4M16 3v4M4 10h16" />],
  event_available: [<rect key="1" x="4" y="5" width="16" height="15" rx="2" />, <path key="2" d="M8 3v4M16 3v4M8 14l2.2 2.2L16 11" />],
  ac_unit: [<path key="1" d="M12 3v18M5 7l14 10M19 7 5 17" />, <path key="2" d="m9 5 3 3 3-3M9 19l3-3 3 3" />],
  bedroom_parent: [<path key="1" d="M4 11h16v8" />, <path key="2" d="M4 19V7M8 11V8h5v3" />],
  check: [<path key="1" d="m5 12 4 4L19 6" />],
  check_circle: [<circle key="1" cx="12" cy="12" r="8" />, <path key="2" d="m8.5 12.2 2.2 2.2 4.8-5" />],
  schedule: [<circle key="1" cx="12" cy="12" r="8" />, <path key="2" d="M12 7v5l3 2" />],
  edit: [<path key="1" d="M4 20h4L19 9l-4-4L4 16v4Z" />, <path key="2" d="m13.5 6.5 4 4" />],
  photo_camera: [<path key="1" d="M4 8h4l1.5-2h5L16 8h4v11H4V8Z" />, <circle key="2" cx="12" cy="13.5" r="3" />],
  directions_walk: [<path key="1" d="M13 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />, <path key="2" d="m10 9-2 4 4 1 1 6M12 10l3 3 3 1M9 20l2-4" />],
  self_improvement: [<path key="1" d="M12 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />, <path key="2" d="M5 13h5l2-4 2 4h5M8 20l4-4 4 4" />],
  battery_alert: [<rect key="1" x="5" y="7" width="13" height="10" rx="2" />, <path key="2" d="M18 10h2v4h-2M11.5 9v4M11.5 15h.01" />],
  badge: [<rect key="1" x="6" y="4" width="12" height="16" rx="2" />, <circle key="2" cx="12" cy="10" r="2" />, <path key="3" d="M9 16h6" />],
  delete: [<path key="1" d="M5 7h14M10 11v6M14 11v6M8 7l1 13h6l1-13M10 7V5h4v2" />],
  help: [<circle key="1" cx="12" cy="12" r="9" />, <path key="2" d="M9.8 9a2.4 2.4 0 0 1 4.5 1.2c0 1.8-2.3 2-2.3 3.8M12 17h.01" />],
}

function Icon({ name, className = '', small = false, ...props }) {
  const paths = iconPaths[name] ?? iconPaths.auto_awesome
  return (
    <span className={`material svg-icon ${small ? 'small' : ''} ${className}`.trim()} {...props}>
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        {paths}
      </svg>
    </span>
  )
}

function NavButton({ active, icon, label, onClick }) {
  return (
    <button className={`side-link ${active ? 'active' : ''}`} type="button" onClick={onClick}>
      <span className="rail-fallback" aria-hidden="true">{railIconMap[icon] ?? '•'}</span>
      <Icon name={icon} data-rail-icon={railIconMap[icon] ?? '•'} />
      <span>{label}</span>
    </button>
  )
}

function BottomNavButton({ active, icon, label, onClick, featured = false }) {
  return (
    <button className={`${active ? 'active' : ''} ${featured ? 'featured' : ''}`} type="button" onClick={onClick}>
      <Icon name={icon} data-bottom-icon={bottomNavIconMap[icon] ?? '•'} />
      <span>{label}</span>
    </button>
  )
}

function LiveStatusRow({ currentTime, className = '' }) {
  return (
    <div className={className} aria-label={`Home Live，目前時間 ${currentTime}，晴朗`}>
      <span className="status-chip connected">
        <span className="status-icon check" aria-hidden="true">✓</span>
        Home Live
      </span>
      <span className="status-chip time">
        <span className="status-icon time" aria-hidden="true">◷</span>
        {currentTime}
      </span>
      <span className="status-chip weather">
        <span className="status-icon weather" aria-hidden="true">☀</span>
        晴朗
      </span>
    </div>
  )
}

function CategoryChips({ activeCategory, onPickCategory }) {
  return (
    <div className="query-chips query-chips-outside" aria-label="生活分類">
      {categoryTabs.map((category) => (
        <button
          key={category.label}
          type="button"
          className={activeCategory === category.label ? 'active' : ''}
          onClick={() => onPickCategory?.(category.label)}
        >
          <Icon name={category.icon} />
          <span>{category.label}</span>
        </button>
      ))}
    </div>
  )
}

function AskAIBlock({ askText, onChangeText, onPickPrompt, onSubmit, hideGuidance = false }) {
  const inputHints = [
    '行程、提醒、家中設備，都可以直接問我。',
    '不知道怎麼開始也沒關係，先說一件小事就好。',
  ]
  const [hintIndex, setHintIndex] = useState(0)
  const [hintVisible, setHintVisible] = useState(true)
  const quickPrompts = [
    { icon: 'wb_twilight', title: '我想早起' },
    { icon: 'lightbulb', title: '關燈' },
    { icon: 'notifications_active', title: '提醒生活' },
  ]

  useEffect(() => {
    const hintTimer = window.setInterval(() => {
      setHintVisible(false)

      window.setTimeout(() => {
        setHintIndex((index) => (index + 1) % inputHints.length)
        setHintVisible(true)
      }, 520)
    }, 3600)

    return () => window.clearInterval(hintTimer)
  }, [inputHints.length])

  return (
    <section className="ask-section glass">
      <div className="ask-card" id="ask-ai">
        <div className="ask-glow" />
        <div className="ask-input-shell">
          <Icon name="auto_awesome" className="ask-icon" />
          <input
            type="text"
            placeholder=""
            aria-label="問問 AI"
            value={askText}
            onChange={(event) => onChangeText?.(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') onSubmit?.()
            }}
          />
          {!askText ? (
            <span className={`ask-placeholder ${hintVisible ? 'visible' : ''}`}>
              {inputHints[hintIndex]}
            </span>
          ) : null}
          <button type="button" className={`ask-submit ${askText ? 'ready' : ''}`} onClick={onSubmit}>
            <Icon name="arrow_upward" />
            {askText ? <span>開始對話</span> : null}
          </button>
        </div>
      </div>

      {!hideGuidance ? (
        <>
          <p className="ask-hint">行程、提醒、家中設備或明日準備，都可以直接問我。</p>

          <div className="ask-suggestion-row">
            <p className="ask-suggestion-kicker">不知道怎麼問？試試看：</p>
            <div className="ask-suggestions" aria-label="快速建議">
              {quickPrompts.map((prompt) => (
                <button key={prompt.title} type="button" className="suggestion-chip" onClick={() => onPickPrompt?.(prompt.title)}>
                  <Icon name={prompt.icon} />
                  <span>{prompt.title}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </section>
  )
}

function SidebarMorningTask({ completed, onOpenChat }) {
  return (
    <div className="sidebar-morning-task">
      <p className="summary-kicker">RECENT CHAT</p>
      <details>
        <summary>
          <Icon name="wb_twilight" small />
          <span>
            <strong>我想早起</strong>
            <small>{completed ? '鬧鐘已啟用' : 'Morning Routine Chat'}</small>
          </span>
        </summary>
        <div className="sidebar-task-detail">
          <span>HP meeting 09:00</span>
          <span>鬧鐘 07:50 / 08:00 · 已啟用</span>
          <span>{completed ? '睡眠模式已啟用' : '睡眠模式準備中'}</span>
          <button type="button" onClick={onOpenChat}>
            返回對話結果
          </button>
        </div>
      </details>
    </div>
  )
}

function HomePage({ goToPage, askText, askCategory, onChangeText, onPickCategory, onPickPrompt, onSubmit }) {
  const [sensorIndex, setSensorIndex] = useState(0)
  const [sensorVisible, setSensorVisible] = useState(true)

  useEffect(() => {
    let timeoutId
    const interval = window.setInterval(() => {
      setSensorVisible(false)

      timeoutId = window.setTimeout(() => {
        setSensorIndex((current) => (current + 1) % indoorTemperatureReadings.length)
        setSensorVisible(true)
      }, 520)
    }, 5400)

    return () => {
      window.clearInterval(interval)
      window.clearTimeout(timeoutId)
    }
  }, [])

  const homeSummaryCards = useMemo(
    () => [
      {
        ...summaryCards[0],
        value: humidityReadings[sensorIndex].value,
        bar: humidityReadings[sensorIndex].bar,
        animated: true,
      },
      {
        title: '室內溫度',
        value: indoorTemperatureReadings[sensorIndex].value,
        caption: '冷氣感應',
        note: '舒適範圍內',
        icon: 'device_thermostat',
        accent: 'temperature',
        bar: indoorTemperatureReadings[sensorIndex].bar,
        animated: true,
      },
      ...summaryCards.slice(1),
    ],
    [sensorIndex],
  )

  return (
    <>
      <AskAIBlock
        askText={askText}
        askCategory={askCategory}
        onChangeText={onChangeText}
        onPickPrompt={onPickPrompt}
        onSubmit={onSubmit}
      />

      <CategoryChips activeCategory={askCategory} onPickCategory={onPickCategory} />

      <section className="summary-grid" aria-label="今日摘要">
        {homeSummaryCards.map((card) => (
          <article key={card.title} className={`summary glass ${card.accent}`}>
            <div className="summary-ribbon" aria-hidden="true" />
            <div className="summary-head">
              <div>
                <p className="summary-kicker">{card.title}</p>
                <div className="summary-value-row">
                  <strong className={card.animated ? `sensor-reading ${sensorVisible ? 'visible' : ''}` : undefined}>
                    {card.value}
                  </strong>
                  <span>{card.caption}</span>
                </div>
                {card.note ? <p className="summary-note">{card.note}</p> : null}
              </div>
              <div className={`summary-icon ${card.accent}`}>
                <Icon name={card.icon} />
              </div>
            </div>

            {card.actions ? (
              <div className="quick-actions summary-actions">
                {card.actions.map((action) => (
                  <button key={action} type="button">
                    <Icon name="arrow_right" small />
                    {action}
                  </button>
                ))}
              </div>
            ) : (
              <div className="summary-foot">
                <span className="summary-foot-label">
                  {card.title === '環境' ? '舒適狀態' : card.title === '室內溫度' ? '冷氣偵測' : '睡眠就緒'}
                </span>
                <div className="summary-mini-bar">
                  <span
                    className={card.animated ? 'sensor-bar' : undefined}
                    style={{ width: card.bar ? `${card.bar}%` : undefined }}
                  />
                </div>
              </div>
            )}
          </article>
        ))}
      </section>

      <div className="modules-header">
        <h3>常用模組</h3>
        <button type="button" className="edit-link">
          編輯 <Icon name="edit" small />
        </button>
      </div>

      <section className="module-grid" aria-label="三個正式 demo modules">
        {modules.map((module) => (
          <ModuleCard key={module.id} module={module} goToPage={goToPage} />
        ))}
      </section>

      <section className="more-entry glass">
        <div>
          <p className="summary-kicker">MODULE LIBRARY</p>
          <h3>更多模組</h3>
          <p>健康監測、家庭空間、車載模式與情緒分析先作為 Coming Soon 預覽，不在首頁展開。</p>
        </div>
        <button type="button" className="secondary-action" onClick={() => goToPage('modules')}>
          更多模組 →
        </button>
      </section>
    </>
  )
}

function ModuleCard({ module, goToPage }) {
  return (
    <article className="module glass">
      <div className="module-top">
        <div className="module-icon">
          <Icon name={module.icon} />
        </div>
        <div>
          <h4>{module.title}</h4>
          <p className="module-description">{module.description}</p>
        </div>
      </div>

      {'entries' in module ? (
        <div className="module-body stack-list">
          {module.entries.map((entry) => (
            <div key={entry.title} className="stack-row">
              <div className="stack-time">{entry.time}</div>
              <div>
                <strong>{entry.title}</strong>
                <p>{entry.sub}</p>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {'controls' in module ? (
        <div className="module-body control-list">
          {module.controls.map((control) => (
            <button key={control.label} type="button" className="control-row">
              <span>
                <Icon name={control.label.includes('燈') ? 'lightbulb' : 'ac_unit'} small />
                {control.label}
              </span>
              <span className={`control-pill ${control.state === 'on' ? 'on' : 'off'}`}>{control.state}</span>
            </button>
          ))}
        </div>
      ) : null}

      {'reminders' in module ? <ReminderPreview reminders={module.reminders} /> : null}

      <div className="module-foot">
        <div className="insight">
          <p>{module.insight}</p>
        </div>
        <button type="button" className="module-action" onClick={() => goToPage(module.page)}>
          進入{module.title}
          <Icon name="arrow_forward" small />
        </button>
      </div>
    </article>
  )
}

function ReminderPreview({ reminders }) {
  return (
    <div className="module-body reminder-list">
      <div className="reminder-summary">
        <div>
          <p className="summary-kicker">今日完成度</p>
          <strong>33%</strong>
        </div>
        <div className="reminder-progress">
          <div className="progress" aria-label="今日生活提醒完成度 33%">
            <span style={{ width: '33%' }} />
          </div>
          <span>1 done · 1 missed · 2 upcoming</span>
        </div>
      </div>
      {reminders.slice(0, 3).map((reminder) => (
        <div key={`${reminder.time}-${reminder.label}`} className={`reminder-row ${reminder.state}`}>
          <div className="reminder-mark">
            {reminder.state === 'done' ? <Icon name="check" small /> : null}
          </div>
          <div className="reminder-copy">
            <div className="reminder-line">
              <strong>{reminder.label}</strong>
              <span className="reminder-time">{reminder.time}</span>
            </div>
            <p>{reminder.caption}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function AssistantPage({ morningFlow, morningFlowView }) {
  if (morningFlow?.active) {
    return (
      <section className="morning-demo-layout">
        <div className="morning-demo-main">
          <section className="chat-demo-card glass" aria-label="早起情境對話">
            <div className="chat-demo-header">
              <div>
                <p className="summary-kicker">MORNING ROUTINE CHAT</p>
                <h3>早起情境演練</h3>
              </div>
              <span className="chat-status-pill"><Icon name="event_available" small />Google Calendar</span>
            </div>
            <div className="chat-thread">
              {morningFlowView.visibleMessages.map((message, index) => (
                <div key={`${message.type}-${index}`} className={`chat-message ${message.type}${message.tone ? ` ${message.tone}` : ''}`}>
                  <p>{message.text}</p>
                </div>
              ))}
              {morningFlowView.smartHomeStarted ? <SmartHomeDetectionCard flowView={morningFlowView} /> : null}
            </div>
          </section>
          <StepTimeline steps={morningFlowView.steps} />
        </div>
      </section>
    )
  }

  return <ReminderRoutineFlow key="assistant-reminder-flow" />
}

function StepTimeline({ steps }) {
  const activeStepRef = useRef(null)
  const activeStep = steps.find((step) => step.status === 'processing')
  const activeStepId = activeStep?.id

  useEffect(() => {
    if (!activeStepId) return undefined

    const focusTimer = window.setTimeout(() => {
      activeStepRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      })
    }, 180)

    return () => window.clearTimeout(focusTimer)
  }, [activeStepId])

  return (
    <section className="step-timeline" aria-label="流程步驟">
      {steps.map((step, index) => {
        const isProcessing = step.status === 'processing'
        return (
          <article
            key={step.id}
            ref={isProcessing ? activeStepRef : null}
            className={`step-card ${step.status}${isProcessing ? ' current-step' : ''}`}
            aria-current={isProcessing ? 'step' : undefined}
          >
            {isProcessing ? <span className="current-step-pill">目前正在處理</span> : null}
            <div className="step-card-head">
              <div className="step-icon">
                <Icon name={step.status === 'success' ? 'check' : step.icon} small />
              </div>
              <div>
                <p>Step {index + 1}</p>
                <h4>{step.title}</h4>
              </div>
            </div>
            <p className="step-card-copy">
              {isProcessing ? <span className="running-dot" aria-hidden="true" /> : null}
              {step.status === 'success' ? step.completed : step.processing}
            </p>
            <div
              className="step-progress"
              aria-label={`${step.title} 進度 ${Math.round(step.progress)}%`}
              style={{ '--step-progress-duration': `${step.progressDuration || 220}ms` }}
            >
              <span style={{ width: `${step.progress}%` }} />
            </div>
            {step.id === 'wake-plan' && step.status === 'success' ? <WakePlanResult /> : null}
          </article>
        )
      })}
    </section>
  )
}

function WakePlanResult() {
  return (
    <div className="wake-plan-result">
      <span>明日最早行程：{morningMock.calendar.eventName} {morningMock.calendar.startTime}</span>
      <span>出發：{morningMock.calendar.suggestedDepartTime}</span>
      <span>起床：{morningMock.calendar.suggestedWakeTime}</span>
      <span>鬧鐘：{morningMock.alarms.join(' / ')}</span>
      <span>iPhone / Apple Watch：未充電，睡前記得補電</span>
    </div>
  )
}

function SmartHomeDetectionCard({ flowView }) {
  const complete = flowView.smartHomeComplete
  const activeCheck = flowView.activeSmartHomeCheck

  return (
    <div className="smart-home-detection">
      <div className="smart-home-detection-head">
        <div>
          <p className="summary-kicker">CONNECTING SMART HOME</p>
          <strong>{complete ? '智慧家具已完成關閉' : `正在檢查：${activeCheck.title}`}</strong>
        </div>
        <div className={`countdown-number ${complete ? 'done' : ''}`}>{complete ? '✓' : Math.round(activeCheck.progress)}</div>
      </div>
      <div className={`smart-device-focus ${activeCheck.status}`}>
        <div className={`device-camera-preview ${activeCheck.status === 'success' ? 'is-off' : ''}`}>
          <img src={activeCheck.image} alt={`${activeCheck.source} ${activeCheck.title}示意`} />
          <span>
            <Icon name="photo_camera" small />
            {activeCheck.source}
          </span>
        </div>
        <div className="smart-device-focus-copy">
          <div className="device-focus-title">
            <Icon name={activeCheck.icon} />
            <div>
              <strong>{activeCheck.title}</strong>
              <p>
                {activeCheck.status === 'processing' ? <span className="running-dot small" aria-hidden="true" /> : null}
                {activeCheck.status === 'success' ? activeCheck.done : activeCheck.loading}
              </p>
            </div>
          </div>
          <div className="device-switch-row">
            <span className={activeCheck.status === 'success' ? 'muted' : 'active'}>開啟</span>
            <div className={`device-switch ${activeCheck.status === 'success' ? 'off' : 'on'}`}>
              <i />
            </div>
            <span className={activeCheck.status === 'success' ? 'active' : 'muted'}>關閉</span>
          </div>
          <div className="device-progress">
            <span style={{ width: `${activeCheck.progress}%` }} />
          </div>
          <p className="device-focus-meta">{activeCheck.meta}</p>
        </div>
      </div>
      <div className="smart-device-sequence">
        {flowView.smartHomeChecks.map((check) => (
          <div key={check.id} className={`smart-device-step ${check.status}`}>
            <Icon name={check.status === 'success' ? 'check_circle' : check.icon} />
            <div>
              <strong>{check.title}</strong>
              <p>
                {check.status === 'processing' ? <span className="running-dot small" aria-hidden="true" /> : null}
                {check.status === 'success' ? check.done : check.status === 'processing' ? check.loading : `等待${check.source}`}
              </p>
              <div className="device-progress mini">
                <span style={{ width: `${check.progress}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
      {complete ? (
        <div className="smart-home-success-row">
          <span>客廳燈已關閉</span>
          <span>客廳空調已關閉</span>
          <span>臥室燈光已關閉</span>
        </div>
      ) : null}
    </div>
  )
}

function BriefingPage() {
  return (
    <section className="detail-grid">
      <article className="detail-card hero-detail glass">
        <p className="summary-kicker">BEDTIME SUMMARY</p>
        <h3>明天第一個重要行程是 10:00 Design Sync</h3>
        <p>建議 08:10 起床，保留早餐、通勤與資料整理的緩衝。不需要把整天行程攤開，先抓睡前真正需要確認的事就好。</p>
        <button type="button" className="primary-action">設定 08:10 鬧鐘</button>
      </article>
      <article className="detail-card glass">
        <p className="summary-kicker">PREPARATION</p>
        <h3>睡前準備清單</h3>
        <div className="check-list">
          {prepItems.map((item, index) => (
            <label key={item} className="check-row">
              <input type="checkbox" defaultChecked={index < 2} />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </article>
    </section>
  )
}

function DevicesPage({
  currentTime,
  sleepModeActive,
  smartHomeReadyVisible,
  onEnableSleepMode,
  onDisableSleepMode,
  deviceStates,
  onToggleDevice,
}) {
  const [showSceneTip, setShowSceneTip] = useState(false)
  const sceneTip = sleepModeActive
    ? '主燈與客廳燈光已關閉，空調與床頭夜燈維持舒適狀態。綠燈代表開啟，紅燈代表關閉。'
    : '偵測到時間偏晚，主燈仍開啟。建議把臥室亮度降到 20%，客廳燈關閉，避免突然大面積亮光。'

  const getDeviceMeta = (device) => {
    if (device.state === 'off' && ['主燈', '客廳燈光', '床頭燈'].includes(device.name)) {
      return '已關閉'
    }

    if (device.name === '空調' && device.state === 'off') {
      return '28°C · 偏熱潮濕，建議開空調除濕'
    }

    if (device.name === '床頭燈' && device.state === 'on') {
      return '已開啟，燈亮暖白光，適合讀書'
    }

    return device.meta
  }

  return (
    <>
      {smartHomeReadyVisible ? (
        <section className="smart-home-ready-card glass">
          <div>
            <p className="summary-kicker">SMART HOME READY</p>
            <h3>睡眠環境已準備完成</h3>
            <p>晚安，睡前準備都完成了。客廳燈與空調已關閉，鬧鐘也設定好了。祝你有個愉快又安心的夜晚。</p>
          </div>
          <div className="smart-home-ready-list">
            <span>客廳燈光 · 已關閉 · AI 助理於 22:45 關閉</span>
            <span>客廳空調 · 已關閉 · AI 助理於 22:45 關閉</span>
            <span>睡眠模式 · 已啟用 · 鬧鐘 07:50 / 08:00</span>
            <span>裝置提醒 · iPhone / Apple Watch 記得充電</span>
          </div>
        </section>
      ) : null}
      <section className="detail-grid devices-top-grid">
        <article className="detail-card hero-detail scene-brief-card glass">
          <div className="scene-brief-top">
            <div className="scene-time-pill" aria-label="現在時間">
              <Icon name="schedule" small />
              <strong>{currentTime}</strong>
            </div>
            <div>
              <p className="summary-kicker">AI RECOMMENDED SCENE</p>
              <h3>{sleepModeActive ? '睡眠模式已啟動 · 鬧鐘已啟動 ～ 晚安哲宇' : '低亮度睡前模式'}</h3>
            </div>
          </div>

          <div className="scene-brief-bottom">
            {sleepModeActive ? (
              <button type="button" className="primary-action" onClick={onDisableSleepMode}>
                切換回日間模式
              </button>
            ) : (
              <button type="button" className="primary-action" onClick={onEnableSleepMode}>
                啟動睡眠模式
              </button>
            )}
            <div className="scene-tip-wrap">
              <button
                type="button"
                className={`scene-help-button ${showSceneTip ? 'active' : ''}`}
                aria-label="查看智慧建議說明"
                aria-expanded={showSceneTip}
                onClick={() => setShowSceneTip((value) => !value)}
              >
                ?
              </button>
              {showSceneTip ? (
                <div className="scene-tip-popover" role="status">
                  {sceneTip}
                </div>
              ) : null}
            </div>
          </div>
        </article>
        <article className="detail-card scenes-card glass">
          <p className="summary-kicker">SCENES</p>
          <div className="scene-chip-list" aria-label="簡單情境">
            <button type="button">睡眠</button>
            <button type="button">工作</button>
            <button type="button">電影</button>
          </div>
        </article>
      </section>

      <section className="device-grid">
        {deviceStates.map((device) => {
          const deviceImage = deviceImages[device.name]?.[device.state]

          return (
            <article key={device.name} className="device-card glass">
              {deviceImage ? (
                <div className="device-photo-wrap">
                  <img
                    className="device-photo"
                    src={deviceImage}
                    alt={`${device.name}${device.state === 'on' ? '開啟' : '關閉'}情境示意`}
                  />
                </div>
              ) : null}
              <div className="module-top">
                <div className="module-icon"><Icon name={device.icon} /></div>
                <div>
                  <h4>{device.name}</h4>
                  <p>{device.room} · {getDeviceMeta(device)}</p>
                </div>
              </div>
              <div className="device-footer">
                <span className={`device-status ${device.state === 'on' ? 'on' : 'off'}`}>
                  <Icon name={device.state === 'on' ? 'lightbulb' : 'lightbulb_outline'} small />
                  {device.state === 'on' ? '已開啟' : '已關閉'}
                </span>
                <button type="button" className="secondary-action" onClick={() => onToggleDevice(device.name)}>
                  {device.state === 'on' ? '關閉' : '開啟'}
                </button>
              </div>
            </article>
          )
        })}
      </section>
    </>
  )
}

function ReminderProgressOverview({ dailyProgress, monthlyProgress, recentDays }) {
  return (
    <section className="reminder-progress-overview" aria-label="生活提醒進度">
      <div className="section-head reminder-progress-head">
        <div>
          <p className="summary-kicker">REMINDER PROGRESS</p>
          <h3>生活提醒進度</h3>
          <p>今天的提醒狀態我幫你整理好了，先看重點就好。</p>
        </div>
      </div>

      <div className="reminder-progress-layout">
        <DailyProgressCard progress={dailyProgress} />
        <MonthlyProgressCard progress={monthlyProgress} recentDays={recentDays} />
      </div>

      <div className="progress-stat-grid" aria-label="今日提醒統計">
        <ProgressStatChip
          tone="completed"
          icon="check_circle"
          label="已完成"
          value={`${dailyProgress.completed} 項`}
          description="今天已經完成的生活提醒"
        />
        <ProgressStatChip
          tone="pending"
          icon="task_alt"
          label="未完成"
          value={`${dailyProgress.pending} 項`}
          description="還沒處理，但可以慢慢安排"
        />
        <ProgressStatChip
          tone="due"
          icon="schedule"
          label="快到時間"
          value={`${dailyProgress.dueSoon} 項`}
          description="接下來 30 分鐘內需要注意"
        />
      </div>
    </section>
  )
}

function DailyProgressCard({ progress }) {
  const aiStatus = progress.completed === progress.total
    ? '今天的生活提醒都整理好了，可以安心休息。'
    : `目前已完成 ${progress.completed} 項，還有 ${progress.pending} 項待處理，其中 ${progress.dueSoon} 項快到時間。`
  const rhythmItems = [
    { icon: 'check_circle', label: '已收起', value: `${progress.completed} 項`, tone: 'done' },
    { icon: 'task_alt', label: '慢慢安排', value: `${progress.pending} 項`, tone: 'pending' },
    { icon: 'schedule', label: '先照顧', value: `${progress.dueSoon} 項`, tone: 'due' },
  ]

  return (
    <article className="detail-card glass progress-card daily-progress-card">
      <div className="progress-card-top">
        <div>
          <p className="summary-kicker">DAILY PROGRESS</p>
          <h3>今日進度</h3>
        </div>
        <div className="soft-ring" style={{ '--progress': `${progress.completionRate}%` }}>
          <span>{progress.completionRate}%</span>
        </div>
      </div>
      <div className="soft-progress-track" aria-label={`今日完成率 ${progress.completionRate}%`}>
        <span style={{ width: `${progress.completionRate}%` }} />
      </div>
      <div className="daily-rhythm-strip" aria-label="今日節奏摘要">
        {rhythmItems.map((item) => (
          <span key={item.label} className={item.tone}>
            <Icon name={item.icon} small />
            <small>{item.label}</small>
            <strong>{item.value}</strong>
          </span>
        ))}
      </div>
      <p className="progress-ai-note">{aiStatus}</p>
      <div className="calendar-link-status progress-calendar-status" aria-label="Google Calendar 已連結">
        <Icon name="check_circle" small />
        <span>Google Calendar 已連結</span>
      </div>
    </article>
  )
}

function MonthlyProgressCard({ progress, recentDays }) {
  return (
    <article className="detail-card glass progress-card monthly-progress-card">
      <div className="progress-card-top">
        <div>
          <p className="summary-kicker">MONTHLY RHYTHM</p>
          <h3>本月節奏</h3>
        </div>
        <strong className="monthly-rate">{progress.completionRate}%</strong>
      </div>
      <div className="monthly-progress-bar" aria-label={`本月完成率 ${progress.completionRate}%`}>
        <span style={{ width: `${progress.completionRate}%` }} />
      </div>
      <div className="monthly-chip-list">
        <span>本月已完成：{progress.completed} 項</span>
        <span>本月未完成：{progress.pending} 項</span>
        <span>可補救提醒：{progress.recoverable} 項</span>
        <span>連續整理：{progress.streakDays} 天</span>
      </div>
      <RecentDaysRhythm days={recentDays} />
      <p className="progress-ai-note">這個月已完成 {progress.completed} 項生活提醒，整體節奏維持得不錯。</p>
    </article>
  )
}

function ProgressStatChip({ tone, icon, label, value, description }) {
  return (
    <article className={`progress-stat-chip ${tone}`}>
      <Icon name={icon} />
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        <p>{description}</p>
      </div>
    </article>
  )
}

function RecentDaysRhythm({ days }) {
  return (
    <div className="recent-days-rhythm" aria-label="最近 7 天生活節奏">
      {days.map((day) => (
        <div key={day.date} className={`recent-day-dot ${day.status}`}>
          <span>{day.label}</span>
          <i style={{ height: `${Math.max(day.completionRate, 18)}%` }} />
          <small>{day.date}</small>
        </div>
      ))}
    </div>
  )
}

function DueSoonBadge() {
  return <span className="due-soon-badge"><Icon name="schedule" small />快到時間</span>
}

function MonthlyGoalCard({ monthlyProgress }) {
  return (
    <section className="detail-card glass monthly-goal-card" aria-label="本月目標">
      <div className="monthly-goal-head">
        <div>
          <p className="summary-kicker">MONTHLY GOAL</p>
          <h3>本月目標</h3>
          <p>這不是要你完美完成每一天，只是幫你看見生活節奏正在慢慢穩下來。</p>
        </div>
        <span className="monthly-goal-pill">{monthlyProgress.completionRate}% 穩定中</span>
      </div>
      <div className="monthly-goal-grid">
        <article>
          <Icon name="check_circle" />
          <strong>維持溫和整理</strong>
          <p>本月已完成 {monthlyProgress.completed} 項提醒，先把已經做到的放進心裡。</p>
        </article>
        <article>
          <Icon name="schedule" />
          <strong>可補救就好</strong>
          <p>{monthlyProgress.recoverable} 項提醒可以晚點補，不需要用失敗感看待。</p>
        </article>
        <article>
          <Icon name="auto_awesome" />
          <strong>連續整理 {monthlyProgress.streakDays} 天</strong>
          <p>保持一點點節奏就很好，生活不是績效表，是慢慢被照顧回來。</p>
        </article>
      </div>
    </section>
  )
}


function TasksPage({ currentFullDateTime, onStartReminderChat, reminderFlowRequestId }) {
  const [reminders, setReminders] = useState(reminderItems)
  const [sleepChecklist, setSleepChecklist] = useState(sleepChecklistItems)
  const [toastMessage, setToastMessage] = useState('')
  const [introNoticeVisible, setIntroNoticeVisible] = useState(true)
  const [introNoticeClosing, setIntroNoticeClosing] = useState(false)
  const [gentlePlanSecondsLeft, setGentlePlanSecondsLeft] = useState(10)
  const [suggestionNoticeVisible, setSuggestionNoticeVisible] = useState(true)
  const [sleepChecklistOpen, setSleepChecklistOpen] = useState(false)
  const [snoozeMenuOpen, setSnoozeMenuOpen] = useState(null)
  const [suggestionResolved, setSuggestionResolved] = useState(false)

  const routineActive = reminderFlowRequestId > 0

  const statusLabel = {
    completed: '已完成',
    pending: '待處理',
    snoozed: '已延後',
    missed: '可補救',
    recoverable: '可補救',
  }

  const dailyProgress = getDailyReminderProgress(reminders)
  const completedCount = dailyProgress.completed
  const checklistCompleted = sleepChecklist.filter((item) => item.status === 'completed').length
  const checklistComplete = checklistCompleted === sleepChecklist.length
  const allRemindersComplete = completedCount === reminders.length

  useEffect(() => {
    const countdownTimer = window.setInterval(() => {
      setGentlePlanSecondsLeft((seconds) => Math.max(seconds - 1, 0))
    }, 1000)
    const introFadeTimer = window.setTimeout(() => setIntroNoticeClosing(true), 10000)
    const introHideTimer = window.setTimeout(() => setIntroNoticeVisible(false), 12400)

    return () => {
      window.clearInterval(countdownTimer)
      window.clearTimeout(introFadeTimer)
      window.clearTimeout(introHideTimer)
    }
  }, [])

  const showToast = (message) => {
    setToastMessage(message)
    window.setTimeout(() => setToastMessage(''), 6200)
  }

  const toggleReminder = (id) => {
    setReminders((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === 'completed' ? 'pending' : 'completed',
              description: item.status === 'completed' ? '待處理' : '已完成',
              actionLabel: item.status === 'completed' ? (item.id === 'bedtime-prepare' ? '查看清單' : '稍後提醒') : '已完成',
            }
          : item,
      ),
    )
    showToast('已完成，我幫你更新今日進度。')
  }

  const snoozeReminder = (id, option = '30 分鐘後') => {
    const timeMap = {
      '10 分鐘後': '13:10',
      '30 分鐘後': '13:30',
      今天晚上: '20:30',
    }
    setReminders((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              time: item.id === 'after-lunch-walk' ? timeMap[option] : option === '今天晚上' ? '20:30' : item.time,
              status: 'snoozed',
              description: '已延後',
              actionLabel: '已延後',
            }
          : item,
      ),
    )
    setSnoozeMenuOpen(null)
    setSuggestionResolved(true)
    setSuggestionNoticeVisible(true)
    showToast(`已幫你延後${option === '30 分鐘後' ? ' 30 分鐘' : `到 ${option}`}，晚點我會再提醒你。`)
  }

  const openSleepChecklist = () => {
    setSleepChecklistOpen(true)
    showToast('我幫你整理今晚真正需要確認的三件事。')
  }

  const completeChecklistItem = (id) => {
    setSleepChecklist((items) =>
      items.map((item) => (item.id === id ? { ...item, status: 'completed' } : item)),
    )
  }

  return (
    <>
      {toastMessage ? (
        <div className="reminder-toast" role="status">
          <Icon name="check_circle" small />
          {toastMessage}
        </div>
      ) : null}

      <section className="detail-card glass reminder-chat-entry-card">
        <div>
          <p className="summary-kicker">BEDTIME PEACE CHECK</p>
          <h3>睡前安心清單</h3>
          <p>我會先幫你確認明日行程、生活提醒與裝置電量，再收斂成今晚真正需要做的 3 件事。</p>
          <p className="summary-date-line">{currentFullDateTime}</p>
        </div>
        <button type="button" className="primary-action" onClick={onStartReminderChat}>
          開始對話
          <Icon name="auto_awesome" small />
        </button>
      </section>

      {routineActive ? (
        <ReminderRoutineFlow key={reminderFlowRequestId} />
      ) : (
        <>
          {suggestionNoticeVisible ? (
            <section className="detail-grid tasks-overview-grid suggestion-only">
              <article className={`detail-card hero-detail task-suggestion-card glass ${suggestionResolved ? 'resolved' : 'urgent'}`}>
                <div className="suggestion-title-row">
                  <p className="summary-kicker">AI SUGGESTION</p>
                  {!suggestionResolved ? <span className="soft-urgent-badge"><Icon name="schedule" small />緊急任務</span> : null}
                </div>
                <div className="suggestion-fade" key={suggestionResolved ? 'resolved' : 'default'}>
                  <h3>{suggestionResolved ? '已安排補救提醒，這件事不用現在處理' : '午餐後散步可以延後，不算失敗'}</h3>
                  <p>
                    {suggestionResolved
                      ? '晚點完成就可以，我會把它放回比較舒服的時間，不需要一直記在腦中。'
                      : '這件事快到時間了，但還可以用可恢復的方式處理。先延後 30 分鐘，晚點再補完成，不需要製造壓力。'}
                  </p>
                </div>
                <button
                  type="button"
                  className={suggestionResolved ? 'secondary-action' : 'primary-action'}
                  onClick={() => (suggestionResolved ? setSuggestionNoticeVisible(false) : snoozeReminder('after-lunch-walk', '30 分鐘後'))}
                >
                  {suggestionResolved ? '知道了' : '延後 30 分鐘'}
                </button>
              </article>
            </section>
          ) : null}

          {introNoticeVisible ? (
            <section className={`detail-card glass ai-reminder-card encouragement-panel ${introNoticeClosing ? 'closing' : ''}`}>
              <div className="ai-reminder-avatar">
                <Icon name="auto_awesome" />
              </div>
              <div>
                <div className="encouragement-kicker-row">
                  <p className="summary-kicker">GENTLE PLAN</p>
                  <span>{gentlePlanSecondsLeft} 秒後自動關閉</span>
                </div>
                <h3>{allRemindersComplete ? '今天整理得很好，可以安心休息了' : '先看重點就好，不用一次全部處理'}</h3>
                <p>
                  {allRemindersComplete
                    ? '今天重要的提醒都整理好了。你可以把腦袋放鬆一點，不用一直反覆想有沒有漏掉什麼。'
                    : '我幫你把提醒分好節奏：已完成的先收起來，快到時間的先照顧，其他的晚點再慢慢安排。'}
                </p>
              </div>
            </section>
          ) : null}

          <ReminderProgressOverview dailyProgress={dailyProgress} monthlyProgress={mockProgress.monthly} recentDays={mockProgress.recentDays} />

          <section className="detail-card glass">
            <p className="summary-kicker">TODAY REMINDERS</p>
            <h3>今天的提醒</h3>
            <div className="task-list">
              {reminders.map((item) => (
                <div key={item.id} className={`task-row todo-row reminder-card ${item.status}`}>
                  <label className="todo-check">
                    <input
                      type="checkbox"
                      checked={item.status === 'completed'}
                      onChange={() => toggleReminder(item.id)}
                    />
                    <span aria-hidden="true" />
                  </label>
                  <div className={`reminder-card-icon ${item.category}`}>
                    <Icon name={item.icon} />
                  </div>
                  <div className="todo-copy">
                    <strong>{item.title}</strong>
                    <p>{item.time} · {item.description}</p>
                    {isReminderDueSoon(item) ? (
                      <div className="due-soon-inline">
                        <DueSoonBadge />
                        <span>這件事快到時間了，我可以等等再提醒你。</span>
                      </div>
                    ) : null}
                  </div>
                  <span className={`todo-status ${item.status}`}>{statusLabel[item.status]}</span>
                  <div className="reminder-actions">
                    {item.id === 'bedtime-prepare' ? (
                      <button type="button" onClick={openSleepChecklist}>查看清單</button>
                    ) : item.status === 'completed' || item.status === 'snoozed' ? (
                      <button type="button" disabled>{item.actionLabel}</button>
                    ) : (
                      <div className="snooze-wrap">
                        <button type="button" onClick={() => setSnoozeMenuOpen(snoozeMenuOpen === item.id ? null : item.id)}>
                          稍後提醒
                        </button>
                        {snoozeMenuOpen === item.id ? (
                          <div className="snooze-menu">
                            {['10 分鐘後', '30 分鐘後', '今天晚上'].map((option) => (
                              <button key={option} type="button" onClick={() => snoozeReminder(item.id, option)}>{option}</button>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <MonthlyGoalCard monthlyProgress={mockProgress.monthly} />

          {sleepChecklistOpen ? (
            <section className="sleep-checklist-panel glass" aria-label="睡前安心清單">
              <div className="sleep-checklist-head">
                <div>
                  <p className="summary-kicker">SLEEP CHECKLIST</p>
                  <h3>今晚安心清單</h3>
                  <p>我幫你整理今晚真正需要確認的三件事。</p>
                </div>
                <button type="button" className="secondary-action" onClick={() => setSleepChecklistOpen(false)}>收起</button>
              </div>
              <div className="sleep-checklist-grid">
                {sleepChecklist.map((item) => (
                  <article key={item.id} className={`sleep-check-card ${item.status}`}>
                    <Icon name={item.status === 'completed' ? 'check_circle' : item.icon} />
                    <h4>{item.title}</h4>
                    <p>{item.reason}</p>
                    <button type="button" onClick={() => completeChecklistItem(item.id)} disabled={item.status === 'completed'}>
                      {item.status === 'completed' ? '已確認' : item.actionLabel}
                    </button>
                  </article>
                ))}
              </div>
              {checklistComplete ? (
                <div className="sleep-check-success">
                  <Icon name="check_circle" />
                  <div>
                    <strong>已完成今晚安心清單</strong>
                    <p>今天的生活提醒都整理好了。手機、明日物品和家務提醒都已確認，接下來可以不用再反覆想這些小事了。</p>
                  </div>
                </div>
              ) : null}
            </section>
          ) : null}
        </>
      )}
    </>
  )
}

function ReminderRoutineFlow() {
  const [phase, setPhase] = useState('confirm')
  const [introVisible, setIntroVisible] = useState(false)
  const [selectedPrompt, setSelectedPrompt] = useState(null)
  const [messages, setMessages] = useState([])
  const [draftMessage, setDraftMessage] = useState('')
  const [steps, setSteps] = useState(createReminderRoutineSteps)
  const [batteryStatus] = useState(reminderRoutineBatteryStatus)
  const [checklist, setChecklist] = useState(createReminderRoutineChecklist)
  const [showBatteryCard, setShowBatteryCard] = useState(false)
  const [showChecklistCards, setShowChecklistCards] = useState(false)
  const [typing, setTyping] = useState(false)
  const [routinePopup, setRoutinePopup] = useState('')
  const routineCardRef = useRef(null)
  const checklistResultRef = useRef(null)
  const completionCardRef = useRef(null)
  const phaseCleanupRef = useRef(null)
  const completionAnnouncedRef = useRef(false)

  const appendMessage = useCallback((message) => {
    setMessages((current) => [...current, { id: `${message.role}-${Date.now()}-${current.length}`, ...message }])
  }, [])

  const setStepState = useCallback((id, status, progress, progressDuration = 220) => {
    setSteps((current) => current.map((step) => (step.id === id ? { ...step, status, progress, progressDuration } : step)))
  }, [])

  const inferPromptLabel = useCallback((text) => {
    const normalized = text.replace(/\s+/g, '')
    if (/行程|明天|會議|出門|早起/.test(normalized)) return '明日行程'
    if (/電量|充電|設備|耳機|手錶|iPhone|手機/.test(normalized)) return '充電與設備'
    return '睡前準備'
  }, [])

  const startConversation = useCallback((rawText) => {
    const normalized = rawText.trim()
    if (!normalized || phase !== 'confirm') return

    const promptLabel = inferPromptLabel(normalized)
    const confirmText = promptLabel === '睡前準備'
      ? '好，我會先幫你檢查明日行程、生活提醒、裝置電量與家中設備狀態。等等我只會整理最重要的 3 件事，不會丟一整串待辦讓你更焦慮。'
      : promptLabel === '明日行程'
        ? '好，我先從明日行程開始看，接著再幫你整理生活提醒與裝置狀態，最後收斂成今晚真正需要做的幾件事。'
        : '好，我會先看裝置電量，再回頭整理明日行程和今晚提醒，讓你睡前不用一直想東想西。'

    appendMessage({ role: 'user', type: 'text', content: normalized })
    setDraftMessage('')
    setTyping(true)

    const ackTimer = window.setTimeout(() => {
      setTyping(false)
      appendMessage({ role: 'assistant', type: 'text', content: confirmText })
      setPhase('calendar')
    }, 1100)

    return () => window.clearTimeout(ackTimer)
  }, [appendMessage, inferPromptLabel, phase])

  const runPhase = useCallback((nextPhase) => {
    const config = {
      calendar: {
        stepId: 'calendar',
        duration: 2400,
        message: '我正在查你的 Google Calendar，先確認明天早上有沒有會議或外出行程。',
        summary: '明日行程已確認',
        result: '明日第一個行程：09:00 專案同步會議，建議出門時間 08:20，需要準備識別證、鑰匙與筆電充電器。',
        next: 'reminders',
      },
      reminders: {
        stepId: 'reminders',
        duration: 2400,
        message: '我會把提醒做篩選，只留下今晚真的需要處理的事項。',
        summary: '生活提醒已整理',
        result: '今晚真正需要注意 3 項，可延後事項 1 項，已略過低優先提醒 1 項。',
        next: 'battery',
      },
      battery: {
        stepId: 'battery',
        duration: 2700,
        message: '我也會幫你看一下明天出門會用到的裝置，避免早上才發現沒電。',
        summary: '裝置電量已檢查',
        next: 'list',
      },
      list: {
        stepId: 'peace-list',
        duration: 2400,
        message: '我幫你整理好了。今晚不用看一整串待辦，只要先確認這 3 件事就好。',
        summary: '今晚安心清單已產生',
        next: 'done',
      },
    }[nextPhase]

    if (!config) return undefined

    setTyping(true)
    setStepState(config.stepId, 'processing', 0, 0)
    const progressTimer = window.setTimeout(() => {
      setStepState(config.stepId, 'processing', 100, Math.max(config.duration - 260, 800))
    }, 80)
    appendMessage({ role: 'assistant', type: 'text', content: config.message })

    const timer = window.setTimeout(() => {
      setTyping(false)
      setStepState(config.stepId, 'success', 100)
      appendMessage({ role: 'system', type: 'status', content: config.summary })

      if (nextPhase === 'calendar') {
        appendMessage({ role: 'assistant', type: 'text', content: config.result })
      }

      if (nextPhase === 'reminders') {
        appendMessage({
          role: 'assistant',
          type: 'text',
          content: '我會把提醒收斂成今晚真正需要注意的事項，不會把一整串待辦全部塞給你。',
        })
      }

      if (nextPhase === 'battery') {
        setShowBatteryCard(true)
        appendMessage({
          role: 'assistant',
          type: 'text',
          content: '我也會先把裝置電量看完，讓你明天早上不用再補救。',
        })
      }

      if (nextPhase === 'list') {
        setShowChecklistCards(true)
      }

      if (config.next !== 'done') {
        setPhase(config.next)
      } else {
        setPhase('await-completion')
      }
    }, config.duration)

    return () => {
      window.clearTimeout(progressTimer)
      window.clearTimeout(timer)
    }
  }, [appendMessage, setStepState])

  useEffect(() => {
    if (phase === 'confirm') return undefined
    const startTimer = window.setTimeout(() => {
      if (phaseCleanupRef.current) {
        phaseCleanupRef.current()
        phaseCleanupRef.current = null
      }
      phaseCleanupRef.current = runPhase(phase) || null
    }, 0)

    return () => {
      window.clearTimeout(startTimer)
      if (phaseCleanupRef.current) {
        phaseCleanupRef.current()
        phaseCleanupRef.current = null
      }
    }
  }, [phase, runPhase])

  useEffect(() => {
    if (!showChecklistCards || completionAnnouncedRef.current) return undefined
    const allCompleted = checklist.every((item) => item.status === 'completed')
    if (!allCompleted) return undefined

    completionAnnouncedRef.current = true
    const announceTimer = window.setTimeout(() => {
      appendMessage({ role: 'system', type: 'status', content: '已完成今晚安心清單' })
      appendMessage({
        role: 'assistant',
        type: 'text',
        content: '做得很好，今晚重要的事情都整理好了。明天早上的準備狀態良好，你可以安心休息了。',
      })
    }, 0)
    return () => window.clearTimeout(announceTimer)
  }, [appendMessage, checklist, showChecklistCards])

  const startFromPrompt = (prompt) => {
    const promptText = `我想整理${prompt === '睡前準備' ? '睡前準備' : prompt === '明日行程' ? '明日行程' : '充電與設備'}。`
    setSelectedPrompt(prompt)
    startConversation(promptText)
  }

  const handleDraftSubmit = (event) => {
    event.preventDefault()
    startConversation(draftMessage)
  }

  const handleChecklistAction = (id, action) => {
    setChecklist((current) => current.map((item) => {
      if (item.id !== id) return item
      if (action === 'completed') return { ...item, status: 'completed' }
      return { ...item, status: 'snoozed' }
    }))
    const item = checklist.find((entry) => entry.id === id)
    appendMessage({
      role: 'system',
      type: 'status',
      content: action === 'completed' ? `${item?.title || '項目'} 已標記完成` : `${item?.title || '項目'} 已暫時延後`,
    })

    setRoutinePopup(
      action === 'completed'
        ? `${item?.title || '項目'} 已完成，今晚安心清單已更新。`
        : '已幫你新增待未來處理事項，稍後會提醒你。',
    )
  }

  const allChecklistCompleted = checklist.every((item) => item.status === 'completed')
  const contextCollapsed = phase !== 'confirm'
  const visibleMessages = contextCollapsed ? messages.slice(-3) : messages

  useEffect(() => {
    if (!routinePopup) return undefined

    const popupTimer = window.setTimeout(() => {
      setRoutinePopup('')
    }, 3600)

    return () => window.clearTimeout(popupTimer)
  }, [routinePopup])

  useEffect(() => {
    if (!showChecklistCards) return undefined

    const checklistFocusTimer = window.setTimeout(() => {
      checklistResultRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 180)

    return () => window.clearTimeout(checklistFocusTimer)
  }, [showChecklistCards])

  useEffect(() => {
    if (!allChecklistCompleted) return undefined

    const completionFocusTimer = window.setTimeout(() => {
      completionCardRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }, 180)

    return () => window.clearTimeout(completionFocusTimer)
  }, [allChecklistCompleted])

  useEffect(() => {
    if (phase !== 'confirm') return undefined
    const introTimer = window.setTimeout(() => {
      setIntroVisible(true)
    }, 1400)

    return () => window.clearTimeout(introTimer)
  }, [phase])

  useEffect(() => {
    const shouldFocusRoutine = phase === 'confirm'

    if (!shouldFocusRoutine) return undefined

    const focusTimer = window.setTimeout(() => {
      routineCardRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 140)

    return () => window.clearTimeout(focusTimer)
  }, [phase, showBatteryCard, showChecklistCards, steps, typing, introVisible, messages.length])

  return (
    <section className="reminder-routine-flow" aria-label="睡前安心清單" ref={routineCardRef}>
      {routinePopup ? (
        <div className="routine-soft-popup glass" role="status">
          <Icon name="notifications_active" small />
          <span>{routinePopup}</span>
        </div>
      ) : null}
      <article className="detail-card glass reminder-routine-card">
        <div className="reminder-routine-head">
          <div>
            <p className="summary-kicker">睡前安心清單</p>
            <h3>睡前安心清單 AI Chat</h3>
            <p>我可以直接跟你對話，幫你先整理今晚真正重要的 3 件事，再把不重要的提醒收起來。</p>
          </div>
          <div className="reminder-routine-status-row">
            <span className="status-chip connected"><Icon name="event_available" small />Google Calendar</span>
            <span className="status-chip time"><Icon name="schedule" small />16:33</span>
            <span className="status-chip weather">晴朗</span>
          </div>
        </div>

        <div className={`chat-thread reminder-routine-thread${contextCollapsed ? ' context-compact' : ''}`}>
          {contextCollapsed ? (
            <div className="routine-context-label">
              <Icon name="forum" small />
              <span>AI 對話脈絡已收合，正在把重點交給下方功能</span>
            </div>
          ) : null}
          {visibleMessages.map((message, index) => (
            <div key={`${message.id}-${index}`} className={`chat-message ${message.role === 'system' ? 'system-status' : message.role}${message.tone ? ` ${message.tone}` : ''}`}>
              <p>{message.content}</p>
            </div>
          ))}
          {phase === 'confirm' && !introVisible ? (
            <div className="routine-reading-card glass">
              <div className="routine-reading-head">
                <div className="routine-reading-icon"><Icon name="psychology" /></div>
                <div className="chat-message assistant typing">
                  <div className="typing-bubble">
                    <span>AI 正在讀取今晚的提醒資料...</span>
                    <i /><i /><i />
                  </div>
                </div>
              </div>
              <div className="routine-reading-bar" aria-hidden="true"><span /></div>
            </div>
          ) : null}
          {typing ? (
            <div className="chat-message assistant typing">
              <div className="typing-bubble">
                <span>AI 正在整理提醒...</span>
                <i /><i /><i />
              </div>
            </div>
          ) : null}
          {phase === 'confirm' && introVisible ? (
            <div className="routine-confirm-card glass confirm-reveal">
              <p className="summary-kicker">睡前安心清單 AI Chat</p>
              <h4>我可以幫你整理今晚的安心清單。開始前，我想先確認一下：你是想整理睡前準備、明日行程，還是家中設備與充電狀態？</h4>
              <div className="welcome-chip-row">
                {['睡前準備', '明日行程', '充電與設備'].map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    className={selectedPrompt === prompt ? 'selected' : ''}
                    aria-pressed={selectedPrompt === prompt}
                    onClick={() => startFromPrompt(prompt)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <form className={`routine-compose glass ${phase !== 'confirm' ? 'locked' : ''}`} onSubmit={handleDraftSubmit}>
          <div className="routine-compose-icon"><Icon name="auto_awesome" small /></div>
          <input
            type="text"
            value={draftMessage}
            onChange={(event) => setDraftMessage(event.target.value)}
            placeholder="直接告訴我你想先整理什麼..."
            disabled={phase !== 'confirm'}
          />
          <button type="submit" className="send-button" disabled={phase !== 'confirm' || !draftMessage.trim()}>
            <Icon name="send" small />
          </button>
        </form>

        {phase !== 'confirm' ? <StepTimeline steps={steps} /> : null}

        {steps.find((step) => step.id === 'calendar')?.status === 'success' ? (
          <section className="routine-result-card glass">
            <p className="summary-kicker">CALENDAR CHECK</p>
            <h4>明日行程已確認</h4>
            <div className="routine-result-list">
              <span>明日第一個行程：09:00 專案同步會議</span>
              <span>建議出門時間：08:20</span>
              <span>需要準備：識別證、鑰匙、筆電充電器</span>
            </div>
          </section>
        ) : null}

        {steps.find((step) => step.id === 'reminders')?.status === 'success' ? (
          <section className="routine-result-card glass">
            <p className="summary-kicker">REMINDER CHECK</p>
            <h4>生活提醒已整理</h4>
            <div className="routine-result-list compact">
              <span>今晚真正需要注意：3 項</span>
              <span>可延後事項：1 項</span>
              <span>已略過低優先提醒：1 項</span>
            </div>
          </section>
        ) : null}

        {showBatteryCard ? (
          <section className="routine-result-card glass battery-warning-card">
            <p className="summary-kicker">BATTERY CHECK</p>
            <h4>裝置電量提醒</h4>
            <div className="routine-result-list battery-list">
              <span>iPhone：{batteryStatus.iPhone.percent}%，{batteryStatus.iPhone.status === 'low' ? '低電量，未充電' : '狀態正常'}</span>
              <span>Apple Watch：{batteryStatus.appleWatch.percent}%，{batteryStatus.appleWatch.status === 'low' ? '建議充電' : '狀態正常'}</span>
              <span>隨身充：{batteryStatus.powerBank.percent}%，{batteryStatus.powerBank.status === 'low' ? '低電量，建議補電' : '狀態正常'}</span>
              <span>耳機：{batteryStatus.earbuds.percent}%，{batteryStatus.earbuds.status === 'medium' ? '可用但建議順手充電' : '狀態正常'}</span>
            </div>
          </section>
        ) : null}

        {showChecklistCards ? (
          <section className="peace-check-grid" aria-label="今晚安心清單" ref={checklistResultRef}>
            {checklist.map((item) => (
              <article key={item.id} className={`peace-card glass ${item.status}`}>
                <div className="peace-card-top">
                  <p className="summary-kicker">{item.tag}</p>
                  {item.status === 'completed' ? <span className="completed-pill"><Icon name="check_circle" small />已完成</span> : item.status === 'snoozed' ? <span className="snoozed-pill">稍後提醒</span> : null}
                </div>
                <h4>{item.title}</h4>
                <p>{item.caption}</p>
                <div className="peace-card-actions">
                  <button type="button" className="primary-action" onClick={() => handleChecklistAction(item.id, 'completed')} disabled={item.status === 'completed'}>
                    已完成
                  </button>
                  <button type="button" className="secondary-action" onClick={() => handleChecklistAction(item.id, 'snoozed')} disabled={item.status === 'completed'}>
                    {item.actionSecondary}
                  </button>
                </div>
              </article>
            ))}
          </section>
        ) : null}

        {allChecklistCompleted ? (
          <section className="routine-completion-card glass" ref={completionCardRef}>
            <p className="summary-kicker">COMPLETION</p>
            <h4>今晚安心清單已完成</h4>
            <div className="routine-result-list compact">
              <span>裝置充電已確認</span>
              <span>明日會議物品已準備</span>
              <span>生活提醒已處理</span>
              <span>明天早上的準備狀態良好</span>
            </div>
            <p>可以安心休息了。</p>
          </section>
        ) : null}
      </article>
    </section>
  )
}

const initialSettingsState = {
  language: 'zh-TW',
  assistant: {
    proactiveSuggestions: true,
    gentleReminderMode: true,
    missedStateRecovery: true,
    chatHistory: true,
    lowInterruptionMode: false,
  },
  reminders: {
    dailySummary: true,
    snoozeReminder: true,
    moveBreak: true,
    drinkWater: true,
    bedtimeChecklist: true,
    missedStateRecovery: true,
  },
  sleepAutomation: {
    autoSleepMode: true,
    bedtimeChecklist: true,
    autoLightReminder: true,
    acStatusReminder: true,
    deviceChargingReminder: true,
  },
  smartHome: {
    homeLive: true,
    livingRoomLight: true,
    livingRoomAC: true,
    lowBrightnessSafety: true,
    leaveHomeReminder: false,
    returnHomeScene: false,
  },
  sync: {
    tomorrowBriefing: true,
    aiTaskHistory: true,
  },
  notification: {
    push: true,
    desktop: true,
    quietHours: true,
    importantOnly: true,
    silentNotification: true,
    sound: 'soft',
  },
  privacy: {
    deviceStatusDetection: true,
    smartHomeStatus: true,
    homePresence: false,
  },
}

const settingsCopy = {
  assistant: {
    proactiveSuggestions: ['主動生活建議', 'AI 會根據行事曆、提醒與時間，主動整理今日建議。', '主動生活建議已開啟，AI 會在合適時間幫你整理提醒。', '主動生活建議已關閉，你仍可手動查看提醒。'],
    gentleReminderMode: ['溫和提醒模式', '提醒會使用可補救語氣，不使用失敗或警告字眼。', '溫和提醒模式已開啟，提醒會保持柔和。', '溫和提醒模式已關閉，提醒語氣會更直接。'],
    missedStateRecovery: ['錯過提醒補救', '若錯過提醒，AI 會提供延後、改時間或今晚補完成選項。', '錯過提醒補救已開啟，AI 會提供可恢復方案。', '錯過提醒補救已關閉，錯過項目只會保留在列表。'],
    chatHistory: ['AI 對話紀錄', '保留最近的 AI 任務紀錄，方便回到剛剛的生活流程。', 'AI 對話紀錄已開啟，最近流程會保留。', 'AI 對話紀錄已關閉，流程不會持續保存。'],
    lowInterruptionMode: ['低打擾模式', '減少非必要提醒，只保留重要通知。', '低打擾模式已開啟，只保留重要提醒。', '低打擾模式已關閉，AI 會提供完整提醒。'],
  },
  reminders: {
    dailySummary: ['今日提醒摘要', '每天自動整理今日需要注意的 3 件事。', '今日提醒摘要已開啟，AI 會整理重點。', '今日提醒摘要已關閉，你可以手動查看。'],
    snoozeReminder: ['稍後提醒', '允許把提醒延後 10 分鐘、30 分鐘或今晚。', '稍後提醒已開啟，可以彈性延後。', '稍後提醒已關閉，提醒不會提供延後選項。'],
    moveBreak: ['久未移動提醒', '偵測長時間未移動時，提醒你起來走動。', '久未移動提醒已開啟。', '久未移動提醒已關閉。'],
    drinkWater: ['喝水提醒', '依照時間與生活節奏提醒喝水。', '喝水提醒已開啟。', '喝水提醒已關閉。'],
    bedtimeChecklist: ['睡前整理提醒', '晚上自動整理今晚安心清單。', '睡前整理提醒已開啟，晚上會自動整理今晚安心清單。', '睡前整理提醒已關閉，你可以手動進入生活提醒頁查看。'],
    missedStateRecovery: ['Missed State 補救模式', '錯過提醒時，不顯示失敗，而是提供可恢復方案。', 'Missed State 補救模式已開啟。', 'Missed State 補救模式已關閉。'],
  },
  sleepAutomation: {
    autoSleepMode: ['睡眠自動開啟模式', '到達設定時間後，自動提醒是否啟動睡眠模式。', '已開啟：系統會依照時間自動提醒你進入睡眠模式。', '已關閉：睡眠模式需要手動啟動。'],
    bedtimeChecklist: ['睡前安心清單', '睡前整理手機充電、明日行程與未完成生活事項。', '睡前安心清單已開啟。', '睡前安心清單已關閉。'],
    autoLightReminder: ['自動關燈提醒', '若偵測到客廳燈還亮著，AI 會提醒是否關閉。', '自動關燈提醒已開啟。', '自動關燈提醒已關閉。'],
    acStatusReminder: ['空調狀態提醒', '睡前檢查客廳空調是否仍開啟。', '空調狀態提醒已開啟。', '空調狀態提醒已關閉。'],
    deviceChargingReminder: ['iPhone / Apple Watch 充電提醒', '睡前偵測裝置是否需要充電。', '裝置充電提醒已開啟。', '裝置充電提醒已關閉。'],
  },
  smartHome: {
    homeLive: ['Home Live', '允許 AI 讀取 mock 智慧家庭狀態。', 'Home Live 已開啟。', 'Home Live 已關閉。'],
    livingRoomLight: ['客廳燈光連動', '允許 AI 在睡前檢查客廳燈光狀態。', '客廳燈光連動已開啟。', '客廳燈光連動已關閉。'],
    livingRoomAC: ['客廳空調連動', '允許 AI 在睡前檢查空調是否仍開啟。', '客廳空調連動已開啟。', '客廳空調連動已關閉。'],
    lowBrightnessSafety: ['低亮度安全模式', '夜間切換 Dark Mode 時，避免亮度突然變化。', '低亮度安全模式已開啟。', '低亮度安全模式已關閉。'],
    leaveHomeReminder: ['離家提醒', '離家時提醒是否關閉燈光與空調。', '離家提醒已開啟。', '離家提醒已關閉。'],
    returnHomeScene: ['回家情境', '回家時可自動顯示燈光與空調狀態。', '回家情境已開啟。', '回家情境已關閉。'],
  },
}

function SettingsPage({ theme, setTheme, goToPage }) {
  const [settings, setSettings] = useState(initialSettingsState)
  const [searchQuery, setSearchQuery] = useState('')
  const [toast, setToast] = useState(null)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const showSettingsToast = (nextToast) => {
    setToast(nextToast)
    window.setTimeout(() => setToast(null), 5000)
  }

  const toggleSetting = (group, key) => {
    setSettings((current) => ({
      ...current,
      [group]: {
        ...current[group],
        [key]: !current[group][key],
      },
    }))

    if (group === 'sleepAutomation' && key === 'autoSleepMode') {
      const nextOn = !settings.sleepAutomation.autoSleepMode
      showSettingsToast({
        icon: nextOn ? 'bedtime' : 'check_circle',
        title: nextOn ? '睡眠自動提醒已開啟' : '睡眠自動提醒已關閉',
        description: nextOn ? '系統會依照時間，在睡前提醒你啟動睡眠模式。' : '睡眠模式改為手動啟動。',
      })
    }
  }

  const changeTheme = (nextTheme) => {
    setTheme(nextTheme)
    showSettingsToast({
      icon: nextTheme === 'dark' ? 'dark_mode' : 'light_mode',
      title: nextTheme === 'dark' ? '已切換為深色模式' : '已切換為亮色模式',
      description: nextTheme === 'dark' ? '夜間亮度已降低，卡片會維持柔和可讀。' : '已回到柔和的淺色玻璃介面。',
    })
  }

  const changeLanguage = (language) => {
    setSettings((current) => ({ ...current, language }))
    showSettingsToast({
      icon: 'check_circle',
      title: language === 'zh-TW' ? '語言已切換為繁體中文。' : 'Language switched to English。',
      description: language === 'zh-TW' ? '目前為 Demo 狀態，不會翻譯整站。' : 'This is a mock language state for the prototype.',
    })
  }

  const visible = (keywords) => !searchQuery.trim() || keywords.some((word) => word.toLowerCase().includes(searchQuery.trim().toLowerCase()))

  const renderToggleRows = (group) => Object.entries(settingsCopy[group]).map(([key, copy]) => (
    <SettingRow
      key={key}
      title={copy[0]}
      description={copy[1]}
      activeText={copy[2]}
      inactiveText={copy[3]}
      checked={settings[group][key]}
      onChange={() => toggleSetting(group, key)}
    />
  ))

  return (
    <>
      <section className="settings-grid settings-control-center">
        <div className="settings-column">
          {visible(['設定中心', 'system', '語言', '提醒', '智慧家具', '行事曆', '通知', '隱私']) ? (
            <SettingsCard kicker="SYSTEM" title="設定中心" className="tech-card">
              <p>這裡調整外觀、語言、AI 助理、生活提醒與智慧家庭偏好。介面保持簡潔，重要狀態會由 AI 幫你整理。</p>
              <label className="settings-search" aria-label="搜尋設定">
                <Icon name="search" small />
                <input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="搜尋語言、睡眠模式、提醒、智慧家具、通知或隱私" />
              </label>
              <div className="tech-stats settings-stats">
                <StatusInfo icon={theme === 'light' ? 'light_mode' : 'dark_mode'} label="THEME" value={theme === 'light' ? 'Light Active' : 'Dark Active'} detail={theme === 'light' ? '亮色玻璃介面' : '夜間低亮度'} />
                <StatusInfo icon="calendar_month" label="SYNC" value="Connected" detail="Calendar / Home mock" />
                <StatusInfo icon="check_circle" label="MODE" value="Stable" detail="系統穩定" />
                <StatusInfo icon="auto_awesome" label="AI ASSISTANT" value="Gentle Mode" detail="溫和提醒" />
              </div>
            </SettingsCard>
          ) : null}

          {visible(['語言', 'language', 'english', '日本語', '한국어']) ? (
            <SettingsCard kicker="LANGUAGE" title="語言 / Language">
              <LanguageDropdown value={settings.language} onChange={changeLanguage} />
            </SettingsCard>
          ) : null}

          {visible(['AI', '助理', 'assistant', '主動', '低打擾']) ? (
            <SettingsCard kicker="ASSISTANT" title="AI 助理行為">
              <p>調整 AI 主動提醒程度與回覆方式，讓它像生活助理，而不是一直打擾你的通知系統。</p>
              <div className="settings-row-list">{renderToggleRows('assistant')}</div>
            </SettingsCard>
          ) : null}

          {visible(['提醒', 'reminder', '喝水', '睡前', 'missed']) ? (
            <SettingsCard kicker="REMINDER" title="提醒模式">
              <p>控制生活提醒的頻率、補救方式與通知呈現。提醒應該幫你減壓，而不是製造壓力。</p>
              <div className="settings-row-list">{renderToggleRows('reminders')}</div>
            </SettingsCard>
          ) : null}
        </div>

        <div className="settings-column">
          {visible(['外觀', 'appearance', 'light', 'dark']) ? (
            <SettingsCard kicker="APPEARANCE" title="外觀模式">
              <p>Light 使用柔和的 Atmospheric Glassmorphism；Dark 使用穩定的 Nocturnal Clarity，避免夜間刺眼。</p>
              <div className="segmented-actions">
                <button type="button" className={theme === 'light' ? 'active' : ''} onClick={() => changeTheme('light')}>亮色模式</button>
                <button type="button" className={theme === 'dark' ? 'active' : ''} onClick={() => changeTheme('dark')}>深色模式</button>
              </div>
            </SettingsCard>
          ) : null}

          {visible(['睡眠', 'sleep', '自動', '關燈', '空調', '充電']) ? (
            <SettingsCard kicker="SLEEP AUTOMATION" title="睡眠自動化" featured>
              <p>開啟後，AI 會依照時間、行事曆與智慧家具狀態，在睡前提醒你進入睡眠模式。</p>
              <div className="settings-row-list">{renderToggleRows('sleepAutomation')}</div>
              <div className={`settings-status-bar ${settings.sleepAutomation.autoSleepMode ? 'active' : ''}`}>
                {settings.sleepAutomation.autoSleepMode ? '自動按照時間啟動睡眠模式提醒：已開啟' : '已關閉：睡眠模式需要手動啟動。'}
              </div>
            </SettingsCard>
          ) : null}

          {visible(['智慧', 'smart home', 'home live', '客廳', '燈光', '空調']) ? (
            <SettingsCard kicker="SMART HOME" title="智慧家庭">
              <p>管理智慧家具連動、Home Live 狀態與睡前環境檢查。</p>
              <div className="settings-row-list">{renderToggleRows('smartHome')}</div>
              <div className="status-chip-grid">
                {['Google Calendar：Connected', 'Smart Home mock：Connected', 'Living Room Light：Ready', 'Living Room AC：Ready', 'Sleep Mode：Available'].map((item) => <span key={item}>{item}</span>)}
              </div>
            </SettingsCard>
          ) : null}

          {visible(['同步', 'sync', 'calendar', '行事曆', 'mock']) ? (
            <SettingsCard kicker="SYNC" title="行事曆與同步">
              <p>管理 Google Calendar、提醒資料與 AI 任務紀錄。此專案使用 mock data，不需真的串接 API。</p>
              <div className="sync-list">
                <SyncRow title="Google Calendar" status="Connected" action="重新同步" onClick={() => showSettingsToast({ icon: 'calendar_month', title: '已重新同步', description: 'Demo mock data 已重新整理。' })} />
                <SyncRow title="今日提醒資料" status="Synced" />
                <SettingRow title="明日行程摘要" description="AI 會根據明日最早行程，提供早起或睡前建議。" checked={settings.sync.tomorrowBriefing} onChange={() => toggleSetting('sync', 'tomorrowBriefing')} activeText="明日行程摘要已開啟。" inactiveText="明日行程摘要已關閉。" />
                <SettingRow title="AI 任務紀錄" description="保留最近對話與提醒任務，顯示於 Sidebar。" checked={settings.sync.aiTaskHistory} onChange={() => toggleSetting('sync', 'aiTaskHistory')} activeText="AI 任務紀錄已開啟。" inactiveText="AI 任務紀錄已關閉。" />
                <div className="mock-note"><strong>Mock Data 模式</strong><span>Demo Only · 目前為展示用資料，不會連接真實帳號。</span></div>
              </div>
            </SettingsCard>
          ) : null}

          {visible(['通知', 'notification', '勿擾', '音效']) ? (
            <SettingsCard kicker="NOTIFICATION" title="通知與勿擾">
              <div className="settings-row-list">
                <SettingRow title="Push Notification" description="允許重要提醒推播。" checked={settings.notification.push} onChange={() => toggleSetting('notification', 'push')} activeText="Push Notification 已開啟。" inactiveText="Push Notification 已關閉。" />
                <SettingRow title="桌面提醒" description="在桌面顯示柔和提醒。" checked={settings.notification.desktop} onChange={() => toggleSetting('notification', 'desktop')} activeText="桌面提醒已開啟。" inactiveText="桌面提醒已關閉。" />
                <SettingRow title="勿擾時段" description="23:00 - 07:00" checked={settings.notification.quietHours} onChange={() => toggleSetting('notification', 'quietHours')} activeText="勿擾時段已開啟。" inactiveText="勿擾時段已關閉。" />
                <SettingRow title="僅保留重要提醒" description="非必要提醒會降噪。" checked={settings.notification.importantOnly} onChange={() => toggleSetting('notification', 'importantOnly')} activeText="僅保留重要提醒已開啟。" inactiveText="僅保留重要提醒已關閉。" />
                <SettingRow title="安靜通知" description="夜間提醒只顯示柔和提示，不使用強烈聲音或高亮警示。" checked={settings.notification.silentNotification} onChange={() => toggleSetting('notification', 'silentNotification')} activeText="安靜通知已開啟。" inactiveText="安靜通知已關閉。" />
              </div>
              <label className="settings-select-row">提醒音效<select value={settings.notification.sound} onChange={(event) => setSettings((current) => ({ ...current, notification: { ...current.notification, sound: event.target.value } }))}><option value="soft">柔和</option><option value="silent">無聲</option><option value="standard">標準</option></select></label>
            </SettingsCard>
          ) : null}

          {visible(['隱私', 'privacy', '權限', 'mock']) ? (
            <SettingsCard kicker="PRIVACY" title="隱私與權限">
              <p>此 Demo 使用 mock data 呈現，不會連接真實裝置。權限設定只作為產品情境展示。</p>
              <div className="settings-row-list">
                <div className="mock-note"><strong>行事曆讀取權限</strong><span>Mock Connected</span></div>
                <SettingRow title="裝置狀態偵測" description="用於顯示 iPhone / Apple Watch 充電提醒情境。" checked={settings.privacy.deviceStatusDetection} onChange={() => toggleSetting('privacy', 'deviceStatusDetection')} activeText="裝置狀態偵測已開啟。" inactiveText="裝置狀態偵測已關閉。" />
                <SettingRow title="智慧家具狀態" description="允許 Demo 讀取 mock 智慧家具狀態。" checked={settings.privacy.smartHomeStatus} onChange={() => toggleSetting('privacy', 'smartHomeStatus')} activeText="智慧家具狀態已開啟。" inactiveText="智慧家具狀態已關閉。" />
                <SettingRow title="Home Presence" description="可用於未來判斷在家 / 離家情境。" checked={settings.privacy.homePresence} onChange={() => toggleSetting('privacy', 'homePresence')} activeText="Home Presence 已開啟。" inactiveText="Home Presence 已關閉。" />
              </div>
              <button type="button" className="secondary-action" onClick={() => setConfirmOpen(true)}>清除紀錄</button>
            </SettingsCard>
          ) : null}

          <SettingsCard kicker="ACTIONS" title="設定操作">
            <p>確認偏好後可以儲存目前設定，或返回主畫面繼續使用生活助理。</p>
            <div className="settings-action-row">
              <button type="button" className="primary-action" onClick={() => showSettingsToast({ icon: 'check_circle', title: '設定已儲存', description: '目前偏好已套用於 Demo 狀態。' })}>儲存設定</button>
              <button type="button" className="secondary-action" onClick={() => { goToPage('home'); showSettingsToast({ icon: 'home', title: '已返回主畫面', description: '你可以繼續使用 Home、AI Assistant 與 Reminder。' }) }}>返回主畫面</button>
            </div>
          </SettingsCard>
        </div>
      </section>

      {toast ? <SettingsToast {...toast} onClose={() => setToast(null)} /> : null}
      {confirmOpen ? <ConfirmModal onCancel={() => setConfirmOpen(false)} onConfirm={() => { setConfirmOpen(false); showSettingsToast({ icon: 'check_circle', title: '已清除 AI 任務紀錄', description: 'Demo 狀態已重置最近任務紀錄。' }) }} /> : null}
    </>
  )
}

function SettingsCard({ kicker, title, children, className = '', featured = false }) {
  return <article className={`detail-card glass settings-card ${featured ? 'featured' : ''} ${className}`.trim()}><p className="summary-kicker">{kicker}</p><h3>{title}</h3>{children}</article>
}

function StatusInfo({ icon, label, value, detail }) {
  return <div className="status-info-card"><Icon name={icon} /><span>{label}</span><strong>{value}</strong><small>{detail}</small></div>
}

function ToggleSwitch({ checked, onChange }) {
  return <button type="button" className={`toggle-switch ${checked ? 'on' : ''}`} onClick={onChange} aria-pressed={checked}><span /></button>
}

function SettingRow({ title, description, checked, onChange, activeText, inactiveText }) {
  return <div className="setting-row"><div><strong>{title}</strong><p>{description}</p><small>{checked ? activeText : inactiveText}</small></div><ToggleSwitch checked={checked} onChange={onChange} /></div>
}

function LanguageDropdown({ value, onChange }) {
  const options = [
    { label: '繁體中文', value: 'zh-TW' },
    { label: 'English', value: 'en-US' },
    { label: '日本語', value: 'ja-JP', disabled: true },
    { label: '한국어', value: 'ko-KR', disabled: true },
  ]
  return <div className="language-dropdown">{options.map((option) => <button key={option.value} type="button" disabled={option.disabled} className={value === option.value ? 'selected' : ''} onClick={() => onChange(option.value)}><span>{option.label}</span>{option.disabled ? <small>敬請期待</small> : null}</button>)}</div>
}

function SyncRow({ title, status, action, onClick }) {
  return <div className="sync-row"><strong>{title}</strong><span>{status}</span>{action ? <button type="button" onClick={onClick}>{action}</button> : null}</div>
}

function SettingsToast({ icon, title, description, onClose }) {
  return <div className="settings-toast glass" role="status"><button type="button" className="toast-close" onClick={onClose}>×</button><Icon name={icon} /><div><strong>{title}</strong><p>{description}</p><button type="button" onClick={onClose}>知道了</button></div></div>
}

function ConfirmModal({ onCancel, onConfirm }) {
  return <div className="modal-backdrop"><div className="confirm-modal glass"><h3>確定要清除最近 AI 任務紀錄嗎？</h3><p>這只會清除 Demo 狀態，不會影響真實資料。</p><div className="button-row"><button type="button" className="secondary-action" onClick={onCancel}>取消</button><button type="button" className="primary-action" onClick={onConfirm}>清除紀錄</button></div></div></div>
}

function ModuleLibraryPage() {
  return (
    <section className="coming-grid library-grid">
      {comingSoon.map((item) => (
        <article key={item.title} className="coming glass">
          <Icon name={item.icon} />
          <p>{item.title}</p>
          <small>Coming Soon</small>
        </article>
      ))}
    </section>
  )
}

export default App
