import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const HeroCanvas = lazy(() => import('./HeroCanvas'))

export default function Hero() {
  const rootRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const [showCanvas, setShowCanvas] = useState(false)

  // El canvas 3D solo se inicializa cuando el hero está en viewport
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const touch = window.matchMedia('(hover: none)').matches
    if (reduced) return // sin canvas si el usuario prefiere menos movimiento
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowCanvas(true)
          observer.disconnect()
        }
      },
      { threshold: 0.05 },
    )
    observer.observe(el)
    // En móvil también lo mostramos pero se autolimita con dpr
    void touch
    return () => observer.disconnect()
  }, [])

  // Entrada del texto con GSAP
  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced) return
      gsap.from(line1Ref.current, { x: -100, opacity: 0, duration: 1, ease: 'expo.out' })
      gsap.from(line2Ref.current, {
        x: 100,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'expo.out',
      })
      gsap.from('.hero-sub', { y: 20, opacity: 0, duration: 0.6, delay: 0.5, ease: 'power3.out' })
      gsap.from('.hero-btns', { y: 20, opacity: 0, duration: 0.6, delay: 0.65, ease: 'power3.out' })
    },
    { scope: rootRef },
  )

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      ref={rootRef}
      className="hero-noise relative flex min-h-screen items-center overflow-hidden bg-negro"
    >
      {/* Fondo 3D */}
      {showCanvas && (
        <div className="absolute inset-0 z-0" data-cursor="explore">
          <Suspense fallback={null}>
            <HeroCanvas />
          </Suspense>
        </div>
      )}

      <div className="pointer-events-none relative z-10 mx-auto w-full max-w-7xl px-6 py-32 md:px-10">
        <h1 className="font-syne font-extrabold leading-[0.95] tracking-tight">
          <span
            ref={line1Ref}
            className="block text-[3.2rem] text-blanco md:text-[7rem]"
          >
            WEBS QUE
          </span>
          <span
            ref={line2Ref}
            className="block text-[3.2rem] text-azul md:text-[7rem]"
          >
            CONVIERTEN.
          </span>
        </h1>

        <p className="hero-sub mt-8 max-w-xl font-inter text-[1.1rem] leading-relaxed text-gris">
          Diseño web con IA para negocios locales en Alicante. Rápido, moderno y sin complicaciones.
        </p>

        <div className="hero-btns pointer-events-auto mt-10 flex flex-wrap gap-4">
          <button
            onClick={() => scrollTo('proyectos')}
            className="rounded border border-blanco bg-transparent px-7 py-3.5 font-inter text-sm text-blanco transition-all duration-200 hover:bg-blanco hover:text-negro"
          >
            Ver proyectos →
          </button>
          <button
            onClick={() => scrollTo('contacto')}
            className="rounded bg-azul px-7 py-3.5 font-inter text-sm text-blanco transition-all duration-200 hover:bg-azul-dark"
          >
            Hablamos →
          </button>
        </div>
      </div>

      <div className="scroll-indicator absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="block h-10 w-px bg-gris/60" />
      </div>
    </section>
  )
}
