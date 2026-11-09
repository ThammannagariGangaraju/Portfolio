import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import AnimatedText from './AnimatedText'

type SceneMotion = 'left' | 'right' | 'scale' | 'rise'

const sceneHidden: Record<SceneMotion, { opacity: number; x?: number; y?: number; scale?: number }> = {
  rise: { opacity: 0, y: 36 },
  left: { opacity: 0, x: -36 },
  right: { opacity: 0, x: 36 },
  scale: { opacity: 0, scale: 0.96, y: 20 },
}

type Props = {
  id: string
  eyebrow: string
  title: string
  /** Words of the title rendered in the muted secondary tone */
  accent?: string
  lead?: string
  children: ReactNode
  className?: string
  /** Heading entrance personality */
  scene?: SceneMotion
  /** Center the whole header block (used by the education scene) */
  align?: 'left' | 'center'
}

/**
 * Consistent section wrapper: id + blue small-caps eyebrow + animated
 * statement heading + lead, with a per-section entrance personality.
 */
export default function SectionShell({
  id,
  eyebrow,
  title,
  accent,
  lead,
  children,
  className = '',
  scene = 'rise',
  align = 'left',
}: Props) {
  const parts = accent ? title.split(accent) : [title]
  const centered = align === 'center'

  const heading = (
    <>
      <p
        className={`mb-4 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-accent ${
          centered ? 'text-center' : ''
        }`}
      >
        {eyebrow}
      </p>

      <h2
        className={`font-display text-3xl font-bold tracking-tight text-white sm:text-[2.75rem] sm:leading-[1.14] ${
          centered ? 'text-center' : ''
        }`}
      >
        {accent && parts.length === 2 ? (
          <>
            <AnimatedText text={parts[0]} />{' '}
            <AnimatedText text={accent} className="text-zinc-400" delay={0.1} />{' '}
            <AnimatedText text={parts[1]} />
          </>
        ) : (
          <AnimatedText text={title} />
        )}
      </h2>

      {lead && (
        <p
          className={`mt-5 text-lg leading-relaxed text-zinc-400 ${
            centered ? 'mx-auto max-w-xl text-center' : ''
          }`}
        >
          {lead}
        </p>
      )}
    </>
  )

  return (
    <section id={id} className={`relative py-24 sm:py-32 scroll-mt-20 ${className}`} aria-label={title}>
      <div className="mx-auto w-full max-w-6xl px-6">
        <motion.div
          initial={sceneHidden[scene]}
          whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px 0px' }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className={`mb-14 sm:mb-20 ${centered ? '' : 'max-w-2xl'}`}
        >
          {heading}
        </motion.div>

        {children}
      </div>
    </section>
  )
}
