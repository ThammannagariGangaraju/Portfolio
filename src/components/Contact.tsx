import { useRef, useState } from 'react'
import { Check, Copy, Download, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import AnimatedText from './ui/AnimatedText'
import Reveal from './ui/Reveal'
import { profile } from '../config/portfolio'

type CopyState = 'idle' | 'copied' | 'failed'

/* Timing: brief success, slightly longer error before resetting to idle */
const RESET_MS = { copied: 2200, failed: 3200 }

const STATUS_LABEL: Record<Exclude<CopyState, 'idle'>, string> = {
  copied: 'Copied!',
  failed: 'Copy failed',
}

/**
 * Reference finale: a giant two-line closing statement (white + accent),
 * a short honest intro paragraph, a single white email pill, and a compact
 * one-click copy-email button with aria-live feedback.
 */
export default function Contact() {
  const [copyState, setCopyState] = useState<CopyState>('idle')
  const timer = useRef<number | undefined>(undefined)

  const announce = (next: Exclude<CopyState, 'idle'>) => {
    clearTimeout(timer.current)
    setCopyState(next)
    timer.current = window.setTimeout(() => {
      setCopyState('idle')
    }, RESET_MS[next])
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      announce('copied')
    } catch {
      /* clipboard blocked/unavailable — never claim success */
      announce('failed')
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-20 pb-16 pt-24 sm:pb-20 sm:pt-36" aria-label="Contact">
      {/* Final-scene ambient light — barely-there white */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-[140px]"
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 26 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px 0px' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-display text-5xl font-bold leading-[1.04] tracking-tight sm:text-7xl md:text-8xl">
            <AnimatedText text="Let's work" />
            <br />
            <AnimatedText text="together." className="text-accent" delay={0.12} stagger={0.08} />
          </h2>
        </motion.div>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-zinc-400">
            Open to software internships and opportunities — contributing through clear communication,
            continuous learning, and reliable implementation. My inbox is always open.
          </p>
        </Reveal>

        {/* Single white email pill, like the reference */}
        <Reveal delay={0.3}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              aria-label={`Email ${profile.name}`}
              className="inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 font-display text-sm font-semibold text-[#0a0a0a] transition-colors duration-300 hover:bg-zinc-200 sm:text-base"
            >
              <Mail className="size-4" aria-hidden />
              {profile.email}
            </a>

            {/* One-click copy — compact sibling in the neutral style */}
            <span aria-live="polite" className="flex items-center">
              <button
                type="button"
                onClick={copyEmail}
                className={`group inline-flex items-center gap-2 rounded-full border px-4 py-3 font-display text-sm font-semibold transition-colors duration-300 sm:text-[15px] ${
                  copyState === 'copied'
                    ? 'border-white/25 bg-white/[0.07] text-white'
                    : 'border-white/10 bg-white/[0.03] text-zinc-300 hover:border-white/25 hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                {copyState === 'copied' ? (
                  <Check className="size-4 text-accent-green" aria-hidden />
                ) : copyState === 'failed' ? (
                  <Mail className="size-4 text-zinc-500" aria-hidden />
                ) : (
                  <Copy
                    className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                )}
                {copyState === 'idle' ? (
                  <>
                    Copy Email
                    <span className="sr-only">address to the clipboard</span>
                  </>
                ) : (
                  STATUS_LABEL[copyState]
                )}
              </button>
            </span>
          </div>
          <p className="mt-5 font-mono text-sm text-zinc-400">
            <a
              href={profile.resume}
              download="Gangaraju_Thammannagari_Resume.pdf"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-zinc-300"
            >
              <Download className="size-3" aria-hidden />
              Resume_1.1.pdf
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
