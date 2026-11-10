import { useEffect, useRef, useState } from 'react'
import './DataRescue.css'

const fresh = () => ({ status: 'ready', score: 0, remaining: 20, y: 50, packets: [], elapsed: 0, spawn: .65, id: 0, shot: null })

export default function DataRescue() {
  const model = useRef(fresh())
  const keys = useRef({})
  const arena = useRef(null)
  const [view, setView] = useState(fresh)
  const [best, setBest] = useState(0)
  const [open, setOpen] = useState(false)
  const sync = () => setView({ ...model.current, packets: [...model.current.packets] })
  const restart = () => { model.current = { ...fresh(), status: 'playing' }; keys.current = {}; sync(); arena.current?.focus() }
  const pause = () => { if (model.current.status === 'playing') model.current.status = 'paused'; else if (model.current.status === 'paused') model.current.status = 'playing'; keys.current = {}; sync() }
  const shoot = () => {
    const g = model.current
    if (g.status !== 'playing') return
    const target = g.packets.filter(p => Math.abs(p.y - g.y) < 12).sort((a,b) => a.x-b.x)[0]
    g.shot = { y: g.y, x: target?.x ?? 94, life: .18 }
    if (target) { g.packets = g.packets.filter(p => p.id !== target.id); g.score++; setBest(b => Math.max(b, g.score)) }
    sync()
  }
  useEffect(() => {
    let previous = performance.now()
    const timer = setInterval(() => {
      const now = performance.now(), dt = Math.min((now-previous)/1000,.06); previous=now
      const g = model.current
      if (g.status !== 'playing') return
      g.elapsed += dt; g.remaining = Math.max(0,20-g.elapsed)
      g.y = Math.max(12,Math.min(86,g.y + ((keys.current.down ? 1 : 0)-(keys.current.up ? 1 : 0))*80*dt))
      g.spawn -= dt
      if (g.spawn <= 0) { g.packets.push({ id:g.id++, x:102, y:18+Math.random()*62 }); g.spawn=.85 }
      g.packets = g.packets.map(p=>({...p,x:p.x-dt*19})).filter(p=>p.x>8)
      if (g.shot) { g.shot.life -= dt; if(g.shot.life<=0) g.shot=null }
      if (g.remaining<=0) { g.status='finished'; keys.current={} }
      sync()
    }, 30)
    const blur = () => { if(model.current.status==='playing'){model.current.status='paused';keys.current={};sync()} }
    window.addEventListener('blur',blur)
    document.addEventListener('visibilitychange',blur)
    return () => {clearInterval(timer);window.removeEventListener('blur',blur);document.removeEventListener('visibilitychange',blur)}
  }, [])
  const key = (e, down) => {
    const k=e.key.toLowerCase()
    if(['arrowup','arrowdown','w','s',' '].includes(k)) e.preventDefault()
    if(k==='arrowup'||k==='w')keys.current.up=down
    if(k==='arrowdown'||k==='s')keys.current.down=down
    if(k===' '&&down&&!e.repeat)shoot()
    if(k==='escape'&&down)pause()
  }
  const move = (direction, e) => { e.preventDefault(); keys.current[direction]=true; e.currentTarget.setPointerCapture(e.pointerId) }
  const release = () => {keys.current={}}
  return <details className="rescue" open={open} onToggle={e=>{const expanded=e.currentTarget.open;setOpen(expanded);if(!expanded&&model.current.status==='playing'){model.current.status='paused';release();sync()}}}>
    <summary>Take a tiny break: Data Rescue</summary>
    <div className="rescue-toolbar"><span><b>{view.score}</b> caught / best {best}</span><span>{Math.ceil(view.remaining)}s</span><div><button disabled={!['playing','paused'].includes(view.status)} onClick={pause}>{view.status==='paused'?'Resume':'Pause'}</button><button onClick={restart}>Restart</button></div></div>
    <div ref={arena} tabIndex={0} className="rescue-arena" onKeyDown={e=>key(e,true)} onKeyUp={e=>key(e,false)} onBlur={release} aria-label="Data Rescue game. Up and down move the hero; Space shoots a web. Escape pauses.">
      <div className="rescue-skyline" style={{backgroundPositionX:`${-view.elapsed*12}px`}} />
      <div className="rescue-ground" />
      <img className="rescue-hero" src={`${import.meta.env.BASE_URL}data-hero.svg`} alt="Masked data engineer" style={{top:`${view.y}%`}} />
      {view.packets.map(p=><button key={p.id} className="rescue-packet" style={{left:`${p.x}%`,top:`${p.y}%`}} aria-label="Catch data packet" onPointerDown={e=>{e.preventDefault();const g=model.current;if(g.status!=='playing')return;g.shot={y:p.y,x:p.x,life:.18};g.packets=g.packets.filter(n=>n.id!==p.id);g.score++;setBest(b=>Math.max(b,g.score));sync()}}>DATA</button>)}
      {view.shot&&<svg className="rescue-web" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d={`M 12 ${view.y} Q 45 ${view.shot.y-5} ${view.shot.x} ${view.shot.y}`} /></svg>}
      {view.status!=='playing'&&<div className="rescue-overlay"><strong>{view.status==='ready'?'A little web-work?':view.status==='paused'?'Paused':`${view.score} packets rescued`}</strong><span>Move up or down. Aim at a packet. Fire a web.</span><button onClick={view.status==='paused'?pause:restart}>{view.status==='paused'?'Resume':view.status==='finished'?'Play again':'Start game'}</button></div>}
    </div>
    <div className="rescue-controls"><div><button onPointerDown={e=>move('up',e)} onPointerUp={release} onPointerCancel={release} aria-label="Move up">Up</button><button onPointerDown={e=>move('down',e)} onPointerUp={release} onPointerCancel={release} aria-label="Move down">Down</button><button onClick={shoot}>Shoot web</button></div><small>Arrow keys / W S to move · Space to shoot<br/>Or tap a packet to catch it.</small></div>
  </details>
}
