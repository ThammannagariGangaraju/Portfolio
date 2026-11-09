import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, type Variants } from 'framer-motion'
import { Mail, Menu, X } from 'lucide-react'
import { NAV_LINKS, profile, socialLinks } from '../config/portfolio'
import { lockScroll, scrollToSection } from '../lib/smoothScroll'

const menuContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
}

const menuItem: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  /* Reference behavior: past the hero the capsule condenses to icon-only pills */
  const [condensed, setCondensed] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#home')
  const [photoOk, setPhotoOk] = useState(true)
  const { scrollY, scrollYProgress } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 24)
    setCondensed(y > 160)
  })

  /* Scroll-spy: highlight the link of the section currently in view */
  useEffect(() => {
    const targets = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    targets.forEach((t) => observer.observe(t as Element))
    return () => observer.disconnect()
  }, [])

  /* Escape closes the mobile menu; background scroll is locked while open */
  useEffect(() => {
    lockScroll(open)
    if (!open) return () => {}
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      lockScroll(false)
    }
  }, [open])

  const go = (href: string) => {
    lockScroll(false) // release the scroll lock before gliding
    setOpen(false)
    scrollToSection(href)
  }

  return (
    <>
      {/* Scroll progress bar — thin accent line, sits above the capsule */}
      <motion.div
        aria-hidden
        style={{ scaleX: scrollYProgress }}
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-accent/40 via-accent/70 to-accent"
      />

      <motion.div
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3"
      >
        {/* Single floating capsule — identity + nav + CTA, condensing on scroll */}
        <div
          className={`pointer-events-auto flex items-center gap-1 rounded-full border border-white/10 bg-surface/85 p-1.5 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-all duration-500 ${
            scrolled ? 'bg-surface/95' : ''
          }`}
        >
          {/* Identity inside the capsule (desktop, expanded state) */}
          <AnimatePresence initial={false}>
            {!condensed && (
              <motion.a
                key="identity"
                href="#home"
                onClick={(e) => {
                  e.preventDefault()
                  go('#home')
                }}
                aria-label="Back to top — Gangaraju Thammannagari"
                initial={{ opacity: 0, width: 0, marginRight: 4 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0, marginRight: 4 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="hidden shrink-0 overflow-hidden lg:block"
              >
                <span className="flex items-center gap-3 pr-3.5 pl-1.5">
                  <span className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-white/70 bg-surface-2">
                    {photoOk ? (
                      <img
                        src={profile.photo}
                        alt=""
                        className="size-full object-cover"
                        onError={() => setPhotoOk(false)}
                      />
                    ) : (
                      <span className="font-display text-[13px] font-bold text-white">GT</span>
                    )}
                  </span>
                  <span className="w-max leading-tight">
                    <span className="block font-display text-sm font-semibold tracking-tight text-white">
                      {profile.firstName}
                    </span>
                    <span className="block font-mono text-[11px] tracking-wide text-zinc-400">{profile.title}</span>
                  </span>
                </span>
              </motion.a>
            )}
          </AnimatePresence>

          {/* Spacer for the condensed state keeps the transition smooth */}
          <motion.span aria-hidden layout className="hidden size-px lg:block" />

          <nav
            aria-label="Primary"
            className="flex items-center gap-0.5"
          >
            {NAV_LINKS.map((l) => {
              const isActive = active === l.href
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault()
                    go(l.href)
                  }}
                  aria-current={isActive ? 'true' : undefined}
                  aria-label={l.label}
                  className={`relative flex items-center gap-2 rounded-full px-3 py-2.5 transition-colors duration-300 ${
                    isActive ? 'text-[#0a0a10]' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-white"
                    />
                  )}
                  <l.icon className="relative z-10 size-4 shrink-0" aria-hidden />
                  <AnimatePresence initial={false}>
                    {!condensed && (
                      <motion.span
                        key={`${l.href}-label`}
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="relative z-10 hidden overflow-hidden whitespace-nowrap text-sm xl:inline-block"
                      >
                        {l.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </a>
              )
            })}
          </nav>

          {/* Let's Talk — hidden while condensed, like the reference */}
          <AnimatePresence initial={false}>
            {!condensed && (
              <motion.span
                key="cta"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="hidden shrink-0 overflow-hidden lg:block"
              >
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    go('#contact')
                  }}
                  className="ml-2 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-5 py-2.5 font-display text-[15px] font-semibold text-[#0a0a0a] transition-colors duration-300 hover:bg-zinc-200"
                >
                  <Mail className="size-4" aria-hidden />
                  Let&apos;s Talk
                </a>
              </motion.span>
            )}
          </AnimatePresence>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid size-10 place-items-center rounded-full text-zinc-300 transition-colors hover:bg-white/10 lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </motion.div>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-page/95 backdrop-blur-2xl lg:hidden"
          >
            <motion.nav
              aria-label="Mobile"
              variants={menuContainer}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="flex h-full flex-col items-center justify-center gap-6"
            >
              {NAV_LINKS.map((l) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  variants={menuItem}
                  onClick={(e) => {
                    e.preventDefault()
                    go(l.href)
                  }}
                  className="group flex items-center gap-4"
                >
                  <span className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04] transition-colors group-hover:border-white/25">
                    <l.icon className="size-[18px] text-zinc-300" aria-hidden />
                  </span>
                  <span className="font-display text-2xl font-semibold text-zinc-200 transition-colors group-hover:text-white">
                    {l.label}
                  </span>
                </motion.a>
              ))}

              <motion.a
                variants={menuItem}
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  go('#contact')
                }}
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 font-display text-[15px] font-semibold text-[#0a0a0a] transition-colors hover:bg-zinc-200"
              >
                <Mail className="size-4" aria-hidden />
                Let&apos;s Talk
              </motion.a>

              <motion.div variants={menuItem} className="mt-2 flex items-center gap-4">
                {socialLinks.slice(0, 2).map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={s.label}
                    className="grid size-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <s.icon className="size-5" />
                  </a>
                ))}
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
