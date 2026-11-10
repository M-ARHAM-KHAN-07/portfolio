import { useState } from 'react'
import './HangingHero.css'

export default function HangingHero() {
  const [kick, setKick] = useState(0)
  return <div className="hanging-hero">
    <div key={kick} className={`hanging-hero-rig ${kick ? 'hanging-hero-kicked' : ''}`}>
      <span className="hanging-hero-thread" aria-hidden="true" />
      <button className="hanging-hero-button" onClick={()=>setKick(k=>k+1)} aria-label="Give the upside-down hero a swing" title="Just hanging around. Click to swing!">
        <svg viewBox="0 0 64 98" aria-hidden="true">
          <g stroke="#183653" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round">
            <path d="M31 4 18 14 25 32 33 27 27 17 35 10Z" fill="#e33250" />
            <path d="M34 4 47 14 40 32 32 27 38 17 30 10Z" fill="#1774b6" />
            <path d="M24 26Q32 20 40 26L43 51Q32 60 21 51Z" fill="#1774b6" />
            <path d="M28 26H36L37 52H27Z" fill="#e33250" />
            <path d="M22 38 13 46 20 58 26 54 20 46 26 42M42 38 51 46 44 58 38 54 44 46 38 42" fill="#e33250" />
            <path d="M20 62Q22 53 32 53T44 62L43 77Q40 86 32 88Q24 86 21 77Z" fill="#ed3651" />
            <g stroke="#9e1b37" strokeWidth=".8" fill="none"><path d="M32 55V87M21 63 42 78M43 63 22 78M21 70H43M23 80Q32 73 41 80M23 59Q32 68 41 59" /></g>
            <path d="M24 75 30 69 27 64Q22 66 24 75ZM40 75 34 69 37 64Q42 66 40 75Z" fill="white" strokeWidth="1.5" />
            <path d="M29 43 32 38 35 43 32 48Z" fill="#fff1bc" strokeWidth="1" />
            <path d="M30 4H35V10H30Z" fill="#f5f9ff" strokeWidth="1" />
          </g>
        </svg>
      </button>
    </div>
  </div>
}
