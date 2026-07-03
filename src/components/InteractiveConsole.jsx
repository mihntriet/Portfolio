import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Terminal, ChevronRight } from 'lucide-react'
import { myProfileData } from '../data/profile'

/* ============================================================
   COMMAND RESPONSES
   ============================================================ */
const HELP_LINES = [
  { text: 'CYBER-DEVOPS TERMINAL v3.0 — HELP', color: '#00f0ff' },
  { text: '──────────────────────────────────────────────────────', color: '#00f0ff' },
  { text: '  about      → Who am I? Background & passions', color: '#10B981' },
  { text: '  projects   → List deployed projects (sys log)', color: '#a855f7' },
  { text: '  skills     → Display tech stack proficiency', color: '#3b82f6' },
  { text: '  contact    → How to reach me', color: '#ff6b35' },
  { text: '  clear      → Clear terminal output', color: '#94a3b8' },
  { text: '  neofetch   → System information', color: '#39ff14' },
  { text: '──────────────────────────────────────────────────────', color: '#00f0ff' },
]

const ABOUT_LINES = [
  { text: '> cat ~/about.md', color: '#64748b' },
  { text: '', color: '' },
  { text: '■ PROFILE DETAILS', color: '#10B981' },
  { text: `  Name:     ${myProfileData.personalInfo.fullName}`, color: '#e2e8f0' },
  { text: `  Status:   ${myProfileData.personalInfo.year} @ HCMUS`, color: '#e2e8f0' },
  { text: `  Major:    ${myProfileData.personalInfo.major}`, color: '#e2e8f0' },
  { text: '  Location: Ho Chi Minh City, Vietnam', color: '#e2e8f0' },
  { text: '', color: '' },
  { text: '■ BIO SUMMARY', color: '#10B981' },
  { text: myProfileData.terminalCommands.about, color: '#94a3b8' },
]

const PROJECTS_LINES = [
  { text: '> tail -f /var/log/deployments.log', color: '#64748b' },
  { text: '', color: '' },
  ...myProfileData.projects.flatMap((p, idx) => {
    const colors = ['#a855f7', '#3b82f6', '#10B981', '#ff6b35', '#00f0ff']
    const color = colors[idx % colors.length]
    return [
      { text: `[DEPLOY] ✓ ${p.title}`, color },
      { text: `  ├── Stack: ${p.techStack.join(', ')}`, color: '#94a3b8' },
      { text: `  ├── ${p.achievements}`, color: '#39ff14' },
      { text: `  └── Repo: ${p.githubRepo || 'private'}`, color: '#00f0ff' },
      { text: '', color: '' }
    ]
  }),
  { text: '[INFO] All systems operational. 5 projects deployed.', color: '#39ff14' },
]

const getProgressBar = (level) => {
  const totalBlocks = 20
  const activeBlocks = Math.round((level / 100) * totalBlocks)
  const inactiveBlocks = totalBlocks - activeBlocks
  return '[' + '█'.repeat(activeBlocks) + '░'.repeat(inactiveBlocks) + ']'
}

const SKILLS_LINES = [
  { text: '> systemctl status tech-stack', color: '#64748b' },
  { text: '', color: '' },
  { text: '● tech-stack.service - Developer Skill Modules', color: '#3b82f6' },
  { text: '   Active: active (running) since 2024-09-01', color: '#39ff14' },
  { text: '', color: '' },
  ...Object.entries(myProfileData.skills).flatMap(([category, skillList]) => {
    return skillList.map(skill => {
      const bar = getProgressBar(skill.level)
      const dotLength = Math.max(2, 25 - skill.name.length)
      const dots = '.'.repeat(dotLength)
      return {
        text: `   ${bar} ${skill.name} ${dots} ${skill.level}%`,
        color: '#10B981'
      }
    })
  }),
]

const CONTACT_LINES = [
  { text: '> cat ~/.config/contact.yml', color: '#64748b' },
  { text: '', color: '' },
  { text: 'contact:', color: '#ff6b35' },
  { text: `  email: ${myProfileData.personalInfo.email}`, color: '#e2e8f0' },
  { text: '  location: "Ho Chi Minh City, Vietnam"', color: '#e2e8f0' },
  { text: '', color: '' },
  { text: 'socials:', color: '#ff6b35' },
  { text: `  github: ${myProfileData.personalInfo.github}`, color: '#00f0ff' },
  { text: `  linkedin: ${myProfileData.personalInfo.linkedin}`, color: '#3b82f6' },
  { text: '', color: '' },
  { text: 'availability:', color: '#ff6b35' },
  { text: '  status: "open to opportunities"', color: '#39ff14' },
  { text: '', color: '' },
  { text: '# Feel free to reach out! 🚀', color: '#64748b' },
]

