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

      {/* Mobile menu Side Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black md:hidden"
            />
            {/* Slide drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[280px] bg-cyber-bg/95 backdrop-blur-2xl border-l border-cyber-border p-6 flex flex-col gap-6 md:hidden shadow-2xl shadow-neon-cyan/10"
            >
              {/* Header with Close Button */}
              <div className="flex items-center justify-between pb-4 border-b border-cyber-border">
                <span className="text-xs font-bold text-neon-cyan font-mono">NAVIGATION // MENU</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-text-secondary hover:text-neon-cyan transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="flex flex-col gap-4 py-4">
                {NAV_ITEMS.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className="text-sm font-medium text-text-secondary hover:text-neon-cyan transition-colors py-2 border-b border-cyber-border/30"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>

              {/* Action Button */}
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_ITEMS.length * 0.08 }}
                onClick={() => setMobileOpen(false)}
                className="mt-auto text-center text-xs py-3 border border-neon-cyan/40 text-neon-cyan rounded-lg
                  bg-neon-cyan/5 hover:bg-neon-cyan/15 hover:shadow-[0_0_15px_rgba(0,240,255,0.15)] transition-all duration-300"
              >
                ./hire_me.sh
              </motion.a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
