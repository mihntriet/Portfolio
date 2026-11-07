import { Terminal } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-cyber-border">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-neon-cyan" />
            <span className="text-xs text-text-muted font-mono">
              <span className="text-neon-cyan">dev</span>
              <span className="text-text-muted">@</span>
              <span className="text-neon-purple">portfolio</span>
            </span>
          </div>

          {/* Copyright */}
          <p className="text-[10px] text-text-muted font-mono">
            Designed &amp; built by{' '}
            <span className="text-neon-cyan">Doan Minh Triet</span>
          </p>

          <span className="text-[10px] text-text-muted">Built to document hands-on DevOps work</span>
        </div>
      </div>
    </footer>
  )
}
