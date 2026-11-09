import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

type RevealVariant = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade'

/**
 * Each variant defines its own starting point so sections enter with
 * different personalities while sharing the same easing language.
 */
const hiddenStates: Record<RevealVariant, { opacity: number; y?: number; x?: number; scale?: number }> = {
  up: { opacity: 0, y: 32 },
  down: { opacity: 0, y: -32 },
  left: { opacity: 0, x: -40 }, // slides in from the left
  right: { opacity: 0, x: 40 }, // slides in from the right
  scale: { opacity: 0, scale: 0.92, y: 26 },
  fade: { opacity: 0 },
}

type Props = {
  children: ReactNode
  className?: string
  variant?: RevealVariant
  delay?: number
  /** Sliding distance in px (applies to direction variants) */
  distance?: number
  duration?: number
  once?: boolean
}

/** Scroll-triggered reveal used across every section. */
export default function Reveal({
  children,
  className = '',
  variant = 'up',
  delay = 0,
  distance,
  duration = 0.8,
  once = true,
}: Props) {
  const hidden = { ...hiddenStates[variant] }
  if (distance !== undefined) {
    if (variant === 'up') hidden.y = distance
    if (variant === 'down') hidden.y = -distance
    if (variant === 'left') hidden.x = -distance
    if (variant === 'right') hidden.x = distance
  }

  return (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once, margin: '-60px 0px' }}
      transition={{ duration, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
