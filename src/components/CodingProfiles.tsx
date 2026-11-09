import { ArrowUpRight } from 'lucide-react'
import SectionShell from './ui/SectionShell'
import Reveal from './ui/Reveal'
import { codingProfiles } from '../config/portfolio'

/**
 * Competitive / coding profiles — LeetCode, CodeChef & GitHub, from the resume.
 * Cards show real handles and practice focus; no invented ratings or counts.
 */
export default function CodingProfiles() {
  return (
    <SectionShell
      id="coding"
      eyebrow="Competitive programming"
      title="Competitive profile."
      accent="profile."
      lead="Algorithm practice happens daily on LeetCode and CodeChef — Java, arrays, strings, and data-structure problems."
      scene="rise"
    >
      <div className="grid gap-5 md:grid-cols-3">
        {codingProfiles.map((p, i) => (
          <Reveal key={p.platform} delay={i * 0.12} variant="scale" className="h-full">
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Open ${p.platform} profile — ${p.handle}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-white/25 hover:bg-surface-2 hover:shadow-[0_20px_60px_-24px_rgba(0,0,0,0.9)]"
            >
              {/* Faint watermark of the platform mark */}
              <p.icon
                aria-hidden
                strokeWidth={1.2}
                className="absolute -right-4 -top-4 size-24 text-white/[0.04] transition-colors duration-500 group-hover:text-white/[0.07]"
              />

              {/* Platform mark tile */}
              <div className="flex items-center gap-3">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-white/10 bg-[#131316]">
                  <p.icon className="size-5" style={{ color: p.mark }} strokeWidth={2} aria-hidden />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-[13px] font-bold uppercase tracking-[0.14em] text-white">
                    {p.platform}
                  </h3>
                  <p className="truncate font-mono text-xs text-zinc-500">{p.handle}</p>
                </div>
              </div>

              {/* Big value + colored status (real handle in place of faked ratings) */}
              <p className="mt-6 break-all font-mono text-[1.6rem] font-bold leading-tight text-white sm:text-[1.75rem]">
                {p.handle}
              </p>
              <p
                className={`mt-1.5 text-sm font-medium ${
                  p.statusTone === 'accent' ? 'text-accent-green' : 'text-accent'
                }`}
              >
                {p.status}
              </p>

              {/* Inner sub-card — practice focus */}
              <div className="mt-5 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3.5">
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-zinc-500">{p.focusLabel}</p>
                <p className="mt-1 text-[15px] font-semibold text-zinc-200">{p.focusValue}</p>
              </div>

              {/* Open profile — full-width outlined button, like the reference */}
              <div className="mt-auto pt-6">
                <span className="flex items-center justify-center gap-2 rounded-full border border-white/10 py-2.5 font-display text-[15px] font-semibold text-zinc-200 transition-colors duration-300 group-hover:border-white/30 group-hover:bg-white/[0.04] group-hover:text-white">
                  Open Profile
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  )
}
