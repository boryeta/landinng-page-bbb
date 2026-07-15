const FAQS = [
  {
    q: '¿Cuánto cuesta una página web en Alicante?',
    a: 'El precio de una página web en Alicante depende del alcance del proyecto. En Llevant Studio trabajamos con IA para ofrecer webs profesionales a partir de presupuestos ajustados y siempre cerrados de antemano, sin sorpresas. Pide tu presupuesto sin compromiso y lo tendrás en menos de 24 horas.',
  },
  {
    q: '¿Cuánto tarda en hacerse una web profesional?',
    a: 'Gracias al diseño web con inteligencia artificial entregamos webs profesionales en días, no en meses. Una landing page de conversión puede estar lista en menos de una semana, y proyectos más completos en dos o tres semanas.',
  },
  {
    q: '¿Qué incluye el mantenimiento web?',
    a: 'El mantenimiento web incluye actualizaciones de seguridad, copias de seguridad, optimización de velocidad, pequeños cambios de contenido y monitorización continua para que tu web esté siempre rápida, segura y al día.',
  },
  {
    q: '¿Trabajáis con negocios de toda España?',
    a: 'Sí. Aunque somos una agencia de diseño web nacida en Alicante y damos servicio a Alicante, Valencia y Murcia, trabajamos con negocios de toda España de forma totalmente remota.',
  },
  {
    q: '¿Qué es el diseño web con IA?',
    a: 'El diseño web con IA combina herramientas de inteligencia artificial con criterio de diseño profesional para crear webs más rápido y mejor: generación de estructura, textos, componentes y optimización, siempre supervisado por diseñadores para garantizar calidad y coherencia de marca.',
  },
]

export default function Faq() {
  // Sección accesible para lectores y buscadores, oculta visualmente (sr-only).
  // El schema FAQPage vive en index.html para el marcado enriquecido de Google.
  return (
    <section id="faq" aria-label="Preguntas frecuentes" className="sr-only">
      <h2>Preguntas frecuentes sobre diseño web en Alicante</h2>
      <dl>
        {FAQS.map((item) => (
          <div key={item.q}>
            <dt>{item.q}</dt>
            <dd>{item.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
