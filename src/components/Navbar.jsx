import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Menu, X } from 'lucide-react'

const NAV_ITEMS = [
  { label: '~/about', href: '#about' },
  { label: '~/skills', href: '#skills' },
  { label: '~/projects', href: '#projects' },
  { label: '~/contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cyber-bg/80 backdrop-blur-xl border-b border-cyber-border shadow-lg shadow-neon-cyan/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <Terminal className="w-5 h-5 text-neon-cyan group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.6)] transition-all" />
          <span className="text-sm font-bold tracking-wider text-text-primary">
            <span className="text-neon-cyan">dev</span>
            <span className="text-text-muted">@</span>
            <span className="text-neon-purple">portfolio</span>
            <span className="text-neon-green animate-pulse">_</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="text-xs px-4 py-2 border border-neon-cyan/40 text-neon-cyan rounded-md
              hover:bg-neon-cyan/10 hover:shadow-[0_0_15px_rgba(0,240,255,0.15)] transition-all duration-300"
          >
            ./hire_me.sh
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-text-secondary hover:text-neon-cyan transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-cyber-bg/95 backdrop-blur-xl border-b border-cyber-border overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="nav-link text-sm py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
