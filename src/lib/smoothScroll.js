import Lenis from 'lenis'

let lenis = null

/**
 * Singleton de Lenis. Desactivado en dispositivos táctiles y con
 * prefers-reduced-motion. Devuelve la instancia (o null si no procede).
 */
export function getLenis() {
  if (typeof window === 'undefined') return lenis
  const isTouch = window.matchMedia('(hover: none)').matches
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (isTouch || reduced) return null
  if (!lenis) {
    lenis = new Lenis({
      duration: 1.4,
      // easing suave (exponencial out)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    })
  }
  return lenis
}

export function lenisInstance() {
  return lenis
}
