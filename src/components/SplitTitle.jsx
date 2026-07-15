import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * H2 (u otra etiqueta) que se revela carácter a carácter con un efecto
 * premium de "caída hacia arriba" (rotationX) disparado por ScrollTrigger.
 */
export default function SplitTitle({ as: Tag = 'h2', className = '', children }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced) return

      const split = new SplitType(el, { types: 'chars', tagName: 'span' })

      gsap.set(split.chars, { transformOrigin: 'center bottom', display: 'inline-block' })
      gsap.from(split.chars, {
        yPercent: 110,
        rotationX: -90,
        opacity: 0,
        duration: 0.7,
        ease: 'expo.out',
        stagger: 0.03,
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          once: true,
        },
      })

      return () => split.revert()
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} className={`split-title ${className}`}>
      {children}
    </Tag>
  )
}
