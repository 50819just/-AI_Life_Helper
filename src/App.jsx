import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'
import bedroomAcOff from './assets/devices/bedroom-ac-off.png'
import bedroomAcOn from './assets/devices/bedroom-ac-on.png'
import bedroomBedsideLampOff from './assets/devices/bedroom-bedside-lamp-off.png'
import bedroomBedsideLampOn from './assets/devices/bedroom-bedside-lamp-on.png'
import bedroomMainLightOff from './assets/devices/bedroom-main-light-off.png'
import bedroomMainLightOn from './assets/devices/bedroom-main-light-on.png'
import livingRoomWarmLightOff from './assets/devices/living-room-warm-light-off.png'
import livingRoomWarmLightOn from './assets/devices/living-room-warm-light-on.png'

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
  { title: '喝水提醒', time: '10:30', status: 'completed', action: '已完成' },
  { title: '午餐後散步', time: '13:00', status: 'missed', action: '延後 30 分鐘' },
  { title: '久未移動提醒', time: '15:30', status: 'upcoming', action: '稍後提醒' },
  { title: '睡前整理提醒', time: '22:30', status: 'upcoming', action: '查看清單' },
]

const prepItems = ['確認會議資料', '準備識別證', '手機充電', '設定明早鬧鐘']

const comingSoon = [
  { title: '健康監測', icon: 'monitor_heart' },
  { title: '家庭空間', icon: 'meeting_room' },
  { title: '車載模式', icon: 'directions_car' },
  { title: '情緒分析', icon: 'mood' },
]

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light'
  return window.localStorage.getItem('a-life-theme') || 'light'
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme)
  const [page, setPage] = useState('home')
  const [now, setNow] = useState(() => new Date())
  const [sleepModeActive, setSleepModeActive] = useState(false)
  const [deviceStates, setDeviceStates] = useState(deviceCards)
  const [askText, setAskText] = useState('')
  const [askCategory, setAskCategory] = useState('家庭')
  const [morningFlow, setMorningFlow] = useState({
    active: false,
    elapsed: 0,
    completed: false,
  })
  const [smartHomeReadyVisible, setSmartHomeReadyVisible] = useState(false)

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
      <aside className="sidebar glass">
        <div className="brand">
          <div className="brand-icon" aria-hidden="true">
            <span className="material">auto_awesome</span>
          </div>
          <div>
            <p className="brand-kicker">NESTBUDDY</p>
            <h1>巢伴</h1>
          </div>
        </div>

        <button className="new-chat" type="button" onClick={() => goToPage('assistant')}>
          <span className="material">add</span>
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
            <span className="material">{isDark ? 'dark_mode' : 'light_mode'}</span>
            <span>{isDark ? '深色模式' : '亮色模式'}</span>
          </button>

          <div className="utility-links">
            <button type="button" onClick={() => goToPage('settings')} className={page === 'settings' ? 'active' : ''}>
              <span className="material">settings</span>
              <span>設定</span>
            </button>
            <a href="#help">
              <span className="material">help</span>
              <span>說明</span>
            </a>
          </div>
        </div>
      </aside>

      <main className="content" id="home">
        <div className="content-inner">
          <header className="header">
            <div className="headline">
              <p className="page-kicker">{pageMeta.kicker}</p>
              <h2>{pageMeta.title}</h2>
            </div>

            <div className="header-tools">
              <label className="search-pill" aria-label="搜尋">
                <span className="material small">search</span>
                <input type="search" placeholder="搜尋" aria-label="搜尋" />
              </label>

              <div className="header-status">
                <span className="status-chip connected">
                  <span className="material small" aria-hidden="true">check_circle</span>
                  Home Live
                </span>
                <span className="status-chip">{currentTime}</span>
              </div>
            </div>
          </header>

          <div className="meta-row">
            <span className="material small">schedule</span>
            <span>{currentTime}</span>
            <span>·</span>
            <span className="material small">{isDark ? 'dark_mode' : 'light_mode'}</span>
            <span>{isDark ? '夜深了' : '晴朗'}</span>
            <span>·</span>
            <span className="meta-chip">今天適合先整理三件事</span>
          </div>

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
          {page === 'assistant' ? (
            <AssistantPage
              askText={askText}
              askCategory={askCategory}
              onPickPrompt={(prompt) => setAskText(prompt)}
              onChangeText={setAskText}
              onPickCategory={setAskCategory}
              onSubmit={handleAskSubmit}
              morningFlow={morningFlow}
              morningFlowView={morningFlowView}
            />
          ) : null}
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
          {page === 'tasks' ? <TasksPage currentFullDateTime={currentFullDateTime} /> : null}
          {page === 'settings' ? <SettingsPage goToPage={goToPage} setTheme={setTheme} theme={theme} /> : null}
          {page === 'modules' ? <ModuleLibraryPage /> : null}

          <footer className="footer">
            <p>NestBuddy-AiLife · 巢伴 v1.0</p>
          </footer>
        </div>
      </main>

      <button className="mobile-ask-entry" type="button" onClick={() => goToPage('assistant')} aria-label="Chat">
        <span className="material">auto_awesome</span>
        <span>Chat</span>
      </button>

      <nav className="bottom-nav glass" aria-label="手機底部導覽">
        <BottomNavButton active={page === 'home'} icon="home" label="首頁" onClick={() => goToPage('home')} />
        <BottomNavButton active={page === 'devices'} icon="devices" label="智慧家庭" onClick={() => goToPage('devices')} />
        <BottomNavButton active={page === 'tasks'} icon="task_alt" label="提醒" onClick={() => goToPage('tasks')} />
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

