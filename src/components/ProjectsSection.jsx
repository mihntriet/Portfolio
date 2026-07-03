import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import {
  Server, Globe, Container, Shield, Database, Activity,
  Monitor, GitBranch, Cloud, Cpu, Radio, Network,
  ChevronRight, X, Workflow, HeartPulse, Smartphone, Gamepad2, Users, Layers,
} from 'lucide-react'
import { useState, useRef } from 'react'
import { myProfileData } from '../data/profile'

/* ============================================================
   ARCHITECTURE DATA
   Each project has nodes (icons) and connections between them.
   ============================================================ */
const PROJECTS = [
  {
    id: 'wedding-deployment',
    title: myProfileData.projects[0].title,
    subtitle: 'Automated CI/CD & Serverless Deployment',
    accent: '#a855f7',
    description: `${myProfileData.projects[0].description} ${myProfileData.projects[0].achievements}`,
    tags: myProfileData.projects[0].techStack,
    nodes: [
      { id: 'dev', label: 'Developer', icon: GitBranch, x: 8, y: 20, active: true },
      { id: 'github', label: 'GitHub Actions', icon: Workflow, x: 28, y: 20, active: true },
      { id: 'build', label: 'React Build', icon: Cpu, x: 48, y: 10, active: true },
      { id: 'test', label: 'Linter & Test', icon: Shield, x: 48, y: 32, active: true },
      { id: 'hosting', label: 'Firebase Hosting', icon: Container, x: 72, y: 20, active: true },
      { id: 'db', label: 'Firestore (RSVP)', icon: Database, x: 72, y: 50, active: true },
      { id: 'cdn', label: 'Global CDN', icon: Cloud, x: 90, y: 20, active: true },
    ],
    connections: [
      { from: 'dev', to: 'github' },
      { from: 'github', to: 'build' },
      { from: 'github', to: 'test' },
      { from: 'build', to: 'hosting' },
      { from: 'test', to: 'hosting' },
      { from: 'hosting', to: 'db' },
      { from: 'hosting', to: 'cdn' },
    ],
  },
  {
    id: 'lab-os-network',
    title: myProfileData.projects[1].title,
    subtitle: 'Containerization & Unix Systems',
    accent: '#3b82f6',
    description: `${myProfileData.projects[1].description} ${myProfileData.projects[1].achievements}`,
    tags: myProfileData.projects[1].techStack,
    nodes: [
      { id: 'dev', label: 'Developer', icon: GitBranch, x: 10, y: 30, active: true },
      { id: 'source', label: 'Local Git', icon: Workflow, x: 30, y: 30, active: true },
      { id: 'docker', label: 'Docker Engine', icon: Container, x: 52, y: 12, active: true },
      { id: 'env', label: 'Sync Environment', icon: Shield, x: 52, y: 48, active: true },
      { id: 'u_server', label: 'Ubuntu Server', icon: Server, x: 75, y: 30, active: true },
      { id: 'monitor', label: 'Output Logs', icon: Monitor, x: 92, y: 30, active: true },
    ],
    connections: [
      { from: 'dev', to: 'source' },
      { from: 'source', to: 'docker' },
      { from: 'source', to: 'env' },
      { from: 'docker', to: 'u_server' },
      { from: 'env', to: 'u_server' },
      { from: 'u_server', to: 'monitor' },
    ],
  },
  {
    id: 'food-delivery-app',
    title: myProfileData.projects[2].title,
    subtitle: 'Mobile App · Frontend & API Management',
    accent: '#10B981',
    description: `${myProfileData.projects[2].description} ${myProfileData.projects[2].achievements}`,
    tags: myProfileData.projects[2].techStack,
    githubRepo: myProfileData.projects[2].githubRepo,
    nodes: [
      { id: 'ui', label: 'React Native UI', icon: Smartphone, x: 8, y: 25, active: true },
      { id: 'expo', label: 'Expo Runtime', icon: Layers, x: 28, y: 25, active: true },
      { id: 'auth', label: 'Firebase Auth', icon: Shield, x: 50, y: 10, active: true },
      { id: 'api', label: 'Flask API Server', icon: Server, x: 50, y: 30, active: true },
      { id: 'db', label: 'Firestore DB', icon: Database, x: 50, y: 55, active: true },
      { id: 'menu', label: 'Menu Service', icon: Globe, x: 75, y: 15, active: true },
      { id: 'order', label: 'Order Service', icon: Activity, x: 75, y: 38, active: true },
      { id: 'track', label: 'Tracking RT', icon: Radio, x: 75, y: 60, active: true },
      { id: 'notif', label: 'Notifications', icon: HeartPulse, x: 92, y: 38, active: true },
    ],
    connections: [
      { from: 'ui', to: 'expo' },
      { from: 'expo', to: 'auth' },
      { from: 'expo', to: 'api' },
      { from: 'auth', to: 'api' },
      { from: 'api', to: 'menu' },
      { from: 'api', to: 'order' },
      { from: 'api', to: 'track' },
      { from: 'db', to: 'api' },
      { from: 'order', to: 'notif' },
      { from: 'track', to: 'notif' },
    ],
  },
  {
    id: 'group-game',
    title: myProfileData.projects[3].title,
    subtitle: 'Team Project · C++ Desktop Game',
    accent: '#ff6b35',
    description: `${myProfileData.projects[3].description} ${myProfileData.projects[3].achievements}`,
    tags: myProfileData.projects[3].techStack,
    githubRepo: myProfileData.projects[3].githubRepo,
    nodes: [
      { id: 'team', label: 'Team (Git)', icon: Users, x: 8, y: 25, active: true },
      { id: 'engine', label: 'Game Engine', icon: Cpu, x: 30, y: 25, active: true },
      { id: 'render', label: 'Renderer', icon: Monitor, x: 52, y: 10, active: true },
      { id: 'physics', label: 'Physics Engine', icon: Activity, x: 52, y: 30, active: true },
      { id: 'input', label: 'Input Handler', icon: Gamepad2, x: 52, y: 52, active: true },
      { id: 'state', label: 'Game State', icon: Layers, x: 75, y: 18, active: true },
      { id: 'score', label: 'Scoreboard', icon: Database, x: 75, y: 42, active: true },
      { id: 'audio', label: 'Audio System', icon: Radio, x: 92, y: 28, active: false },
    ],
    connections: [
      { from: 'team', to: 'engine' },
      { from: 'engine', to: 'render' },
      { from: 'engine', to: 'physics' },
      { from: 'engine', to: 'input' },
      { from: 'render', to: 'state' },
      { from: 'physics', to: 'state' },
      { from: 'input', to: 'state' },
      { from: 'state', to: 'score' },
      { from: 'render', to: 'audio' },
    ],
  },
  {
    id: 'interactive-portfolio',
    title: myProfileData.projects[4].title,
    subtitle: 'Futuristic Frontend & Cloud Hosting',
    accent: '#00f0ff',
    description: `${myProfileData.projects[4].description} ${myProfileData.projects[4].achievements}`,
    tags: myProfileData.projects[4].techStack,
    githubRepo: myProfileData.projects[4].githubRepo,
    nodes: [
      { id: 'dev', label: 'Local Dev (Git)', icon: GitBranch, x: 8, y: 30, active: true },
      { id: 'github', label: 'GitHub Webhook', icon: Workflow, x: 28, y: 30, active: true },
      { id: 'vercel', label: 'Vercel Deployment', icon: Server, x: 52, y: 12, active: true },
      { id: 'emailjs', label: 'EmailJS Gateway', icon: Shield, x: 52, y: 48, active: true },
      { id: 'cdn', label: 'Global Edge CDN', icon: Cloud, x: 75, y: 12, active: true },
      { id: 'mailbox', label: 'Gmail Inbox', icon: Database, x: 75, y: 48, active: true },
      { id: 'client', label: 'Client Browser', icon: Monitor, x: 92, y: 30, active: true },
    ],
    connections: [
      { from: 'dev', to: 'github' },
      { from: 'github', to: 'vercel' },
      { from: 'vercel', to: 'cdn' },
      { from: 'cdn', to: 'client' },
      { from: 'client', to: 'emailjs' },
      { from: 'emailjs', to: 'mailbox' },
    ],
  },
]

