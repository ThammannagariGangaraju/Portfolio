import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import type { ProjectDetail } from '../config/portfolio'

type Props = {
  details: ProjectDetail
  /** Stable index so each card's disclosure region has a unique id */
  index: number
}

/**
 * Collapsed-by-default case-study disclosure inside a project card.
 * A real toggle button (aria-expanded / aria-controls) with native
 * keyboard activation; Escape closes from anywhere while open. The reveal
 * reuses the site's fade-up motion vocabulary — framer-motion's global
 * reducedMotion="user" config reduces it to an opacity fade for
 * reduced-motion users.
 */
export default function ProjectDetails({ details, index }: Props) {
  const [open, setOpen] = useState(false)
  const regionId = `project-details-${index}`

  /* Escape closes the panel from anywhere while it is expanded */
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const rows = [
    { label: 'The goal', text: details.goal },
    { label: 'My contribution', text: details.contribution },
  ]

  return (
    <div className="mt-6 max-w-xl">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={regionId}
        className="group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 font-display text-sm font-semibold text-zinc-300 transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.06] hover:text-white"
      >
        Project Details
        <ChevronDown
          className={`size-4 text-zinc-500 transition-transform duration-300 group-hover:text-white ${
            open ? 'rotate-180' : ''
          }`}
          aria-hidden
        />
      </button>

      {open && (
        <motion.div
          id={regionId}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
        >
          <dl className="space-y-5">
            {rows.map((row) => (
              <div key={row.label}>
                <dt className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                  {row.label}
                </dt>
                <dd className="mt-1.5 text-[15px] leading-relaxed text-zinc-400">{row.text}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      )}
    </div>
  )
}
