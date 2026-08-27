import { profile, stats } from '../data/resume'
import {
  ArrowUpRightIcon,
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
  LocationIcon,
  MailIcon,
} from './Icons'
import Reveal from './Reveal'

const resumeHref = `${import.meta.env.BASE_URL}${profile.resume}`

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-24">
      <div className="section-shell">
        <Reveal>
          {/* Fluid size keeps the full name on a single line from 320px up to desktop */}
          <h1 className="whitespace-nowrap text-[clamp(1.6rem,7vw,4rem)] font-extrabold leading-[1.1] tracking-tight text-white">
            {profile.name.split(' ')[0]}{' '}
            <span className="bg-gradient-to-r from-accent-400 via-sky-300 to-accent-500 bg-clip-text text-transparent">
              {profile.name.split(' ').slice(1).join(' ')}
            </span>
          </h1>
        </Reveal>

        <Reveal delay={60}>
          <p className="mt-6 max-w-2xl font-mono text-sm text-accent-400 sm:text-base">
            {profile.role} · {profile.headline}
          </p>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            {profile.summary}
          </p>
        </Reveal>

        {/* Primary stack */}
        <Reveal delay={180}>
          <ul className="mt-8 flex flex-wrap gap-2">
            {profile.heroStack.map((tech) => (
              <li key={tech} className="chip chip-accent px-3 py-1.5 text-xs">
                {tech}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Quick links */}
        <Reveal delay={240}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-2 rounded-xl bg-accent-500 px-5 py-3 text-sm font-semibold text-ink-950 transition-all hover:bg-accent-400 hover:shadow-lg hover:shadow-accent-500/20"
            >
              <MailIcon className="h-4 w-4" />
              Email me
              <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href={resumeHref}
              download
              className="inline-flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.03] px-5 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-accent-400/40 hover:text-white"
            >
              <DownloadIcon className="h-4 w-4" />
              Resume
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub profile"
              className="rounded-xl border border-white/[0.1] bg-white/[0.03] p-3 text-slate-300 transition-colors hover:border-accent-400/40 hover:text-white"
            >
              <GitHubIcon className="h-[18px] w-[18px]" />
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn profile"
              className="rounded-xl border border-white/[0.1] bg-white/[0.03] p-3 text-slate-300 transition-colors hover:border-accent-400/40 hover:text-white"
            >
              <LinkedInIcon className="h-[18px] w-[18px]" />
            </a>

            <span className="inline-flex items-center gap-1.5 pl-1 text-sm text-slate-500">
              <LocationIcon className="h-4 w-4" />
              {profile.location}
            </span>
          </div>
        </Reveal>

        {/* Stat strip */}
        <Reveal delay={300}>
          <dl className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] sm:mt-20 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-ink-850/80 px-5 py-6 backdrop-blur-sm sm:px-6">
                <dt className="font-mono text-2xl font-semibold text-accent-400 sm:text-3xl">
                  {stat.value}
                </dt>
                <dd className="mt-1.5 text-xs leading-snug text-slate-400 sm:text-sm">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
