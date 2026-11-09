import { motion } from 'framer-motion'

const NOISE_SVG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

/**
 * Reference backdrop. The technical grid is confined to the central content
 * region via a soft radial mask — thin, low-opacity lines that fade smoothly
 * toward the outer edges and vanish entirely outside the main content area.
 * No hard grid boundary is ever visible.
 */
export default function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Central technical grid — rectangular cells, soft radial edge fade */}
      <div
        className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:100px_100px]"
        style={{
          WebkitMaskImage: 'radial-gradient(ellipse 58% 72% at 50% 42%, black 28%, rgba(0,0,0,0.55) 58%, transparent 92%)',
          maskImage: 'radial-gradient(ellipse 58% 72% at 50% 42%, black 28%, rgba(0,0,0,0.55) 58%, transparent 92%)',
        }}
      />

      {/* Ambient light — barely visible, co-located with the visible grid */}
      <motion.div
        animate={{ opacity: [0.04, 0.07, 0.04] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-1/2 top-[42%] size-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/45 blur-[180px]"
        style={{
          maskImage: 'radial-gradient(closest-side, black, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(closest-side, black, transparent 75%)',
        }}
      />

      {/* Film grain, blended like the reference noise layer */}
      <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: NOISE_SVG }} />
    </div>
  )
}
