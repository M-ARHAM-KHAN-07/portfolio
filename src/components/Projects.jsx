import { useMemo, useState } from 'react'
import { projects } from '../data/resume'
import { SparkIcon } from './Icons'
import Reveal from './Reveal'
import Section from './Section'

function ProjectCard({ project, index }) {
  return (
    <Reveal delay={(index % 3) * 80} className="h-full">
      <article className="card-surface group flex h-full flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <span className="chip chip-accent">{project.kind}</span>
          {project.featured && (
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
              Featured
            </span>
          )}
        </div>

        <h3 className="mt-4 text-lg font-semibold leading-snug text-white transition-colors group-hover:text-accent-400">
          {project.title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-slate-400">{project.description}</p>

        <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
          <p className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
            Architecture
          </p>
          <ul className="space-y-2">
            {project.architecture.map((step) => (
              <li key={step} className="flex gap-2.5 text-[13px] leading-relaxed text-slate-400">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent-400/60" />
                {step}
              </li>
            ))}
          </ul>
        </div>

        {project.impact && (
          <div className="mt-5 flex items-start gap-2 text-sm text-emerald-300">
            <SparkIcon className="mt-0.5 h-4 w-4 shrink-0" />
            <span className="leading-snug">{project.impact}</span>
          </div>
        )}

        {/* Spacer keeps the stack row flush to the card bottom without collapsing the gap */}
        <div className="min-h-6 grow" />

        <ul className="flex flex-wrap gap-2 border-t border-white/[0.06] pt-5">
          {project.stack.map((tech) => (
            <li key={tech} className="chip">
              {tech}
            </li>
          ))}
        </ul>
      </article>
    </Reveal>
  )
}

export default function Projects() {
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(projects.map((p) => p.kind)))],
    [],
  )
  const [active, setActive] = useState('All')

  const visible = active === 'All' ? projects : projects.filter((p) => p.kind === active)

  return (
    <Section
      id="projects"
      eyebrow="Selected Work"
      title="Projects & engineering wins"
      lede="Production data work, described by what it fixed rather than what it used. Filter by discipline."
    >
      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            aria-pressed={active === cat}
            className={`rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors ${
              active === cat
                ? 'border-accent-400/40 bg-accent-500/15 text-accent-400'
                : 'border-white/[0.08] bg-white/[0.02] text-slate-400 hover:border-white/[0.15] hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </Section>
  )
}