/* ============================================================
   PULSE RING — expanding circles for active nodes
   ============================================================ */
function PulseRing({ color, delay = 0 }) {
  return (
    <>
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{ border: `1.5px solid ${color}` }}
        animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          delay,
          ease: 'easeOut',
        }}
      />
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{ border: `1px solid ${color}` }}
        animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          delay: delay + 0.8,
          ease: 'easeOut',
        }}
      />
    </>
  )
}

/* ============================================================
   ARCHITECTURE NODE
   ============================================================ */
function ArchNode({ node, accent, index }) {
  const [hovered, setHovered] = useState(false)
  const Icon = node.icon

  return (
    <motion.div
      className="absolute flex flex-col items-center gap-1 z-10"
      style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 + index * 0.07, type: 'spring', stiffness: 250, damping: 18 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Icon container */}
      <motion.div
        className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center cursor-pointer"
        style={{
          background: node.active
            ? `radial-gradient(circle at 35% 35%, ${accent}20, ${accent}08)`
            : 'rgba(30,41,59,0.5)',
          border: `1.5px solid ${node.active ? accent + '60' : 'rgba(100,116,139,0.3)'}`,
        }}
        whileHover={{
          scale: 1.25,
          boxShadow: `0 0 24px ${accent}50, 0 0 48px ${accent}20`,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 12 }}
      >
        <Icon
          className="w-5 h-5 sm:w-5.5 sm:h-5.5"
          style={{
            color: node.active ? accent : '#64748b',
            filter: node.active ? `drop-shadow(0 0 4px ${accent}60)` : 'none',
          }}
        />
        {node.active && <PulseRing color={accent} delay={index * 0.4} />}
      </motion.div>

      {/* Label */}
      <motion.span
        className="text-[9px] sm:text-[10px] font-bold tracking-wide text-center whitespace-nowrap"
        style={{
          color: node.active ? accent : '#64748b',
          textShadow: hovered ? `0 0 8px ${accent}80` : 'none',
        }}
      >
        {node.label}
      </motion.span>

      {/* Status indicator */}
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{
          background: node.active ? '#39ff14' : '#64748b',
          boxShadow: node.active ? '0 0 4px #39ff14' : 'none',
        }}
      />
    </motion.div>
  )
}

