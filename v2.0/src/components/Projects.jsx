import { useMemo, useState } from 'react'
import { projects } from '../data/resume'
import { blurbs, categoryClass, metrics, projectOrder } from '../data/caseMeta'
import ProjectModal from './ProjectModal'
import Reveal from './Reveal'

const pad = (n) => String(n).padStart(2, '0')

function spot(e) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

function Card({ project, n, onOpen }) {
  const metric = metrics[project.id]
  return (
    <button type="button" className={`card ${categoryClass[project.kind] || 'cat-default'}`} onClick={onOpen} onPointerMove={spot} aria-label={`Open case study: ${project.title}`}>
      <span className="card-top">
        <span className="mono card-num">{pad(n)}</span>
        <span className="chip mono">{project.kind}</span>
      </span>
      <h3 className="card-title">{project.title}</h3>
      <p className="card-sum">{blurbs[project.id]}</p>
      {metric && (
        <p className="card-metric">
          <strong>{metric.value}</strong>
          <span>{metric.label}</span>
        </p>
      )}
      <ul className="tags">
        {project.stack.slice(0, 4).map((t) => (
          <li key={t} className="tag mono">
            {t}
          </li>
        ))}
      </ul>
    </button>
  )
}

function Row({ project, n, onOpen }) {
  return (
    <li>
      <button type="button" className="row" onClick={onOpen} aria-label={`Open case study: ${project.title}`}>
        <span className="mono row-num">{pad(n)}</span>
        <span className="row-title">{project.title}</span>
        <span className="row-kind mono">{project.kind}</span>
        <span className="row-arrow" aria-hidden="true">
          →
        </span>
      </button>
    </li>
  )
}

export default function Projects() {
  const [openId, setOpenId] = useState(null)

  const ordered = useMemo(
    () => projectOrder.map((id) => projects.find((p) => p.id === id)).filter(Boolean),
    [],
  )
  const lead = ordered.slice(0, 3)
  const rest = ordered.slice(3)
  const open = ordered.find((p) => p.id === openId)

  return (
    <section id="projects" className="projects">
      <div className="wrap">
        <p className="eyebrow mono">Selected work</p>
        <div className="cards">
          {lead.map((p, i) => (
            <Reveal key={p.id} delay={i * 60}>
              <Card project={p} n={i + 1} onOpen={() => setOpenId(p.id)} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <ul className="rows">
            {rest.map((p, i) => (
              <Row key={p.id} project={p} n={i + 4} onOpen={() => setOpenId(p.id)} />
            ))}
          </ul>
        </Reveal>
      </div>
      {open && <ProjectModal project={open} onClose={() => setOpenId(null)} />}
    </section>
  )
}
