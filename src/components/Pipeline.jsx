import { useState } from 'react'
import { architectureLayers } from '../data/resume'
import { DatabaseIcon } from './Icons'
import Reveal from './Reveal'
import Section from './Section'

/** Two dots falling down the gap between stages, so the flow is visible. */
function Connector() {
  return (
    <div aria-hidden className="relative flex h-8 justify-center">
      <span className="absolute inset-y-0 w-px bg-gradient-to-b from-line via-violet/40 to-line" />
      {[0, 1].map((i) => (
        <span
          key={i}
          className="absolute top-0 h-1.5 w-1.5 rounded-full"
          style={{
            background: 'var(--color-cyan)',
            boxShadow: '0 0 8px var(--color-cyan)',
            animation: `flow-down ${1.9 + i * 0.4}s linear infinite`,
            animationDelay: `${i * 0.95}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function Pipeline() {
  const [selected, setSelected] = useState(null)

  return (
    <Section
      id="pipeline"
      index="04"
      eyebrow="The pipeline"
      title="Follow the data from source to dashboard"
      lede="Every tool I work with, placed at the stage where it earns its keep. Hover or tap a node to see how I actually used it."
      className="border-t border-line-soft"
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-8">
          {architectureLayers.map((layer, i) => (
            <div key={layer.stage}>
              <Reveal delay={i * 50}>
                <div className="relative overflow-hidden rounded-2xl border border-line bg-raised/50 p-4 sm:p-5">
                  {/* Stage accent bar */}
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-[2px]"
                    style={{
                      background:
                        i < 2
                          ? 'var(--color-violet)'
                          : i < 4
                            ? 'var(--color-violet-deep)'
                            : 'var(--color-cyan)',
                      opacity: 0.65,
                    }}
                  />

                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 pl-2">
                    <span className="font-mono text-[11px] text-cyan">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-bright">
                      {layer.stage}
                    </h3>
                    <span className="text-xs text-muted">{layer.caption}</span>
                  </div>

                  <ul className="mt-4 flex flex-wrap gap-2 pl-2">
                    {layer.nodes.map((node) => {
                      const on = selected?.name === node.name
                      return (
                        <li key={node.name}>
                          <button
                            type="button"
                            onMouseEnter={() => setSelected({ ...node, stage: layer.stage })}
                            onFocus={() => setSelected({ ...node, stage: layer.stage })}
                            onClick={() => setSelected({ ...node, stage: layer.stage })}
                            aria-describedby="pipeline-detail"
                            className={`rounded-lg border px-3 py-1.5 font-mono text-xs transition-all duration-200 ${
                              on
                                ? 'border-cyan/55 bg-cyan/10 text-cyan'
                                : 'border-line bg-white/[0.02] text-body hover:-translate-y-0.5 hover:border-violet/40 hover:text-bright'
                            }`}
                          >
                            {node.name}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </Reveal>

              {i < architectureLayers.length - 1 && <Connector />}
            </div>
          ))}
        </div>

        {/* Detail rail */}
        <div className="lg:col-span-4">
          <div
            id="pipeline-detail"
            aria-live="polite"
            className="panel p-5 sm:p-6 lg:sticky lg:top-24"
          >
            {selected ? (
              <>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">
                  {selected.stage}
                </p>
                <h3 className="mt-3 font-mono text-lg text-bright">{selected.name}</h3>
                <p className="mt-1 label">Used for</p>
                <p className="mt-2 text-sm leading-relaxed text-body">{selected.note}</p>
              </>
            ) : (
              <>
                <DatabaseIcon className="h-6 w-6 text-violet" />
                <p className="mt-4 text-sm leading-relaxed text-body">
                  Pick any node to see what it did on a real project.
                </p>
              </>
            )}

            <div className="rule my-6" />

            <p className="text-xs leading-relaxed text-muted">
              These tools span different clients and projects. This is a map of my toolkit by
              pipeline stage, not a diagram of one single production system.
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}