function NavButton({ active, icon, label, onClick }) {
  return (
    <button className={`side-link ${active ? 'active' : ''}`} type="button" onClick={onClick}>
      <span className="material">{icon}</span>
      <span>{label}</span>
    </button>
  )
}

function BottomNavButton({ active, icon, label, onClick }) {
  return (
    <button className={active ? 'active' : ''} type="button" onClick={onClick}>
      <span className="material">{icon}</span>
      <span>{label}</span>
    </button>
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
          <span className="material">{category.icon}</span>
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
          <span className="material ask-icon">auto_awesome</span>
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
            <span className="material">arrow_upward</span>
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
                  <span className="material">{prompt.icon}</span>
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
          <span className="material small">wb_twilight</span>
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
                <span className="material">{card.icon}</span>
              </div>
            </div>

            {card.actions ? (
              <div className="quick-actions summary-actions">
                {card.actions.map((action) => (
                  <button key={action} type="button">
                    <span className="material small">arrow_right</span>
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
          編輯 <span className="material small">edit</span>
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
          <span className="material">{module.icon}</span>
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
                <span className="material small">{control.label.includes('燈') ? 'lightbulb' : 'ac_unit'}</span>
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
          <span className="material small">arrow_forward</span>
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
            {reminder.state === 'done' ? <span className="material small">check</span> : null}
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

function AssistantPage({
  askText,
  askCategory,
  onPickPrompt,
  onChangeText,
  onPickCategory,
  onSubmit,
  morningFlow,
  morningFlowView,
}) {
  return (
    <>
      <AskAIBlock
        askText={askText}
        askCategory={askCategory}
        onPickPrompt={onPickPrompt}
        onChangeText={onChangeText}
        onSubmit={onSubmit}
        hideGuidance={morningFlow.active}
      />
      {!morningFlow.active ? <CategoryChips activeCategory={askCategory} onPickCategory={onPickCategory} /> : null}
      {morningFlow.active ? (
        <section className="morning-demo-layout">
          <div className="morning-demo-main">
            <section className="chat-demo-card glass" aria-label="早起情境對話">
              <div className="chat-demo-header">
                <div>
                  <p className="summary-kicker">MORNING ROUTINE CHAT</p>
                  <h3>早起情境演練</h3>
                </div>
                <span className="chat-status-pill">
                  <span className="material small">event_available</span>
                  Google Calendar
                </span>
              </div>

              <div className="chat-thread">
                {morningFlowView.visibleMessages.map((message, index) => (
                  <div
                    key={`${message.type}-${index}`}
                    className={`chat-message ${message.type}${message.tone ? ` ${message.tone}` : ''}`}
                  >
                    <p>{message.text}</p>
                  </div>
                ))}
                {morningFlowView.smartHomeStarted ? (
                  <SmartHomeDetectionCard flowView={morningFlowView} />
                ) : null}
              </div>
            </section>
            <StepTimeline steps={morningFlowView.steps} />
          </div>
        </section>
      ) : null}
      {!morningFlow.active ? (
      <section className="detail-grid two-col">
        <article className="detail-card glass">
          <p className="summary-kicker">SUGGESTED ACTIONS</p>
          <h3>可以先從這三件事開始</h3>
          <div className="action-list">
            <button type="button">幫我整理今天剩下的提醒</button>
            <button type="button">新增睡前準備提醒</button>
            <button type="button">關閉客廳燈</button>
          </div>
        </article>
        <article className="detail-card glass">
          <p className="summary-kicker">CONTEXT</p>
          <h3>AI 可引用的生活脈絡</h3>
          <p>明日第一個重要行程、家中設備狀態與今日提醒會作為回答依據。高影響操作會先確認，不會直接執行。</p>
        </article>
      </section>
      ) : null}
    </>
  )
}

function StepTimeline({ steps }) {
  return (
    <section className="step-timeline" aria-label="早起流程步驟">
      {steps.map((step, index) => (
        <article key={step.id} className={`step-card ${step.status}`}>
          <div className="step-card-head">
            <div className="step-icon">
              <span className="material small">{step.status === 'success' ? 'check' : step.icon}</span>
            </div>
            <div>
              <p>Step {index + 1}</p>
              <h4>{step.title}</h4>
            </div>
          </div>
          <p className="step-card-copy">
            {step.status === 'processing' ? <span className="running-dot" aria-hidden="true" /> : null}
            {step.status === 'success' ? step.completed : step.processing}
          </p>
          <div className="step-progress" aria-label={`${step.title} 進度 ${Math.round(step.progress)}%`}>
            <span style={{ width: `${step.progress}%` }} />
          </div>
          {step.id === 'wake-plan' && step.status === 'success' ? <WakePlanResult /> : null}
        </article>
      ))}
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
            <span className="material small">photo_camera</span>
            {activeCheck.source}
          </span>
        </div>
        <div className="smart-device-focus-copy">
          <div className="device-focus-title">
            <span className="material">{activeCheck.icon}</span>
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
            <span className="material">{check.status === 'success' ? 'check_circle' : check.icon}</span>
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
              <span className="material small">schedule</span>
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
                <div className="module-icon"><span className="material">{device.icon}</span></div>
                <div>
                  <h4>{device.name}</h4>
                  <p>{device.room} · {getDeviceMeta(device)}</p>
                </div>
              </div>
              <div className="device-footer">
                <span className={`device-status ${device.state === 'on' ? 'on' : 'off'}`}>
                  <span className="material small">{device.state === 'on' ? 'lightbulb' : 'lightbulb_outline'}</span>
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

function TasksPage({ currentFullDateTime }) {
  const [tasks, setTasks] = useState(reminderItems)

  const statusLabel = {
    completed: '已完成',
    missed: '可補做',
    upcoming: '待處理',
  }

  const completedCount = tasks.filter((item) => item.status === 'completed').length
  const missedCount = tasks.filter((item) => item.status === 'missed').length
  const upcomingCount = tasks.filter((item) => item.status === 'upcoming').length
  const progress = Math.round((completedCount / tasks.length) * 100)

  const toggleTask = (title) => {
    setTasks((items) =>
      items.map((item) =>
        item.title === title
          ? {
              ...item,
              status: item.status === 'completed' ? 'upcoming' : 'completed',
              action: item.status === 'completed' ? '稍後提醒' : '已完成',
            }
          : item,
      ),
    )
  }

  const delayMissedTask = () => {
    setTasks((items) =>
      items.map((item) =>
        item.status === 'missed'
          ? {
              ...item,
              status: 'upcoming',
              action: '稍後提醒',
            }
          : item,
      ),
    )
  }

  return (
    <>
      <section className="detail-grid tasks-overview-grid">
        <article className="detail-card reminder-status-card glass">
          <p className="summary-kicker">STATUS</p>
          <h3>今日提醒摘要</h3>
          <p className="summary-date-line">{currentFullDateTime}</p>
          <div className="reminder-summary compact">
            <strong>{progress}%</strong>
            <div className="reminder-progress">
              <div className="progress"><span style={{ width: `${progress}%` }} /></div>
              <span>{completedCount} 已完成 · {missedCount} 可補做 · {upcomingCount} 待處理</span>
            </div>
          </div>
          <div className="calendar-link-status" aria-label="Google Calendar 已連結">
            <span className="material small">check_circle</span>
            <span>Google Calendar 已連結</span>
          </div>
        </article>
        <article className="detail-card hero-detail task-suggestion-card glass">
          <p className="summary-kicker">AI SUGGESTION</p>
          <h3>午餐後散步可以延後，不算失敗</h3>
          <p>這個 missed state 用可恢復的方式處理就好。先延後 30 分鐘，晚點再補完成，不需要製造壓力。</p>
          <button type="button" className="primary-action" onClick={delayMissedTask}>延後 30 分鐘</button>
        </article>
      </section>

      <section className="detail-card glass">
        <p className="summary-kicker">TODAY REMINDERS</p>
        <h3>今天的提醒</h3>
        <div className="task-list">
          {tasks.map((item) => (
            <div key={item.title} className={`task-row todo-row ${item.status}`}>
              <label className="todo-check">
                <input
                  type="checkbox"
                  checked={item.status === 'completed'}
                  onChange={() => toggleTask(item.title)}
                />
                <span aria-hidden="true" />
              </label>
              <div className="todo-copy">
                <strong>{item.title}</strong>
                <p>{item.time} · {statusLabel[item.status]}</p>
              </div>
              <span className={`todo-status ${item.status}`}>{item.action}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

function SettingsPage({ theme, setTheme, goToPage }) {
  return (
    <section className="settings-grid">
      <article className="detail-card glass tech-card">
        <p className="summary-kicker">SYSTEM</p>
        <h3>設定中心</h3>
        <p>這裡調整外觀、語言與系統偏好，介面語氣保持簡潔，像一個安靜的控制台。</p>

        <div className="tech-stats">
          <div>
            <span>Theme</span>
            <strong>{theme === 'light' ? 'Light Active' : 'Dark Active'}</strong>
          </div>
          <div>
            <span>Sync</span>
            <strong>Connected</strong>
          </div>
          <div>
            <span>Mode</span>
            <strong>Stable</strong>
          </div>
        </div>
      </article>

      <article className="detail-card glass">
        <p className="summary-kicker">APPEARANCE</p>
        <h3>外觀模式</h3>
        <p>Light 使用 softened Atmospheric Glassmorphism；Dark 使用 stable Nocturnal Clarity，不混用兩套色彩。</p>
        <div className="button-row">
          <button type="button" className={theme === 'light' ? 'primary-action' : 'secondary-action'} onClick={() => setTheme('light')}>
            亮色模式
          </button>
          <button type="button" className={theme === 'dark' ? 'primary-action' : 'secondary-action'} onClick={() => setTheme('dark')}>
            深色模式
          </button>
        </div>
      </article>

      <article className="detail-card glass">
        <p className="summary-kicker">LANGUAGE</p>
        <h3>語言 / Language</h3>
        <div className="action-list">
          <button type="button">繁體中文</button>
          <button type="button">English</button>
        </div>
      </article>

      <article className="detail-card glass">
        <p className="summary-kicker">RETURN</p>
        <h3>完成後回到首頁</h3>
        <p>設定只是暫存樣式，做完就回到主畫面，不要留在這裡繼續打轉。</p>
        <button type="button" className="primary-action" onClick={() => goToPage('home')}>
          回到首頁
        </button>
      </article>
    </section>
  )
}

function ModuleLibraryPage() {
  return (
    <section className="coming-grid library-grid">
      {comingSoon.map((item) => (
        <article key={item.title} className="coming glass">
          <span className="material">{item.icon}</span>
          <p>{item.title}</p>
          <small>Coming Soon</small>
        </article>
      ))}
    </section>
  )
}

export default App
