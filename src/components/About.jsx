import { about, education, exploring, stats } from '../data/resume'
import Counter from './Counter'
import Reveal from './Reveal'
import Section from './Section'

export default function About() {
  return (
    <Section
      id="about"
      index="01"
      eyebrow="About"
      title={about.lead}
      className="border-t border-line"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
        {/* Prose */}
        <div className="space-y-5 lg:col-span-7">
          {about.paragraphs.map((para, i) => (
            <Reveal key={i} delay={i * 70}>
              <p className="leading-relaxed text-body">{para}</p>
            </Reveal>
          ))}

          <Reveal delay={220}>
            <div className="panel mt-8 p-5 sm:p-6">
              <p className="label">Education</p>
              <h3 className="mt-3 text-base font-medium text-bright">{education.degree}</h3>
              <p className="mt-1 text-sm text-body">{education.school}</p>
              <p className="mt-3 font-mono text-xs text-accent">GPA {education.gpa}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {education.coursework.map((c) => (
                  <li key={c} className="tag">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Measured outcomes */}
        <div className="lg:col-span-5">
          <Reveal delay={100}>
            <p className="label mb-4">Measured outcomes</p>
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="panel panel-hover p-4 sm:p-5">
                  <p className="font-mono text-2xl font-semibold text-accent sm:text-3xl">
                    <Counter
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      decimals={stat.decimals}
                    />
                  </p>
                  <p className="mt-2 text-xs leading-snug text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-8">
              <p className="label mb-4">Currently exploring</p>
              <ul className="space-y-2">
                {exploring.map((item) => (
                  <li
                    key={item.name}
                    className="group panel panel-hover flex items-start gap-3 p-3.5"
                  >
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-bright">{item.name}</span>
                      <span className="mt-0.5 block text-xs leading-snug text-muted">
                        {item.note}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
