import { useEffect, useRef } from 'react'
import { flows, metrics } from '../data/caseMeta'

function Flow({ steps }) {
  return (
    <ol className="flow" aria-label="Architecture flow">
      {steps.map((s) => (
        <li key={s} className="flow-node mono">
          {s}
        </li>
      ))}
    </ol>
  )
}

export default function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const restore = useRef(null)

  useEffect(() => {
    restore.current = document.activeElement
    closeRef.current?.focus()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e) => {
      if (e.key === 'Escape') return onClose()
      if (e.key !== 'Tab') return
      const f = dialogRef.current?.querySelectorAll('a[href], button:not([disabled])')
      if (!f?.length) return
      const first = f[0]
      const last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
      restore.current?.focus?.()
    }
  }, [onClose])

  const metric = metrics[project.id]
  const flow = flows[project.id]

  return (
    <div className="modal">
      <div className="modal-scrim" onClick={onClose} aria-hidden="true" />
      <div ref={dialogRef} className="modal-box" role="dialog" aria-modal="true" aria-labelledby="cs-title">
        <div className="modal-head">
          <div>
            <p className="mono eyebrow">
              {project.kind}
              {project.client ? ` · ${project.client}` : ''}
            </p>
            <h2 id="cs-title" className="modal-title">
              {project.title}
            </h2>
          </div>
          <button ref={closeRef} type="button" className="close mono" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="modal-body">
          {flow && <Flow steps={flow} />}

          <section>
            <h3 className="label mono">Problem</h3>
            <p>{project.problem}</p>
          </section>

          <section>
            <h3 className="label mono">Key decisions</h3>
            <ul className="list">
              {project.architecture.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </section>

          <section className="results">
            <h3 className="label mono">Results</h3>
            {metric && (
              <p className="card-metric big">
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </p>
            )}
            <ul className="list">
              {project.results.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </section>

          {project.learned && (
            <section>
              <h3 className="label mono">What I learned</h3>
              <p>{project.learned}</p>
            </section>
          )}

          <ul className="tags">
            {project.stack.map((t) => (
              <li key={t} className="tag mono">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
