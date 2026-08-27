import { about, education, stats } from '../data/resume'
import { useTilt } from '../lib/interactions'
import Counter from './Counter'
import Reveal from './Reveal'
import Section from './Section'
import Terminal from './Terminal'

/** One measured outcome, rendered large. The number counts up on entry. */
function Moment({ stat, index }) {
  const tilt = useTilt({ max: 4, lift: -3 })

  return (
    <Reveal delay={index * 80} className="h-full">
      <div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        className="tilt group relative h-full overflow-hidden rounded-2xl border border-line bg-raised/50 p-5 sm:p-6"
      >
        {/* Accent bloom that only appears under the cursor */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: 'var(--color-violet)' }}
        />

        <p className="relative font-mono text-[2rem] font-semibold leading-none tracking-tight text-bright sm:text-[2.5rem]">
          <Counter
            value={stat.value}
            prefix={stat.prefix}
            suffix={stat.suffix}
            decimals={stat.decimals}
          />
        </p>
        <p className="relative mt-3 text-sm font-medium text-body">{stat.label}</p>
        <p className="relative mt-1 font-mono text-[11px] text-muted">{stat.context}</p>

        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
          style={{ background: 'linear-gradient(90deg, var(--color-violet), var(--color-cyan))' }}
        />
      </div>
    </Reveal>
  )
}

export default function About() {
  return (
    <Section
      id="about"
      index="01"
      eyebrow="About"
      title={about.lead}
      className="border-t border-line-soft"
    >
      {/* Editorial: wide prose column, education pulled to the side */}
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="space-y-5 lg:col-span-7">
          {about.paragraphs.map((para, i) => (
            <Reveal key={i} delay={i * 70}>
              <p className={i === 0 ? 'text-lg leading-relaxed text-body' : 'leading-relaxed text-body'}>
                {para}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={120}>
            <div className="panel p-5 sm:p-6">
              <p className="label">Education</p>
              <h3 className="mt-3 text-base font-medium text-bright">{education.degree}</h3>
              <p className="mt-1 text-sm text-body">{education.school}</p>
              <p className="mt-3 font-mono text-xs text-cyan">GPA {education.gpa}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {education.coursework.map((c) => (
                  <li key={c} className="tag">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-4">
              <p className="label mb-3">Poke around</p>
              <Terminal />
            </div>
          </Reveal>
        </div>
      </div>

      {/* Engineering moments */}
      <div className="mt-16 sm:mt-20">
        <Reveal>
          <div className="mb-6 flex items-center gap-3">
            <span className="label">Measured outcomes</span>
            <span className="h-px flex-1 bg-line" />
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Moment key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </Section>
  )
}
