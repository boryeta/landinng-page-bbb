import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 120
const BLUE = new THREE.Color('#1E6FD9')
const WHITE = new THREE.Color('#F5F5F5')

/* ── Partículas flotantes con repulsión magnética al ratón ── */
function Particles() {
  const meshRef = useRef()
  const { viewport } = useThree()
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const mouse3D = useMemo(() => new THREE.Vector3(9999, 9999, 0), [])

  const particles = useMemo(() => {
    const arr = []
    for (let i = 0; i < COUNT; i++) {
      const r = 1.6 + Math.random() * 3.8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr.push({
        base: new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta) * 0.7,
          r * Math.cos(phi) * 0.6,
        ),
        current: new THREE.Vector3(),
        speed: 0.15 + Math.random() * 0.4,
        offset: Math.random() * Math.PI * 2,
        scale: 0.6 + Math.random() * 1.6,
      })
    }
    return arr
  }, [])

  // Color por instancia (azul / blanco) una sola vez
  useEffect(() => {
    const mesh = meshRef.current
    if (!mesh) return
    for (let i = 0; i < COUNT; i++) {
      mesh.setColorAt(i, Math.random() > 0.45 ? BLUE : WHITE)
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  }, [])

  useFrame((state) => {
    const mesh = meshRef.current
    if (!mesh) return
    const t = state.clock.elapsedTime

    // Ratón proyectado al plano z = 0
    mouse3D.set(
      (state.pointer.x * viewport.width) / 2,
      (state.pointer.y * viewport.height) / 2,
      0,
    )

    for (let i = 0; i < COUNT; i++) {
      const p = particles[i]
      // Órbita lenta alrededor del centro
      const a = t * p.speed * 0.2 + p.offset
      const bx = p.base.x * Math.cos(a * 0.3) - p.base.z * Math.sin(a * 0.3)
      const bz = p.base.x * Math.sin(a * 0.3) + p.base.z * Math.cos(a * 0.3)
      p.current.set(bx, p.base.y + Math.sin(t * p.speed + p.offset) * 0.35, bz)

      // Repulsión magnética: las cercanas al ratón se alejan
      const dx = p.current.x - mouse3D.x
      const dy = p.current.y - mouse3D.y
      const dist2 = dx * dx + dy * dy
      const R = 1.8
      if (dist2 < R * R) {
        const dist = Math.sqrt(dist2) || 0.0001
        const force = (R - dist) / R
        p.current.x += (dx / dist) * force * 1.4
        p.current.y += (dy / dist) * force * 1.4
      }

      dummy.position.copy(p.current)
      dummy.scale.setScalar(p.scale)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    }
    mesh.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]}>
      <sphereGeometry args={[0.02, 12, 12]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  )
}

/* ── Icosaedro wireframe central: rota, pulsa y hace parallax al scroll ── */
function CoreShape() {
  const ref = useRef()

  useFrame((state) => {
    const mesh = ref.current
    if (!mesh) return
    const t = state.clock.elapsedTime

    // Rotación lenta en los tres ejes (~0.001 rad/frame a 60fps)
    mesh.rotation.x += 0.001
    mesh.rotation.y += 0.001
    mesh.rotation.z += 0.001

    // Pulso de escala 0.98 → 1.02 → 0.98 cada 3 s
    const pulse = 1 + Math.sin(t * ((Math.PI * 2) / 3)) * 0.02
    mesh.scale.setScalar(pulse)

    // Parallax: se aleja (z: -2) al salir del hero
    const progress = Math.min(window.scrollY / window.innerHeight, 1)
    mesh.position.z = -2 * progress
  })

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.7, 1]} />
      <meshBasicMaterial color={BLUE} wireframe transparent opacity={0.15} />
    </mesh>
  )
}

/* ── Point light azul que sigue al ratón ── */
function MouseLight() {
  const ref = useRef()
  const { viewport } = useThree()
  useFrame((state) => {
    if (!ref.current) return
    ref.current.position.x = (state.pointer.x * viewport.width) / 2
    ref.current.position.y = (state.pointer.y * viewport.height) / 2
  })
  return <pointLight ref={ref} color={BLUE} intensity={40} distance={12} position={[0, 0, 3]} />
}

export default function HeroCanvas() {
  return (
    <Canvas
      className="hero-canvas"
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <MouseLight />
      <CoreShape />
      <Particles />
    </Canvas>
  )
}
