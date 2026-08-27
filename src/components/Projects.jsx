import { useMemo, useState } from 'react'
import { projects } from '../data/resume'
import { useTilt } from '../lib/interactions'
import { ArrowRightIcon } from './Icons'
import ProjectModal from './ProjectModal'
import Reveal from './Reveal'
import Section from './Section'

function ProjectCard({ project, onOpen, index, position }) {
  const featured = project.featured
  const tilt = useTilt({ max: 4.5, lift: -6 })

  return (
    <Reveal delay={(index % 3) * 70} className={featured ? 'lg:col-span-3' : 'lg:col-span-2'}>
      <button
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        type="button"
        onClick={onOpen}
        aria-label={`Open case study: ${project.title}`}
        className="tilt group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-raised/50 p-5 text-left transition-colors duration-300 hover:border-violet/45 sm:p-6"
      >
        {/* Vibrance that only arrives on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(28rem 14rem at 82% -10%, rgba(167,139,250,0.16), transparent 70%)',
          }}
        />
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
          style={{ background: 'linear-gradient(90deg, var(--color-violet), var(--color-cyan))' }}
        />

        <div className="relative flex items-center justify-between gap-3">
          <span className="font-mono text-[11px] tracking-[0.2em] text-muted">
            {position} / {project.kind.toUpperCase()}
          </span>
          {featured && (
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-lime" aria-hidden />
          )}
        </div>

        <h3
          className={`relative mt-4 font-semibold leading-tight tracking-tight text-bright transition-colors duration-300 group-hover:text-violet ${
            featured ? 'text-xl sm:text-2xl' : 'text-lg'
          }`}
        >
          {project.title}
        </h3>
        {project.client && (
          <p className="relative mt-1 font-mono text-xs text-cyan">{project.client}</p>
        )}

        <p className="relative mt-3 text-sm leading-relaxed text-body">{project.summary}</p>

        {project.results?.[0] && (
          <p className="relative mt-4 flex items-start gap-2 text-sm leading-snug text-lime">
            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-lime" />
            <span className="line-clamp-2">{project.results[0]}</span>
          </p>
        )}

        <div className="min-h-5 grow" />

        <div className="relative mt-5 flex items-end justify-between gap-4 border-t border-line pt-4">
          <ul className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, featured ? 5 : 3).map((tech) => (
              <li
                key={tech}
                className="tag transition-colors duration-300 group-hover:border-violet/25 group-hover:text-body"
              >
                {tech}
              </li>
            ))}
            {project.stack.length > (featured ? 5 : 3) && (
              <li className="tag">+{project.stack.length - (featured ? 5 : 3)}</li>
            )}
          </ul>

          <span className="flex shrink-0 items-center gap-1.5 font-mono text-[11px] text-muted transition-colors duration-300 group-hover:text-violet">
            EXPLORE
            <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </span>
        </div>
      </button>
    </Reveal>
  )
}

export default function Projects() {
  const [openId, setOpenId] = useState(null)
  const [filter, setFilter] = useState('All')

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(projects.map((p) => p.kind)))],
    [],
  )

  const visible = filter === 'All' ? projects : projects.filter((p) => p.kind === filter)
  const openProject = projects.find((p) => p.id === openId) || null

  return (
    <>
      <Section
        id="projects"
        index="03"
        eyebrow="Selected work"
        title="Engineering case studies"
        lede="Production data work described by what it fixed. Open any card for the problem, architecture, results and what it taught me."
        className="border-t border-line-soft"
      >
        <Reveal>
          <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
            {categories.map((cat) => {
              const on = filter === cat
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  aria-pressed={on}
                  className={`rounded-lg border px-3.5 py-2 font-mono text-xs transition-all duration-200 ${
                    on
                      ? 'border-violet/50 bg-violet/12 text-violet'
                      : 'border-line bg-white/[0.02] text-muted hover:-translate-y-0.5 hover:border-violet/30 hover:text-body'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {visible.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              position={String(i + 1).padStart(2, '0')}
              onOpen={() => setOpenId(project.id)}
            />
          ))}
        </div>
      </Section>

      {openProject && <ProjectModal project={openProject} onClose={() => setOpenId(null)} />}
    </>
  )
}
