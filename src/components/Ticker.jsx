import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { lenisInstance } from '../lib/smoothScroll'

const ITEMS = [
  'LOVABLE',
  'CLAUDE AI',
  'THREE.JS',
  'REACT',
  'GSAP',
  'NEXT.JS',
  'FIGMA',
  'SUPABASE',
  'TAILWIND CSS',
]

function TickerContent() {
  return (
    <div className="flex shrink-0 items-center">
      {ITEMS.map((item) => (
        <span
          key={item}
          className="flex items-center whitespace-nowrap font-syne text-[0.85rem] font-bold uppercase tracking-[0.1em] text-blanco"
        >
          {item}
          <span className="mx-4 text-blanco/70">·</span>
        </span>
      ))}
    </div>
  )
}

export default function Ticker() {
  const trackRef = useRef(null)

  useGSAP(
    () => {
      const track = trackRef.current
      if (!track) return

      // Loop infinito translateX 0 → -50% (dos copias = seamless)
      const tl = gsap.to(track, {
        xPercent: -50,
        duration: 25,
        ease: 'none',
        repeat: -1,
      })

      // Aceleración según la velocidad de scroll
      let targetScale = 1
      const setScale = gsap.quickTo(tl, 'timeScale', { duration: 0.4, ease: 'power2.out' })

      const onScroll = ({ velocity } = {}) => {
        const v = Math.abs(velocity ?? 0)
        targetScale = gsap.utils.clamp(1, 3, 1 + v * 0.35)
        setScale(targetScale)
      }

      const lenis = lenisInstance()
      let fallbackHandler
      if (lenis) {
        lenis.on('scroll', onScroll)
      } else {
        // Fallback sin Lenis: estima velocidad por delta de scroll
        let lastY = window.scrollY
        let lastT = performance.now()
        fallbackHandler = () => {
          const now = performance.now()
          const dy = Math.abs(window.scrollY - lastY)
          const dt = Math.max(now - lastT, 1)
          onScroll({ velocity: (dy / dt) * 8 })
          lastY = window.scrollY
          lastT = now
        }
        window.addEventListener('scroll', fallbackHandler, { passive: true })
      }

      // Vuelve a velocidad normal cuando el scroll se detiene
      const idle = setInterval(() => {
        if (targetScale !== 1) {
          targetScale = 1
          setScale(1)
        }
      }, 220)

      return () => {
        tl.kill()
        clearInterval(idle)
        if (lenis) lenis.off('scroll', onScroll)
        if (fallbackHandler) window.removeEventListener('scroll', fallbackHandler)
      }
    },
    { scope: trackRef },
  )

  return (
    <div className="ticker w-full overflow-hidden bg-azul py-3">
      <div ref={trackRef} className="flex w-max">
        <TickerContent />
        <TickerContent />
      </div>
    </div>
  )
}
