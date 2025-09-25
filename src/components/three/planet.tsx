import { createRef } from 'react'
import { Mesh } from 'three'
import { useFrame } from '@react-three/fiber'

export default function Planet () {
  const planetRef = createRef<Mesh>()

  useFrame(() => {
    // if (planetRef.current == null) return
    // planetRef.current.position.y += 0.05

    if (planetRef.current == null) return
    const time = Date.now() * 0.001
    const radius = 5
    planetRef.current.position.x = Math.cos(time) * radius
    planetRef.current.position.y = Math.sin(time) * radius
    planetRef.current.position.z = Math.sin(time) * radius
  })

  return (
    <mesh
      ref={planetRef}
      position={[10, 0, 0]}
    >
      <sphereGeometry
        args={[0.5, 32, 32]}
      />
      <meshStandardMaterial
        color='blue'
      />
    </mesh>
  )
}
