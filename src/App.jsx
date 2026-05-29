import { useEffect, useMemo, useState } from 'react'
import './App.css'

const summaryCards = [
  {
    title: 'Environment',
    value: '30%',
    caption: 'Humidity',
    icon: 'water_drop',
    accent: 'secondary',
  },
  {
    title: 'Sleep Analysis',
    value: '7.5',
    caption: 'hrs',
    note: '優質 +12%',
    icon: 'bedtime',
    accent: 'sleep',
  },
  {
    title: 'Quick Actions',
    value: '3',
    caption: '個常用動作',
    actions: ['設定明日鬧鐘', '關閉臥室燈', '開啟專注模式'],
    icon: 'bolt',
    accent: 'actions',
  },
]

const modules = [
  {
    title: '明日簡報',
    icon: 'calendar_month',
    entries: [
      { time: '10:00', title: 'Design Sync', sub: 'Product Team' },
      { time: '14:30', title: 'AI Model Review', sub: 'Tech Hub' },
    ],
    insight: '明天行程緊湊，建議今晚提前整理簡報資料。',
  },
  {
    title: '智慧家庭控制',
    icon: 'home_iot_device',
    controls: [
      { label: '客廳燈光', state: 'on' },
      { label: '空調', state: '24°C' },
    ],
    insight: '正在監測中：目前溫度 24.5°C',
  },
  {
    title: 'AI 生活提醒',
    icon: 'notifications_active',
    reminders: [
      { label: '補充水份 1200ml / 2000ml', state: 'progress', progress: 60 },
      { label: '攝取維他命 B 群', state: 'done' },
      { label: '久坐提醒：起來伸展一下', state: 'pending' },
    ],
    insight: '今日完成度 33%',
  },
]

const comingSoon = [
  { title: '健康監測', icon: 'health_metrics' },
  { title: '家庭空間', icon: 'nest_multi_room' },
  { title: '車載模式', icon: 'directions_car' },
  { title: '情緒分析', icon: 'mood' },
]

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light'
  return window.localStorage.getItem('a-life-theme') || 'light'
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.className = theme
    window.localStorage.setItem('a-life-theme', theme)
  }, [theme])

  const isDark = theme === 'dark'

  const headerMeta = useMemo(() => {
    const now = new Date()
    const time = now
      .toLocaleTimeString('zh-TW', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
      .replace(/^0/, '')
    return `${time} · ${isDark ? '夜深了' : '晴朗'} · 今天適合先整理三件事`
  }, [isDark])

  return (
    <div className="shell">
      <aside className="sidebar glass">
        <div className="brand">
          <div className="brand-icon">AI</div>
          <div>
            <p className="brand-kicker">AI LIFE ASSISTANT</p>
            <h1>AI生活小幫手</h1>
          </div>
        </div>

        <button className="new-chat" type="button">
          <span className="material">＋</span>
          <span>New Chat</span>
        </button>

        <nav className="side-nav" aria-label="Desktop navigation">
          <a className="side-link active" href="#home">
            <span className="material">home</span>
            <span>首頁</span>
          </a>
          <a className="side-link" href="#ask-ai">
            <span className="material">chat_bubble</span>
            <span>Ask AI</span>
          </a>
          <a className="side-link" href="#home-control">
            <span className="material">home_iot_device</span>
            <span>智慧家庭</span>
          </a>
          <a className="side-link" href="#reminders">
            <span className="material">notifications</span>
            <span>生活提醒</span>
          </a>
          <a className="side-link" href="#settings">
            <span className="material">settings</span>
            <span>設定</span>
          </a>
        </nav>

        <div className="side-footer">
          <button className="mode-pill" type="button" onClick={() => setTheme(isDark ? 'light' : 'dark')}>
            <span className="material">light_mode</span>
            <span>{isDark ? '深色模式' : '亮色模式'}</span>
          </button>

          <div className="utility-links">
            <a href="#help">
              <span className="material">help</span>
              <span>說明</span>
            </a>
            <a href="#account">
              <span className="material">logout</span>
              <span>帳號 / 登出</span>
            </a>
          </div>
        </div>
      </aside>

      <main className="content">
        <div className="content-inner">
          <header className="header">
            <div className="headline">
              <p className="page-kicker">HOME / 首頁</p>
              <h2>Hi Darius，今天過得還好嗎？</h2>
            </div>

            <button className="ask-pill" type="button">
              Ask AI
            </button>
          </header>

          <div className="meta-row">
            <span className="material small">schedule</span>
            <span>09:30</span>
            <span>·</span>
            <span className="material small">light_mode</span>
            <span>晴朗</span>
            <span>·</span>
            <span className="meta-chip">今天適合先整理三件事</span>
          </div>

          <section className="ask-section glass">
            <div className="ask-card" id="ask-ai">
              <div className="ask-glow" />
              <div className="ask-input-shell">
                <span className="material ask-icon">auto_awesome</span>
                <input type="text" placeholder="Ask AI" aria-label="Ask AI" />
                <button type="button" className="ask-submit">
                  <span className="material">arrow_upward</span>
                </button>
              </div>
            </div>

            <p className="ask-hint">行程、提醒、家中設備或明日準備，都可以直接問我。</p>

            <div className="query-chips">
              <button type="button">個人</button>
              <button type="button" className="active">
                家庭
              </button>
              <button type="button">工作</button>
            </div>
          </section>

          <section className="summary-grid">
            {summaryCards.map((card) => (
              <article key={card.title} className="summary glass">
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
                  <div className="quick-actions">
                    {card.actions.map((action) => (
                      <button key={action} type="button">
                        <span className="material small">arrow_right</span>
                        {action}
                      </button>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </section>

          <div className="modules-header">
            <h3>常用模組</h3>
            <button type="button" className="edit-link">
              編輯 <span className="material small">edit</span>
            </button>
          </div>

          <section className="module-grid">
            {modules.map((module) => (
              <article key={module.title} className="module glass">
                <div className="module-top">
                  <div className="module-icon">
                    <span className="material">{module.icon}</span>
                  </div>
                  <h4>{module.title}</h4>
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

                {'reminders' in module ? (
                  <div className="module-body reminder-list">
                    {module.reminders.map((reminder) => (
                      <div key={reminder.label} className={`reminder-row ${reminder.state}`}>
                        <div className="reminder-mark">
                          {reminder.state === 'done' ? <span className="material small">check</span> : null}
                        </div>
                        <div className="reminder-copy">
                          <p>{reminder.label}</p>
                          {reminder.state === 'progress' ? (
                            <div className="progress">
                              <span style={{ width: `${reminder.progress}%` }} />
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}

                <div className="module-foot">
                  <div className="insight">
                    {module.title === 'AI 生活提醒' ? (
                      <span className="insight-accent">{module.insight}</span>
                    ) : (
                      <p>{module.insight}</p>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </section>

          <div className="more-header">
            <h3>更多模組</h3>
          </div>

          <section className="coming-grid">
            {comingSoon.map((item) => (
              <article key={item.title} className="coming glass">
                <span className="material">{item.icon}</span>
                <p>{item.title}</p>
              </article>
            ))}
          </section>

          <footer className="footer">
            <p>AI 生活小幫手 · Lumina OS v1.0</p>
          </footer>
        </div>
      </main>
    </div>
  )
}

export default App
