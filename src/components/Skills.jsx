import { skillGroups } from '../data/resume'
import Reveal from './Reveal'
import Section from './Section'

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Toolkit"
      title="Skills & tools"
      lede="The stack I reach for across ingestion, transformation, storage and the reporting layer on top."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <Reveal key={group.title} delay={(i % 3) * 80} className="h-full">
            <div className="card-surface h-full p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-accent-400">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                  {group.title}
                </h3>
              </div>

              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="chip px-3 py-1.5 text-xs hover:border-accent-400/30 hover:text-slate-200"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