const NEOFETCH_LINES = [
  { text: '', color: '' },
  { text: '        ╔═══╗                dev@portfolio', color: '#00f0ff' },
  { text: '       ║ ▲ ║                ──────────────', color: '#00f0ff' },
  { text: '      ╔╝   ╚╗               OS: Cyber-DevOS 3.0 LTS', color: '#e2e8f0' },
  { text: `     ║  DEV  ║              Host: ${myProfileData.personalInfo.fullName}`, color: '#e2e8f0' },
  { text: `    ╔╝  OPS  ╚╗             Kernel: ${myProfileData.personalInfo.university}`, color: '#e2e8f0' },
  { text: '   ║    ███    ║            Shell: zsh 5.9', color: '#e2e8f0' },
  { text: '   ╚═══════════╝            Theme: Cyber-Neon [Dark]', color: '#e2e8f0' },
  { text: '                            Terminal: InteractiveConsole', color: '#e2e8f0' },
  { text: '', color: '' },
  { text: '   ■ ■ ■ ■ ■ ■ ■ ■', color: '#ff2d95' },
]

const COMMAND_MAP = {
  help: HELP_LINES,
  about: ABOUT_LINES,
  projects: PROJECTS_LINES,
  skills: SKILLS_LINES,
  contact: CONTACT_LINES,
  neofetch: NEOFETCH_LINES,
}

/* ============================================================
   LINE-BY-LINE TYPING RENDERER
   ============================================================ */
