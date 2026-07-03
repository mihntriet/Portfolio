import { motion, useAnimationControls, useMotionValue, useTransform } from 'framer-motion'
import { Terminal, ChevronDown, GitBranch, Hammer, FlaskConical, Rocket, Scan } from 'lucide-react'
import { useEffect, useState, useCallback, useRef } from 'react'
import { myProfileData } from '../data/profile'

/* ============================================================
   TYPEWRITER EFFECT FOR "DevOps Engineer"
   ============================================================ */
const TYPEWRITER_TEXT = 'DevOps Engineer'
const TYPING_SPEED = 100
const DELETE_SPEED = 60
const PAUSE_AFTER_TYPE = 2200
const PAUSE_AFTER_DELETE = 600

function useTypewriter(text) {
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let timeout

    if (!isDeleting && displayed.length < text.length) {
      timeout = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1))
      }, TYPING_SPEED + Math.random() * 50)
    } else if (!isDeleting && displayed.length === text.length) {
      timeout = setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPE)
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length - 1))
      }, DELETE_SPEED)
    } else if (isDeleting && displayed.length === 0) {
      timeout = setTimeout(() => setIsDeleting(false), PAUSE_AFTER_DELETE)
    }

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, text])

  return displayed
}

/* ============================================================
   CI/CD PIPELINE NODE
   ============================================================ */
const PIPELINE_NODES = [
  { id: 'source', label: 'Source', icon: GitBranch, color: '#10B981' },
  { id: 'build', label: 'Build', icon: Hammer, color: '#3b82f6' },
  { id: 'test', label: 'Test', icon: FlaskConical, color: '#a855f7' },
  { id: 'deploy', label: 'Deploy', icon: Rocket, color: '#ff6b35' },
]

/* Burst rays on hover */
function BurstRays({ color, isHovered }) {
  const rayCount = 8
  return (
    <>
      {Array.from({ length: rayCount }).map((_, i) => {
        const angle = (360 / rayCount) * i
        return (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 pointer-events-none"
            style={{
              width: '2px',
              height: '16px',
              background: `linear-gradient(to top, ${color}, transparent)`,
              transformOrigin: '50% 0%',
              rotate: `${angle}deg`,
              x: '-50%',
              y: '-50%',
            }}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={
              isHovered
                ? {
                  opacity: [0, 1, 0],
                  scaleY: [0, 1.6, 0],
                  transition: { duration: 0.6, ease: 'easeOut' },
                }
                : { opacity: 0, scaleY: 0 }
            }
          />
        )
      })}
    </>
  )
}

/* Single pipeline node */
function PipelineNode({ node, index, totalNodes }) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = node.icon

  return (
    <motion.div
      className="relative flex flex-col items-center gap-2 z-10"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8 + index * 0.15, type: 'spring', stiffness: 200, damping: 15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Node circle */}
      <motion.div
        className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center cursor-pointer"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${node.color}25, ${node.color}08)`,
          border: `2px solid ${node.color}50`,
        }}
        whileHover={{
          scale: 1.2,
          boxShadow: `0 0 30px ${node.color}60, 0 0 60px ${node.color}25`,
          borderColor: node.color,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      >
        <Icon className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: node.color }} />

        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: `1px solid ${node.color}` }}
          animate={{
            scale: [1, 1.5, 1.5],
            opacity: [0.5, 0, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: index * 0.6,
            ease: 'easeOut',
          }}
        />

        {/* Burst rays */}
        <BurstRays color={node.color} isHovered={isHovered} />
      </motion.div>

      {/* Label */}
      <motion.span
        className="text-[10px] sm:text-xs font-bold tracking-wider uppercase"
        style={{ color: node.color }}
        animate={isHovered ? { textShadow: `0 0 10px ${node.color}` } : { textShadow: 'none' }}
      >
        {node.label}
      </motion.span>

      {/* Step number */}
      <span className="text-[9px] text-text-muted">
        {String(index + 1).padStart(2, '0')}/{String(totalNodes).padStart(2, '0')}
      </span>
    </motion.div>
  )
}

