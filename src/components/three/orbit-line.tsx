import { useMemo } from 'react'
import { Vector3 } from 'three'
import { Line } from '@react-three/drei'

interface OrbitLineProps {
  pl_orbsmax: number
  pl_orbeccen: number
  inclination: number
  scale: number
}

export default function OrbitLine ({
  pl_orbsmax,
  pl_orbeccen,
  inclination,
  scale
}: OrbitLineProps) {
  const points = useMemo(() => {
    const numSegments = 256
    const semiMajorAxis = pl_orbsmax ?? 10
    const eccentricity = pl_orbeccen ?? 0
    const orbitPoints: Vector3[] = []

    const cosInc = Math.cos(inclination)
    const sinInc = Math.sin(inclination)

    for (let i = 0; i <= numSegments; i++) {
      const theta = (i / numSegments) * 2 * Math.PI
      const x = semiMajorAxis * (Math.cos(theta) - eccentricity)
      const z = semiMajorAxis * Math.sqrt(1 - eccentricity * eccentricity) * Math.sin(theta)
      const y = z * sinInc
      const zInclined = z * cosInc
      orbitPoints.push(new Vector3(x * scale, y * scale, zInclined * scale))
    }

    return orbitPoints
  }, [pl_orbsmax, pl_orbeccen])

  return (
    <Line
      points={points}
      color='white'
      lineWidth={1}
    />
  )
}
