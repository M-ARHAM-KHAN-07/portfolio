import { useMemo, useState } from 'react'
import { edges, nodes, tierColor } from '../data/heroGraph'
import { useParallax } from '../lib/interactions'

const byId = Object.fromEntries(nodes.map((n) => [n.id, n]))

/**
 * An interactive graph of the actual stack, with data visibly moving through
 * it. Particles ride each edge via CSS offset-path, so the whole animation is
 * compositor-driven with no per-frame JavaScript.
 *
 * Nodes are real anchors: clicking one jumps to the stack section.
 */
export default function HeroSystem() {
  const [active, setActive] = useState(null)
  const parallaxRef = useParallax({ damp: 1 })

  const paths = useMemo(
    () =>
      edges.map(([from, to]) => {
        const a = byId[from]
        const b = byId[to]
        return { from, to, d: `M ${a.x} ${a.y} L ${b.x} ${b.y}` }
      }),
    [],
  )

  const isDim = (id) => active && active !== id && !isLinked(id)
  const isLinked = (id) =>
    active && edges.some(([f, t]) => (f === active && t === id) || (t === active && f === id))
  const edgeActive = (f, t) => active === f || active === t

  return (
    <div
      ref={parallaxRef}
      className="relative w-full"
      style={{
        transform:
          'translate3d(calc(var(--px, 0) * 14px), calc(var(--py, 0) * 14px), 0)',
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Soft field behind the graph */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 50% at 55% 35%, rgba(167,139,250,0.14), transparent 70%), radial-gradient(50% 45% at 40% 80%, rgba(34,211,238,0.10), transparent 70%)',
        }}
      />

      <svg
        viewBox="0 0 520 480"
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label="Interactive diagram of the data stack: web APIs and inbound email flow through Python, AWS Lambda and Airflow, into dbt, then BigQuery and PostgreSQL, and out to Metabase and OpenSearch."
      >
        <defs>
          <linearGradient id="edgeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-violet)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--color-cyan)" stopOpacity="0.55" />
          </linearGradient>
          <radialGradient id="dotGrad">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="55%" stopColor="var(--color-cyan)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--color-cyan)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Edges */}
        <g>
          {paths.map(({ from, to, d }) => {
            const on = edgeActive(from, to)
            return (
              <path
                key={`${from}-${to}`}
                d={d}
                fill="none"
                stroke={on ? 'var(--color-cyan)' : 'url(#edgeGrad)'}
                strokeWidth={on ? 1.6 : 1}
                strokeOpacity={active && !on ? 0.15 : 0.5}
                style={{ transition: 'stroke-opacity 0.3s, stroke-width 0.3s' }}
              />
            )
          })}
        </g>

        {/* Particles riding the edges */}
        <g aria-hidden="true">
          {paths.map(({ from, to, d }, i) => (
            <circle
              key={`dot-${from}-${to}`}
              className="flow-dot"
              cx="0"
              cy="0"
              r="3.2"
              fill="url(#dotGrad)"
              style={{
                offsetPath: `path('${d}')`,
                '--flow-dur': `${2.6 + (i % 4) * 0.7}s`,
                '--flow-delay': `${(i * 0.43) % 3}s`,
              }}
            />
          ))}
        </g>

        {/* Nodes */}
        <g>
          {nodes.map((n) => {
            const dim = isDim(n.id)
            const on = active === n.id
            const color = tierColor[n.tier]

            return (
              <a
                key={n.id}
                href="#stack"
                aria-label={`${n.label}. Jump to the stack section.`}
                onMouseEnter={() => setActive(n.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(n.id)}
                onBlur={() => setActive(null)}
                style={{
                  opacity: dim ? 0.32 : 1,
                  transition: 'opacity 0.3s',
                  cursor: 'pointer',
                }}
              >
                {/* Generous invisible hit area */}
                <circle cx={n.x} cy={n.y} r="20" fill="transparent" />

                {on && (
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r="7"
                    fill="none"
                    stroke={color}
                    strokeWidth="1"
                    style={{
                      transformOrigin: `${n.x}px ${n.y}px`,
                      animation: 'ring-out 1.4s ease-out infinite',
                    }}
                  />
                )}

                <circle
                  cx={n.x}
                  cy={n.y}
                  r={on ? 6.5 : 4.5}
                  fill={color}
                  style={{ transition: 'r 0.25s cubic-bezier(0.34,1.4,0.64,1)' }}
                />
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={on ? 11 : 9}
                  fill="none"
                  stroke={color}
                  strokeOpacity={on ? 0.5 : 0.22}
                  strokeWidth="1"
                  style={{ transition: 'r 0.25s, stroke-opacity 0.25s' }}
                />

                <text
                  x={n.anchor === 'end' ? n.x - 17 : n.x + 17}
                  y={n.y + 4}
                  textAnchor={n.anchor}
                  className="font-mono"
                  fontSize="12.5"
                  fill={on ? 'var(--color-bright)' : 'var(--color-body)'}
                  style={{ transition: 'fill 0.25s' }}
                >
                  {n.label}
                </text>
              </a>
            )
          })}
        </g>
      </svg>
    </div>
  )
}
