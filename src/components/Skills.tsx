import SectionShell from './ui/SectionShell'
import Reveal from './ui/Reveal'
import { skillGroups } from '../config/portfolio'

export default function Skills() {
  return (
    <SectionShell
      id="skills"
      eyebrow="Technical skills"
      title="The tools I build with."
      accent="build with."
      lead="A stack I know well enough to ship with — refined through coursework, projects, and daily problem-solving practice."
      scene="right"
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.09} variant="scale" className="h-full">
            <article className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-surface p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-white/25 hover:bg-surface-2">
              <span
                className="inline-grid size-12 place-items-center rounded-xl border border-white/10 bg-white/[0.04] p-3.5 transition-transform duration-500 group-hover:scale-110"
              >
                <group.icon className="size-6 text-zinc-200" strokeWidth={1.8} aria-hidden />
              </span>

              <h3 className="mt-5 font-display text-lg font-semibold text-white">{group.title}</h3>

              <ul className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[15px] text-zinc-400 transition-colors duration-300 group-hover:border-white/20 group-hover:text-zinc-300"
                  >
                    {skill}
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
