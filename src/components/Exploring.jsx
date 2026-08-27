import { useState } from 'react'
import { exploring } from '../data/resume'
import Reveal from './Reveal'
import Section from './Section'

/**
 * Deliberately different rhythm from the card sections: large stacked type,
 * centred, with pulsing plus signs between the items.
 */
export default function Exploring() {
  const [active, setActive] = useState(0)

  return (
    <Section
      id="exploring"
      index="06"
      eyebrow="Direction"
      title="Currently exploring"
      lede="Where the data engineering work is taking me next. Machine Learning Engineering is a continuation of the same discipline, not a departure from it."
      className="border-t border-line-soft"
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <ul className="flex flex-col items-start gap-1">
            {exploring.map((item, i) => (
              <li key={item.name} className="w-full">
                <Reveal delay={i * 90}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-describedby="exploring-detail"
                    aria-pressed={active === i}
                    className="group block w-full text-left"
                  >
                    <span
                      className="block text-[clamp(1.6rem,4.4vw,2.75rem)] font-semibold leading-[1.15] tracking-[-0.02em] transition-colors duration-300"
                      style={{
                        color: active === i ? 'var(--color-bright)' : 'var(--color-muted)',
                      }}
                    >
                      {item.name}
                    </span>
                  </button>
                </Reveal>

                {i < exploring.length - 1 && (
                  <span
                    aria-hidden
                    className="my-1 inline-block font-mono text-lg text-violet"
                    style={{
                      animation: `shimmer ${2.4 + i * 0.35}s ease-in-out infinite`,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  >
                    +
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={140}>
            <div
              id="exploring-detail"
              aria-live="polite"
              className="relative overflow-hidden rounded-2xl border border-line bg-raised/50 p-6"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full opacity-25 blur-3xl"
                style={{ background: 'var(--color-violet)' }}
              />
              <p className="relative label text-violet">Why</p>
              <h3 className="relative mt-3 font-mono text-base text-bright">
                {exploring[active].name}
              </h3>
              <p className="relative mt-3 text-sm leading-relaxed text-body">
                {exploring[active].note}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
