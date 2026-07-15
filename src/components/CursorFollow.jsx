import { useEffect, useRef, useState } from 'react'

export default function CursorFollow() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine) return
    setEnabled(true)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    document.body.classList.add('custom-cursor')

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ringPos = { x: mouse.x, y: mouse.y }
    let raf

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      // El punto sigue al ratón inmediatamente
      dot.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%, -50%)`
    }

    // Lerp manual del círculo exterior (lag suave)
    const loop = () => {
      ringPos.x += (mouse.x - ringPos.x) * 0.08
      ringPos.y += (mouse.y - ringPos.y) * 0.08
      ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const isInteractive = (t) => t.closest('a, button, input, textarea, label, [role="button"]')
    const isCanvas = (t) => t.closest('[data-cursor="explore"]')

    const onOver = (e) => {
      if (isCanvas(e.target)) {
        ring.classList.add('is-explore')
        dot.classList.add('is-hidden')
      } else if (isInteractive(e.target)) {
        ring.classList.add('is-hovering')
        dot.classList.add('is-hidden')
      }
    }
    const onOut = (e) => {
      if (isCanvas(e.target)) {
        ring.classList.remove('is-explore')
        dot.classList.remove('is-hidden')
      } else if (isInteractive(e.target)) {
        ring.classList.remove('is-hovering')
        dot.classList.remove('is-hidden')
      }
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.body.classList.remove('custom-cursor')
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        <span className="cursor-explore">EXPLORE</span>
      </div>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
