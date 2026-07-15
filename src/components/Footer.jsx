const LINKS = [
  { id: 'servicios', label: 'Servicios' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'nosotros', label: 'Nosotros' },
  { id: 'contacto', label: 'Contacto' },
  { id: 'legal', label: 'Aviso legal' },
]

export default function Footer() {
  const handleNav = (e, id) => {
    if (id === 'legal') return
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#050505] py-[60px]">
      <div className="mx-auto max-w-7xl px-6 text-center md:px-10">
        <div className="font-syne text-[1.5rem] font-extrabold text-blanco">Llevant Studio</div>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={link.id === 'legal' ? '#' : `#${link.id}`}
                onClick={(e) => handleNav(e, link.id)}
                className="font-inter text-sm text-gris transition-colors duration-200 hover:text-blanco"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-8 h-px w-full max-w-xl bg-[#1E1E1E]" />

        <p className="mt-8 font-inter text-sm text-gris">
          © 2025 Llevant Studio · Alicante · Diseño web con IA
        </p>
      </div>
    </footer>
  )
}
