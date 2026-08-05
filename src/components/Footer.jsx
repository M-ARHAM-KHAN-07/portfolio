import { navLinks, profile } from '../data/resume'
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons'

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.07]">
      <div className="section-shell flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-sm font-semibold text-white">
            arham<span className="text-accent-400">.</span>dev
          </p>
          <p className="mt-1.5 text-xs text-slate-500">
            © {new Date().getFullYear()} {profile.name} · {profile.location}
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs text-slate-500 transition-colors hover:text-accent-400"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex gap-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub profile"
            className="rounded-lg border border-white/[0.08] p-2 text-slate-400 transition-colors hover:border-accent-400/30 hover:text-accent-400"
          >
            <GitHubIcon className="h-4 w-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn profile"
            className="rounded-lg border border-white/[0.08] p-2 text-slate-400 transition-colors hover:border-accent-400/30 hover:text-accent-400"
          >
            <LinkedInIcon className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Send an email"
            className="rounded-lg border border-white/[0.08] p-2 text-slate-400 transition-colors hover:border-accent-400/30 hover:text-accent-400"
          >
            <MailIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
