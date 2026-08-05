import { profile } from '../data/resume'
import { ArrowUpRightIcon, DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from './Icons'
import Reveal from './Reveal'

const resumeHref = `${import.meta.env.BASE_URL}${profile.resume}`

const links = [
  {
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    Icon: MailIcon,
    external: false,
  },
  {
    label: 'GitHub',
    value: profile.githubHandle,
    href: profile.github,
    Icon: GitHubIcon,
    external: true,
  },
  {
    label: 'LinkedIn',
    value: profile.linkedinHandle,
    href: profile.linkedin,
    Icon: LinkedInIcon,
    external: true,
  },
]

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 py-20 sm:py-24 lg:py-28">
      <div className="section-shell">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-850/70 px-6 py-14 backdrop-blur-sm sm:px-12 sm:py-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 h-56 w-[36rem] -translate-x-1/2 rounded-full bg-accent-500/15 blur-3xl"
            />

            <div className="relative mx-auto max-w-2xl text-center">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent-400">
                Contact
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Let's build something reliable
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-400">
                Open to Data Engineering roles and pipeline / analytics consulting. The fastest way
                to reach me is email — I reply to everything.
              </p>

              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="group inline-flex items-center gap-2 rounded-xl bg-accent-500 px-6 py-3 text-sm font-semibold text-ink-950 transition-all hover:bg-accent-400 hover:shadow-lg hover:shadow-accent-500/20"
                >
                  <MailIcon className="h-4 w-4" />
                  {profile.email}
                  <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href={resumeHref}
                  download
                  className="inline-flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.03] px-6 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-accent-400/40 hover:text-white"
                >
                  <DownloadIcon className="h-4 w-4" />
                  Download resume
                </a>
              </div>
            </div>

            <div className="relative mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] sm:grid-cols-3">
              {links.map(({ label, value, href, Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                  className="group flex items-center gap-3.5 bg-ink-850 px-5 py-5 transition-colors hover:bg-ink-800"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate-400 transition-colors group-hover:border-accent-400/30 group-hover:text-accent-400">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                      {label}
                    </span>
                    <span className="block truncate text-sm text-slate-300 transition-colors group-hover:text-white">
                      {value}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
