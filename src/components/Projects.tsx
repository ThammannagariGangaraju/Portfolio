import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useScroll } from 'framer-motion'
import SectionShell from './ui/SectionShell'
import ProjectCard from './ProjectCard'
import { profile, projects } from '../config/portfolio'

/**
 * Reference project presentation: a sticky scroll-stacked showcase.
 * One shared scroll progress (measured across the whole card list) is passed
 * to every card; each card pins and gently scales down as the next slides
 * over it. Mobile (<md) and reduced-motion users get a plain stacked list.
 */
export default function Projects() {
  const listRef = useRef<HTMLDivElement>(null)
  const [stackActive, setStackActive] = useState(false)

  /* Sticky stack is a desktop interaction only — reactive to resizes */
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const update = () => setStackActive(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  /* Progress spans the full card run: 0 → 1 from the first pin to the end */
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start start', 'end end'],
  })

  return (
    <SectionShell
      id="projects"
      eyebrow="Selected works"
      title="Projects with real intent."
      accent="real intent."
      lead="Three builds that taught me the most — AI-assisted tools, computer vision, and clean web fundamentals."
      scene="scale"
    >
      {/* Reference layout: full-width cards that stack over each other on scroll.
          Desktop uses the card's own bottom margin as scrolling runway so each
          successive card rises over the pinned previous one. */}
      <div ref={listRef} className="flex flex-col gap-6 md:gap-0">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={i}
            total={projects.length}
            progress={scrollYProgress}
            stackActive={stackActive}
          />
        ))}
      </div>

      {/* End spacer so the last card's pinned view clears before the CTA */}
      <div aria-hidden className="hidden h-[8vh] md:block" />

      {/* GitHub CTA */}
      <div className="md:mt-10 flex justify-center">
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer noopener"
          className="group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 font-display text-sm font-semibold text-zinc-300 backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:bg-white/[0.06] hover:text-white"
        >
          Explore more on GitHub
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
        </a>
      </div>
    </SectionShell>
  )
}
