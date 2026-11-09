import { Calendar } from 'lucide-react'
import SectionShell from './ui/SectionShell'
import Reveal from './ui/Reveal'
import { education } from '../config/portfolio'

/**
 * Reference recreation of the "chronicle" scene: centered header, then
 * centered stacked cards — date pill, big degree title, school row with a
 * blue mark, divider, blue-dot bullets, and category chips at the bottom.
 */
export default function Education() {
  return (
    <SectionShell
      id="education"
      eyebrow="The academic path"
      title="Academic chronicle."
      accent="chronicle."
      lead="A consistent learner — strong academics across every stage so far."
      scene="rise"
      align="center"
    >
      <div className="mx-auto max-w-3xl space-y-6">
        {education.map((item, i) => (
          <Reveal key={item.degree} delay={i * 0.14} variant="scale">
            <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-surface px-6 py-8 transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-[#111114] sm:px-10 sm:py-10">
              {/* Accent line across the card top (reference detail, per-card chronicle color) */}
              <span
                aria-hidden
                className="absolute inset-x-8 top-0 h-px opacity-70"
                style={{ background: `linear-gradient(to right, transparent, ${item.accent ?? '#3b82f6'}, transparent)` }}
              />

              {/* Date pill — centered */}
              <p className="flex justify-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 font-mono text-[13px] tracking-wide text-zinc-300">
                  <Calendar
                    className="size-3.5"
                    style={item.accent ? { color: item.accent } : undefined}
                    aria-hidden
                  />
                  {item.period}
                </span>
              </p>

              {/* Degree + score */}
              <div className="mt-4 text-center">
                <h3 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                  {item.degree}
                </h3>
                <p className="mt-2 flex items-center justify-center gap-2 text-[15px] font-medium text-zinc-300">
                  <item.icon
                    className={`size-4 ${item.accent ? '' : 'text-accent'}`}
                    style={item.accent ? { color: item.accent } : undefined}
                    aria-hidden
                  />
                  {item.school}
                </p>
                <p className="mt-1.5 font-mono text-sm text-zinc-500">Achievement — {item.score}</p>
              </div>

              {/* Divider */}
              <span aria-hidden className="mx-auto mt-6 block h-px w-24 bg-white/15" />

              {/* Bullets */}
              <ul className="mx-auto mt-6 max-w-xl space-y-2.5">
                {item.bullets?.map((b) => (
                  <li key={b} className="flex gap-2.5 text-[15px] leading-relaxed text-zinc-400">
                    <span aria-hidden className="mt-[7px] size-1.5 shrink-0 rounded-full bg-accent" />
                    {b}
                  </li>
                ))}
              </ul>

              {/* Category chips */}
              <ul className="mt-7 flex flex-wrap justify-center gap-2">
                {item.chips?.map((chip) => (
                  <li
                    key={chip}
                    className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-xs uppercase tracking-[0.1em] text-zinc-400 transition-colors duration-300 group-hover:text-zinc-300"
                  >
                    {chip}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  )
}
