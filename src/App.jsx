import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Ticker from './components/Ticker'
import Services from './components/Services'
import Stats from './components/Stats'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CursorFollow from './components/CursorFollow'
import useReveal from './hooks/useReveal'

export default function App() {
  useReveal()

  return (
    <>
      <CursorFollow />
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <Services />
        <Stats />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
