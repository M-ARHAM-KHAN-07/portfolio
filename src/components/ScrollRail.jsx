import { useEffect, useState } from 'react'

const STOPS = [
  { id: 'about', n: '01' },
  { id: 'experience', n: '02' },
  { id: 'projects', n: '03' },
  { id: 'pipeline', n: '04' },
  { id: 'stack', n: '05' },
  { id: 'exploring', n: '06' },
  { id: 'contact', n: '07' },
]

/**
 * Fixed progress rail. Shows where you are in the page and doubles as a jump
 * list. Desktop only, and it stays out of the way until a section is active.
 */
export default function ScrollRail() {
  const [active, setActive] = useState(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const sections = STOPS.map((s) => document.getElementById(s.id)).filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (best) setActive(best.target.id)
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.2, 0.6] },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let frame = null
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0)
        frame = null
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <nav
      aria-label="Section progress"
      className="pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 transition-opacity duration-500 xl:block"
      style={{ opacity: active ? 1 : 0 }}
    >
      {/* Track with a fill that tracks page progress */}
      <div className="absolute left-[5px] top-0 h-full w-px bg-line" aria-hidden>
        <div
          className="w-px origin-top"
          style={{
            height: `${progress * 100}%`,
            background: 'linear-gradient(180deg, var(--color-violet), var(--color-cyan))',
          }}
        />
      </div>

      <ul className="pointer-events-auto relative flex flex-col gap-5 pl-0">
        {STOPS.map((stop) => {
          const on = active === stop.id
          return (
            <li key={stop.id}>
              <a
                href={`#${stop.id}`}
                className="group flex items-center gap-3"
                aria-current={on ? 'true' : undefined}
              >
                <span
                  aria-hidden
                  className="h-[11px] w-[11px] shrink-0 rounded-full border transition-all duration-300"
                  style={{
                    borderColor: on ? 'var(--color-violet)' : 'var(--color-line)',
                    background: on ? 'var(--color-violet)' : 'transparent',
                    transform: on ? 'scale(1)' : 'scale(0.7)',
                  }}
                />
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.18em] transition-all duration-300"
                  style={{
                    color: on ? 'var(--color-bright)' : 'var(--color-muted)',
                    opacity: on ? 1 : 0,
                    transform: on ? 'translateX(0)' : 'translateX(-6px)',
                  }}
                >
                  {stop.n} {stop.id}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
