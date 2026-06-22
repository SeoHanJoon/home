'use client'

const FRAME = '#6b4c2a'
const HEADBOARD = '#5c3d1e'
const MATTRESS = '#ede8e0'
const BLANKET = '#8fa8c8'
const PILLOW = '#f5f0ea'

export function Bed() {
  return (
    <group>
      {/* Bed frame */}
      <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.52, 0.36, 2.3]} />
        <meshStandardMaterial color={FRAME} roughness={0.85} />
      </mesh>

      {/* Mattress */}
      <mesh position={[0, 0.46, 0.1]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.22, 2.0]} />
        <meshStandardMaterial color={MATTRESS} roughness={0.75} />
      </mesh>

      {/* Headboard */}
      <mesh position={[0, 0.62, -1.06]} castShadow>
        <boxGeometry args={[1.52, 0.78, 0.1]} />
        <meshStandardMaterial color={HEADBOARD} roughness={0.85} />
      </mesh>

      {/* Headboard panel detail */}
      <mesh position={[0, 0.62, -1.0]}>
        <boxGeometry args={[1.3, 0.6, 0.04]} />
        <meshStandardMaterial color='#7a5a30' roughness={0.7} />
      </mesh>

      {/* Blanket */}
      <mesh position={[0, 0.6, 0.3]} castShadow>
        <boxGeometry args={[1.38, 0.12, 1.5]} />
        <meshStandardMaterial color={BLANKET} roughness={0.8} />
      </mesh>

      {/* Pillow left */}
      <mesh position={[-0.3, 0.62, -0.76]} castShadow>
        <boxGeometry args={[0.52, 0.12, 0.42]} />
        <meshStandardMaterial color={PILLOW} roughness={0.7} />
      </mesh>

      {/* Pillow right */}
      <mesh position={[0.3, 0.62, -0.76]} castShadow>
        <boxGeometry args={[0.52, 0.12, 0.42]} />
        <meshStandardMaterial color={PILLOW} roughness={0.7} />
      </mesh>

      {/* Footboard */}
      <mesh position={[0, 0.42, 1.17]} castShadow>
        <boxGeometry args={[1.52, 0.48, 0.1]} />
        <meshStandardMaterial color={HEADBOARD} roughness={0.85} />
      </mesh>
    </group>
  )
}
