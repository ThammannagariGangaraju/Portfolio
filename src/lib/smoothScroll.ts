import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

let lenis: Lenis | null = null
let rafId = 0

/**
 * Starts buttery smooth scrolling (skipped for users who prefer reduced motion).
 * Returns a cleanup function.
 */
export function initSmoothScroll(): () => void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => {}
  }

  lenis = new Lenis({ lerp: 0.1 })

  const raf = (time: number) => {
    lenis?.raf(time)
    rafId = requestAnimationFrame(raf)
  }
  rafId = requestAnimationFrame(raf)

  return () => {
    cancelAnimationFrame(rafId)
    lenis?.destroy()
    lenis = null
  }
}

/**
 * Locks/unlocks background scrolling (used by the mobile overlay menu).
 * Falls back to overflow locking when Lenis is unavailable.
 */
export function lockScroll(lock: boolean) {
  if (lenis) {
    if (lock) lenis.stop()
    else lenis.start()
  } else {
    document.documentElement.style.overflow = lock ? 'hidden' : ''
  }
}

/** Smoothly scrolls to a section, e.g. scrollToSection('#projects') */
export function scrollToSection(hash: string) {
  const el = document.querySelector(hash)
  if (!el) return

  if (lenis) {
    if (lenis.isStopped) lenis.start()
    lenis.scrollTo(el as HTMLElement, {
      offset: -76,
      duration: 1.35,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
