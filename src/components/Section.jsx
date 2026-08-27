import Reveal from './Reveal'

/**
 * Shared section chrome: anchor target, monospace eyebrow with an index,
 * display heading and optional lede.
 */
export default function Section({ id, index, eyebrow, title, lede, children, className = '' }) {
  return (
    <section id={id} className={`scroll-mt-24 py-24 sm:py-28 lg:py-32 ${className}`}>
      <div className="shell">
        <Reveal>
          <div className="flex items-center gap-3">
            {index && <span className="label text-accent">{index}</span>}
            <span className="label">{eyebrow}</span>
            <span className="h-px flex-1 bg-line" />
          </div>

          <div className="mt-6 max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-[-0.02em] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              {title}
            </h2>
            {lede && <p className="mt-5 text-base leading-relaxed text-body sm:text-lg">{lede}</p>}
          </div>
        </Reveal>

        <div className="mt-14 sm:mt-16">{children}</div>
      </div>
    </section>
  )
}
