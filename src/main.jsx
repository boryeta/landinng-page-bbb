import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Lenis from 'lenis'
import './index.css'
import App from './App.jsx'

// ── Smooth scroll (Lenis) ──────────────────────────────
// Disabled on touch devices / reduced-motion preference.
const isTouch = window.matchMedia('(hover: none)').matches
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

if (!isTouch && !reducedMotion) {
  const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
    smoothTouch: false,
  })

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
