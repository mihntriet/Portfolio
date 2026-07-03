import { motion, AnimatePresence } from 'framer-motion'
import { Send, Mail, MapPin, GitFork, Globe, Share2, Radio, Wifi, Loader2, CheckCircle2, Shield } from 'lucide-react'
import { useState, useEffect } from 'react'
import { myProfileData } from '../data/profile'

const SOCIAL_LINKS = [
  { icon: GitFork, label: 'GitHub (Main)', href: myProfileData.personalInfo.github, color: '#10B981' },
  { icon: GitFork, label: 'GitHub (Projects)', href: myProfileData.personalInfo.githubAlt, color: '#a855f7' },
  { icon: Globe, label: 'LinkedIn', href: myProfileData.personalInfo.linkedin, color: '#3b82f6' },
]

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isTransmitting, setIsTransmitting] = useState(false)
  const [transmitLogs, setTransmitLogs] = useState([])
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsTransmitting(true)
    setTransmitLogs([])
    setIsSuccess(false)

    const logs = [
      "[SYSTEM] Initializing Signal Transmitter...",
      "[ENCRYPT] Encrypting message payloads with AES-256...",
      "[UPLINK] Establishing connection to central server LIO_SERVER...",
      "[ROUTING] Tunneling data packages through secure gateway...",
      "[TRANSMIT] Transmitting secure signal burst..."
    ]

    let currentLogIndex = 0
    const interval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        setTransmitLogs((prev) => [...prev, logs[currentLogIndex]])
        currentLogIndex++
      } else {
        clearInterval(interval)

        // Retrieve configurations
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

        setTransmitLogs((prev) => [...prev, "[API] Initiating EmailJS integration payload..."])

        fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: {
              from_name: formData.name,
              from_email: formData.email,
              message: formData.message
            }
          })
        })
          .then((res) => {
            if (res.ok) {
              setTransmitLogs((prev) => [...prev, "[SUCCESS] Central Server acknowledged signal packet."])
              setTimeout(() => {
                setIsTransmitting(false)
                setIsSuccess(true)
                setFormData({ name: '', email: '', message: '' })
              }, 600)
            } else {
              throw new Error("API Transmission Rejected")
            }
          })
          .catch((err) => {
            console.error(err)
            setTransmitLogs((prev) => [...prev, "[ERROR] Signal lost or rejected by destination hub."])
            setTimeout(() => {
              setIsTransmitting(false)
              alert("Uplink Failure: Failed to transmit signal packet. Please try again.")
            }, 1500)
          })
      }
    }, 400) // 5 steps * 400ms = 2 seconds
  }

  const handleReset = () => {
    setIsSuccess(false)
    setTransmitLogs([])
  }

  return (
    <section id="contact" className="relative">
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
            <span className="text-neon-orange text-xs">05.</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
              <span className="text-neon-orange">&gt;</span> contact_signal
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-neon-orange/30 to-transparent" />
          </div>
          <p className="text-text-secondary text-sm max-w-2xl">
            Establish a direct secure link. Transmit your project requirements directly to our neural hub.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left side: info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Radar Panel Visualizer */}
            <div className="cyber-card p-6 flex flex-col items-center justify-center relative overflow-hidden" style={{ minHeight: '220px' }}>
              {/* Concentric Radar Rings */}
              <div className="relative w-40 h-40 border border-neon-cyan/10 rounded-full flex items-center justify-center">
                {/* Concentric rings */}
                <div className="absolute w-32 h-32 border border-neon-cyan/20 rounded-full" />
                <div className="absolute w-24 h-24 border border-neon-cyan/30 rounded-full" />
                <div className="absolute w-16 h-16 border border-neon-cyan/40 rounded-full" />
                <div className="absolute w-8 h-8 border border-neon-cyan/50 rounded-full" />

                {/* Pulsing ring */}
                <div className="absolute w-full h-full border border-neon-cyan/40 rounded-full animate-ping opacity-10" />

                {/* Radar Sweep Arc */}
                <motion.div
                  className="absolute w-full h-full rounded-full pointer-events-none"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent 75%, rgba(0, 240, 255, 0.4) 100%)'
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                />

                <Radio className="w-8 h-8 text-neon-cyan relative z-10 animate-pulse" />
              </div>
              <div className="mt-4 text-center">
                <span className="text-[10px] font-bold tracking-widest text-neon-cyan uppercase">
                  Uplink Status: Active
                </span>
                <p className="text-[9px] text-text-muted mt-1">Transmitter Ready // Frequency 2.4GHz</p>
              </div>
            </div>

            {/* Terminal-style info */}
            <div className="cyber-card p-6">
              <div className="flex items-center gap-2 mb-4 text-text-muted text-xs">
                <span className="text-neon-green">$</span>
                <span>cat contact_info.yml</span>
              </div>
              <div className="space-y-3 text-sm font-mono">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-neon-cyan" />
                  <span className="text-text-secondary">{myProfileData.personalInfo.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-neon-purple" />
                  <span className="text-text-secondary">Ho Chi Minh City, Vietnam</span>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-lg flex items-center justify-center cyber-card hover:border-neon-cyan/30 transition-all"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" style={{ color: social.color }} />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* Right side: Transmitter Console / Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="cyber-card p-6 flex flex-col justify-between"
            style={{ minHeight: '400px' }}
          >
            <div className="flex items-center justify-between mb-4 border-b border-cyber-border pb-3">
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-neon-cyan animate-pulse" />
                <span className="text-xs font-bold text-text-primary uppercase tracking-wider font-mono">
                  Signal Transmitter Console
                </span>
              </div>
              <span className="text-[10px] text-text-muted font-mono">SECURE SSL_V3</span>
            </div>

            <AnimatePresence mode="wait">
              {/* Form Mode */}
              {!isTransmitting && !isSuccess && (
                <motion.form
                  key="contact-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <label htmlFor="contact-name" className="block text-[10px] text-text-muted mb-1.5 uppercase tracking-wider font-mono">
                      // transmitter name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ident Name"
                      className="w-full bg-cyber-bg/80 border border-cyber-border rounded-lg px-4 py-2.5 text-xs text-text-primary
                        placeholder:text-text-muted/50 focus:outline-none focus:border-neon-cyan/50 focus:shadow-[0_0_15px_rgba(0,240,255,0.1)]
                        transition-all font-mono"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-[10px] text-text-muted mb-1.5 uppercase tracking-wider font-mono">
                      // return node address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="node@network.domain"
                      className="w-full bg-cyber-bg/80 border border-cyber-border rounded-lg px-4 py-2.5 text-xs text-text-primary
                        placeholder:text-text-muted/50 focus:outline-none focus:border-neon-cyan/50 focus:shadow-[0_0_15px_rgba(0,240,255,0.1)]
                        transition-all font-mono"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-[10px] text-text-muted mb-1.5 uppercase tracking-wider font-mono">
                      // signal payload
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Enter telemetry logs or message packet contents..."
                      rows={4}
                      className="w-full bg-cyber-bg/80 border border-cyber-border rounded-lg px-4 py-2.5 text-xs text-text-primary
                        placeholder:text-text-muted/50 focus:outline-none focus:border-neon-cyan/50 focus:shadow-[0_0_15px_rgba(0,240,255,0.1)]
                        transition-all font-mono resize-none"
                      required
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold font-mono
                      bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 border border-neon-cyan/40 text-neon-cyan
                      hover:from-neon-cyan/30 hover:to-neon-purple/30 hover:shadow-[0_0_25px_rgba(0,240,255,0.15)]
                      transition-all duration-300 cursor-pointer"
                  >
                    <Wifi className="w-4 h-4" />
                    Transmit Signal
                  </motion.button>
                </motion.form>
              )}

              {/* Transmitting / Scanning Mode */}
              {isTransmitting && (
                <motion.div
                  key="transmitting-panel"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4 flex flex-col justify-between flex-1"
                >
                  <div className="bg-cyber-bg/90 border border-cyber-border p-4 rounded-lg font-mono text-[11px] leading-relaxed flex-1 flex flex-col justify-end space-y-1.5 overflow-hidden min-h-[220px]">
                    <div className="flex items-center gap-2 text-neon-cyan border-b border-cyber-border pb-1.5 mb-2">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Transmitter scanning & processing...</span>
                    </div>
                    <div className="flex-1 flex flex-col justify-start space-y-1 overflow-y-auto">
                      {transmitLogs.map((log, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-text-secondary"
                        >
                          {log}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="w-full bg-cyber-bg/50 border border-cyber-border h-2.5 rounded-full overflow-hidden">
                    <motion.div
                      className="bg-neon-cyan h-full shadow-[0_0_10px_#00f0ff]"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 2, ease: 'easeInOut' }}
                    />
                  </div>
                </motion.div>
              )}

              {/* Success / Transmitted Mode */}
              {isSuccess && (
                <motion.div
                  key="success-panel"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center text-center space-y-5 py-6"
                >
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-neon-green/20 blur-xl animate-pulse" />
                    <CheckCircle2 className="w-16 h-16 text-neon-green relative z-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider font-mono">
                      Signal Transmitted successfully
                    </h3>
                    <p className="text-xs text-neon-green font-mono bg-neon-green/5 border border-neon-green/20 rounded-lg p-4 max-w-sm mx-auto leading-relaxed">
                      Signal Encrypted and successfully transmitted to LIO_SERVER Central Hub!
                    </p>
                  </div>
                  <motion.button
                    onClick={handleReset}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-5 py-2.5 rounded-lg text-xs font-bold font-mono border border-cyber-border text-text-secondary
                      hover:border-neon-cyan/40 hover:text-neon-cyan hover:shadow-[0_0_15px_rgba(0,240,255,0.1)]
                      transition-all duration-300 cursor-pointer"
                  >
                    Reset Transmitter
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
