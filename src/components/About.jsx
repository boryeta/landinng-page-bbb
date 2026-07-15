import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const rootRef = useRef(null)
  const quoteRef = useRef(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced || !quoteRef.current) return

      const split = new SplitType(quoteRef.current, { types: 'words', tagName: 'span' })
      gsap.set(split.words, { display: 'inline-block' })
      gsap.from(split.words, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.05,
        scrollTrigger: { trigger: quoteRef.current, start: 'top 80%', once: true },
      })

      // Entrada de la columna izquierda
      gsap.from('.about-left > *', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: rootRef.current, start: 'top 70%', once: true },
      })

      return () => split.revert()
    },
    { scope: rootRef },
  )

  return (
    <section id="nosotros" ref={rootRef} className="bg-[#111111] py-[120px]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 md:grid-cols-2 md:px-10">
        <div className="about-left">
          <h2 className="font-syne text-[2.2rem] font-extrabold text-blanco md:text-[3rem]">
            Llevant Studio<span className="text-azul">.</span>
          </h2>
          <p className="mt-6 max-w-lg font-inter text-lg leading-relaxed text-gris">
            Somos una agencia de diseño web nacida en Alicante que usa inteligencia artificial para
            crear webs profesionales más rápido y mejor. Nuestro nombre viene del viento de Levante,
            el viento mediterráneo que siempre llega.
          </p>

          <div className="mt-10 flex flex-wrap gap-10">
            <div className="flex items-center gap-3">
              <svg
                className="h-5 w-5 text-azul"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              <span className="font-inter text-sm text-blanco">Fundada en 2024</span>
            </div>
            <div className="flex items-center gap-3">
              <svg
                className="h-5 w-5 text-azul"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="font-inter text-sm text-blanco">Alicante, España</span>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <blockquote
            ref={quoteRef}
            className="font-syne text-[1.8rem] italic leading-snug text-azul"
          >
            «La web más moderna que hayas tenido, o te devolvemos el dinero.»
          </blockquote>
        </div>
      </div>
    </section>
  )
}
