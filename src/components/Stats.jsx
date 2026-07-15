import { useEffect, useRef, useState } from 'react'

const STATS = [
  { prefix: '+', value: 15, suffix: '', label: 'Proyectos entregados' },
  { prefix: '', value: 100, suffix: '%', label: 'Clientes satisfechos' },
  { prefix: '', value: 48, suffix: 'h', label: 'Tiempo de respuesta' },
  { prefix: '×', value: 3, suffix: '', label: 'Más tráfico de media' },
]

function Counter({ prefix, value, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setCount(value)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true
            const duration = 1500
            const start = performance.now()
            const tick = (now) => {
              const progress = Math.min((now - start) / duration, 1)
              // easeOutCubic
              const eased = 1 - Math.pow(1 - progress, 3)
              setCount(Math.round(eased * value))
              if (progress < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
          }
        })
      },
      { threshold: 0.5 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  return (
    <span ref={ref} className="font-syne text-[4rem] font-extrabold leading-none text-azul">
      {prefix}
      {count}
      {suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section className="bg-[#111111] py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-2 gap-y-12 md:grid-cols-4 md:gap-y-0">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`reveal flex flex-col items-center text-center md:px-6 ${
                i > 0 ? 'md:border-l md:border-[#222]' : ''
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <Counter prefix={stat.prefix} value={stat.value} suffix={stat.suffix} />
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
