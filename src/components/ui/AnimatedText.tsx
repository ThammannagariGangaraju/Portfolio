import { motion, type Variants } from 'framer-motion'

type Props = {
  text: string
  className?: string
  /** Seconds to wait before the first unit appears */
  delay?: number
  /** Seconds between each unit */
  stagger?: number
  /** Split into words (default) or individual characters */
  by?: 'word' | 'char'
}

const unit: Variants = {
  hidden: { y: '115%', rotate: 4 },
  show: {
    y: '0%',
    rotate: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

/**
 * Signature headline animation: splits a string into masked words or
 * characters and reveals them with a coordinated staggered rise.
 * Screen readers get the plain text via .sr-only; visuals are aria-hidden.
 */
export default function AnimatedText({
  text,
  className = '',
  delay = 0,
  stagger = 0.06,
  by = 'word',
}: Props) {
  const units =
    by === 'word' ? text.split(' ').filter(Boolean) : text.split('')
  const hasSpaces = by === 'word' && text.includes(' ')

  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  }

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px' }}
    >
      {/* Accessible plain text */}
      <span className="sr-only">{text}</span>

      <span aria-hidden>
        {units.map((u, i) => {
          if (u === ' ') return <span key={i} className="inline-block">&nbsp;</span>
          return (
            <span
              key={`${u}-${i}`}
              className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]"
            >
              <motion.span className="inline-block will-change-transform" variants={unit}>
                {by === 'word' && hasSpaces && i < units.length - 1 ? `${u}\u00A0` : u}
              </motion.span>
            </span>
          )
        })}
      </span>
    </motion.span>
  )
}
