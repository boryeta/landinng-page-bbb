const SERVICES = [
  {
    num: '01',
    name: 'Diseño Web',
    desc: 'Páginas web modernas construidas con IA en días, no meses.',
  },
  {
    num: '02',
    name: 'SEO Local',
    desc: 'Posicionamiento en Google para que te encuentren los clientes de tu ciudad.',
  },
  {
    num: '03',
    name: 'Integración IA',
    desc: 'Chatbots, automatizaciones y herramientas de IA para tu negocio.',
  },
  {
    num: '04',
    name: 'Mantenimiento',
    desc: 'Tu web siempre actualizada, segura y optimizada. Sin preocupaciones.',
  },
]

export default function Services() {
  return (
    <section id="servicios" className="bg-negro py-[120px]">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <h2 className="reveal font-syne text-[2.5rem] font-extrabold text-blanco md:text-[3.5rem]">
          Lo que hacemos<span className="text-azul">.</span>
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-x-12 md:grid-cols-2">
          {SERVICES.map((service, i) => (
            <div
              key={service.num}
              className="reveal group border-t border-[#222] py-10 transition-all duration-300 hover:-translate-y-1 hover:border-azul"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="block font-syne text-[5rem] font-extrabold leading-none text-azul opacity-30 transition-opacity duration-300 group-hover:opacity-60">
                {service.num}
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