/* ============================================================
   CONNECTION LINE with animated data flow dot
   ============================================================ */
function ConnectionLine({ from, to, accent, index, nodes }) {
  const fromNode = nodes.find((n) => n.id === from)
  const toNode = nodes.find((n) => n.id === to)
  if (!fromNode || !toNode) return null

  const x1 = fromNode.x
  const y1 = fromNode.y
  const x2 = toNode.x
  const y2 = toNode.y

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={`grad-${from}-${to}`} x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}>
          <stop offset="0%" stopColor={accent} stopOpacity="0.2" />
          <stop offset="50%" stopColor={accent} stopOpacity="0.4" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* Base line */}
      <motion.line
        x1={`${x1}%`} y1={`${y1}%`}
        x2={`${x2}%`} y2={`${y2}%`}
        stroke={`url(#grad-${from}-${to})`}
        strokeWidth="1.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: 0.5 + index * 0.06, duration: 0.5 }}
      />

      {/* Animated traveling dot */}
      <motion.circle
        r="3"
        fill={accent}
        style={{ filter: `drop-shadow(0 0 6px ${accent})` }}
        initial={{ opacity: 0 }}
        animate={{
          cx: [`${x1}%`, `${x2}%`],
          cy: [`${y1}%`, `${y2}%`],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 2,
          delay: 1.2 + index * 0.3,
          repeat: Infinity,
          repeatDelay: Math.max(0, (PROJECTS[0].connections.length - 1) * 0.3),
          ease: 'easeInOut',
        }}
      />
    </svg>
  )
}

/* ============================================================
   ARCHITECTURE DIAGRAM — expanded view
   ============================================================ */
