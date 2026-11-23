import { useEffect, useState } from 'react'
import { profile } from '../data/resume'

const links = [
  { href: '#projects', label: 'Projects' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [active, setActive] = useState('')

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const seen = new Map()
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(e.target.id, e.isIntersecting))
        const current = links.find((l) => seen.get(l.href.slice(1)))
        setActive(current ? current.href : '')
      },
      { rootMargin: '-35% 0px -55% 0px' },
    )
    links.forEach((l) => {
      const el = document.getElementById(l.href.slice(1))
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <header className="nav">
      <span className="progress" aria-hidden="true" />
      <nav className="wrap nav-inner" aria-label="Primary">
        <a href="#top" className="nav-name">
          {profile.name}
        </a>
        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="ulink" aria-current={active === l.href ? 'true' : undefined}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
