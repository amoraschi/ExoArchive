import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import Planet from '@/components/three/planet'
import { RefObject } from 'react'
import { Euler, Mesh } from 'three'
import OrbitLine from './orbit-line'

const scale = 100
const inclination = - Math.PI / 4

export default function Scene ({
  star,
  planets
}: Combined) {
  const calculateMaxZoom = () => {
    return (
      planets.reduce((max, planet) => {
        const semiMajorAxis = planet.acf.pl_orbsmax ?? 10
        return Math.max(max, semiMajorAxis)
      }, 0) ?? 10
    ) * scale * 2
  }

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
    const y = z * Math.tan(inclination)

    planetRef.current.position.x = x * scale
    planetRef.current.position.z = z * scale
    planetRef.current.position.y = y * scale
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
      {/* {
        planets.map(planet => (
          <Planet
            key={planet.id}
            orbitCalculator={calculateOrbit}
            exoplanetAcf={planet.acf}
          />
        ))
      } */}
      {
        planets.map(planet => (
          <OrbitLine
            key={planet.id}
            pl_orbsmax={planet.acf.pl_orbsmax}
            pl_orbeccen={planet.acf.pl_orbeccen}
            inclination={inclination}
            scale={scale}
          />
        ))
      }
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 0]}
        far={10000}
      />
      <OrbitControls
        minDistance={50}
        maxDistance={calculateMaxZoom()}
      />
      <Environment
        files='/assets/background.jpg'
        background
        backgroundIntensity={0.25}
        backgroundRotation={new Euler(Math.PI / 4, 0, 0)}
      />
    </Canvas>
  )
}
