import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitTitle from './SplitTitle'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  { num: 1, name: 'Diseño Web', desc: 'Páginas web modernas construidas con IA en días, no meses.' },
  {
    num: 2,
    name: 'SEO Local',
    desc: 'Posicionamiento en Google para que te encuentren los clientes de tu ciudad.',
  },
  {
    num: 3,
    name: 'Integración IA',
    desc: 'Chatbots, automatizaciones y herramientas de IA para tu negocio.',
  },
  {
    num: 4,
    name: 'Mantenimiento',
    desc: 'Tu web siempre actualizada, segura y optimizada. Sin preocupaciones.',
  },
]

export default function Services() {
  const rootRef = useRef(null)
  const gridRef = useRef(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      // Parallax del grid de puntos (40% de la velocidad del scroll)
      if (gridRef.current && !reduced) {
        gsap.to(gridRef.current, {
          backgroundPositionY: '40%',
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      const cards = gsap.utils.toArray('.service-card')
      if (reduced) return

      // Entrada de las tarjetas desde abajo, en cascada (ScrollTrigger.batch)
      gsap.set(cards, { y: 60, opacity: 0 })
      ScrollTrigger.batch(cards, {
        start: 'top 85%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.15,
            overwrite: true,
          }),
      })

      cards.forEach((card) => {
        const line = card.querySelector('.service-line')
        const numEl = card.querySelector('.service-num')
        const target = Number(numEl.dataset.value)

        // Línea superior que se dibuja de izquierda a derecha
        gsap.from(line, {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%', once: true },
        })

        // Countup del número grande
        const counter = { v: 0 }
        gsap.to(counter, {
          v: target,
          duration: 1,
          ease: 'power1.out',
          scrollTrigger: { trigger: card, start: 'top 85%', once: true },
          onUpdate: () => {
            numEl.textContent = String(Math.round(counter.v)).padStart(2, '0')
          },
        })
      })
    },
    { scope: rootRef },
  )

  return (
    <section id="servicios" ref={rootRef} className="relative overflow-hidden bg-negro py-[120px]">
      {/* Grid de puntos con parallax */}
      <div ref={gridRef} className="dot-grid pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <SplitTitle className="font-syne text-[2.5rem] font-extrabold text-blanco md:text-[3.5rem]">
          Lo que hacemos<span className="text-azul">.</span>
        </SplitTitle>

        <div className="mt-16 grid grid-cols-1 gap-x-12 md:grid-cols-2">
          {SERVICES.map((service) => (
            <div
              key={service.num}
              className="service-card group relative py-10 transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="service-line absolute top-0 left-0 block h-px w-full bg-[#222] transition-colors duration-300 group-hover:bg-azul" />
              <span
                className="service-num block font-syne text-[5rem] font-extrabold leading-none text-azul opacity-30 transition-opacity duration-300 group-hover:opacity-60"
                data-value={service.num}
              >
                {String(service.num).padStart(2, '0')}
              </span>
              <h3 className="mt-4 font-syne text-[2rem] font-bold uppercase text-blanco">
                {service.name}
              </h3>
              <p className="mt-3 max-w-md font-inter text-base text-gris">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
