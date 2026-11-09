import { ArrowUpRight } from 'lucide-react'
import SectionShell from './ui/SectionShell'
import Reveal from './ui/Reveal'
import { certifications } from '../config/portfolio'

export default function Certifications() {
  return (
    <SectionShell
      id="certifications"
      eyebrow="Certifications"
      title="Always upskilling."
      accent="upskilling."
      lead="Industry certifications from AWS, ServiceNow and Coursera that back my coursework."
      scene="right"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {certifications.map((cert, i) => (
          <Reveal key={cert.name} delay={i * 0.08} className="h-full">
            <article className="group relative flex h-full items-start gap-5 overflow-hidden rounded-2xl border border-white/10 bg-surface p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-white/25 hover:bg-surface-2">
              {/* Sweep highlight */}
              <span
                aria-hidden
                className="absolute inset-y-0 -left-full w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-700 ease-out group-hover:left-[130%]"
              />

              <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.05] transition-colors duration-300 group-hover:border-white/25">
                <cert.icon
                  className="size-5.5 text-zinc-300 transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-110"
                  strokeWidth={1.8}
                  aria-hidden
                />
              </span>

              <div className="min-w-0">
                <h3 className="font-display text-[1.1rem] font-semibold leading-snug text-white">{cert.name}</h3>
                <p className="mt-1.5 font-mono text-xs uppercase tracking-[0.12em] text-zinc-500">{cert.issuer}</p>
              </div>

              <ArrowUpRight
                className="ml-auto size-4 shrink-0 text-zinc-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                aria-hidden
              />
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  )
}
