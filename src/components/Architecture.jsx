import { useState } from 'react'
import { architectureLayers } from '../data/resume'
import { DatabaseIcon } from './Icons'
import Reveal from './Reveal'
import Section from './Section'

export default function Architecture() {
  const [selected, setSelected] = useState(null)

  return (
    <Section
      id="architecture"
      index="04"
      eyebrow="Toolkit map"
      title="How the pieces fit together"
      lede="A map of the tools I work with, arranged by the stage of a pipeline they belong to. Hover or tap any node to see how I have actually used it."
      className="border-t border-line"
    >
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
        {/* Flow */}
        <div className="lg:col-span-8">
          <div className="space-y-3">
            {architectureLayers.map((layer, i) => (
              <Reveal key={layer.stage} delay={i * 60}>
                <div className="panel p-4 sm:p-5">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-mono text-[11px] text-accent">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-bright">
                      {layer.stage}
                    </h3>
                    <span className="text-xs text-muted">{layer.caption}</span>
                  </div>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {layer.nodes.map((node) => {
                      const on = selected?.name === node.name
                      return (
                        <li key={node.name}>
                          <button
                            type="button"
                            onMouseEnter={() => setSelected({ ...node, stage: layer.stage })}
                            onFocus={() => setSelected({ ...node, stage: layer.stage })}
                            onClick={() => setSelected({ ...node, stage: layer.stage })}
                            aria-describedby="architecture-detail"
                            className={`rounded-lg border px-3 py-1.5 font-mono text-xs transition-all duration-200 ${
                              on
                                ? 'border-accent/50 bg-accent/10 text-accent'
                                : 'border-line bg-white/[0.02] text-body hover:border-accent/30 hover:text-bright'
                            }`}
                          >
                            {node.name}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>

                {/* Connector between stages */}
                {i < architectureLayers.length - 1 && (
                  <div aria-hidden className="flex justify-center py-1">
                    <span className="h-4 w-px bg-gradient-to-b from-line to-accent/40" />
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </div>

        {/* Detail rail */}
        <div className="lg:col-span-4">
          <div
            id="architecture-detail"
            aria-live="polite"
            className="panel p-5 lg:sticky lg:top-24 sm:p-6"
          >
            {selected ? (
              <>
                <p className="label text-accent">{selected.stage}</p>
                <h3 className="mt-3 font-mono text-lg text-bright">{selected.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-body">{selected.note}</p>
              </>
            ) : (
              <>
                <DatabaseIcon className="h-6 w-6 text-accent/60" />
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  Select any node to see how it fits into work I have done.
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