/* ============================================================
   CONNECTOR LINE WITH TRAVELING GLOW DOT
   ============================================================ */
function ConnectorLine({ fromColor, toColor, index }) {
  return (
    <div className="relative flex-1 flex items-center min-w-[40px] sm:min-w-[60px] z-0"
      style={{ marginTop: '-30px' }}
    >
      {/* Base line */}
      <div
        className="w-full h-[2px] rounded-full"
        style={{
          background: `linear-gradient(to right, ${fromColor}40, ${toColor}40)`,
        }}
      />

      {/* Subtle glow line */}
      <div
        className="absolute inset-0 h-[2px] rounded-full opacity-30"
        style={{
          background: `linear-gradient(to right, ${fromColor}20, ${toColor}20)`,
          filter: 'blur(4px)',
        }}
      />

      {/* Traveling glow dot */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2"
        style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: `radial-gradient(circle, white 0%, ${toColor} 50%, transparent 100%)`,
          boxShadow: `0 0 12px ${toColor}, 0 0 24px ${toColor}80`,
        }}
        animate={{
          left: ['-5px', 'calc(100% - 5px)'],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 1.5,
          delay: index * 1.5 + 1.5,
          repeat: Infinity,
          repeatDelay: (PIPELINE_NODES.length - 1) * 1.5 - 1.5,
          ease: 'easeInOut',
        }}
      />

      {/* Arrow tip */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2"
        style={{
          width: 0,
          height: 0,
          borderLeft: `6px solid ${toColor}60`,
          borderTop: '4px solid transparent',
          borderBottom: '4px solid transparent',
        }}
      />
    </div>
  )
}

/* ============================================================
   FULL CI/CD PIPELINE VISUAL
   ============================================================ */
