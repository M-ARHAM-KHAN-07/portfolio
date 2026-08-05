import Reveal from './Reveal'

/**
 * Consistent section wrapper: anchor target, eyebrow label, heading and lede.
 */
export default function Section({ id, eyebrow, title, lede, children }) {
  return (
    <section id={id} className="scroll-mt-24 py-20 sm:py-24 lg:py-28">
      <div className="section-shell">
        <Reveal>
          <div className="max-w-2xl">
            {eyebrow && (
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-accent-400">
                {eyebrow}
              </p>
            )}
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
            {lede && <p className="mt-4 text-base leading-relaxed text-slate-400">{lede}</p>}
          </div>
        </Reveal>

        <div className="mt-12 sm:mt-14">{children}</div>
      </div>
    </section>
  )
}
