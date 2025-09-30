import { useMemo } from 'react'
import { Vector3 } from 'three'
import { Line } from '@react-three/drei'

interface OrbitLineProps {
  pl_orbsmax: number
  pl_orbeccen: number
}

export default function OrbitLine ({
  pl_orbsmax,
  pl_orbeccen
}: OrbitLineProps) {
  const points = useMemo(() => {
    const numSegments = 256
    const semiMajorAxis = pl_orbsmax ?? 10
    const eccentricity = pl_orbeccen ?? 0
    const orbitPoints: Vector3[] = []

    for (let i = 0; i <= numSegments; i++) {
      const theta = (i / numSegments) * 2 * Math.PI

      const scale = 100
      const x = semiMajorAxis * (Math.cos(theta) - eccentricity)
      const z = semiMajorAxis * Math.sqrt(1 - eccentricity * eccentricity) * Math.sin(theta)

      orbitPoints.push(new Vector3(x * scale, 0, z * scale))
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
