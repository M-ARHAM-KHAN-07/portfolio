import { useEffect, useState } from 'react'
import { navLinks, profile } from '../data/resume'
import { CloseIcon, GitHubIcon, LinkedInIcon, MenuIcon } from './Icons'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/[0.07] bg-ink-950/80 backdrop-blur-lg'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="section-shell flex h-16 items-center justify-between gap-4 sm:h-18">
        <a
          href="#top"
          className="group flex items-center gap-2.5 font-mono text-sm font-semibold tracking-tight text-white"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-accent-400/30 bg-accent-500/10 text-accent-400 transition-colors group-hover:bg-accent-500/20">
            AK
          </span>
          <span className="hidden sm:inline">arham<span className="text-accent-400">.</span>dev</span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-white/[0.05] hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub profile"
            className="hidden rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/[0.05] hover:text-white sm:block"
          >
            <GitHubIcon className="h-[18px] w-[18px]" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn profile"
            className="hidden rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/[0.05] hover:text-white sm:block"
          >
            <LinkedInIcon className="h-[18px] w-[18px]" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="hidden rounded-lg border border-accent-400/30 bg-accent-500/10 px-4 py-2 text-sm font-semibold text-accent-400 transition-colors hover:bg-accent-500/20 md:inline-block"
          >
            Get in touch
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="rounded-lg p-2 text-slate-300 transition-colors hover:bg-white/[0.05] hover:text-white md:hidden"
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${open ? '' : 'pointer-events-none'}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-ink-950/80 backdrop-blur-sm transition-opacity duration-300 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute inset-x-0 top-0 origin-top border-b border-white/[0.07] bg-ink-900 px-5 pb-8 pt-5 shadow-2xl transition-all duration-300 ${
            open ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          <div className="mb-6 flex items-center justify-between">
            <span className="font-mono text-sm font-semibold text-white">
              arham<span className="text-accent-400">.</span>dev
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="rounded-lg p-2 text-slate-300 hover:bg-white/[0.05] hover:text-white"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/[0.05] py-3.5 text-lg font-medium text-slate-300 transition-colors hover:text-accent-400"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href={`mailto:${profile.email}`}
            onClick={() => setOpen(false)}
            className="mt-6 block rounded-xl border border-accent-400/30 bg-accent-500/10 py-3 text-center text-sm font-semibold text-accent-400"
          >
            Get in touch
          </a>
        </div>
      </div>
    </header>
  )
}
