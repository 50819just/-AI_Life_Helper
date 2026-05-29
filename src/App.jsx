import { useEffect, useMemo, useState } from 'react'
import './App.css'

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

  const goToPage = (target) => {
    setPage(target)
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
  }

  const toggleDeviceState = (name) => {
    setDeviceStates((current) =>
      current.map((device) => {
        if (device.name !== name) return device
        return { ...device, state: device.state === 'on' ? 'off' : 'on' }
      }),
    )
  }

  const setSleepScene = (active) => {
    setSleepModeActive(active)
    setTheme(active ? 'dark' : 'light')
    setDeviceStates(
      active
        ? [
            { name: '主燈', room: '臥室', state: 'off', meta: '已關閉', icon: 'lightbulb' },
            { name: '客廳燈光', room: '客廳', state: 'off', meta: '已關閉', icon: 'lightbulb' },
            { name: '空調', room: '臥室', state: 'on', meta: '24°C · 自動', icon: 'ac_unit' },
            { name: '床頭燈', room: '臥室', state: 'on', meta: '夜燈模式', icon: 'lightbulb' },
          ]
        : deviceCards,
    )
    goToPage('devices')
  }

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
          <span>New Chat</span>
        </button>

        <nav className="side-nav" aria-label="Desktop navigation">
          <NavButton active={page === 'home'} icon="dashboard" label="Dashboard" onClick={() => goToPage('home')} />
          <NavButton active={page === 'devices'} icon="devices" label="智慧家庭" onClick={() => goToPage('devices')} />
          <NavButton active={page === 'tasks'} icon="task_alt" label="生活提醒" onClick={() => goToPage('tasks')} />
        </nav>

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
              <label className="search-pill" aria-label="Search">
                <span className="material small">search</span>
                <input type="search" placeholder="search" aria-label="search" />
              </label>

              <div className="header-status">
                <span className="status-chip connected">
                  <span className="status-dot" aria-hidden="true" />
                  連線中
                </span>
                <span className="status-chip">{currentTime}</span>
                <span className="status-chip">Live</span>
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
            />
          ) : null}
          {page === 'assistant' ? (
            <AssistantPage
              askText={askText}
              askCategory={askCategory}
              onPickPrompt={(prompt) => setAskText(prompt)}
              onChangeText={setAskText}
              onPickCategory={setAskCategory}
            />
          ) : null}
          {page === 'briefing' ? <BriefingPage /> : null}
          {page === 'devices' ? (
            <DevicesPage
              currentTime={currentTime}
              sleepModeActive={sleepModeActive}
              onEnableSleepMode={() => setSleepScene(true)}
              onDisableSleepMode={() => setSleepScene(false)}
              deviceStates={deviceStates}
              onToggleDevice={toggleDeviceState}
            />
          ) : null}
          {page === 'tasks' ? <TasksPage /> : null}
          {page === 'settings' ? <SettingsPage goToPage={goToPage} setTheme={setTheme} theme={theme} /> : null}
          {page === 'modules' ? <ModuleLibraryPage /> : null}

          <footer className="footer">
            <p>NestBuddy-AiLife · 巢伴 v1.0</p>
          </footer>
        </div>
      </main>

      <button className="mobile-ask-entry" type="button" onClick={() => goToPage('assistant')} aria-label="Ask AI">
        <span className="material">auto_awesome</span>
        <span>Ask AI</span>
      </button>

      <nav className="bottom-nav glass" aria-label="Mobile navigation">
        <BottomNavButton active={page === 'home'} icon="home" label="Home" onClick={() => goToPage('home')} />
        <BottomNavButton active={page === 'devices'} icon="devices" label="Devices" onClick={() => goToPage('devices')} />
        <BottomNavButton active={page === 'tasks'} icon="task_alt" label="Tasks" onClick={() => goToPage('tasks')} />
        <BottomNavButton active={page === 'settings'} icon="settings" label="Settings" onClick={() => goToPage('settings')} />
      </nav>
    </div>
  )
}

const pageMap = {
  home: { kicker: 'HOME / 首頁', title: 'Hi 哲宇，今天過得還好嗎？' },
  assistant: { kicker: 'ASK AI', title: '想整理什麼，直接問我就好。' },
  briefing: { kicker: 'TOMORROW / 明日簡報', title: '明天準備好了，可以放心休息。' },
  devices: { kicker: 'DEVICES / 智慧家庭', title: '家中狀態穩穩的，先看重要設備。' },
  tasks: { kicker: 'TASKS / 生活提醒', title: '今天的提醒慢慢整理，不用急。' },
  settings: { kicker: 'SETTINGS / 設定', title: '偏好與模式放在這裡，清楚一點。' },
  modules: { kicker: 'MODULE LIBRARY / 更多模組', title: '更多模組先低調預覽，不展開成完整功能。' },
}

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

