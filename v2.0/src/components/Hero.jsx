import { useEffect, useRef, useState } from 'react'
import DataRescue from './DataRescue'
import { profile } from '../data/resume'
import { useMagnet } from '../lib/interactions'
import HeroSystem from './HeroSystem'
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
      className="relative flex min-h-[68svh] items-center overflow-hidden pt-20 pb-7 sm:pt-24"
    >
      {/* Ambient wash, violet top-right into cyan lower-left */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hero-web"
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
        <div className="hero-layout grid items-center gap-7 lg:grid-cols-12 lg:gap-8">
          {/* Copy */}
          <div className="hero-copy relative z-10 min-w-0 lg:col-span-7 xl:col-span-7">
            <div>
              <div className="flex items-center gap-3">
                <span className="relative flex h-1.5 w-1.5">
                  <span
                    className="absolute inline-flex h-full w-full rounded-full bg-lime"
                  style={{ animation: 'ring-out 2.4s ease-out infinite', backgroundColor: 'var(--color-violet)' }}
                  />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet" />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-violet">
                  {profile.role}
                </span>
              </div>
            </div>

            <h1 className="hero-name mt-5 w-full max-w-full text-[clamp(2.4rem,5.35vw,5.1rem)] font-black leading-[.9] tracking-[-0.075em] text-bright">
              <span className="hero-name-first">MUHAMMAD</span>
              <span className="hero-name-last">ARHAM KHAN</span>
            </h1>

            <div className="hero-copy-line">
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-body">
                Data engineer for hire. I build healthcare data workflows, AWS pipelines, and analytics tools.
              </p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                Available for projects · Lahore / remote
              </p>
            </div>

            <div>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <MagneticLink href="#contact" className="btn btn-primary group">
                  Hire me
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </MagneticLink>
                <MagneticLink href="#projects" className="btn btn-ghost group">See my work</MagneticLink>

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
            </div>

            <div>
              <p className="mt-8 inline-flex items-center gap-2 font-mono text-xs text-muted">
                <LocationIcon className="h-4 w-4" />
                {profile.location}
              </p>
            </div>
          </div>

          {/* Living system */}
          <div className="hero-art relative z-10 lg:col-span-5 xl:col-span-5">
            <div className="hero-spider-scene" aria-label="Stylized comic book data hero illustration">
              <div className="scene-sunburst" />
              <div className="scene-caption">ISSUE 01 <span>·</span> THE DATA HERO</div>
              <div className="hero-web-lines" />
              <div className="hero-swing-string" />
              <img className="hero-data-hero" src={`${import.meta.env.BASE_URL}data-hero.svg`} alt="Original red and blue masked data engineer hero with web pattern, laptop, and AWS FHIR badge" />
              <div className="scene-city"><i/><i/><i/><i/><i/><i/><i/></div>
              <span className="scene-bubble">DATA TROUBLE?<br/><b>I'M ON IT.</b></span>
              <div className="scene-stack"><HeroSystem /></div>
              <span className="scene-onomatopoeia">THWIP!</span>
            </div>
            <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[.2em] text-muted">Real tools. Comic-book energy.</p>
          </div>
        </div>
        <DataRescue />
      </div>

    </section>
  )
}

