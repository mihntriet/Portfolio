import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useState, useEffect, useCallback } from 'react'
import { Terminal as TerminalIcon, Server, Container, GitBranch, Cloud, Activity } from 'lucide-react'
import { myProfileData } from '../data/profile'

/* ============================================================
   DATA
   ============================================================ */
const SKILL_CLUSTERS = [
  {
    id: 'linux',
    title: 'Linux & Automation',
    icon: TerminalIcon,
    accent: '#10B981',
    statusLabel: 'OPERATIONAL',
    skills: myProfileData.skills.linuxAutomation,
  },
  {
    id: 'containers',
    title: 'Containers & Orchestration',
    icon: Container,
    accent: '#3b82f6',
    statusLabel: 'SCALING',
    skills: myProfileData.skills.containers,
  },
  {
    id: 'cicd',
    title: 'CI/CD',
    icon: GitBranch,
    accent: '#a855f7',
    statusLabel: 'DEPLOYING',
    skills: myProfileData.skills.cicd,
  },
  {
    id: 'cloud',
    title: 'Cloud & Monitoring',
    icon: Cloud,
    accent: '#ff6b35',
    statusLabel: 'MONITORING',
    skills: myProfileData.skills.cloudMonitoring,
  },
]

/* ============================================================
   ANIMATED COUNTER — numbers count up on scroll
   ============================================================ */
function AnimatedCounter({ target, isInView, duration = 1.8, suffix = '%' }) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true

    const startTime = performance.now()
    const animate = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)
      // easeOutExpo
      const eased = 1 - Math.pow(2, -10 * progress)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isInView, target, duration])

  return (
    <span className="tabular-nums">
      {count}{suffix}
    </span>
  )
}

/* ============================================================
   RADIAL PROGRESS RING — circular progress with glow
   ============================================================ */
function RadialProgressRing({ skill, accent, isInView, index }) {
  const size = 110
  const strokeWidth = 6
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  const [offset, setOffset] = useState(circumference)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true

    const targetOffset = circumference - (skill.level / 100) * circumference
    const startTime = performance.now()
    const duration = 2000

    const animate = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(2, -10 * progress)
      const current = circumference - eased * (circumference - targetOffset)
      setOffset(current)
      if (progress < 1) requestAnimationFrame(animate)
    }

    // Stagger per index
    setTimeout(() => requestAnimationFrame(animate), index * 300)
  }, [isInView, skill.level, circumference, index])

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        {/* SVG Ring */}
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
          style={{ filter: `drop-shadow(0 0 6px ${accent}40)` }}
        >
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(30,41,59,0.6)"
            strokeWidth={strokeWidth}
          />
          {/* Progress */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={accent}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transition: 'none',
              filter: `drop-shadow(0 0 4px ${accent})`,
            }}
          />
          {/* Glow overlay */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={accent}
            strokeWidth={strokeWidth + 4}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            opacity={0.15}
            style={{ filter: 'blur(4px)' }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-xl font-extrabold"
            style={{
              color: accent,
              textShadow: `0 0 10px ${accent}60`,
            }}
          >
            <AnimatedCounter target={skill.level} isInView={isInView} />
          </span>
        </div>

        {/* Orbiting dot */}
        {isInView && (
          <motion.div
            className="absolute"
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: accent,
              boxShadow: `0 0 10px ${accent}, 0 0 20px ${accent}80`,
              top: 0,
              left: '50%',
              marginLeft: -4,
              transformOrigin: `4px ${size / 2}px`,
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'linear',
              delay: index * 0.3,
            }}
          />
        )}
      </div>

      {/* Label */}
      <span
        className="text-xs font-bold tracking-wider uppercase"
        style={{ color: accent }}
      >
        {skill.name}
      </span>
    </div>
  )
}

/* ============================================================
   3D TILT CARD — hover-based perspective tilt
   ============================================================ */
