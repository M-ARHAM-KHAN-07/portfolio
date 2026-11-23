import { profile } from '../data/resume'
import PipelineField from './PipelineField'

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-grid" aria-hidden="true" />
      <div className="wrap">
        <p className="status mono rise-in" style={{ '--d': '0ms' }}>
          <span className="status-dot" aria-hidden="true" />
          Open to work · {profile.location}
        </p>
        <h1 className="hero-name">
          <span className="mask">
            <span className="rise" style={{ '--d': '90ms' }}>
              {profile.name}
            </span>
          </span>
        </h1>
        <PipelineField />
        <p className="hero-line rise-in" style={{ '--d': '260ms' }}>
          Data engineer. I build healthcare data workflows, AWS pipelines and analytics tools.
        </p>
      </div>
    </section>
  )
}
