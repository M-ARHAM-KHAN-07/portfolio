import { stackGroups } from '../data/resume'
import Reveal from './Reveal'
import Section from './Section'

/**
 * Each item carries a note on how it was used. The note is visible by default so
 * touch users can read it; on devices with a real pointer it collapses and
 * reveals on hover or keyboard focus (see .stack-note in index.css).
 */
function StackItem({ item }) {
  return (
    <li className="stack-item">
      <div
        tabIndex={0}
        className="h-full rounded-lg border border-line bg-white/[0.02] px-3 py-2.5 transition-colors duration-200 hover:border-accent/35 hover:bg-overlay/60 focus-visible:border-accent/50"
      >
        <span className="block font-mono text-xs text-bright">{item.name}</span>

        <span className="stack-note">
          <span className="overflow-hidden">
            <span className="mt-1.5 block text-[11px] leading-snug text-muted">{item.note}</span>
          </span>
        </span>
      </div>
    </li>
  )
}

export default function Stack() {
  return (
    <Section
      id="stack"
      index="05"
      eyebrow="Stack"
      title="Technologies I work with"
      lede="Grouped by what they do, each with a note on how I have actually used it."
      className="border-t border-line"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stackGroups.map((group, i) => (
          <Reveal key={group.title} delay={(i % 3) * 70} className="h-full">
            <div className="panel h-full p-5">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-bright">
                  {group.title}
                </h3>
              </div>

              {/* Two columns on tablets, where notes stay expanded, to halve the height */}
              <ul className="mt-5 grid gap-1.5 sm:grid-cols-2 lg:grid-cols-1">
                {group.items.map((item) => (
                  <StackItem key={item.name} item={item} />
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
