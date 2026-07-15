import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { prefix: '+', value: 15, suffix: '', label: 'Proyectos entregados' },
  { prefix: '', value: 100, suffix: '%', label: 'Clientes satisfechos' },
  { prefix: '', value: 48, suffix: 'h', label: 'Tiempo de respuesta' },
  { prefix: '×', value: 3, suffix: '', label: 'Más tráfico de media' },
]

export default function Stats() {
  const rootRef = useRef(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      // Parallax ligero del fondo
      if (!reduced) {
        gsap.fromTo(
          rootRef.current,
          { backgroundPositionY: '0%' },
          {
            backgroundPositionY: '30%',
            ease: 'none',
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      }

      gsap.utils.toArray('.stat-num').forEach((el) => {
        const target = Number(el.dataset.value)
        const prefix = el.dataset.prefix || ''
        const suffix = el.dataset.suffix || ''
        if (reduced) {
          el.textContent = `${prefix}${target}${suffix}`
          return
        }
        const counter = { v: 0 }
        gsap.to(counter, {
          v: target,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onUpdate: () => {
            el.textContent = `${prefix}${Math.round(counter.v)}${suffix}`
          },
        })
      })
    },
    { scope: rootRef },
  )

  return (
    <section ref={rootRef} className="stats-bg py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-2 gap-y-12 md:grid-cols-4 md:gap-y-0">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center md:px-6 ${
                i > 0 ? 'md:border-l md:border-[#222]' : ''
              }`}
            >
              <span
                className="stat-num font-syne text-[4rem] font-extrabold leading-none text-azul"
                data-value={stat.value}
                data-prefix={stat.prefix}
                data-suffix={stat.suffix}
              >
                {stat.prefix}0{stat.suffix}
              </span>
              <span className="mt-3 font-inter text-[0.9rem] uppercase tracking-[0.08em] text-gris">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
