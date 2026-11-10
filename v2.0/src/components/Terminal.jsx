import { useEffect, useRef, useState } from 'react'
import { exploring, profile, projects, stackGroups } from '../data/resume'

const BOOT = [
  { kind: 'cmd', text: 'whoami' },
  { kind: 'out', text: `${profile.name}` },
  { kind: 'dim', text: `${profile.role} · ${profile.location}` },
  { kind: 'hint', text: "type 'help' for commands" },
]

/** Command table. Each returns an array of output lines. */
function run(input) {
  const cmd = input.trim().toLowerCase()

  switch (cmd) {
    case '':
      return []

    case 'help':
      return [
        { kind: 'out', text: 'available commands' },
        { kind: 'dim', text: 'whoami     who is behind this site' },
        { kind: 'dim', text: 'about      the short version' },
        { kind: 'dim', text: 'projects   list case studies' },
        { kind: 'dim', text: 'stack      technologies by group' },
        { kind: 'dim', text: 'exploring  where I am heading next' },
        { kind: 'dim', text: 'contact    how to reach me' },
        { kind: 'dim', text: 'clear      reset the terminal' },
      ]

    case 'whoami':
      return [
        { kind: 'out', text: profile.name },
        { kind: 'dim', text: `${profile.role} · ${profile.location}` },
      ]

    case 'about':
      return [
        { kind: 'out', text: profile.summary },
        { kind: 'dim', text: profile.tagline },
      ]

    case 'projects':
      return [
        { kind: 'out', text: `${projects.length} case studies` },
        ...projects.map((p) => ({
          kind: 'dim',
          text: `- ${p.title}${p.client ? ` (${p.client})` : ''}`,
        })),
        { kind: 'hint', text: 'open any card above for the full breakdown' },
      ]

    case 'stack':
      return stackGroups.flatMap((g) => [
        { kind: 'out', text: g.title.toLowerCase() },
        { kind: 'dim', text: g.items.map((i) => i.name).join(', ') },
      ])

    case 'exploring':
      return [
        { kind: 'out', text: 'currently exploring' },
        ...exploring.map((e) => ({ kind: 'dim', text: `- ${e.name}` })),
      ]

    case 'contact':
      return [
        { kind: 'out', text: profile.email },
        { kind: 'dim', text: profile.linkedin },
        { kind: 'dim', text: profile.github },
      ]

    case 'sudo':
    case 'sudo su':
      return [{ kind: 'hint', text: 'nice try. this pipeline runs least-privilege.' }]

    case 'ls':
      return [{ kind: 'dim', text: 'about  experience  projects  pipeline  stack  contact' }]

    default:
      return [{ kind: 'err', text: `command not found: ${cmd}` }, { kind: 'hint', text: "try 'help'" }]
  }
}

const TONE = {
  cmd: 'text-violet',
  out: 'text-bright',
  dim: 'text-body',
  hint: 'text-muted',
  err: 'text-lime',
}

export default function Terminal() {
  const [lines, setLines] = useState(BOOT)
  const [value, setValue] = useState('')
  const [history, setHistory] = useState([])
  const [histIndex, setHistIndex] = useState(-1)
  const logRef = useRef(null)
  const inputRef = useRef(null)

  // Keep the newest output in view without scrolling the page itself
  useEffect(() => {
    const el = logRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  const submit = (e) => {
    e.preventDefault()
    const entry = value
    const cmd = entry.trim().toLowerCase()

    if (cmd === 'clear') {
      setLines([])
      setValue('')
      setHistory((h) => [entry, ...h])
      setHistIndex(-1)
      return
    }

    setLines((prev) => [...prev, { kind: 'cmd', text: entry }, ...run(entry)])
    if (entry.trim()) setHistory((h) => [entry, ...h])
    setHistIndex(-1)
    setValue('')
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(histIndex + 1, history.length - 1)
      if (next >= 0) {
        setHistIndex(next)
        setValue(history[next])
      }
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = histIndex - 1
      setHistIndex(next)
      setValue(next >= 0 ? history[next] : '')
    }
  }

  return (
    <div className="panel overflow-hidden">
      {/* Chrome */}
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-violet/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-cyan/50" />
        <span className="h-2.5 w-2.5 rounded-full bg-lime/50" />
        <span className="ml-2 font-mono text-[11px] text-muted">arham@portfolio: ~</span>
      </div>

      <div
        ref={logRef}
        className="h-56 overflow-y-auto px-4 py-3 font-mono text-xs leading-relaxed"
        aria-live="polite"
      >
        {lines.map((line, i) => (
          <p key={i} className={`${TONE[line.kind]} break-words`}>
            {line.kind === 'cmd' && <span className="text-muted">$ </span>}
            {line.text}
          </p>
        ))}
      </div>

      <form onSubmit={submit} className="flex items-center gap-2 border-t border-line px-4 py-3">
        <label htmlFor="terminal-input" className="font-mono text-xs text-violet">
          $
        </label>
        <input
          id="terminal-input"
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          spellCheck="false"
          autoComplete="off"
          placeholder="help"
          aria-label="Terminal input. Type help for available commands."
          className="w-full bg-transparent font-mono text-xs text-bright outline-none placeholder:text-muted/60"
        />
        <span
          aria-hidden
          className="h-3.5 w-[7px] shrink-0 bg-cyan"
          style={{ animation: 'caret 1.1s step-end infinite' }}
        />
      </form>
    </div>
  )
}
