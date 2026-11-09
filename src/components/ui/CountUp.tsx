import { useEffect, useRef } from 'react'
import { animate, useInView } from 'framer-motion'

type Props = {
  to: number
  decimals?: number
  prefix?: string
  suffix?: string
  /** Seconds to wait before counting starts */
  delay?: number
  className?: string
}

/**
 * Counts up from 0 to `to` the first time it scrolls into view.
 */
export default function CountUp({
  to,
  decimals = 0,
  prefix = '',
  suffix = '',
  delay = 0,
  className = '',
}: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px 0px' })

  useEffect(() => {
    if (!inView || !ref.current) return
    const node = ref.current
    const controls = animate(0, to, {
      duration: 1.6,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`
      },
    })
    return () => controls.stop()
  }, [inView, to, decimals, prefix, suffix, delay])

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  )
}
