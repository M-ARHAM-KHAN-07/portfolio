import { profile } from '../data/resume'
import Reveal from './Reveal'

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow mono">Contact</p>
          <a className="email ulink" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <ul className="links mono">
            <li>
              <a className="ulink" href={profile.github} target="_blank" rel="noreferrer noopener">
                GitHub
              </a>
            </li>
            <li>
              <a className="ulink" href={profile.linkedin} target="_blank" rel="noreferrer noopener">
                LinkedIn
              </a>
            </li>
            <li>{profile.location}</li>
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
