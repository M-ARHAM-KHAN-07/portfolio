import { navLinks, profile } from '../data/resume'
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons'

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-sm text-bright">
            arham<span className="text-violet">.</span>dev
          </p>
          <p className="mt-1.5 text-xs text-muted">
            {profile.name} · {profile.role} · {profile.location}
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs text-muted transition-colors hover:text-violet"
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
            className="rounded-lg border border-line p-2 text-muted transition-colors hover:border-violet/35 hover:text-violet"
          >
            <GitHubIcon className="h-4 w-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn profile"
            className="rounded-lg border border-line p-2 text-muted transition-colors hover:border-violet/35 hover:text-violet"
          >
            <LinkedInIcon className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Send an email"
            className="rounded-lg border border-line p-2 text-muted transition-colors hover:border-violet/35 hover:text-violet"
          >
            <MailIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
