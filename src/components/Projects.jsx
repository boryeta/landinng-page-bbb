const PROJECTS = [
  {
    tag: 'RESTAURANTE · ALICANTE',
    title: 'Bisturí by Qlinaria',
    desc: 'Web editorial con animaciones 3D y drawer de carta para restaurante premium.',
    cta: 'Ver proyecto →',
  },
  {
    tag: 'CATERING · ALICANTE',
    title: 'QLinaria Catering',
    desc: 'Landing page de conversión para empresa de catering y eventos corporativos.',
    cta: 'Ver proyecto →',
  },
  {
    tag: 'PRÓXIMAMENTE',
    title: 'Tu proyecto aquí',
    desc: '¿Tienes un negocio en Alicante? Hablemos sobre tu nueva web.',
    cta: 'Contactar →',
  },
]

export default function Projects() {
  return (
    <section id="proyectos" className="bg-negro py-[120px]">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <h2 className="reveal font-syne text-[2.5rem] font-extrabold text-blanco md:text-[3.5rem]">
          Proyectos recientes<span className="text-azul">.</span>
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <article
              key={project.title}
              className="reveal group flex flex-col rounded-lg border border-[#1E1E1E] bg-[#111] p-8 transition-all duration-[250ms] ease-out hover:scale-[1.02] hover:border-azul hover:shadow-[0_0_30px_rgba(30,111,217,0.12)]"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="font-inter text-xs font-semibold uppercase tracking-wider text-azul">
                {project.tag}
              </span>
              <h3 className="mt-4 font-syne text-2xl font-bold text-blanco">{project.title}</h3>
              <p className="mt-3 flex-1 font-inter text-base text-gris">{project.desc}</p>
              <a
                href="#contacto"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
                }}
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
