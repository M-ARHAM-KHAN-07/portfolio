import { useEffect, useRef, useState } from 'react'
import { navLinks, profile } from '../data/resume'
import { CloseIcon, DownloadIcon, MenuIcon } from './Icons'

const resumeHref = `${import.meta.env.BASE_URL}${profile.resume}`

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('#home')
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Scroll spy: highlight whichever section owns the upper third of the viewport */
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean)
    if (!sections.length || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(`#${visible.target.id}`)
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.25, 0.5] },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={`transition-all duration-300 ${
            scrolled
              ? 'border-b border-line bg-base/80 backdrop-blur-xl'
              : 'border-b border-transparent'
          }`}
        >
          <nav
            aria-label="Primary"
            className={`shell flex items-center justify-between gap-4 transition-all duration-300 ${
              scrolled ? 'h-14' : 'h-16 sm:h-20'
            }`}
          >
            <a
              href="#home"
              className="group flex items-center gap-2.5"
              aria-label="Back to top"
            >
              <span className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-white/[0.03] font-mono text-[11px] font-semibold text-violet transition-colors group-hover:border-violet/40">
                AK
              </span>
              <span className="hidden font-mono text-sm font-medium text-bright sm:inline">
                arham<span className="text-violet">.</span>dev
              </span>
            </a>

            <div className="hidden items-center gap-0.5 md:flex">
              {navLinks.map((link) => {
                const isActive = active === link.href
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative rounded-lg px-3.5 py-2 text-sm transition-colors ${
                      isActive ? 'text-bright' : 'text-muted hover:text-body'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute inset-x-3.5 -bottom-px h-px bg-violet" />
                    )}
                  </a>
                )
              })}
            </div>

            <div className="flex items-center gap-2">
              <a
                href={resumeHref}
                download
                className="hidden items-center gap-2 rounded-lg border border-line bg-white/[0.02] px-3.5 py-2 font-mono text-xs text-body transition-colors hover:border-violet/40 hover:text-bright sm:inline-flex"
              >
                <DownloadIcon className="h-3.5 w-3.5" />
                Resume
              </a>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                aria-controls="mobile-nav"
                className="rounded-lg border border-line p-2 text-body transition-colors hover:text-bright md:hidden"
              >
                {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile sheet */}
      <div
        id="mobile-nav"
        className={`fixed inset-0 z-40 md:hidden ${open ? '' : 'pointer-events-none'}`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-void/85 backdrop-blur-sm transition-opacity duration-300 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          ref={panelRef}
          className={`absolute inset-x-0 top-0 border-b border-line bg-base px-5 pb-8 pt-24 transition-transform duration-300 ${
            open ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <ul className="flex flex-col">
            {navLinks.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 border-b border-line py-4 text-xl text-bright transition-colors hover:text-violet"
                >
                  <span className="font-mono text-[11px] text-muted">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={resumeHref}
            download
            onClick={() => setOpen(false)}
            className="btn btn-ghost mt-6 w-full"
          >
            <DownloadIcon className="h-4 w-4" />
            Download resume
          </a>
        </div>
      </div>
    </>
  )
}