function ArchitectureDiagram({ project }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="overflow-hidden"
    >
      <div className="pt-5 pb-2">
        {/* Description */}
        <motion.p
          className="text-xs text-text-secondary leading-relaxed mb-4 max-w-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {project.description}
        </motion.p>

        {/* Tags */}
        <motion.div
          className="flex flex-wrap gap-2 mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2.5 py-1 rounded-full border font-semibold"
              style={{
                color: project.accent,
                borderColor: `${project.accent}30`,
                background: `${project.accent}08`,
              }}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Architecture diagram */}
        <motion.div
          className="relative w-full rounded-xl overflow-hidden"
          style={{
            height: '340px',
            background: 'linear-gradient(145deg, rgba(11,15,25,0.95), rgba(17,24,39,0.9))',
            border: `1px solid ${project.accent}20`,
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.5 }}
        >
          {/* Grid background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, ${project.accent}06 1px, transparent 1px), linear-gradient(to bottom, ${project.accent}06 1px, transparent 1px)`,
              backgroundSize: '30px 30px',
            }}
          />

          {/* Diagram title */}
          <div className="absolute top-3 left-4 flex items-center gap-2 z-20">
            <span
              className="text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded border"
              style={{
                color: project.accent,
                borderColor: `${project.accent}30`,
                background: `${project.accent}10`,
              }}
            >
              ARCHITECTURE
            </span>
            <span className="text-[9px] text-text-muted">
              {project.nodes.filter((n) => n.active).length}/{project.nodes.length} nodes active
            </span>
          </div>

          {/* Connection lines */}
          {project.connections.map((conn, i) => (
            <ConnectionLine
              key={`${conn.from}-${conn.to}`}
              from={conn.from}
              to={conn.to}
              accent={project.accent}
              index={i}
              nodes={project.nodes}
            />
          ))}

          {/* Nodes */}
          {project.nodes.map((node, i) => (
            <ArchNode key={node.id} node={node} accent={project.accent} index={i} />
          ))}
        </motion.div>

        {/* GitHub link */}
        {project.githubRepo && (
          <motion.div
            className="mt-4 flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <a
              href={project.githubRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[11px] font-bold px-4 py-2 rounded-lg transition-all duration-300"
              style={{
                color: project.accent,
                border: `1px solid ${project.accent}35`,
                background: `${project.accent}0a`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = `${project.accent}18`
                e.currentTarget.style.boxShadow = `0 0 18px ${project.accent}25`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = `${project.accent}0a`
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <GitBranch className="w-3.5 h-3.5" />
              View on GitHub →
            </a>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

/* ============================================================
   PROJECT CARD — collapsed/expanded
   ============================================================ */
function ProjectCard({ project, isExpanded, onToggle, index }) {
  const Icon = project.nodes[0]?.icon || Server

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative"
    >
      <motion.div
        layout
        className="relative rounded-xl overflow-hidden cursor-pointer"
        style={{
          background: 'linear-gradient(145deg, rgba(26,31,46,0.85), rgba(11,15,25,0.95))',
          border: `1px solid ${isExpanded ? project.accent + '40' : 'rgba(30,41,59,0.6)'}`,
          boxShadow: isExpanded
            ? `0 0 40px ${project.accent}12, 0 0 80px ${project.accent}06`
            : '0 2px 15px rgba(0,0,0,0.2)',
          transition: 'border-color 0.3s, box-shadow 0.3s',
        }}
        onClick={onToggle}
        whileHover={!isExpanded ? {
          borderColor: `${project.accent}30`,
          boxShadow: `0 0 25px ${project.accent}10`,
        } : {}}
      >
        {/* Top glow line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.accent}${isExpanded ? '90' : '40'}, transparent)`,
          }}
          layout
        />

        <div className="p-5 sm:p-6">
          {/* Header — always visible */}
          <motion.div layout="position" className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: `${project.accent}12`,
                  border: `1px solid ${project.accent}30`,
                }}
              >
                <Icon className="w-5 h-5" style={{ color: project.accent }} />
              </div>

              <div>
                <h3
                  className="text-sm sm:text-base font-bold leading-tight"
                  style={{ color: isExpanded ? project.accent : '#e2e8f0' }}
                >
                  {project.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-text-muted mt-0.5">
                  {project.subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              {/* Live indicator */}
              <div className="hidden sm:flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: project.accent,
                    boxShadow: `0 0 6px ${project.accent}`,
                  }}
                />
                <span className="text-[9px] font-bold tracking-wider" style={{ color: project.accent }}>
                  LIVE
                </span>
              </div>

              {/* Expand/Collapse button */}
              <motion.div
                animate={{ rotate: isExpanded ? 45 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{
                  background: isExpanded ? `${project.accent}15` : 'rgba(30,41,59,0.5)',
                  border: `1px solid ${isExpanded ? project.accent + '40' : 'rgba(30,41,59,0.8)'}`,
                }}
              >
                {isExpanded ? (
                  <X className="w-3.5 h-3.5" style={{ color: project.accent }} />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-text-muted" />
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* Expanded content */}
          <AnimatePresence mode="wait">
            {isExpanded && (
              <ArchitectureDiagram key={project.id} project={project} />
            )}
          </AnimatePresence>

          {/* Preview mini-nodes when collapsed */}
          {!isExpanded && (
            <motion.div
              className="mt-4 flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex -space-x-2">
                {project.nodes.slice(0, 5).map((node, i) => {
                  const NodeIcon = node.icon
                  return (
                    <div
                      key={node.id}
                      className="w-7 h-7 rounded-full flex items-center justify-center"
                      style={{
                        background: node.active ? `${project.accent}15` : 'rgba(30,41,59,0.6)',
                        border: `1.5px solid ${node.active ? project.accent + '40' : '#1e293b'}`,
                        zIndex: 5 - i,
                      }}
                    >
                      <NodeIcon
                        className="w-3 h-3"
                        style={{ color: node.active ? project.accent : '#64748b' }}
                      />
                    </div>
                  )
                })}
                {project.nodes.length > 5 && (
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold"
                    style={{
                      background: `${project.accent}10`,
                      border: `1.5px solid ${project.accent}30`,
                      color: project.accent,
                    }}
                  >
                    +{project.nodes.length - 5}
                  </div>
                )}
              </div>
              <span className="text-[10px] text-text-muted">
                {project.nodes.length} nodes · {project.connections.length} connections
              </span>
              <span className="ml-auto text-[10px] font-semibold" style={{ color: project.accent }}>
                Click to explore →
              </span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ============================================================
   PROJECTS SECTION
   ============================================================ */
export default function ProjectsSection() {
  const [expandedId, setExpandedId] = useState(null)

  const handleToggle = (id) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  return (
    <section id="projects" className="relative">
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
            <span className="text-neon-green text-xs">03.</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
              <span className="text-neon-green">&gt;</span> project_showcase
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-neon-green/30 to-transparent" />
          </div>

          {/* Dashboard bar */}
          <div className="flex flex-wrap items-center gap-4 text-[10px] text-text-muted mt-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyber-border bg-cyber-surface/50">
              <Activity className="w-3 h-3 text-neon-green" />
              <span>Interactive Architecture</span>
            </div>
            <span className="hidden sm:inline text-text-muted/50">|</span>
            <span>
              Projects: <span className="text-neon-green">{PROJECTS.length}</span>
            </span>
            <span className="hidden sm:inline text-text-muted/50">|</span>
            <span>
              Total Nodes:{' '}
              <span className="text-neon-cyan">
                {PROJECTS.reduce((a, p) => a + p.nodes.length, 0)}
              </span>
            </span>
            <span className="hidden sm:inline text-text-muted/50">|</span>
            <span className="text-neon-green">
              Click a project to explore its architecture
            </span>
          </div>
        </motion.div>

        {/* Projects list */}
        <LayoutGroup>
          <div className="space-y-5">
            {PROJECTS.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                isExpanded={expandedId === project.id}
                onToggle={() => handleToggle(project.id)}
                index={i}
              />
            ))}
          </div>
        </LayoutGroup>
      </div>
    </section>
  )
}
