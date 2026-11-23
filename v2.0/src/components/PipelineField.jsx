import { useEffect, useRef, useState } from 'react'

const W = 340
const H = 150

const nodes = [
  { id: 'src', label: 'Sources', x: 16, y: 75, anchor: 'start' },
  { id: 'ext', label: 'Extract', x: 78, y: 32, anchor: 'middle' },
  { id: 'val', label: 'Validate', x: 78, y: 118, anchor: 'middle' },
  { id: 'trn', label: 'Transform', x: 162, y: 75, anchor: 'middle' },
  { id: 'wh', label: 'Warehouse', x: 240, y: 34, anchor: 'middle' },
  { id: 'mrt', label: 'Marts', x: 240, y: 116, anchor: 'middle' },
  { id: 'out', label: 'Dashboards', x: 324, y: 75, anchor: 'end' },
]
const edges = [
  ['src', 'ext'],
  ['src', 'val'],
  ['ext', 'trn'],
  ['val', 'trn'],
  ['trn', 'wh'],
  ['trn', 'mrt'],
  ['wh', 'out'],
  ['mrt', 'out'],
]
const byId = Object.fromEntries(nodes.map((n) => [n.id, n]))
const RADIUS = 85

/** A small pipeline that reacts to the cursor: nearby nodes grow, light up and name themselves. */
export default function PipelineField() {
  const svgRef = useRef(null)
  const [pt, setPt] = useState(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const onMove = (e) => {
      const r = svg.getBoundingClientRect()
      const inside =
        e.clientX > r.left - 50 && e.clientX < r.right + 50 && e.clientY > r.top - 50 && e.clientY < r.bottom + 50
      setPt(inside ? { x: ((e.clientX - r.left) / r.width) * W, y: ((e.clientY - r.top) / r.height) * H } : null)
    }
    const onLeave = () => setPt(null)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  const power = (n) => {
    if (!pt) return 0
    const d = Math.hypot(n.x - pt.x, n.y - pt.y)
    return Math.max(0, 1 - d / RADIUS)
  }
  const p = Object.fromEntries(nodes.map((n) => [n.id, power(n)]))

  return (
    <svg
      ref={svgRef}
      className="field"
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Small decorative pipeline diagram that reacts to the cursor"
    >
      {edges.map(([a, b]) => {
        const A = byId[a]
        const B = byId[b]
        const lit = Math.min(1, (p[a] + p[b]) * 0.9)
        const d = `M ${A.x} ${A.y} L ${B.x} ${B.y}`
        return (
          <g key={a + b}>
            <path d={d} pathLength="1" className="field-edge" style={{ strokeOpacity: 0.28 + lit * 0.6, strokeWidth: 1 + lit * 0.8 }} />
          </g>
        )
      })}

      {/* Idle data packets drifting along a few edges */}
      {[
        ['src', 'ext', 0],
        ['trn', 'mrt', 1.2],
        ['wh', 'out', 2.1],
      ].map(([a, b, delay]) => (
        <circle key={a + b} r="2.2" className="field-packet">
          <animateMotion
            dur="3.4s"
            begin={`${delay}s`}
            repeatCount="indefinite"
            path={`M ${byId[a].x} ${byId[a].y} L ${byId[b].x} ${byId[b].y}`}
          />
        </circle>
      ))}

      {pt && <circle cx={pt.x} cy={pt.y} r="46" className="field-glow" />}

      {nodes.map((n) => {
        const k = p[n.id]
        return (
          <g key={n.id} className="field-node-wrap">
            <circle
              cx={n.x}
              cy={n.y}
              r={3.6 + k * 4.2}
              className="field-node"
              style={{ fill: k > 0.15 ? 'var(--accent-bright)' : 'var(--paper)', strokeOpacity: 0.55 + k * 0.45 }}
            />
            <text
              x={n.x}
              y={n.y - 13}
              textAnchor={n.anchor}
              className="field-label"
              style={{ opacity: k > 0.35 ? Math.min(1, (k - 0.35) * 2.2) : 0 }}
            >
              {n.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
