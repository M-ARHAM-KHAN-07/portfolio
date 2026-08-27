import { profile } from '../data/resume'
import HeroCanvas from './HeroCanvas'
import Reveal from './Reveal'
import {
  ArrowDownIcon,
  ArrowRightIcon,
  GitHubIcon,
  LinkedInIcon,
  LocationIcon,
} from './Icons'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[92svh] items-center overflow-hidden pt-28 pb-20 sm:pt-32"
    >
      {/* Layered backdrop: node field, then a soft accent wash, then a floor fade */}
      <HeroCanvas />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(50rem 32rem at 70% 8%, rgba(56,189,248,0.10), transparent 62%), radial-gradient(40rem 28rem at 8% 30%, rgba(56,189,248,0.05), transparent 60%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-base"
      />

      <div className="shell relative">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="relative flex h-1.5 w-1.5">
              <span
                className="absolute inline-flex h-full w-full rounded-full bg-accent"
                style={{ animation: 'pulse-ring 2.4s ease-out infinite' }}
              />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="label text-accent">{profile.role}</span>
          </div>
        </Reveal>

        <Reveal delay={70}>
          <h1 className="mt-6 text-[clamp(2.25rem,7.2vw,5.25rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-bright">
            {profile.name}
          </h1>
        </Reveal>

        <Reveal delay={140}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-body sm:text-xl">
            {profile.tagline}
          </p>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            {profile.summary}
          </p>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn btn-primary group">
              View projects
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub profile"
              className="btn btn-ghost px-4 sm:px-5"
            >
              <GitHubIcon className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn profile"
              className="btn btn-ghost px-4 sm:px-5"
            >
              <LinkedInIcon className="h-4 w-4" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3">
            <span className="inline-flex items-center gap-2 font-mono text-xs text-muted">
              <LocationIcon className="h-4 w-4" />
              {profile.location}
            </span>
            <span className="hidden h-4 w-px bg-line sm:block" />
            <ul className="flex flex-wrap gap-2">
              {profile.heroStack.map((tech) => (
                <li key={tech} className="tag">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-muted transition-colors hover:text-accent lg:block"
        style={{ animation: 'drift 3.2s ease-in-out infinite' }}
      >
        <ArrowDownIcon className="h-5 w-5" />
      </a>
    </section>
  )
}
