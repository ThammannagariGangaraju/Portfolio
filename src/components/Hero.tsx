import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { ArrowDown, ChevronDown, Github, GraduationCap, Linkedin } from 'lucide-react'
import AnimatedText from './ui/AnimatedText'
import CountUp from './ui/CountUp'
import ActionLink from './ui/ActionLink'
import ResumeSplitPill from './ui/ResumeSplitPill'
import { heroFeatures, heroIntro, profile } from '../config/portfolio'
import { scrollToSection } from '../lib/smoothScroll'

type Stat = {
  label: string
  value?: number
  decimals?: number
  prefix?: string
  suffix?: string
  static?: string
}

const stats: Stat[] = [
  { label: 'CGPA', value: profile.cgpa, decimals: 1, suffix: ' / 10' },
  { label: 'Projects Built', value: 3, suffix: '' },
  { label: 'Tech24 Hackathon', value: 10, prefix: 'Top ', suffix: '' },
  { label: 'Expected Graduation', static: '2027' },
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

const statsContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 1.6 } },
}

const statItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  /* Conic sweep ring is decorative motion — skip it entirely for reduced-motion users */
  const reducedMotion = useReducedMotion()

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pb-20 pt-32 sm:pt-36">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        {/* ------------------------------------------------ left: copy */}
        <div className="min-w-0">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex flex-wrap min-w-0 items-center gap-3"
          >
            {/* GT monogram — the portrait itself lives in the right-side panel */}
            <span className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-white/70 bg-surface-2">
              <span className="font-display text-sm font-bold text-zinc-300">GT</span>
            </span>

            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 font-mono min-w-0 text-xs tracking-wide text-zinc-300">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-accent-green" />
              </span>
              Open to software internships &amp; opportunities
            </span>

            {/* Education pill — reference-style with a degree badge */}
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 font-mono min-w-0 text-xs tracking-wide text-zinc-300">
              <GraduationCap className="size-3.5 text-zinc-400" aria-hidden />
              Mohan Babu University · 2023 – 2027
              <span className="whitespace-nowrap rounded-full bg-white px-2 py-0.5 font-display text-[10px] font-bold text-[#0a0a0a]">
                B.Tech CSE
              </span>
            </span>
          </motion.div>

          {/* Name — white first line, muted gray secondary line; char-level reveal */}
          <h1 className="mt-8 font-display text-[2rem] max-[359px]:text-[1.75rem] min-[360px]:text-[2.5rem] font-bold leading-[1.05] tracking-tight text-white sm:text-6xl xl:text-7xl">
            <AnimatedText text={profile.firstName} by="char" delay={0.28} stagger={0.03} />
            <br />
            <AnimatedText text={profile.lastName} className="text-zinc-400" by="char" delay={0.68} stagger={0.036} />
          </h1>

          {/* Title with blinking caret */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25, duration: 0.6 }}
            className="mt-5 font-mono text-base tracking-[0.14em] text-zinc-400 sm:text-lg"
          >
            <span className="text-accent-green">{'//'} </span>
            {profile.title.toUpperCase()}
            <span
              aria-hidden
              className="animate-caret ml-1.5 inline-block h-[1.1em] w-[2px] translate-y-[3px] align-middle bg-zinc-300"
            />
          </motion.p>

          {/* Intro */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-xl text-lg leading-relaxed text-zinc-400"
          >
            {heroIntro}
          </motion.p>

          {/* Bordered quote line — resume-grounded work ethic */}
          <motion.p
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.42, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl border-l-2 border-white/25 pl-4 font-display text-base font-medium text-zinc-200 sm:text-[1.05rem]"
          >
            Focused on clear communication, continuous learning, and reliable implementation.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <ActionLink href="#projects" ariaLabel="Explore featured projects">
              Explore Projects
              <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </ActionLink>

            <ResumeSplitPill />
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.62, duration: 0.7 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            {[
              { label: 'GitHub', href: profile.github, icon: Github },
              { label: 'LinkedIn', href: profile.linkedin, icon: Linkedin },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${s.label} profile`}
                className="group grid size-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.06] hover:text-white"
              >
                <s.icon className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
              </a>
            ))}
            <span className="ml-1 h-px w-12 bg-white/15" aria-hidden />
            <a
              href={`mailto:${profile.email}`}
              className="font-mono min-w-0 text-sm text-zinc-400 transition-colors hover:text-white"
            >
              {profile.email}
            </a>
          </motion.div>

          {/* Stats — sequential column cascade with counting numbers */}
          <motion.dl
            variants={statsContainer}
            initial="hidden"
            animate="show"
            className="mt-12 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4"
          >
            {stats.map((s, i) => (
              <motion.div key={s.label} variants={statItem}>
                <dd className="font-display text-2xl font-bold tracking-tight text-white sm:text-[1.7rem]">
                  {s.value !== undefined ? (
                    <CountUp
                      to={s.value}
                      decimals={s.decimals ?? 0}
                      prefix={s.prefix ?? ''}
                      suffix={s.suffix ?? ''}
                      delay={1.7 + i * 0.09}
                    />
                  ) : (
                    s.static
                  )}
                </dd>
                <dt className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-zinc-500">{s.label}</dt>
              </motion.div>
            ))}
          </motion.dl>
        </div>

        {/* ------------------------- right: portrait + three feature cards */}
        <div className="flex flex-col gap-4 min-w-0">
          {/* Portrait — same photo as the profile image, cropped from the top so the face stays recognizable */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-surface"
          >
            <img src={profile.photo} alt="" className="size-full object-cover object-top" />
          </motion.div>
          {heroFeatures.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55 + i * 0.13, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-surface-2 sm:p-6"
            >
              <div className="flex items-start gap-4">
                <span className="relative shrink-0">
                  {/* Rotating conic sweep ring — reference detail (restrained white sweep) */}
                  {!reducedMotion && (
                    <motion.span
                      aria-hidden
                      className="absolute -inset-[3px] rounded-full [background:conic-gradient(from_0deg,transparent_0deg,transparent_300deg,rgba(255,255,255,0.55)_340deg,rgba(255,255,255,0.9)_356deg,transparent_360deg)] [mask-image:radial-gradient(farthest-side,transparent_calc(100%-3px),#000_calc(100%-3px))]"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 6, ease: 'linear', repeat: Infinity }}
                    />
                  )}
                  <span className="relative grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03]">
                    <f.icon
                      className="size-4.5 text-zinc-300 transition-colors duration-300 group-hover:text-white"
                      strokeWidth={1.8}
                      aria-hidden
                    />
                  </span>
                </span>
                <div className="min-w-0 pr-6">
                  <h3 className="font-display text-base font-semibold text-white sm:text-lg">{f.title}</h3>
                  {/* Uppercase category label sits BELOW the title, like the reference */}
                  <p className="mt-1 font-mono text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
                    {f.category}
                  </p>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-zinc-400">{f.text}</p>
                </div>

                {/* Right-edge dot detail from the reference cards */}
                <span
                  aria-hidden
                  className="absolute right-5 top-1/2 flex -translate-y-1/2 flex-col gap-1.5 opacity-50 transition-opacity duration-300 group-hover:opacity-100"
                >
                  <span className="size-1 rounded-full bg-zinc-500" />
                  <span className="size-1 rounded-full bg-zinc-600" />
                </span>
              </div>
            </motion.div>
          ))}

          {/* Small footnote under the cards, resume-grounded */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.7 }}
            className="pl-1 font-mono text-[11px] text-zinc-500"
          >
            B.Tech CSE · Mohan Babu University, Tirupati · Class of 2027
          </motion.p>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.button
        type="button"
        onClick={() => scrollToSection('#coding')}
        aria-label="Scroll to next section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 sm:block"
      >
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1.5 text-zinc-500 transition-colors hover:text-white"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em]">scroll</span>
          <ChevronDown className="size-4" />
        </motion.span>
      </motion.button>
    </section>
  )
}
