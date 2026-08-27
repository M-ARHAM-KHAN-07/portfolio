import { useMemo, useState } from 'react'
import { projects } from '../data/resume'
import { ArrowUpRightIcon } from './Icons'
import ProjectModal from './ProjectModal'
import Reveal from './Reveal'
import Section from './Section'

function ProjectCard({ project, onOpen, index }) {
  const featured = project.featured

  return (
    <Reveal delay={(index % 3) * 70} className={featured ? 'lg:col-span-3' : 'lg:col-span-2'}>
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open case study: ${project.title}`}
        className="panel panel-hover group relative flex h-full w-full flex-col overflow-hidden p-5 text-left sm:p-6"
      >
        {/* Accent hairline that wipes in on hover */}
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-accent to-transparent transition-transform duration-500 group-hover:scale-x-100"
        />

        <div className="flex flex-wrap items-center gap-2">
          <span className="tag tag-accent">{project.kind}</span>
          {project.client && <span className="tag">{project.client}</span>}
        </div>

        <h3
          className={`mt-4 font-semibold leading-snug tracking-tight text-bright transition-colors group-hover:text-accent ${
            featured ? 'text-xl sm:text-2xl' : 'text-lg'
          }`}
        >
          {project.title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-body">{project.summary}</p>

        {/* Headline result, only when one exists */}
        {project.results?.[0] && (
          <p className="mt-4 flex items-start gap-2 text-sm leading-snug text-signal">
            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-signal" />
            <span className="line-clamp-2">{project.results[0]}</span>
          </p>
        )}

        <div className="min-h-5 grow" />

        <div className="mt-5 flex items-end justify-between gap-4 border-t border-line pt-4">
          <ul className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, featured ? 6 : 4).map((tech) => (
              <li key={tech} className="tag">
                {tech}
              </li>
            ))}
            {project.stack.length > (featured ? 6 : 4) && (
              <li className="tag">+{project.stack.length - (featured ? 6 : 4)}</li>
            )}
          </ul>

          <span className="flex shrink-0 items-center gap-1.5 font-mono text-[11px] text-muted transition-colors group-hover:text-accent">
            Case study
            <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
        className="border-t border-line"
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
                  className={`rounded-lg border px-3.5 py-2 font-mono text-xs transition-colors ${
                    on
                      ? 'border-accent/40 bg-accent/10 text-accent'
                      : 'border-line bg-white/[0.02] text-muted hover:border-line hover:text-body'
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
              onOpen={() => setOpenId(project.id)}
            />
          ))}
        </div>
      </Section>

      {openProject && <ProjectModal project={openProject} onClose={() => setOpenId(null)} />}
    </>
  )
}
