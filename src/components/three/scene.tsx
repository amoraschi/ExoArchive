import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Planet from '@/components/three/planet'

export default function Scene () {
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
          emissiveIntensity={0.5}
        />
        <pointLight
          color='white'
          intensity={200}
          distance={100}
        />
      </mesh>
      <Planet />
      <OrbitControls />
    </Canvas>
  )
}
