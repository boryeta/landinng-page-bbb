export default function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      className="hero-noise relative flex min-h-screen items-center overflow-hidden bg-negro"
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-32 md:px-10">
        <h1 className="font-syne font-extrabold leading-[0.95] tracking-tight">
          <span className="hero-line-1 block text-[3.2rem] text-blanco md:text-[7rem]">
            WEBS QUE
          </span>
          <span className="hero-line-2 block text-[3.2rem] text-azul md:text-[7rem]">
            CONVIERTEN.
          </span>
        </h1>

        <p className="hero-sub mt-8 max-w-xl font-inter text-[1.1rem] leading-relaxed text-gris">
          Diseño web con IA para negocios locales en Alicante. Rápido, moderno y sin complicaciones.
        </p>

        <div className="hero-btns mt-10 flex flex-wrap gap-4">
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

      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="block h-10 w-px bg-gris/60" />
      </div>
    </section>
  )
}
