import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitTitle from './SplitTitle'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    tag: 'RESTAURANTE · ALICANTE',
    title: 'Bisturí by Qlinaria',
    desc: 'Web editorial con animaciones 3D y drawer de carta para restaurante premium.',
    cta: 'Ver proyecto →',
    hue: 'from-azul/30',
  },
  {
    tag: 'CATERING · ALICANTE',
    title: 'QLinaria Catering',
    desc: 'Landing page de conversión para empresa de catering y eventos corporativos.',
    cta: 'Ver proyecto →',
    hue: 'from-blanco/20',
  },
  {
    tag: 'PRÓXIMAMENTE',
    title: 'Tu proyecto aquí',
    desc: '¿Tienes un negocio en Alicante? Hablemos sobre tu nueva web.',
    cta: 'Contactar →',
    hue: 'from-azul/20',
  },
]

export default function Projects() {
  const rootRef = useRef(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced) return
      const cards = gsap.utils.toArray('.project-card')
      // Estado inicial oculto + revelado en cascada con ScrollTrigger.batch
      gsap.set(cards, { y: 70, opacity: 0 })
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
    },
    { scope: rootRef },
  )

  const goContact = (e) => {
    e.preventDefault()
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="proyectos" ref={rootRef} className="bg-negro py-[120px]">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SplitTitle className="font-syne text-[2.5rem] font-extrabold text-blanco md:text-[3.5rem]">
          Proyectos recientes<span className="text-azul">.</span>
        </SplitTitle>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PROJECTS.map((project) => (
            <article
              key={project.title}
              className="project-card group relative flex flex-col overflow-hidden rounded-lg border border-[#1E1E1E] bg-[#111] p-8 transition-all duration-[250ms] ease-out hover:scale-[1.02] hover:border-azul hover:shadow-[0_0_30px_rgba(30,111,217,0.12)]"
            >
              {/* Cabecera con reveal clip-path en hover */}
              <div className="project-media relative mb-6 h-32 overflow-hidden rounded-md border border-[#1E1E1E]">
                <div
                  className={`project-media-fill absolute inset-0 bg-gradient-to-br ${project.hue} to-transparent`}
                />
                <span className="absolute bottom-2 right-3 font-syne text-4xl font-extrabold text-blanco/10">
                  {project.title.charAt(0)}
                </span>
              </div>

              <span className="font-inter text-xs font-semibold uppercase tracking-wider text-azul">
                {project.tag}
              </span>
              <h3 className="mt-4 font-syne text-2xl font-bold text-blanco">{project.title}</h3>
              <p className="mt-3 flex-1 font-inter text-base text-gris">{project.desc}</p>
              <a
                href="#contacto"
                onClick={goContact}
                className="mt-6 font-inter text-sm text-azul transition-colors duration-200 hover:text-blanco"
              >
                {project.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
