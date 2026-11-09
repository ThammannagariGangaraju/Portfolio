import { useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { scrollToSection } from '../../lib/smoothScroll'

/**
 * Small floating back-to-top button. Appears after roughly one viewport of
 * scroll and glides the user back to the top via the shared smooth-scroll
 * helper (Lenis where available, native smooth scroll otherwise).
 *
 * Reduced-motion users get a plain instant show/hide — no enter/exit motion —
 * and the scroll still lands at the top (native `scrollIntoView` path).
 */
const classes =
  'fixed bottom-5 right-5 z-30 grid size-11 place-items-center rounded-full border border-white/10 bg-surface/90 text-zinc-300 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-colors duration-300 hover:border-white/25 hover:text-white'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  const reducedMotion = useReducedMotion()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    setVisible(y > 640)
  })

  const go = () => scrollToSection('#home')

  if (!visible) return null

  /* Reduced motion: same button, but no enter/exit motion around it */
  if (reducedMotion) {
    return (
      <button type="button" onClick={go} aria-label="Back to top" className={classes}>
        <ArrowUp className="size-5" aria-hidden />
      </button>
    )
  }

  return (
    <AnimatePresence>
      <motion.button
        key="back-to-top"
        type="button"
        onClick={go}
        aria-label="Back to top"
        className={classes}
        initial={{ opacity: 0, y: 16, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.9 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <ArrowUp className="size-5" aria-hidden />
      </motion.button>
    </AnimatePresence>
  )
}
