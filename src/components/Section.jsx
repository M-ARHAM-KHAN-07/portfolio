import Kinetic from './Kinetic'
import Reveal, { useInView } from './Reveal'

/**
 * Shared section chrome. The index number slides in and a hairline draws
 * itself across as the section enters view, so each section announces itself
 * rather than simply appearing.
 */
export default function Section({
  id,
  index,
  eyebrow,
  title,
  lede,
  children,
  className = '',
  kinetic = true,
}) {
  const [ref, inView] = useInView({ threshold: 0.15 })

  return (
    <section id={id} className={`scroll-mt-24 py-24 sm:py-28 lg:py-32 ${className}`}>
      <div className="shell">
        <div ref={ref} className="flex items-center gap-3">
          <span
            className="font-mono text-[11px] tracking-[0.2em] text-violet transition-all duration-700"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'none' : 'translateX(-10px)',
            }}
          >
            {index}
          </span>
          <span
            className="label transition-all duration-700 delay-100"
            style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(-10px)' }}
          >
            {eyebrow}
          </span>
          <span
            className="h-px flex-1 origin-left transition-transform duration-1000 delay-150"
            style={{
              transform: inView ? 'scaleX(1)' : 'scaleX(0)',
              background:
                'linear-gradient(90deg, var(--color-violet), var(--color-line) 55%, transparent)',
            }}
          />
        </div>

        <div className="mt-6 max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-[-0.025em] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            {kinetic ? <Kinetic text={title} stagger={14} /> : title}
          </h2>
          {lede && (
            <Reveal delay={120}>
              <p className="mt-5 text-base leading-relaxed text-body sm:text-lg">{lede}</p>
            </Reveal>
          )}
        </div>

        <div className="mt-14 sm:mt-16">{children}</div>
      </div>
    </section>
  )
}
