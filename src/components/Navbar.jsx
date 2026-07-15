import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const LINKS = [
  { id: 'servicios', label: 'Servicios' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'nosotros', label: 'Nosotros' },
  { id: 'contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  const listRef = useRef(null)
  const underlineRef = useRef(null)
  const linkRefs = useRef({})
  const lastY = useRef(0)

  // Fondo + ocultar/mostrar según dirección de scroll
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 50)
      if (y > lastY.current && y > 200) {
        setHidden(true) // scroll down → ocultar
      } else {
        setHidden(false) // scroll up → mostrar
      }
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Sección activa por IntersectionObserver
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean)
    if (!sections.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Underline deslizante con GSAP hacia el link activo
  useLayoutEffect(() => {
    const underline = underlineRef.current
    const target = active ? linkRefs.current[active] : null
    if (!underline) return
    if (!target) {
      gsap.to(underline, { opacity: 0, duration: 0.2 })
      return
    }
    gsap.to(underline, {
      x: target.offsetLeft,
      width: target.offsetWidth,
      opacity: 1,
      duration: 0.4,
      ease: 'power3.out',
    })
  }, [active])

  const handleNav = (e, id) => {
    e.preventDefault()
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-[transform,background-color,box-shadow] duration-300 ${
        scrolled ? 'bg-negro shadow-lg shadow-black/40' : 'bg-transparent'
      } ${hidden && !open ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <a
          href="#hero"
          onClick={(e) => handleNav(e, 'hero')}
          className="font-syne text-lg font-bold tracking-tight text-blanco md:text-xl"
        >
          Llevant Studio
        </a>

        {/* Links desktop con underline GSAP */}
        <div ref={listRef} className="relative hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.id}
              ref={(el) => (linkRefs.current[link.id] = el)}
              href={`#${link.id}`}
              onClick={(e) => handleNav(e, link.id)}
              className={`font-inter text-sm transition-colors duration-200 hover:text-blanco ${
                active === link.id ? 'text-blanco' : 'text-gris'
              }`}
            >
              {link.label}
            </a>
          ))}
          <span
            ref={underlineRef}
            className="pointer-events-none absolute -bottom-2 left-0 h-0.5 w-0 bg-azul opacity-0"
          />
        </div>

        {/* Hamburguesa móvil */}
        <button
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="relative z-50 flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`block h-0.5 w-6 bg-blanco transition-transform duration-300 ${
              open ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-blanco transition-opacity duration-300 ${
              open ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-blanco transition-transform duration-300 ${
              open ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
      </nav>

      {/* Menú móvil con reveal clip-path circular */}
      <div
        className={`mobile-menu fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-negro md:hidden ${
          open ? 'is-open' : ''
        }`}
      >
        {LINKS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={(e) => handleNav(e, link.id)}
            className={`font-syne text-3xl font-bold transition-colors duration-200 ${
              active === link.id ? 'text-azul' : 'text-blanco'
            }`}
          >
            {link.label}
          </a>
        ))}
      </div>
    </header>
  )
}
