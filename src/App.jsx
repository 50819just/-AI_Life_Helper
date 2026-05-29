import { useEffect, useMemo, useState } from 'react'
import './App.css'

const coreModules = [
  {
    id: 'briefing',
    title: '明日簡報',
    subtitle: '睡前把明天整理好',
    description:
      '先看第一個重要行程，再決定起床時間、鬧鐘與準備清單，讓你可以安心休息。',
    chip: '今晚可完成',
    meta: '明天 09:00 有重要行程',
  },
  {
    id: 'home',
    title: '智慧家庭控制',
    subtitle: '快速切換燈光與情境',
    description:
      '調整亮度、色溫與簡單場景，夜間使用保持安靜、低亮度、好操作。',
    chip: '睡前模式',
    meta: '客廳 · 臥室 · 書桌',
  },
  {
    id: 'reminder',
    title: 'AI 生活提醒',
    subtitle: '溫柔提醒今天節奏',
    description:
      '喝水、久坐、行程與睡前提醒都在這裡，完成、錯過、暫停狀態一眼看懂。',
    chip: '3 個待完成',
    meta: '今天 / 睡前 / 行程',
  },
]

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light'
  const saved = window.localStorage.getItem('a-life-theme')
  return saved === 'dark' ? 'dark' : 'light'
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('a-life-theme', theme)
  }, [theme])

  const isDark = theme === 'dark'

  const greetingTime = useMemo(() => {
    const now = new Date()
    const time = now
      .toLocaleTimeString('zh-TW', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
      .replace(/^0/, '')
    return `${time} · ${isDark ? '夜深了' : '晴朗'} · ${
      isDark ? '適合慢慢收尾今天的節奏' : '今天適合先整理三件事'
    }`
  }, [isDark])

  const themeLabel = isDark ? '深色模式' : '亮色模式'

  return (
    <div className="app-shell">
      <aside className="sidebar glass-panel">
        <div className="brand">
          <div className="brand-badge">AI</div>
          <div>
            <p className="eyebrow">AI Life Assistant</p>
            <h1>AI 生活小幫手</h1>
          </div>
        </div>

        <button className="primary-pill" type="button">
          <span className="pill-icon">＋</span>
          New Chat
        </button>

        <nav className="sidebar-nav" aria-label="Desktop navigation">
          <a className="nav-item active" href="#home">
            <span>⌂</span>
            <span>首頁</span>
          </a>
          <a className="nav-item" href="#ask-ai">
            <span>✦</span>
            <span>Ask AI</span>
          </a>
          <a className="nav-item" href="#home-control">
            <span>☾</span>
            <span>智慧家庭</span>
          </a>
          <a className="nav-item" href="#reminders">
            <span>◌</span>
            <span>生活提醒</span>
          </a>
        </nav>

        <div className="sidebar-footer">
          <button
            className="mode-pill"
            type="button"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
          >
            <span>{isDark ? '☼' : '☾'}</span>
            {themeLabel}
          </button>

          <div className="sidebar-links">
            <button type="button">設定</button>
            <button type="button">說明</button>
            <button type="button">帳號 / 登出</button>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar glass-panel">
          <div className="topbar-left">
            <div>
              <p className="eyebrow">Home / Dashboard</p>
              <h2>Hi Darius，今天過得還好嗎？</h2>
            </div>
            <p className="topbar-subtitle">{greetingTime}</p>
          </div>

          <div className="topbar-actions">
            <button className="ghost-chip" type="button">
              Ask AI
            </button>
            <button className="mode-pill mobile-mode-pill" type="button" onClick={() => setTheme(isDark ? 'light' : 'dark')}>
              <span>{isDark ? '☼' : '☾'}</span>
              {themeLabel}
            </button>
          </div>
        </header>

        <section className="hero glass-panel" id="home">
          <div className="hero-copy">
            <p className="eyebrow">今日節奏</p>
            <h3>先把明天和家裡的節奏整理好，再慢慢收心。</h3>
            <p>
              姊姊幫你把今天最重要的事情放在前面，首頁只保留可以一眼懂、也一眼能進去的入口。
            </p>

            <div className="hero-chips">
              <span className="status-chip warm">09:30 · 晴朗</span>
              <span className="status-chip calm">今天適合先整理三件事</span>
            </div>

            <div className="ask-bar" id="ask-ai">
              <div className="ask-bar-icon">✦</div>
              <div className="ask-bar-copy">
                <strong>Ask AI</strong>
                <span>問問今天要先處理什麼</span>
              </div>
              <button type="button" className="ask-button">
                開始
              </button>
            </div>
          </div>

          <div className="hero-summary">
            <article className="summary-card glass-card">
              <p>明日準備</p>
              <strong>82%</strong>
              <span>還有 2 件事確認完就能放心休息</span>
            </article>
            <article className="summary-card glass-card">
              <p>智慧家庭</p>
              <strong>3 台設備</strong>
              <span>臥室與客廳燈光都可快速調整</span>
            </article>
            <article className="summary-card glass-card">
              <p>今日提醒</p>
              <strong>4 筆</strong>
              <span>含睡前、喝水與久坐提醒</span>
            </article>
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <div>
              <p className="eyebrow">常用模組</p>
              <h3>三個正式 demo modules</h3>
            </div>
            <span className="section-note">完整流程會在各自 detail page 展開</span>
          </div>

          <div className="module-grid">
            {coreModules.map((module) => (
              <article key={module.id} className="module-card glass-card" id={module.id}>
                <div className="module-top">
                  <div>
                    <p className="module-chip">{module.chip}</p>
                    <h4>{module.title}</h4>
                    <p className="module-subtitle">{module.subtitle}</p>
                  </div>
                  <span className="module-meta">{module.meta}</span>
                </div>

                <p className="module-description">{module.description}</p>

                <div className="module-actions">
                  <button className="primary-action" type="button">
                    進入
                  </button>
                  <button className="secondary-action" type="button">
                    預覽
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="more-modules">
            <button type="button" className="more-button">
              更多模組 →
            </button>
          </div>
        </section>

      </main>

      <button className="floating-ask-ai" type="button">
        <span className="floating-ask-ai__icon">✦</span>
        Ask AI
      </button>

      <nav className="mobile-nav glass-panel" aria-label="Mobile navigation">
        <button className="mobile-nav-item active" type="button">
          <span>⌂</span>
          <span>Home</span>
        </button>
        <button className="mobile-nav-item" type="button">
          <span>◌</span>
          <span>Devices</span>
        </button>
        <button className="mobile-nav-item" type="button">
          <span>☾</span>
          <span>Tasks</span>
        </button>
        <button className="mobile-nav-item" type="button">
          <span>⚙</span>
          <span>Settings</span>
        </button>
      </nav>
    </div>
  )
}

export default App
