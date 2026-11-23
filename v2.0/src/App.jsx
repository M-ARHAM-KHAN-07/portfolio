import Nav from './components/Nav'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'

export default function App() {
  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
      <footer className="foot">
        <div className="wrap mono">© {new Date().getFullYear()} Muhammad Arham Khan</div>
      </footer>
    </>
  )
}