function CICDPipeline() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="relative"
    >
      {/* Pipeline container card */}
      <div className="cyber-card p-5 sm:p-8 relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <span className="text-[10px] text-text-muted ml-2 tracking-wider">
            CI/CD PIPELINE — LIVE
          </span>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="status-dot" />
            <span className="text-[9px] text-neon-green tracking-wider">RUNNING</span>
          </div>
        </div>

        {/* Pipeline nodes + connectors */}
        <div className="flex items-start justify-between gap-1">
          {PIPELINE_NODES.map((node, i) => (
            <motion.div key={node.id} className="contents">
              <PipelineNode
                node={node}
                index={i}
                totalNodes={PIPELINE_NODES.length}
              />
              {i < PIPELINE_NODES.length - 1 && (
                <ConnectorLine
                  fromColor={node.color}
                  toColor={PIPELINE_NODES[i + 1].color}
                  index={i}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Status bar */}
        <motion.div
          className="mt-6 pt-4 border-t border-cyber-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <div className="flex items-center justify-between text-[10px] text-text-muted">
            <span>
              <span className="text-neon-green">✓</span> Pipeline #1247 — All stages passed
            </span>
            <span>Duration: 3m 42s</span>
          </div>
          {/* Progress bar */}
          <div className="mt-2 h-1 bg-cyber-border rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(to right, #10B981, #3b82f6, #a855f7, #ff6b35)',
              }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{
                duration: PIPELINE_NODES.length * 1.5 + 1.5,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </div>
        </motion.div>

        {/* Background grid pattern inside card */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #10B981 1px, transparent 1px), linear-gradient(to bottom, #10B981 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
      </div>
    </motion.div>
  )
}

/* ============================================================
   FUTURISTIC AVATAR — angular frame, glow border, scanlines
   ============================================================ */
function FuturisticAvatar() {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className="relative flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
    >
      {/* ── Outer radar ring (slow pulse) ── */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '330px',
          height: '330px',
          border: '1px solid rgba(16,185,129,0.15)',
        }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Radar sweep arc (rotating) ── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: '310px',
          height: '310px',
          borderRadius: '50%',
          background:
            'conic-gradient(from 0deg, transparent 75%, rgba(16,185,129,0.45) 90%, rgba(0,240,255,0.2) 100%)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />

      {/* ── Second sweep ring (offset) ── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: '310px',
          height: '310px',
          borderRadius: '50%',
          border: '1px solid rgba(0,240,255,0.25)',
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />

      {/* ── Corner accent brackets ── */}
      {[0, 90, 180, 270].map((rot) => (
        <motion.div
          key={rot}
          className="absolute pointer-events-none"
          style={{
            width: '260px',
            height: '260px',
            rotate: `${rot}deg`,
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: rot / 360 }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '24px',
              height: '24px',
              borderTop: '2px solid #10B981',
              borderLeft: '2px solid #10B981',
              boxShadow: '0 0 10px rgba(16,185,129,0.7)',
            }}
          />
        </motion.div>
      ))}

      {/* ── Main image container ── */}
      <motion.div
        className="relative overflow-hidden cursor-pointer"
        style={{
          width: '240px',
          height: '240px',
          clipPath: 'polygon(12px 0%, calc(100% - 12px) 0%, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0% calc(100% - 12px), 0% 12px)',
          border: '1.5px solid rgba(16,185,129,0.5)',
          boxShadow: hovered
            ? '0 0 30px rgba(16,185,129,0.5), 0 0 60px rgba(16,185,129,0.2), inset 0 0 20px rgba(16,185,129,0.05)'
            : '0 0 15px rgba(16,185,129,0.2), 0 0 40px rgba(16,185,129,0.08)',
          transition: 'box-shadow 0.4s ease',
        }}
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.35 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Photo */}
        <img
          src="/deptrai.png"
          alt={myProfileData.personalInfo.fullName}
          className="w-full h-full object-cover transition-all duration-500"
          style={{
            filter: hovered
              ? 'brightness(1.05) saturate(1.1)'
              : 'brightness(0.75) saturate(0.6) hue-rotate(160deg)',
          }}
        />

        {/* Neon color overlay (always, fades on hover) */}
        <div
          className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
          style={{
            background: hovered
              ? 'linear-gradient(135deg, rgba(16,185,129,0.05), rgba(0,240,255,0.03))'
              : 'linear-gradient(135deg, rgba(16,185,129,0.25), rgba(0,240,255,0.12))',
            mixBlendMode: 'color',
          }}
        />

        {/* Scanlines overlay */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            opacity: hovered ? 0.08 : 0.22,
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)',
          }}
        />

        {/* Glitch slice on hover */}
        {hovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ overflow: 'hidden' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0, 0.4, 0] }}
            transition={{ duration: 0.3, times: [0, 0.2, 0.4, 0.7, 1] }}
          >
            <div
              style={{
                position: 'absolute',
                top: '30%',
                left: '-5px',
                right: '-5px',
                height: '4px',
                background: 'rgba(0,240,255,0.6)',
                filter: 'blur(1px)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '65%',
                left: '-5px',
                right: '-5px',
                height: '2px',
                background: 'rgba(168,85,247,0.5)',
                filter: 'blur(1px)',
              }}
            />
          </motion.div>
        )}

        {/* Bottom HUD bar */}
        <div
          className="absolute bottom-0 left-0 right-0 py-2 px-3 flex items-center gap-2"
          style={{
            background: 'linear-gradient(to top, rgba(11,15,25,0.95), transparent)',
          }}
        >
          <motion.span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: '#10B981', boxShadow: '0 0 6px #10B981' }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          <span className="text-[9px] font-bold tracking-widest" style={{ color: '#10B981' }}>
            ID_VERIFIED
          </span>
          <Scan className="w-3 h-3 ml-auto" style={{ color: 'rgba(0,240,255,0.5)' }} />
        </div>
      </motion.div>

      {/* Name label below */}
      <motion.div
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-center whitespace-nowrap"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <p className="text-[10px] tracking-[0.25em] uppercase" style={{ color: 'rgba(16,185,129,0.7)' }}>
          {myProfileData.personalInfo.fullName}
        </p>
      </motion.div>
    </motion.div>
  )
}

