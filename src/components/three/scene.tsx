import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Planet from '@/components/three/planet'
import { Ref, RefObject } from 'react'
import { Mesh } from 'three'
import OrbitLine from './orbit-line'

export default function Scene ({
  star,
  planets
}: Combined) {
  const calculateOrbit = (
    planetRef: RefObject<Mesh>, {
      pl_orbsmax,
      pl_orbeccen,
      pl_orbper
    }: ExoplanetAcf
  ) => {
    const semiMajorAxis = pl_orbsmax ?? 10
    const eccentricity = pl_orbeccen
    const orbitalPeriod = pl_orbper ?? 365
    const scale = 100

    const simulationSpeed = 100000
    const time = Date.now() * 0.001
    const days = (time * simulationSpeed) / 86400
    const meanAnomaly = (2 * Math.PI * days) / orbitalPeriod

    let E = meanAnomaly
    for (let i = 0; i < 5; i++) {
      E = E - (E - eccentricity * Math.sin(E) - meanAnomaly) / (1 - eccentricity * Math.cos(E))
    }

    const x = semiMajorAxis * (Math.cos(E) - eccentricity)
    const z = semiMajorAxis * Math.sqrt(1 - eccentricity * eccentricity) * Math.sin(E)

    planetRef.current.position.x = x * scale
    planetRef.current.position.z = z * scale
  }

  return (
    <Canvas
      style={{
        height: '100vh'
      }}
    >
      <mesh>
        <sphereGeometry
          args={[1, 32, 32]}
        />
        <meshStandardMaterial
          color='orange'
          emissive='orange'
          emissiveIntensity={5}
        />
        <pointLight
          color='white'
          intensity={200}
          distance={100}
        />
      </mesh>
      {
        planets.map(planet => (
          <Planet
            key={planet.id}
            orbitCalculator={calculateOrbit}
            exoplanetAcf={planet.acf}
          />
        ))
      }
      {
        planets.map(planet => (
          <OrbitLine
            key={planet.id}
            pl_orbsmax={planet.acf.pl_orbsmax}
            pl_orbeccen={planet.acf.pl_orbeccen}
          />
        ))
      }
      <OrbitControls />
    </Canvas>
  )
}
