import { useEffect, useRef } from 'react'

/**
 * Subtle connected-node field with packets travelling along the links, evoking
 * a data pipeline without being a literal diagram.
 *
 * Performance guards:
 *  - device pixel ratio capped at 2
 *  - node count scales down on small screens
 *  - RAF loop stops when the canvas scrolls out of view or the tab is hidden
 *  - draws nothing and never starts a loop under prefers-reduced-motion
 */
export default function HeroCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let nodes = []
    let packets = []
    let raf = null
    let visible = true

    const LINK_DISTANCE = 150

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Density scales with area, but stays bounded at both ends
      const target = Math.round((width * height) / 26000)
      const count = Math.max(14, Math.min(46, target))

      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: Math.random() * 1.3 + 0.7,
      }))

      packets = Array.from({ length: Math.max(3, Math.floor(count / 6)) }, () => ({
        from: Math.floor(Math.random() * count),
        to: Math.floor(Math.random() * count),
        t: Math.random(),
        speed: Math.random() * 0.004 + 0.002,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // Links first, so nodes sit on top
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.hypot(dx, dy)
          if (dist > LINK_DISTANCE) continue

          const alpha = (1 - dist / LINK_DISTANCE) * 0.16
          ctx.strokeStyle = `rgba(120, 160, 200, ${alpha})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(nodes[i].x, nodes[i].y)
          ctx.lineTo(nodes[j].x, nodes[j].y)
          ctx.stroke()
        }
      }

      for (const n of nodes) {
        ctx.fillStyle = 'rgba(160, 195, 225, 0.42)'
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // Accent packets riding between node pairs
      for (const p of packets) {
        const a = nodes[p.from]
        const b = nodes[p.to]
        if (!a || !b) continue

        const x = a.x + (b.x - a.x) * p.t
        const y = a.y + (b.y - a.y) * p.t

        const glow = ctx.createRadialGradient(x, y, 0, x, y, 7)
        glow.addColorStop(0, 'rgba(56, 189, 248, 0.85)')
        glow.addColorStop(1, 'rgba(56, 189, 248, 0)')
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(x, y, 7, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const step = () => {
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        // Wrap rather than bounce, which reads as a continuous field
        if (n.x < -20) n.x = width + 20
        if (n.x > width + 20) n.x = -20
        if (n.y < -20) n.y = height + 20
        if (n.y > height + 20) n.y = -20
      }

      for (const p of packets) {
        p.t += p.speed
        if (p.t >= 1) {
          p.t = 0
          p.from = p.to
          p.to = Math.floor(Math.random() * nodes.length)
          p.speed = Math.random() * 0.004 + 0.002
        }
      }

      draw()
      raf = requestAnimationFrame(step)
    }

    const start = () => {
      if (raf === null && visible && !reduceMotion) raf = requestAnimationFrame(step)
    }
    const stop = () => {
      if (raf !== null) {
        cancelAnimationFrame(raf)
        raf = null
      }
    }

    resize()

    if (reduceMotion) {
      // One static frame: the texture without the movement
      draw()
      return
    }

    const observer =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            ([entry]) => {
              visible = entry.isIntersecting
              visible ? start() : stop()
            },
            { threshold: 0 },
          )
        : null
    observer?.observe(canvas)

    const onVisibility = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVisibility)

    let resizeTimer
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resize, 180)
    }
    window.addEventListener('resize', onResize)

    start()

    return () => {
      stop()
      observer?.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('resize', onResize)
      clearTimeout(resizeTimer)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}
