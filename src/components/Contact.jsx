import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CONTACTS = [
  { icon: '📧', label: 'hola@llevantstudio.com', href: 'mailto:hola@llevantstudio.com' },
  { icon: '📱', label: 'WhatsApp →', href: 'https://wa.me/34600000000' },
  { icon: '📍', label: 'Alicante, España', href: null },
]

export default function Contact() {
  const rootRef = useRef(null)
  const titleRef = useRef(null)
  const [sent, setSent] = useState(false)

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced || !titleRef.current) return
      // Dispara el glitch al entrar en viewport (se repite 3 veces vía CSS)
      ScrollTrigger.create({
        trigger: titleRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          titleRef.current.classList.add('is-glitching')
          setTimeout(() => titleRef.current?.classList.remove('is-glitching'), 1200)
        },
      })
    },
    { scope: rootRef },
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  const inputClass =
    'w-full rounded border border-[#333] bg-[#111] px-4 py-3 font-inter text-blanco placeholder-gris/70 outline-none transition-colors duration-200 focus:border-azul'

  return (
    <section id="contacto" ref={rootRef} className="bg-negro py-[120px]">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <h2
          ref={titleRef}
          data-text="¿HABLAMOS?"
          className="glitch font-syne text-[3rem] font-extrabold uppercase text-blanco md:text-[6rem]"
        >
          ¿HABLAMOS?
        </h2>
        <p className="mt-4 font-inter text-lg text-gris">
          Cuéntanos tu proyecto. Respondemos en menos de 24 horas.
        </p>

        <div className="mt-10 flex flex-wrap gap-8">
          {CONTACTS.map((c) => (
            <div key={c.label} className="flex items-center gap-3">
              <span className="text-xl">{c.icon}</span>
              {c.href ? (
                <a
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="font-inter text-base text-blanco transition-colors duration-200 hover:text-azul"
                >
                  {c.label}
                </a>
              ) : (
                <span className="font-inter text-base text-blanco">{c.label}</span>
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-14 max-w-2xl">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <input type="text" name="nombre" placeholder="Nombre" required className={inputClass} />
            <input type="email" name="email" placeholder="Email" required className={inputClass} />
          </div>
          <input type="tel" name="telefono" placeholder="Teléfono" className={`${inputClass} mt-5`} />
          <textarea
            name="mensaje"
            placeholder="Mensaje"
            rows="5"
            required
            className={`${inputClass} mt-5 resize-none`}
          />

          <label className="mt-5 flex items-start gap-3 font-inter text-sm text-gris">
            <input type="checkbox" required className="mt-1 h-4 w-4 shrink-0 accent-azul" />
            <span>
              Acepto la política de privacidad y el tratamiento de mis datos para responder a mi
              consulta.
            </span>
          </label>

          <button
            type="submit"
            className="mt-8 rounded bg-azul px-10 py-4 font-inter text-blanco transition-colors duration-200 hover:bg-azul-dark"
          >
            {sent ? '¡Enviado! ✓' : 'Enviar →'}
          </button>
        </form>
      </div>
    </section>
  )
}
