import { useRef, useState } from 'react'
import { experience } from '../data/resume'
import { CheckIcon } from './Icons'
import Reveal from './Reveal'
import Section from './Section'

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(0)
  const tabRefs = useRef([])
  const active = experience[activeIndex]

  /* Roving focus so the rail behaves like a real tablist */
  const onKeyDown = (e) => {
    const last = experience.length - 1
    let next = null
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = activeIndex === last ? 0 : activeIndex + 1
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = activeIndex === 0 ? last : activeIndex - 1
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = last
    if (next === null) return
    e.preventDefault()
    setActiveIndex(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <Section
      id="experience"
      index="02"
      eyebrow="Experience"
      title="An engineering track record"
      lede="Select a role to see the systems, responsibilities and outcomes behind it."
      className="border-t border-line"
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Rail */}
        <div className="lg:col-span-4">
          <Reveal>
            <div
              role="tablist"
              aria-label="Roles"
              aria-orientation="vertical"
              onKeyDown={onKeyDown}
              className="relative flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0 lg:pl-6"
            >
              {/* Vertical rail line, desktop only */}
              <span
                aria-hidden
                className="absolute left-[3px] top-2 bottom-2 hidden w-px bg-line lg:block"
              />

              {experience.map((job, i) => {
                const selected = i === activeIndex
                return (
                  <button
                    key={job.id}
                    ref={(el) => (tabRefs.current[i] = el)}
                    role="tab"
                    id={`role-tab-${job.id}`}
                    aria-selected={selected}
                    aria-controls={`role-panel-${job.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActiveIndex(i)}
                    className={`relative shrink-0 rounded-xl border p-4 text-left transition-all duration-300 lg:shrink ${
                      selected
                        ? 'border-accent/40 bg-overlay/70'
                        : 'border-line bg-raised/40 hover:border-line hover:bg-overlay/40'
                    }`}
                  >
                    {/* Rail node */}
                    <span
                      aria-hidden
                      className={`absolute -left-6 top-6 hidden h-[7px] w-[7px] -translate-x-1/2 rounded-full ring-4 ring-base transition-colors lg:block ${
                        selected ? 'bg-accent' : 'bg-line'
                      }`}
                    />
                    <span
                      className={`block text-sm font-medium transition-colors ${
                        selected ? 'text-bright' : 'text-body'
                      }`}
                    >
                      {job.role}
                    </span>
                    <span className="mt-1 flex items-center gap-2">
                      <span className="font-mono text-xs text-accent">{job.company}</span>
                      {job.current && (
                        <span className="rounded border border-signal/25 bg-signal/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-signal">
                          Current
                        </span>
                      )}
                    </span>
                    {job.site && (
                      <span className="mt-1 block font-mono text-[11px] text-muted">{job.site}</span>
                    )}
                  </button>
                )
              })}
            </div>
          </Reveal>
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-8">
          <Reveal delay={80}>
            <div
              key={active.id}
              role="tabpanel"
              id={`role-panel-${active.id}`}
              aria-labelledby={`role-tab-${active.id}`}
              tabIndex={0}
              className="panel p-5 sm:p-7"
            >
              <p className="text-sm leading-relaxed text-body">{active.blurb}</p>

              <div className="rule my-6" />

              <p className="label mb-4">What I worked on</p>
              <ul className="space-y-3.5">
                {active.highlights.map((item) => (
                  <li key={item.text} className="flex gap-3">
                    <CheckIcon className="mt-[3px] h-4 w-4 shrink-0 text-accent/70" />
                    <p className="text-sm leading-relaxed text-body">
                      {item.text}
                      {item.metric && (
                        <span className="ml-2 inline-block whitespace-nowrap rounded border border-signal/25 bg-signal/10 px-1.5 py-0.5 font-mono text-[11px] leading-none text-signal">
                          {item.metric}
                        </span>
                      )}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="rule my-6" />

              <p className="label mb-3">Systems and tools</p>
              <ul className="flex flex-wrap gap-2">
                {active.stack.map((tech) => (
                  <li key={tech} className="tag">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