function WebSlinger() {
  const canvasRef = useRef(null)
  const gameRef = useRef(null)
  const [state, setState] = useState({ playing: false, paused: false, score: 0, time: 25, best: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    let raf = 0
    let last = 0
    let elapsed = 0
    let spawn = 0
    const game = gameRef.current || { playing: false, paused: false, score: 0, time: 25, playerY: 0, velocity: 0, obstacles: [], distance: 0, packets: [], heroImg: new Image() }
    game.heroImg.src = `${import.meta.env.BASE_URL}data-hero.svg`
    gameRef.current = game

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const onPointer = (e) => {
      const r = canvas.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width
      const y = (e.clientY - r.top) / r.height
      if (game.playing && !game.paused) {
        game.packets = game.packets.filter((packet) => {
          if (Math.hypot(packet.x - x, packet.y - y) < .11) { game.score++; return false }
          return true
        })
      }
    }
    canvas.addEventListener('pointerdown', onPointer)
    window.addEventListener('resize', resize)

    const draw = (now) => {
      raf = requestAnimationFrame(draw)
      const dt = Math.min((now - (last || now)) / 1000, 0.04)
      last = now
      elapsed += dt
      const w = canvas.clientWidth, h = canvas.clientHeight
      ctx.clearRect(0, 0, w, h)
      const ground = h * .82
      ctx.fillStyle = '#161722'; ctx.fillRect(0, 0, w, h)
      const speed = game.playing ? 190 + game.score * 3 : 65
      game.distance += dt * speed
      for (let layer=0;layer<3;layer++) {
        const unit=75+layer*38, offset=(game.distance*(.22+layer*.25))%unit
        for(let x=-unit-offset;x<w+unit;x+=unit){const bh=65+((Math.floor((x+offset)/unit)*37+layer*23)%115);ctx.fillStyle=['#1d2030','#242334','#302438'][layer];ctx.fillRect(x,ground-bh,unit-5,bh);ctx.fillStyle='rgba(84,216,232,.35)';for(let wy=ground-bh+12;wy<ground-10;wy+=16){if((Math.floor(x/10)+Math.floor(wy/10))%3!==0)ctx.fillRect(x+8+((wy|0)%19),wy,4,6)}}
      }
      ctx.fillStyle='#0c0d13';ctx.fillRect(0,ground,w,h-ground);ctx.fillStyle='#ff4258';ctx.fillRect(0,ground,w,2)
      for(let x=-(game.distance%100);x<w;x+=100){ctx.fillStyle='#e6d6cc';ctx.fillRect(x,ground+26,48,3)}
      const playerX=w*.24, playerY=ground-23+game.playerY
      if (game.playing && !game.paused) {
        spawn-=dt
        if(spawn<=0){game.packets.push({x:1.05,y:.18+Math.random()*.58,phase:Math.random()*7});spawn=.55+Math.random()*.55}
        game.packets=game.packets.filter(p=>{p.x-=dt*.34;p.y+=Math.sin(elapsed*3+p.phase)*dt*.025;return p.x>-.1})
        game.time -= dt
        if (game.time <= 0) game.playing = false
        if (Math.floor(elapsed * 5) !== Math.floor((elapsed-dt) * 5)) setState((s)=>({ playing: game.playing, paused:game.paused, score: game.score, time: Math.max(0, Math.ceil(game.time)), best: Math.max(game.score, s.best) }))
      }
      game.packets.forEach(p=>{ctx.save();ctx.translate(p.x*w,p.y*h);ctx.fillStyle='#157ab5';ctx.shadowColor='#54d8e8';ctx.shadowBlur=12;ctx.beginPath();ctx.arc(0,0,10,0,7);ctx.fill();ctx.fillStyle='white';ctx.font='bold 8px monospace';ctx.fillText('DATA',-10,3);ctx.restore()})
      if(game.heroImg?.complete){ctx.drawImage(game.heroImg,w*.08,ground-108,72,102)}
    }
    raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); canvas.removeEventListener('pointerdown',onPointer);window.removeEventListener('resize',resize) }
  }, [])

  const start = () => {
    const g = gameRef.current
    Object.assign(g, { playing:true, paused:false, score:0, time:25, packets:[], distance:0 })
    setState((s) => ({ ...s, playing:true, paused:false, score:0, time:25 }))
  }

  const pause = () => { const g=gameRef.current;g.paused=!g.paused;setState(s=>({...s,paused:g.paused})) }

  return (
    <details className="web-slinger mx-auto mt-5 max-w-xl">
      <summary className="arcade-summary">Optional mini game: catch the data</summary>
      <div className="arcade-topline"><span>CATCH THE DATA</span><span>BEST {state.best}</span></div>
      <div className="arcade-frame">
        <canvas ref={canvasRef} tabIndex={0} className="arcade-canvas" aria-label="Click or tap moving data packets to catch them." />
        {!state.playing && <div className="arcade-start"><span className="arcade-stamp">CITY DATA RUN</span><strong>{state.time === 0 ? `TIME! ${state.score} CAUGHT` : 'CATCH THE DATA'}</strong><span>Tap packets as they pass through the city.</span><button type="button" onClick={start}>{state.time === 0 ? 'PLAY AGAIN' : 'START'}</button></div>}
        {state.paused && <div className="arcade-start"><strong>PAUSED</strong><button type="button" onClick={pause}>RESUME</button></div>}
        <div className="arcade-hud"><b>DATA {state.score.toString().padStart(2,'0')}</b><b>00:{String(state.time).padStart(2,'0')}</b><button type="button" onClick={pause} disabled={!state.playing}>{state.paused ? 'RESUME' : 'PAUSE'}</button><button type="button" onClick={start}>RESTART</button></div>
      </div>
    </details>
  )
}
