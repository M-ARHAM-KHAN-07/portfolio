import { useEffect, useState } from 'react'

/** Subtle comic web tracer that follows scroll and pulls a small page tag upward. */
export default function WebSwing() {
  const [progress, setProgress] = useState(0)
  const [swing, setSwing] = useState(false)

  useEffect(() => {
    let frame = 0
    let previous = window.scrollY
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        const y = window.scrollY
        setProgress(max > 0 ? y / max : 0)
        if (Math.abs(y - previous) > 18) {
          setSwing(true)
          window.setTimeout(() => setSwing(false), 360)
        }
        previous = y
        frame = 0
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className={`web-swing ${swing ? 'is-swinging' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 100 1000" preserveAspectRatio="none">
        <path className="swing-web" d="M 85 0 Q 78 90 52 155 T 48 330 T 67 500 T 48 680 T 60 850 T 78 1000" />
        <circle className="swing-anchor" cx="85" cy="0" r="4" />
        <g className="swing-tag" style={{ transform: `translateY(${progress * 900}px)` }}>
          <path d="M50 0 L75 28 L50 56" />
          <circle cx="50" cy="28" r="5" />
        </g>
      </svg>
      <span className="swing-caption">WEB-SLING THROUGH</span>
    </div>
  )
}
