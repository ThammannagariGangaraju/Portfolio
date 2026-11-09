import { useRef, type ReactNode, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { scrollToSection } from '../../lib/smoothScroll'

type Props = {
  href: string
  children: ReactNode
  className?: string
  /** `primary` = gradient pill, `outline` = ghost glass button */
  variant?: 'primary' | 'outline'
  external?: boolean
  download?: string
  ariaLabel?: string
}

/**
 * Premium action button with a subtle magnetic pull and a light-sweep
 * shine on hover. Renders a real link (mailto / tel / https all work).
 */
export default function ActionLink({
  href,
  children,
  className = '',
  variant = 'primary',
  external,
  download,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 250, damping: 20 })
  const y = useSpring(rawY, { stiffness: 250, damping: 20 })

  const handleMove = (e: MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const relX = (e.clientX - (rect.left + rect.width / 2)) / rect.width
    const relY = (e.clientY - (rect.top + rect.height / 2)) / rect.height
    rawX.set(relX * 14)
    rawY.set(relY * 10)
  }
  const handleLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  const base =
    'group relative inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 font-display text-[15px] font-semibold tracking-wide transition-colors duration-300 will-change-transform'
  const variants = {
    primary:
      'overflow-hidden bg-white text-[#0a0a0a] transition-colors duration-300 hover:bg-zinc-200 focus-visible:bg-white',
    outline:
      'border border-white/10 bg-white/[0.03] text-zinc-200 backdrop-blur-xl transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.06] hover:text-white',
  } as const

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={(e) => {
        if (href.startsWith('#')) {
          e.preventDefault()
          scrollToSection(href)
        }
      }}
      target={external && !download ? '_blank' : undefined}
      rel={external && !download ? 'noreferrer noopener' : undefined}
      download={download}
      aria-label={ariaLabel}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.97 }}
      style={{ x, y }}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {variant === 'primary' ? (
        <span
          aria-hidden
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        />
      ) : (
        <span
          aria-hidden
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2.5">{children}</span>
    </motion.a>
  )
}
