import { useEffect, useState } from 'react'
import { useInView } from './Reveal'

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/**
 * Counts up to `value` when scrolled into view. Renders the final value
 * immediately for reduced-motion users rather than animating.
 */
export default function Counter({ value, prefix = '', suffix = '', decimals = 0, duration = 1400 }) {
  const [ref, inView] = useInView()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return

    if (prefersReduced()) {
      setDisplay(value)
      return
    }

    let frame
    const start = performance.now()

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      // easeOutExpo, so it decelerates into the final number
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
      setDisplay(value * eased)
      if (t < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, value, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  )
}
