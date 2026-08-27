import Navbar from './components/Navbar'
import ScrollRail from './components/ScrollRail'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Pipeline from './components/Pipeline'
import Stack from './components/Stack'
import Exploring from './components/Exploring'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-violet focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-void"
      >
        Skip to content
      </a>

      <Navbar />
      <ScrollRail />

      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Pipeline />
        <Stack />
        <Exploring />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
