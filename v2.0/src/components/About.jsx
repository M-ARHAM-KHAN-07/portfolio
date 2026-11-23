import { about, education, experience } from '../data/resume'
import Reveal from './Reveal'

export default function About() {
  const roles = experience.map((j) => `${j.role}, ${j.company}`)
  return (
    <section id="about" className="section">
      <div className="wrap about">
        <Reveal>
          <p className="eyebrow mono">About</p>
          <p className="lead">{about.lead}</p>
        </Reveal>
        <Reveal delay={80}>
          <p className="body">{about.paragraphs[0]}</p>
          <ul className="facts mono">
            {roles.map((r) => (
              <li key={r}>{r}</li>
            ))}
            <li>
              {education.degree}, {education.school}
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
