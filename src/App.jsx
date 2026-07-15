import { lazy, Suspense, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getLenis } from './lib/smoothScroll'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Ticker from './components/Ticker'
import CursorFollow from './components/CursorFollow'

// ── Lazy load de secciones pesadas ──────────────────────
const Services = lazy(() => import('./components/Services'))
const Stats = lazy(() => import('./components/Stats'))
const Projects = lazy(() => import('./components/Projects'))
const About = lazy(() => import('./components/About'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))
const Faq = lazy(() => import('./components/Faq'))

gsap.registerPlugin(ScrollTrigger)

const SectionFallback = () => <div style={{ minHeight: '60vh' }} aria-hidden="true" />

export default function App() {
  useEffect(() => {
    const lenis = getLenis()

    if (lenis) {
      // Sincroniza Lenis con el ticker de GSAP y ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update)
      const raf = (time) => lenis.raf(time * 1000)
      gsap.ticker.add(raf)
      gsap.ticker.lagSmoothing(0)

      return () => {
        lenis.off('scroll', ScrollTrigger.update)
        gsap.ticker.remove(raf)
      }
    }
  }, [])

  // Recalcula posiciones de ScrollTrigger cuando cargan las secciones lazy
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 300)
    window.addEventListener('load', ScrollTrigger.refresh)
    return () => {
      clearTimeout(id)
      window.removeEventListener('load', ScrollTrigger.refresh)
    }
  }, [])

  return (
    <>
      <CursorFollow />
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <Suspense fallback={<SectionFallback />}>
          <Services />
          <Stats />
          <Projects />
          <About />
          <Contact />
          <Faq />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  )
}
