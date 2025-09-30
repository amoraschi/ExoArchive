import { createRef } from 'react'
import { Mesh } from 'three'
import { useFrame } from '@react-three/fiber'

interface PlanetProps {
  orbitCalculator: (planetRef: React.RefObject<Mesh>, acf: ExoplanetAcf) => void,
  exoplanetAcf: ExoplanetAcf
}

export default function Planet ({
  orbitCalculator,
  exoplanetAcf
}: PlanetProps) {
  const planetRef = createRef<Mesh>()

  useFrame(() => {
    if (planetRef.current == null) return

    // @ts-expect-error
    orbitCalculator(planetRef, exoplanetAcf)
  })

  return (
    <mesh
      ref={planetRef}
    >
      <sphereGeometry
        args={[0.5, 32, 32]}
      />
      <meshStandardMaterial
        color='blue'
        emissive='blue'
        emissiveIntensity={5}
        metalness={0.5}
        roughness={0.5}
      />
    </mesh>
  )
}