function TypedOutput({ lines, onComplete }) {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    if (visibleCount >= lines.length) {
      onComplete?.()
      return
    }
    const delay = lines[visibleCount]?.text === '' ? 30 : 40
    const timer = setTimeout(() => setVisibleCount((c) => c + 1), delay)
    return () => clearTimeout(timer)
  }, [visibleCount, lines, onComplete])

  return (
    <>
      {lines.slice(0, visibleCount).map((line, i) => (
        <div key={i} className="leading-relaxed" style={{ minHeight: '1.25em' }}>
          <span style={{ color: line.color || '#e2e8f0' }}>{line.text}</span>
        </div>
      ))}
    </>
  )
}

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export default function InteractiveConsole() {
  const [history, setHistory] = useState([
    {
      type: 'system',
      title: 'Welcome to Cyber-DevOps Terminal v3.0',
      subtitle: 'Type "help" to see available commands.',
    },
  ])
  const [input, setInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [cmdHistory, setCmdHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  const inputRef = useRef(null)
  const scrollRef = useRef(null)

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history])

  const focusInput = useCallback(() => {
    inputRef.current?.focus()
  }, [])

  const handleCommand = useCallback((cmd) => {
    const trimmed = cmd.trim().toLowerCase()

    // Add command line to history display
    setHistory((prev) => [
      ...prev,
      { type: 'input', text: trimmed },
    ])

    // Add to command history for up/down arrows
    setCmdHistory((prev) => [trimmed, ...prev])
    setHistoryIndex(-1)

    if (!trimmed) return

    if (trimmed === 'clear') {
      setHistory([])
      return
    }

    const response = COMMAND_MAP[trimmed]

    if (response) {
      setIsProcessing(true)
      setHistory((prev) => [
        ...prev,
        { type: 'output', lines: response, id: Date.now() },
      ])
    } else {
      setHistory((prev) => [
        ...prev,
        {
          type: 'error',
          lines: [
            { text: `bash: ${trimmed}: command not found`, color: '#ef4444' },
            { text: 'Type "help" for available commands.', color: '#64748b' },
          ],
          id: Date.now(),
        },
      ])
    }
  }, [])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !isProcessing) {
      handleCommand(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setCmdHistory((prev) => {
        const newIndex = Math.min(historyIndex + 1, prev.length - 1)
        setHistoryIndex(newIndex)
        if (prev[newIndex]) setInput(prev[newIndex])
        return prev
      })
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const newIndex = Math.max(historyIndex - 1, -1)
      setHistoryIndex(newIndex)
      setInput(newIndex >= 0 ? cmdHistory[newIndex] || '' : '')
    }
  }, [input, isProcessing, historyIndex, cmdHistory, handleCommand])

  return (
    <section id="console" className="relative">
      <div className="section-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-neon-cyan text-xs">06.</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
              <span className="text-neon-cyan">&gt;</span> interactive_console
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-neon-cyan/30 to-transparent" />
          </div>
          <p className="text-text-secondary text-sm">
            Try the live terminal below. Type <code className="text-neon-cyan">help</code> to get started.
          </p>
        </motion.div>

        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="relative rounded-xl overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, rgba(11,15,25,0.98), rgba(17,24,39,0.95))',
            border: '1px solid rgba(0,240,255,0.15)',
            boxShadow: '0 0 40px rgba(0,240,255,0.05), 0 20px 60px rgba(0,0,0,0.4)',
          }}
          onClick={focusInput}
        >
          {/* Title bar */}
          <div
            className="flex items-center gap-3 px-4 py-2.5 border-b"
            style={{
              borderColor: 'rgba(0,240,255,0.1)',
              background: 'rgba(11,15,25,0.8)',
            }}
          >
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors cursor-pointer" />
            </div>
            <div className="flex items-center gap-2 ml-2">
              <Terminal className="w-3.5 h-3.5 text-neon-cyan" />
              <span className="text-[10px] text-text-muted tracking-wider">
                dev@portfolio:~
              </span>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="status-dot" />
              <span className="text-[9px] text-neon-green tracking-wider">CONNECTED</span>
            </div>
          </div>

          {/* Terminal body */}
          <div
            ref={scrollRef}
            className="p-4 sm:p-5 font-mono text-xs sm:text-sm overflow-y-auto"
            style={{
              height: '420px',
              scrollBehavior: 'smooth',
            }}
          >
            {history.map((entry, i) => {
              if (entry.type === 'input') {
                return (
                  <div key={i} className="flex items-center gap-2 mb-1">
                    <span className="text-neon-green select-none">❯</span>
                    <span className="text-text-primary">{entry.text}</span>
                  </div>
                )
              }

              if (entry.type === 'system') {
                return (
                  <div key={i} className="mb-4 p-4 rounded border border-neon-cyan/30 bg-neon-cyan/5 shadow-[0_0_15px_rgba(0,240,255,0.05)] relative overflow-hidden max-w-lg font-mono">
                    <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-neon-cyan" />
                    <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-neon-cyan" />
                    <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-neon-cyan" />
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-neon-cyan" />
                    <div className="text-neon-cyan font-bold mb-1 text-xs">
                      {entry.title}
                    </div>
                    <div className="text-text-muted text-[11px]">
                      {entry.subtitle}
                    </div>
                  </div>
                )
              }

              if (entry.type === 'output' || entry.type === 'error') {
                return (
                  <div key={entry.id || i} className="mb-3">
                    <TypedOutput
                      lines={entry.lines}
                      onComplete={() => setIsProcessing(false)}
                    />
                  </div>
                )
              }

              return null
            })}

            {/* Input line */}
            <div className="flex items-center gap-2 mt-1">
              <span className="text-neon-green select-none">❯</span>
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isProcessing}
                  className="w-full bg-transparent text-text-primary outline-none caret-transparent font-mono text-xs sm:text-sm"
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="Terminal command input"
                />
                {/* Custom blinking cursor */}
                <motion.span
                  className="absolute top-0 inline-block w-[7px] sm:w-[8px] h-[1.1em] rounded-sm"
                  style={{
                    left: `${input.length * 0.602}em`,
                    background: '#00f0ff',
                    boxShadow: '0 0 6px rgba(0,240,255,0.7), 0 0 12px rgba(0,240,255,0.3)',
                  }}
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: 'steps(2)' }}
                />
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="flex items-center justify-between px-4 py-2 border-t text-[9px] text-text-muted"
            style={{
              borderColor: 'rgba(0,240,255,0.08)',
              background: 'rgba(11,15,25,0.6)',
            }}
          >
            <span>
              bash — {history.filter((e) => e.type === 'input').length} commands executed
            </span>
            <div className="flex items-center gap-4">
              <span>UTF-8</span>
              <span>LF</span>
              <span className="text-neon-cyan">zsh 5.9</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
