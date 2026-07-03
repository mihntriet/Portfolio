import { motion } from 'framer-motion'
import { Server, Cloud, Cpu, GitBranch } from 'lucide-react'
import { myProfileData } from '../data/profile'

const ABOUT_CARDS = [
  {
    icon: Server,
    title: 'Infrastructure',
    description: 'Design and manage cloud infrastructure with IaC tools like Terraform & Pulumi.',
    color: '#00f0ff',
  },
  {
    icon: Cloud,
    title: 'Cloud Native',
    description: 'Deploy containerized apps on Kubernetes across multi-cloud environments.',
    color: '#a855f7',
  },
  {
    icon: Cpu,
    title: 'Automation',
    description: 'Build CI/CD pipelines that test, build, and deploy with zero human intervention.',
    color: '#39ff14',
  },
  {
    icon: GitBranch,
    title: 'GitOps',
    description: 'Version-controlled infrastructure with automated reconciliation and drift detection.',
    color: '#ff2d95',
  },
]

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function AboutSection() {
  return (
    <section id="about" className="relative">
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
            <span className="text-neon-cyan text-xs">01.</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
              <span className="text-neon-cyan">&gt;</span> about_me
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-neon-cyan/30 to-transparent" />
          </div>
          <p className="text-text-secondary text-sm max-w-2xl">
            I'm {myProfileData.personalInfo.fullName}, a {myProfileData.personalInfo.year.toLowerCase()} at {myProfileData.personalInfo.university}. {myProfileData.personalInfo.tagline}
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {ABOUT_CARDS.map((card) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                variants={cardVariants}
                className="cyber-card p-6 group"
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300
                    group-hover:scale-110"
                  style={{
                    background: `${card.color}10`,
                    border: `1px solid ${card.color}30`,
                  }}
                >
                  <Icon
                    className="w-6 h-6 transition-all duration-300"
                    style={{ color: card.color }}
                  />
                </div>
                <h3 className="text-sm font-bold mb-2 text-text-primary">{card.title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{card.description}</p>
                {/* Bottom accent line */}
                <div
                  className="mt-4 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
                  style={{ background: card.color, boxShadow: `0 0 8px ${card.color}` }}
                />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
