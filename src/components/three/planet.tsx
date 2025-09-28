import { createRef } from 'react'
import { Mesh } from 'three'
import { useFrame } from '@react-three/fiber'

interface PlanetProps {
  position: [number, number, number]
}

export default function Planet ({
  position
}: PlanetProps) {
  const planetRef = createRef<Mesh>()

  useFrame(() => {
    if (planetRef.current == null) return
    const time = Date.now() * 0.001
    const radius = 5
    planetRef.current.position.x = Math.cos(time) * radius
    planetRef.current.position.z = Math.sin(time) * radius
  })

  return (
    <mesh
      ref={planetRef}
      position={position}
    >
      <sphereGeometry
        args={[0.5, 32, 32]}
      />
      <meshStandardMaterial
        color='blue'
      />
      <pointLight
        color='blue'
        intensity={1}
        distance={5}
      />
    </mesh>
  )
}
