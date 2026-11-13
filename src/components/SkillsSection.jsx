import { motion } from 'framer-motion'
import { BookOpen, Container, Server, Terminal, Workflow } from 'lucide-react'
import { myProfileData } from '../data/profile'

const PRACTICED_ICONS = {
  Linux: Terminal,
  Docker: Container,
  Ansible: Server,
  'AWS EC2': Server,
  'GitHub Actions': Workflow,
}

function SkillCard({ skill, icon: Icon, accent, status }) {
  return (
    <div className="cyber-card p-5 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ color: accent, background: `${accent}12` }}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-text-primary">{skill.name}</h3>
          <span className="text-[10px] uppercase tracking-wider" style={{ color: accent }}>{status}</span>
        </div>
      </div>
      <p className="text-xs text-text-secondary leading-relaxed">{skill.detail}</p>
      {skill.href && (
        <a href={skill.href} target="_blank" rel="noopener noreferrer" className="text-xs text-neon-cyan hover:underline">
          View evidence →
        </a>
      )}
    </div>
  )
}

export default function SkillsSection() {
  return (
    <section id="skills" className="relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-neon-purple text-xs">02.</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
              <span className="text-neon-purple">&gt;</span> skills_and_evidence
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-neon-purple/30 to-transparent" />
          </div>
          <p className="text-text-secondary text-sm max-w-2xl">
            Tools I have practiced are separated from topics I have only studied. Public evidence is linked where available.
          </p>
        </motion.div>

        <h3 className="text-xs font-bold uppercase tracking-widest text-neon-green mb-4">Hands-on foundation</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-10">
          {myProfileData.skills.practiced.map((skill) => (
            <SkillCard key={skill.name} skill={skill} icon={PRACTICED_ICONS[skill.name]} accent="#10B981" status="Practiced" />
          ))}
        </div>

        <h3 className="text-xs font-bold uppercase tracking-widest text-neon-purple mb-4">Currently learning</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {myProfileData.skills.learning.map((skill) => (
            <SkillCard key={skill.name} skill={skill} icon={BookOpen} accent="#a855f7" status="Theory only" />
          ))}
        </div>
      </div>
    </section>
  )
}