/* ============================================================
   HERO SECTION
   ============================================================ */
export default function HeroSection() {
  const typedText = useTypewriter(TYPEWRITER_TEXT)

  return (
    <section id="hero" className="relative min-h-screen flex items-center scanlines">
      <div className="section-container w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px_1fr] gap-8 lg:gap-12 items-center">

          {/* ===== LEFT SIDE — Info ===== */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Terminal prompt */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center gap-2 mb-5"
            >
              <Terminal className="w-4 h-4 text-neon-green" />
              <span className="text-xs text-text-muted tracking-widest uppercase">
                portfolio.init()
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <p className="text-text-secondary text-sm sm:text-base mb-2">
                <span className="text-neon-cyan">&gt;</span> Hello, World!
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                <span className="text-text-primary">Hi, I'm a</span>
                <br />
                {/* Typewriter with neon green glow */}
                <span
                  className="inline-block min-h-[1.2em] notranslate"
                  translate="no"
                  style={{
                    color: '#10B981',
                    textShadow:
                      '0 0 7px rgba(16,185,129,0.8), 0 0 20px rgba(16,185,129,0.5), 0 0 40px rgba(16,185,129,0.3), 0 0 80px rgba(16,185,129,0.15)',
                  }}
                >
                  {typedText}
                  <motion.span
                    className="inline-block w-[3px] h-[0.85em] ml-[2px] align-middle rounded-sm"
                    style={{ background: '#10B981', boxShadow: '0 0 8px #10B981' }}
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'steps(2)' }}
                  />
                </span>
              </h1>
            </motion.div>

            {/* Sub-info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
                style={{
                  borderColor: 'rgba(16,185,129,0.3)',
                  background: 'rgba(16,185,129,0.05)',
                }}
              >
                <span className="status-dot" />
                <span className="text-xs sm:text-sm font-semibold" style={{ color: '#10B981' }}>
                  {myProfileData.personalInfo.year} HCMUS
                </span>
              </div>

              <p className="text-text-secondary text-xs sm:text-sm max-w-md leading-relaxed mb-8">
                {myProfileData.personalInfo.tagline}
              </p>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="#projects"
                className="text-xs px-5 py-2.5 rounded-lg font-bold transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.08))',
                  border: '1px solid rgba(16,185,129,0.4)',
                  color: '#10B981',
                  boxShadow: '0 0 15px rgba(16,185,129,0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 25px rgba(16,185,129,0.25)'
                  e.currentTarget.style.borderColor = 'rgba(16,185,129,0.7)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(16,185,129,0.1)'
                  e.currentTarget.style.borderColor = 'rgba(16,185,129,0.4)'
                }}
              >
                ./view_projects.sh
              </a>
              <a
                href="#contact"
                className="text-xs px-5 py-2.5 rounded-lg font-bold border border-cyber-border text-text-secondary
                  hover:border-neon-cyan/40 hover:text-neon-cyan hover:shadow-[0_0_15px_rgba(0,240,255,0.1)]
                  transition-all duration-300"
              >
                ./contact_me.sh
              </a>
            </motion.div>
          </motion.div>

          {/* ===== CENTER — Futuristic Avatar ===== */}
          <div className="hidden lg:flex items-center justify-center py-10">
            <FuturisticAvatar />
          </div>

          {/* ===== RIGHT SIDE — CI/CD Pipeline ===== */}
          <CICDPipeline />
        </div>

        {/* Scroll indicator */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-text-muted hover:text-neon-cyan transition-colors"
        >
          <span className="text-[10px] tracking-widest uppercase">scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.a>
      </div>
    </section>
  )
}