function AskAIBlock({ askText, onChangeText, onPickPrompt }) {
  return (
    <section className="ask-section glass">
      <div className="ask-card" id="ask-ai">
        <div className="ask-glow" />
        <div className="ask-input-shell">
          <span className="material ask-icon">auto_awesome</span>
          <input
            type="text"
            placeholder="AI Ask anything"
            aria-label="Ask AI"
            value={askText}
            onChange={(event) => onChangeText?.(event.target.value)}
          />
          <button type="button" className="ask-submit">
            <span className="material">arrow_upward</span>
          </button>
        </div>
      </div>

      <p className="ask-hint">行程、提醒、家中設備或明日準備，都可以直接問我。</p>

      <div className="ask-suggestion-row">
        <p className="ask-suggestion-kicker">沒想法嗎？給你建議</p>
        <div className="ask-suggestions" aria-label="快速建議">
          {['我想早起', '關燈', '提醒生活'].map((prompt) => (
            <button key={prompt} type="button" className="suggestion-chip" onClick={() => onPickPrompt?.(prompt)}>
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function HomePage({ goToPage, askText, askCategory, onChangeText, onPickCategory, onPickPrompt }) {
  return (
    <>
      <AskAIBlock
        askText={askText}
        askCategory={askCategory}
        onChangeText={onChangeText}
        onPickPrompt={onPickPrompt}
      />

      <div className="query-chips query-chips-outside">
        {['個人', '家庭', '工作'].map((category) => (
          <button
            key={category}
            type="button"
            className={askCategory === category ? 'active' : ''}
            onClick={() => onPickCategory?.(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <section className="summary-grid" aria-label="今日摘要">
        {summaryCards.map((card) => (
          <article key={card.title} className={`summary glass ${card.accent}`}>
            <div className="summary-ribbon" aria-hidden="true" />
            <div className="summary-head">
              <div>
                <p className="summary-kicker">{card.title}</p>
                <div className="summary-value-row">
                  <strong>{card.value}</strong>
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
                <span className="summary-foot-label">{card.title === '環境' ? '舒適狀態' : '睡眠就緒'}</span>
                <div className="summary-mini-bar">
                  <span />
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

function AssistantPage({ askText, askCategory, onPickPrompt, onChangeText, onPickCategory }) {
  return (
    <>
      <AskAIBlock
        askText={askText}
        askCategory={askCategory}
        onPickPrompt={onPickPrompt}
        onChangeText={onChangeText}
      />
      <div className="query-chips query-chips-outside">
        {['個人', '家庭', '工作'].map((category) => (
          <button
            key={category}
            type="button"
            className={askCategory === category ? 'active' : ''}
            onClick={() => onPickCategory?.(category)}
          >
            {category}
          </button>
        ))}
      </div>
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
    </>
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

function DevicesPage({ currentTime, sleepModeActive, onEnableSleepMode, onDisableSleepMode, deviceStates, onToggleDevice }) {
  return (
    <>
      <section className="detail-grid devices-top-grid">
        <article className="detail-card clock-card glass">
          <p className="summary-kicker">NOW</p>
          <div className="clock-time">{currentTime}</div>
          <p className="clock-note">現在時間</p>
        </article>
        <article className="detail-card hero-detail glass">
          <p className="summary-kicker">AI RECOMMENDED SCENE</p>
          <h3>{sleepModeActive ? '睡眠模式已啟動，畫面已切到夜間低亮度' : '現在可以切到低亮度睡前模式'}</h3>
          <p>
            {sleepModeActive
              ? '主燈與客廳燈光已關閉，空調與床頭夜燈維持在舒適狀態。綠燈代表開啟，紅燈代表關閉，狀態一眼就能看懂。'
              : '偵測到時間偏晚，主燈仍開啟。建議把臥室亮度降到 20%，客廳燈關閉，避免突然大面積亮光。'}
          </p>
          <div className="scene-actions">
            {sleepModeActive ? (
              <button type="button" className="primary-action" onClick={onDisableSleepMode}>
                切換回日間模式
              </button>
            ) : (
              <button type="button" className="primary-action" onClick={onEnableSleepMode}>
                啟動睡眠模式
              </button>
            )}
          </div>
        </article>
        <article className="detail-card glass">
          <p className="summary-kicker">SCENES</p>
          <h3>簡單情境</h3>
          <div className="action-list">
            <button type="button">Sleep Mode</button>
            <button type="button">Work Mode</button>
            <button type="button">Movie Mode</button>
          </div>
        </article>
      </section>

      <section className="device-grid">
        {deviceStates.map((device) => (
          <article key={device.name} className="device-card glass">
            <div className="module-top">
              <div className="module-icon"><span className="material">{device.icon}</span></div>
              <div>
                <h4>{device.name}</h4>
                <p>{device.room} · {device.meta}</p>
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
        ))}
      </section>
    </>
  )
}

function TasksPage() {
  return (
    <>
      <section className="detail-grid two-col">
        <article className="detail-card hero-detail glass">
          <p className="summary-kicker">AI SUGGESTION</p>
          <h3>午餐後散步可以延後，不算失敗</h3>
          <p>這個 missed state 用可恢復的方式處理就好。先延後 30 分鐘，晚點再補完成，不需要製造壓力。</p>
          <button type="button" className="primary-action">延後 30 分鐘</button>
        </article>
        <article className="detail-card glass">
          <p className="summary-kicker">STATUS</p>
          <h3>今日提醒摘要</h3>
          <div className="reminder-summary compact">
            <strong>33%</strong>
            <div className="reminder-progress">
              <div className="progress"><span style={{ width: '33%' }} /></div>
              <span>1 completed · 1 missed · 2 upcoming</span>
            </div>
          </div>
        </article>
      </section>

      <section className="detail-card glass">
        <p className="summary-kicker">TODAY REMINDERS</p>
        <h3>今天的提醒</h3>
        <div className="task-list">
          {reminderItems.map((item) => (
            <div key={item.title} className={`task-row ${item.status}`}>
              <div>
                <strong>{item.title}</strong>
                <p>{item.time} · {item.status}</p>
              </div>
              <button type="button" className="secondary-action">{item.action}</button>
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
        <h3>完成後回到 Dashboard</h3>
        <p>設定只是暫存樣式，做完就回到主畫面，不要留在這裡繼續打轉。</p>
        <button type="button" className="primary-action" onClick={() => goToPage('home')}>
          回到 Dashboard
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
