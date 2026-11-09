import { ArrowUp, Github, Linkedin } from 'lucide-react'
import { NAV_LINKS, profile, socialLinks } from '../config/portfolio'
import { scrollToSection } from '../lib/smoothScroll'

const columns = [
  { heading: 'Socials' },
  { heading: 'Links' },
  { heading: 'Sitemap' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  const socials = socialLinks.filter((s) => s.label === 'GitHub' || s.label === 'LinkedIn')
  const platforms = socialLinks.filter((s) => s.label === 'LeetCode' || s.label === 'CodeChef')

  return (
    <footer className="relative z-10 px-6 pb-8 pt-6">
      <div className="mx-auto max-w-6xl rounded-3xl border border-white/[0.06] bg-surface/50 px-7 py-9 sm:px-10">
        {/* Divider top detail */}
        <div className="grid gap-9 sm:grid-cols-3 sm:items-start sm:justify-between lg:grid-cols-[1fr_1fr_1.2fr_auto]">
          {/* SOCIALS */}
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
              {columns[0].heading}
            </p>
            <ul className="mt-4 space-y-2.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-sm text-zinc-300 transition-colors hover:text-white"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* LINKS — coding platforms */}
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
              {columns[1].heading}
            </p>
            <ul className="mt-4 space-y-2.5">
              {platforms.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-sm text-zinc-300 transition-colors hover:text-white"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={profile.resume}
                  download="Gangaraju_Thammannagari_Resume.pdf"
                  className="text-sm text-zinc-300 transition-colors hover:text-white"
                >
                  Resume_1.1.pdf
                </a>
              </li>
            </ul>
          </div>

          {/* SITEMAP */}
          <nav aria-label="Footer sitemap">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
              {columns[2].heading}
            </p>
            <ul className="mt-4 grid max-w-64 grid-cols-2 gap-x-8 gap-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(l.href)
                    }}
                    className="text-sm text-zinc-300 transition-colors hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('#home')
                  }}
                  className="text-sm text-zinc-300 transition-colors hover:text-white"
                >
                  Home
                </a>
              </li>
            </ul>
          </nav>

          {/* Icon marks */}
          <div className="flex items-center gap-4">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              className="text-zinc-500 transition-colors hover:text-white"
            >
              <Github className="size-4.5" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
              className="text-zinc-500 transition-colors hover:text-white"
            >
              <Linkedin className="size-4.5" />
            </a>
            <button
              type="button"
              onClick={() => scrollToSection('#home')}
              aria-label="Back to top"
              className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-500 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.07] hover:text-white"
            >
              <ArrowUp className="size-4" aria-hidden />
            </button>
          </div>
        </div>

        {/* Legal line */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-6">
          <p className="text-[13px] text-zinc-400">
            © {year} {profile.name}. All rights reserved.
          </p>
          <p className="text-[13px] text-zinc-400">Built with React &amp; Framer Motion</p>
        </div>
      </div>
    </footer>
  )
}