function TiltCard({ children, className = '', accent }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -12
    const rotateY = ((x - centerX) / centerX) * 12

    setTilt({ rotateX, rotateY })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 })
    setIsHovered(false)
  }, [])

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      style={{ perspective: '800px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="w-full h-full"
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Card body */}
        <div
          className="relative rounded-xl overflow-hidden h-full"
          style={{
            background: 'linear-gradient(145deg, rgba(26,31,46,0.9), rgba(11,15,25,0.95))',
            border: `1px solid ${isHovered ? accent + '50' : 'rgba(30,41,59,0.6)'}`,
            boxShadow: isHovered
              ? `0 20px 60px -15px ${accent}20, 0 0 30px ${accent}10, inset 0 1px 0 ${accent}15`
              : '0 4px 20px rgba(0,0,0,0.3)',
            transition: 'border-color 0.3s, box-shadow 0.3s',
          }}
        >
          {/* Top edge glow */}
          <div
            className="absolute top-0 left-0 right-0 h-[1px]"
            style={{
              background: `linear-gradient(90deg, transparent, ${accent}${isHovered ? '80' : '30'}, transparent)`,
              transition: 'background 0.3s',
            }}
          />

          {/* Grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(to right, ${accent} 1px, transparent 1px), linear-gradient(to bottom, ${accent} 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          />

          {/* Spotlight on hover */}
          {isHovered && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle at ${50 + tilt.rotateY * 3}% ${50 - tilt.rotateX * 3}%, ${accent}08 0%, transparent 60%)`,
              }}
            />
          )}

          {children}
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ============================================================
   LIVE WAVE ANIMATION — small wave indicator
   ============================================================ */
function WaveIndicator({ accent }) {
  return (
    <div className="flex items-end gap-[2px] h-4">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full"
          style={{ background: accent }}
          animate={{
            height: ['4px', '14px', '6px', '16px', '4px'],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

/* ============================================================
   SINGLE CLUSTER CARD
   ============================================================ */
function ClusterCard({ cluster, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const Icon = cluster.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: 'easeOut' }}
    >
      <TiltCard accent={cluster.accent} className="h-full">
        <div className="p-6 sm:p-7 flex flex-col h-full relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  background: `${cluster.accent}12`,
                  border: `1px solid ${cluster.accent}30`,
                }}
              >
                <Icon className="w-5 h-5" style={{ color: cluster.accent }} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-text-primary leading-tight">
                  {cluster.title}
                </h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: cluster.accent,
                      boxShadow: `0 0 6px ${cluster.accent}`,
                    }}
                  />
                  <span
                    className="text-[9px] font-bold tracking-widest uppercase"
                    style={{ color: cluster.accent }}
                  >
                    {cluster.statusLabel}
                  </span>
                </div>
              </div>
            </div>
            <WaveIndicator accent={cluster.accent} />
          </div>

          {/* Radial rings */}
          <div className="flex items-center justify-around flex-1 py-2">
            {cluster.skills.map((skill, i) => (
              <RadialProgressRing
                key={skill.name}
                skill={skill}
                accent={cluster.accent}
                isInView={isInView}
                index={i}
              />
            ))}
          </div>

          {/* Footer metrics */}
          <div
            className="mt-5 pt-4 border-t flex items-center justify-between"
            style={{ borderColor: `${cluster.accent}15` }}
          >
            <div className="flex items-center gap-1.5">
              <Activity className="w-3 h-3" style={{ color: cluster.accent }} />
              <span className="text-[10px] text-text-muted">
                Avg: <span style={{ color: cluster.accent }}>
                  <AnimatedCounter
                    target={Math.round(
                      cluster.skills.reduce((a, s) => a + s.level, 0) / cluster.skills.length
                    )}
                    isInView={isInView}
                    duration={2.2}
                  />
                </span>
              </span>
            </div>
            <span className="text-[10px] text-text-muted">
              {cluster.skills.length} modules loaded
            </span>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  )
}

/* ============================================================
   SKILLS SECTION — Infrastructure Dashboard
   ============================================================ */
export default function SkillsSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="relative" ref={sectionRef}>
      <div className="section-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-neon-purple text-xs">02.</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
              <span className="text-neon-purple">&gt;</span> infra_dashboard
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-neon-purple/30 to-transparent" />
          </div>

          {/* Dashboard status bar */}
          <div className="flex flex-wrap items-center gap-4 text-[10px] text-text-muted mt-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyber-border bg-cyber-surface/50">
              <span className="status-dot" />
              <span>All Systems Nominal</span>
            </div>
            <span className="hidden sm:inline text-text-muted/50">|</span>
            <span>Clusters: <span className="text-neon-purple">{SKILL_CLUSTERS.length}</span></span>
            <span className="hidden sm:inline text-text-muted/50">|</span>
            <span>
              Total Modules:{' '}
              <span className="text-neon-cyan">
                {SKILL_CLUSTERS.reduce((a, c) => a + c.skills.length, 0)}
              </span>
            </span>
            <span className="hidden sm:inline text-text-muted/50">|</span>
            <span>
              Uptime: <span className="text-neon-green">99.97%</span>
            </span>
          </div>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_CLUSTERS.map((cluster, i) => (
            <ClusterCard key={cluster.id} cluster={cluster} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
