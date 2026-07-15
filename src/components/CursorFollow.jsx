import { useEffect, useRef } from 'react'

export default function CursorFollow() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    // Only enable on precise pointers (desktop)
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!isFinePointer) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    document.body.classList.add('custom-cursor')

    const move = (e) => {
      const { clientX: x, clientY: y } = e
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
      ring.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
    }

    const isInteractive = (target) =>
      target.closest('a, button, input, textarea, label, [role="button"]')

    const over = (e) => {
      if (isInteractive(e.target)) {
        dot.classList.add('is-hovering')
        ring.classList.add('is-hovering')
      }
    }

    const out = (e) => {
      if (isInteractive(e.target)) {
        dot.classList.remove('is-hovering')
        ring.classList.remove('is-hovering')
      }
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
      document.body.classList.remove('custom-cursor')
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
