import type { Project } from '../config/portfolio'
import { CheckCircle2, Github } from 'lucide-react'
import { motion, useTransform, type MotionValue } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'
import ProjectPreview from './ui/ProjectPreview'
import ProjectDetails from './ProjectDetails'

type Props = {
  project: Project
  index: number
  total: number
  /** Global progress of the whole stack (0→1), set by the Projects container */
  progress: MotionValue<number>
  /** Whether the desktop sticky-stack interaction is active */
  stackActive: boolean
}

/**
 * Reference-style sticky stacked project card.
 * Desktop: each card pins at a stepped top offset while following cards slide
 * over it; the covered card gently scales down (max -5% per covering card).
 * Mobile / reduced-motion: a normal stacked list — no pinning, no scaling.
 * Card content, links and keyboard focus are unchanged.
 */
export default function ProjectCard({ project, index, total, progress, stackActive }: Props) {
  const { icon: Icon } = project
  const [description, ...highlights] = project.bullets

  const reduceMotion = useReducedMotion()
  const stacking = stackActive && !reduceMotion

  /* Scroll-linked shrink: earlier cards ease toward their target as later cards approach */
  const cardRange: [number, number] = [index / total, 1]
  const targetScale = 1 - (total - 1 - index) * 0.05
  const scale = useTransform(progress, cardRange, [1, targetScale])

  return (
    <div
      className={`relative ${stacking ? 'sticky' : 'static'}`}
      style={{
        zIndex: index + 1,
        // Sticky offset: stepped so later cards rest slightly lower, like the reference
        ...(stacking ? { top: `calc(5.25rem + ${index * 14}px)` } : {}),
      }}
    >
      <motion.article
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px 0px' }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        style={stacking ? { scale } : undefined}
        className="group relative overflow-hidden rounded-3xl border border-white/10 bg-surface p-6 transition-colors duration-500 hover:border-white/20 hover:bg-[#111114] sm:p-10 will-change-transform md:mb-[14vh]"
      >
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          {/* ------------------------------------------------------- left */}
          <div>
            {/* Blue category chip (reference accent) */}
            <span className="inline-flex items-center gap-1.5 rounded-md border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-accent/90">
              <Icon className="size-3.5" aria-hidden />
              {project.tagline}
            </span>

            <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-white sm:text-[2.25rem] sm:leading-[1.15]">
              {project.title}
            </h3>

            <p className="mt-3 max-w-xl text-[17px] leading-relaxed text-zinc-400">{description}</p>

            {highlights.length > 0 && (
              <div className="mt-6 max-w-xl">
                <p className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.14em] text-zinc-200">
                  <span aria-hidden className="notranslate">✳</span> System Highlights
                </p>
                <ul className="mt-3 space-y-2.5">
                  {highlights.map((b) => (
                    <li key={b} className="flex gap-2.5 text-base leading-relaxed text-zinc-400">
                      <CheckCircle2
                        className="mt-0.5 size-4 shrink-0 text-accent-green"
                        strokeWidth={2}
                        aria-hidden
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech pills */}
            <ul className="mt-7 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-[13px] text-zinc-400 transition-colors duration-300 group-hover:border-white/15 group-hover:text-zinc-300"
                >
                  {tag}
                </li>
              ))}
            </ul>

            {/* Collapsed case-study disclosure (resume-grounded, optional) */}
            {project.details && <ProjectDetails details={project.details} index={index} />}

            {/* Source code link */}
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-8 inline-flex items-center gap-2.5 font-display text-[15px] font-semibold text-zinc-200 transition-colors duration-300 hover:text-white"
              aria-label={`View source code of ${project.title} on GitHub`}
            >
              <Github className="size-4" aria-hidden />
              Source Code
              <span aria-hidden className="text-zinc-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-white">
                ↗
              </span>
            </a>
          </div>

          {/* //---------------------------------------- right: project preview */}
          <ProjectPreview project={project} index={index} />
        </div>
      </motion.article>
    </div>
  )
}
