import { education, experience } from '../data/resume'
import { CheckIcon } from './Icons'
import Reveal from './Reveal'
import Section from './Section'

function TimelineItem({ job, index }) {
  return (
    <Reveal delay={index * 80}>
      <article className="relative pl-8 sm:pl-12">
        {/* Rail node */}
        <span
          className={`absolute left-0 top-2 grid h-[18px] w-[18px] -translate-x-1/2 place-items-center rounded-full border-2 ${
            job.current ? 'border-accent-400 bg-ink-900' : 'border-slate-600 bg-ink-900'
          }`}
        >
          {job.current && <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />}
        </span>

        <div className="card-surface p-5 sm:p-7">
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white sm:text-xl">{job.role}</h3>
              <p className="mt-0.5 text-sm font-medium text-accent-400">{job.company}</p>
            </div>
            <span className="shrink-0 font-mono text-xs text-slate-500 sm:pt-1">{job.period}</span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-slate-400">{job.blurb}</p>

          <ul className="mt-5 space-y-3">
            {job.highlights.map((item) => (
              <li key={item.text} className="flex gap-3">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent-400/70" />
                <p className="text-sm leading-relaxed text-slate-300">
                  {item.text}
                  {item.metric && (
                    <span className="ml-2 inline-block rounded border border-emerald-400/25 bg-emerald-400/10 px-1.5 py-0.5 font-mono text-[11px] leading-none text-emerald-300">
                      {item.metric}
                    </span>
                  )}
                </p>
              </li>
            ))}
          </ul>

          <ul className="mt-6 flex flex-wrap gap-2 border-t border-white/[0.06] pt-5">
            {job.stack.map((tech) => (
              <li key={tech} className="chip">
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Reveal>
  )
}

export default function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I've built things"
      lede="From raw API extraction through orchestrated transformation to the dashboard an executive opens on Monday morning."
    >
      <div className="relative space-y-8 border-l border-white/[0.08] sm:space-y-10">
        {experience.map((job, i) => (
          <TimelineItem key={job.company} job={job} index={i} />
        ))}

        {/* Education as the final rail node */}
        <Reveal delay={experience.length * 80}>
          <article className="relative pl-8 sm:pl-12">
            <span className="absolute left-0 top-2 h-[18px] w-[18px] -translate-x-1/2 rounded-full border-2 border-slate-600 bg-ink-900" />
            <div className="card-surface p-5 sm:p-7">
              <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white sm:text-xl">
                    {education.degree}
                  </h3>
                  <p className="mt-0.5 text-sm font-medium text-accent-400">{education.school}</p>
                </div>
                <span className="shrink-0 font-mono text-xs text-slate-500 sm:pt-1">
                  {education.period}
                </span>
              </div>

              <p className="mt-4 font-mono text-sm text-slate-300">GPA {education.gpa}</p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {education.coursework.map((course) => (
                  <li key={course} className="chip">
                    {course}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </Reveal>
      </div>
    </Section>
  )
}
