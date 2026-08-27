import { useEffect, useRef } from 'react'
import { BulbIcon, CloseIcon, LayersIcon, ProblemIcon, ResultIcon } from './Icons'

function Block({ icon: Icon, title, children }) {
  return (
    <section className="mt-8 first:mt-0">
      <div className="mb-3 flex items-center gap-2.5">
        <Icon className="h-4 w-4 text-violet" />
        <h4 className="label text-body">{title}</h4>
      </div>
      {children}
    </section>
  )
}

export default function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const restoreFocusTo = useRef(null)

  useEffect(() => {
    restoreFocusTo.current = document.activeElement
    closeRef.current?.focus()

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      // Keep Tab inside the dialog
      if (e.key !== 'Tab') return
      const focusables = dialogRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (!focusables?.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
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
      document.body.style.overflow = prevOverflow
      restoreFocusTo.current?.focus?.()
    }
  }, [onClose])

  if (!project) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6">
      <div
        className="absolute inset-0 bg-void/85 backdrop-blur-md"
        onClick={onClose}
        aria-hidden
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="relative flex max-h-[92svh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl border border-line bg-raised shadow-2xl sm:rounded-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-5 sm:px-7">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="tag tag-violet">{project.kind}</span>
              {project.client && <span className="tag">{project.client}</span>}
            </div>
            <h3
              id="project-modal-title"
              className="mt-3 text-xl font-semibold tracking-tight text-bright sm:text-2xl"
            >
              {project.title}
            </h3>
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="shrink-0 rounded-lg border border-line p-2 text-muted transition-colors hover:border-violet/40 hover:text-bright"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto px-5 py-6 sm:px-7 sm:py-7">
          <Block icon={ProblemIcon} title="Problem">
            <p className="text-sm leading-relaxed text-body">{project.problem}</p>
          </Block>

          <Block icon={LayersIcon} title="Architecture">
            <ul className="space-y-2.5">
              {project.architecture.map((step) => (
                <li key={step} className="flex gap-3 text-sm leading-relaxed text-body">
                  <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-violet/70" />
                  {step}
                </li>
              ))}
            </ul>
          </Block>

          <Block icon={ResultIcon} title="Results">
            <ul className="space-y-2.5">
              {project.results.map((r) => (
                <li key={r} className="flex gap-3 text-sm leading-relaxed text-body">
                  <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-lime" />
                  {r}
                </li>
              ))}
            </ul>
          </Block>

          {project.learned && (
            <Block icon={BulbIcon} title="What I learned">
              <p className="text-sm leading-relaxed text-body">{project.learned}</p>
            </Block>
          )}

          <div className="rule my-8" />

          <p className="label mb-3">Technologies</p>
          <ul className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li key={tech} className="tag">
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
