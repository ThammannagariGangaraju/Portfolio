import { Sparkles } from 'lucide-react'
import SectionShell from './ui/SectionShell'
import Reveal from './ui/Reveal'
import CountUp from './ui/CountUp'
import { achievements } from '../config/portfolio'

export default function Achievements() {
  return (
    <SectionShell
      id="achievements"
      eyebrow="Achievements"
      title="Proof of the grind."
      accent="grind."
      lead="Hackathon finishes that came out of building fast with a team."
      scene="scale"
    >
      <div className="grid gap-5 md:grid-cols-2">
        {achievements.map((a, i) => (
          <Reveal key={a.event} delay={i * 0.12} variant="scale" className="h-full">
            <article className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-surface p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-white/25 hover:bg-surface-2">
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-xl border border-white/10 bg-white/[0.05] p-3 transition-colors duration-300 group-hover:border-white/25">
                  <a.icon className="size-6 text-zinc-200" strokeWidth={1.8} aria-hidden />
                </span>
                <Sparkles className="size-4 text-zinc-700 transition-colors group-hover:text-zinc-500" aria-hidden />
              </div>

              <p className="mt-6 flex items-baseline gap-1.5 font-display text-4xl font-bold tracking-tight text-white">
                {a.rankValue !== undefined ? (
                  <>
                    <span className="text-2xl sm:text-3xl">Top</span>
                    <CountUp to={a.rankValue} delay={0.35 + i * 0.12} />
                  </>
                ) : (
                  a.rank
                )}
              </p>
              <h3 className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-zinc-500">{a.event}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-zinc-400">{a.detail}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  )
}
