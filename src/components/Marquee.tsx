import { useEffect, useRef, useState } from 'react'
import { marqueeTechnologies } from '../config/portfolio'

/**
 * Infinite tech ticker between hero and profiles (Pass 9 = reference behavior):
 * the band always keeps moving. Hovering a skill lights it up in accent blue
 * (fine pointers only — touch tap uses a temporary highlight instead), and
 * tapping/clicking flashes the same highlight. Touch scrolling is never
 * blocked; reduced-motion users get a static band that still highlights.
 */
const HIGHLIGHT_MS = 1600

export default function Marquee() {
  const [active, setActive] = useState<string | null>(null)
  const timer = useRef(0)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  /* Tap/click feedback only — no pause, no navigation, no synthetic links */
  const flash = (tech: string) => {
    setActive(tech)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setActive(null), HIGHLIGHT_MS)
  }

  return (
    <div className="relative z-10 border-y border-white/5 bg-white/[0.015] py-5">
      {/* Edge fades */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-page to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-page to-transparent" />

      {/* Continuous motion; hover highlight handled by .ticker-item CSS (hover-capable pointers only) */}
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex items-center">
            {marqueeTechnologies.map((tech) => (
              <li
                key={`${copy}-${tech}`}
                onPointerDown={() => flash(tech)}
                className={`ticker-item flex items-center gap-4 px-10 font-display text-sm font-medium uppercase tracking-[0.25em] transition-colors duration-300 ${
                  active === tech ? 'text-accent' : 'text-zinc-500'
                }`}
              >
                <span
                  aria-hidden
                  className={`ticker-dot size-1 rounded-full transition-colors duration-300 ${
                    active === tech ? 'bg-accent' : 'bg-accent/45'
                  }`}
                />
                {tech}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
