import { profile } from '../data/resume'
import {
  ArrowUpRightIcon,
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
} from './Icons'
import Reveal from './Reveal'

const resumeHref = `${import.meta.env.BASE_URL}${profile.resume}`

const channels = [
  {
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    Icon: MailIcon,
    external: false,
  },
  {
    label: 'LinkedIn',
    value: profile.linkedinHandle,
    href: profile.linkedin,
    Icon: LinkedInIcon,
    external: true,
  },
  {
    label: 'GitHub',
    value: profile.githubHandle,
    href: profile.github,
    Icon: GitHubIcon,
    external: true,
  },
]

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-line py-24 sm:py-28 lg:py-32">
      <div className="shell">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="label text-accent">06</span>
            <span className="label">Contact</span>
            <span className="h-px flex-1 bg-line" />
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="text-3xl font-semibold tracking-[-0.02em] sm:text-4xl lg:text-5xl lg:leading-[1.08]">
                Let us build something meaningful.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-body sm:text-lg">
                Whether it is a data platform, an analytics pipeline or an intelligent
                application, I would like to hear about it. Email is the fastest way to reach me.
              </p>
            </Reveal>

            <Reveal delay={80}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={`mailto:${profile.email}`} className="btn btn-primary group">
                  <MailIcon className="h-4 w-4" />
                  {profile.email}
                  <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a href={resumeHref} download className="btn btn-ghost">
                  <DownloadIcon className="h-4 w-4" />
                  Download resume
                </a>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <ul className="mt-10 grid gap-3 sm:grid-cols-3">
                {channels.map(({ label, value, href, Icon, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                      className="panel panel-hover group flex items-center gap-3 p-4"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-white/[0.02] text-muted transition-colors group-hover:border-accent/35 group-hover:text-accent">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="label block">{label}</span>
                        <span className="mt-1 block truncate font-mono text-xs text-body transition-colors group-hover:text-bright">
                          {value}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Engineering activity: links out, states no numbers it cannot verify */}
          <div className="lg:col-span-5">
            <Reveal delay={100}>
              <div className="panel p-6">
                <p className="label">Engineering activity</p>

                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group mt-5 flex items-center gap-4"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-line bg-white/[0.03] text-bright transition-colors group-hover:border-accent/40 group-hover:text-accent">
                    <GitHubIcon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-sm text-bright">
                      {profile.githubHandle}
                    </span>
                    <span className="mt-0.5 flex items-center gap-1 text-xs text-muted transition-colors group-hover:text-accent">
                      View profile and repositories
                      <ArrowUpRightIcon className="h-3 w-3" />
                    </span>
                  </span>
                </a>

                <div className="rule my-6" />

                <p className="text-sm leading-relaxed text-body">
                  Most of my production work lives in private client repositories, so the public
                  profile is only part of the picture. The case studies above describe what those
                  systems actually did.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="tag">Open to Data Engineering roles</span>
                  <span className="tag">{profile.location}</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
