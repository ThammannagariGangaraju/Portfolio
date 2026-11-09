# Gangaraju Thammannagari — Portfolio

A personal portfolio for **Gangaraju Thammannagari**, Aspiring Software Engineer · B.Tech CSE @ Mohan Babu University, Tirupati.

Built with **React + Vite + TypeScript + Tailwind CSS v4 + Framer Motion + Lucide React**, with buttery-smooth scrolling via **Lenis**.

Design system (recreated from the live reference): background `#0a0a0a` with vertical grid lines, glass-course surfaces `#171717` + blur, Inter typography, blue accent `#3b82f6` for chips/eyebrows/accents, and a green `#4ade80` reserved for status indicators and checkmarks.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:5173
```

Other scripts:

```bash
npm run build    # type-check + production build to /dist
npm run preview  # serve the production build
```

## Adding your photo

The hero has a dedicated photo placeholder. To use your real photo, simply drop
your image at:

```
public/profile.jpg
```

The site auto-detects the file — no code changes needed. (Any `jpg/png` name can
be set in `src/config/portfolio.ts → profile.photo`.)

## Where the content lives

All resume content (projects, skills, certifications, achievements, links) is
centrally managed in:

```
src/config/portfolio.ts   ← edit this file to update any content
```

Your resume PDF is served from `public/resume.pdf` (download button included on
the hero + contact sections).

## Structure

```
src/
├── config/portfolio.ts       # All content & links (single source of truth)
├── lib/smoothScroll.ts       # Lenis setup + smooth anchor scrolling
├── components/
│   ├── layout/Background.tsx # Grid, drifting gradient orbs, film grain
│   ├── ui/                   # AnimatedText, Reveal, SectionShell, ActionLink, CountUp
│   ├── Navbar.tsx            # Glass nav, scroll-spy, mobile overlay, progress bar
│   ├── Hero.tsx              # Animated name, CTAs, stats, photo frame
│   ├── Marquee.tsx           # Tech ticker
│   ├── About / Skills / Projects / Education / Certifications / Achievements / Contact / Footer
└── index.css                 # Tailwind theme, gradients, glass utilities
```
