import { useMemo } from 'react'

const PIPELINE_CONFIGS = [
  // Horizontal pipelines
  { type: 'h', top: '12%', color: '#00f0ff', delay: '0s', duration: '7s' },
  { type: 'h', top: '28%', color: '#a855f7', delay: '2s', duration: '9s' },
  { type: 'h', top: '45%', color: '#39ff14', delay: '4s', duration: '6s' },
  { type: 'h', top: '62%', color: '#00f0ff', delay: '1s', duration: '8s' },
  { type: 'h', top: '78%', color: '#ff2d95', delay: '3s', duration: '7.5s' },
  { type: 'h', top: '90%', color: '#a855f7', delay: '5s', duration: '10s' },
  // Vertical pipelines
  { type: 'v', left: '10%', color: '#00f0ff', delay: '1s', duration: '9s' },
  { type: 'v', left: '25%', color: '#39ff14', delay: '3s', duration: '11s' },
  { type: 'v', left: '50%', color: '#a855f7', delay: '0s', duration: '8s' },
  { type: 'v', left: '75%', color: '#ff2d95', delay: '4s', duration: '10s' },
  { type: 'v', left: '90%', color: '#00f0ff', delay: '2s', duration: '7s' },
]

export default function NeonGridBackground() {
  const pipelines = useMemo(() => PIPELINE_CONFIGS, [])

  return (
    <>
      {/* Base neon grid */}
      <div className="neon-grid-bg" aria-hidden="true" />

      {/* Radial glow accents */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute rounded-full"
          style={{
            width: '600px',
            height: '600px',
            top: '-10%',
            right: '-5%',
            background: 'radial-gradient(circle, rgba(0,240,255,0.06) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: '500px',
            height: '500px',
            bottom: '10%',
            left: '-5%',
            background: 'radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: '400px',
            height: '400px',
            top: '50%',
            left: '40%',
            background: 'radial-gradient(circle, rgba(57,255,20,0.03) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Data pipeline flow lines */}
      {pipelines.map((pipe, i) =>
        pipe.type === 'h' ? (
          <div
            key={`pipe-${i}`}
            className="data-pipeline data-pipeline-h"
            style={{
              top: pipe.top,
              background: `linear-gradient(to right, transparent, ${pipe.color}15, transparent)`,
            }}
            aria-hidden="true"
          >
            <div
              className="pipeline-glow pipeline-glow-h"
              style={{
                background: `linear-gradient(to right, transparent, ${pipe.color}, transparent)`,
                boxShadow: `0 0 12px ${pipe.color}`,
                animationDelay: pipe.delay,
                animationDuration: pipe.duration,
              }}
            />
          </div>
        ) : (
          <div
            key={`pipe-${i}`}
            className="data-pipeline data-pipeline-v"
            style={{
              left: pipe.left,
              background: `linear-gradient(to bottom, transparent, ${pipe.color}15, transparent)`,
            }}
            aria-hidden="true"
          >
            <div
              className="pipeline-glow pipeline-glow-v"
              style={{
                background: `linear-gradient(to bottom, transparent, ${pipe.color}, transparent)`,
                boxShadow: `0 0 12px ${pipe.color}`,
                animationDelay: pipe.delay,
                animationDuration: pipe.duration,
              }}
            />
          </div>
        )
      )}
    </>
  )
}
