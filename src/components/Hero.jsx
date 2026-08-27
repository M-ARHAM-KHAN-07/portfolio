import { profile } from '../data/resume'
import { useMagnet } from '../lib/interactions'
import HeroSystem from './HeroSystem'
import Kinetic from './Kinetic'
import Reveal from './Reveal'
import { ArrowDownIcon, ArrowRightIcon, GitHubIcon, LinkedInIcon, LocationIcon } from './Icons'

function MagneticLink({ href, className, children, ...rest }) {
  const magnet = useMagnet({ strength: 0.28 })
  return (
    <a
      ref={magnet.ref}
      href={href}
      onMouseMove={magnet.onMouseMove}
      onMouseLeave={magnet.onMouseLeave}
      className={`magnet ${className}`}
      {...rest}
    >
      {children}
    </a>
  )
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[94svh] items-center overflow-hidden pt-28 pb-16 sm:pt-32"
    >
      {/* Ambient wash, violet top-right into cyan lower-left */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(46rem 30rem at 78% 6%, rgba(139,92,246,0.16), transparent 62%), radial-gradient(38rem 26rem at 6% 62%, rgba(34,211,238,0.08), transparent 62%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-base"
      />

      <div className="shell relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Copy */}
          <div className="lg:col-span-6 xl:col-span-7">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="relative flex h-1.5 w-1.5">
                  <span
                    className="absolute inline-flex h-full w-full rounded-full bg-lime"
                    style={{ animation: 'ring-out 2.4s ease-out infinite' }}
                  />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime" />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-violet">
                  {profile.role}
                </span>
              </div>
            </Reveal>

            <h1 className="mt-6 text-[clamp(2.1rem,6vw,4.25rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-bright">
              <Kinetic text="Muhammad" as="span" className="block" stagger={30} />
              {/* Whole-line reveal, not per-character: a transformed child cannot
                  be painted through the parent's background-clip: text */}
              <Reveal delay={300}>
                <span className="block bg-gradient-to-r from-violet via-violet to-cyan bg-clip-text text-transparent">
                  Arham Khan
                </span>
              </Reveal>
            </h1>

            <Reveal delay={520}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-body">{profile.tagline}</p>
            </Reveal>

            <Reveal delay={580}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <MagneticLink href="#projects" className="btn btn-primary group">
                  View projects
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </MagneticLink>

                <MagneticLink
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="GitHub profile"
                  className="btn btn-ghost px-4 sm:px-5"
                >
                  <GitHubIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">GitHub</span>
                </MagneticLink>

                <MagneticLink
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="LinkedIn profile"
                  className="btn btn-ghost px-4 sm:px-5"
                >
                  <LinkedInIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">LinkedIn</span>
                </MagneticLink>
              </div>
            </Reveal>

            <Reveal delay={640}>
              <p className="mt-8 inline-flex items-center gap-2 font-mono text-xs text-muted">
                <LocationIcon className="h-4 w-4" />
                {profile.location}
              </p>
            </Reveal>
          </div>

          {/* Living system */}
          <Reveal delay={300} className="lg:col-span-6 xl:col-span-5">
            <div className="mx-auto max-w-[30rem] lg:max-w-none">
              <HeroSystem />
              <p className="mt-4 text-center font-mono text-[11px] text-muted lg:text-right">
                live stack, tap a node
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 text-muted transition-colors hover:text-violet lg:block"
        style={{ animation: 'drift 3.2s ease-in-out infinite' }}
      >
        <ArrowDownIcon className="h-5 w-5" />
      </a>
    </section>
  )
}
