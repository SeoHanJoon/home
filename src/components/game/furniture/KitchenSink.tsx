'use client'

const WOOD = '#7a5c3a'
const COUNTER = '#c8c2b8'
const BASIN = '#4a4a52'
const METAL = '#a8a8b0'

export function KitchenSink() {
  return (
    <group>
      {/* Cabinet body */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.9, 0.62]} />
        <meshStandardMaterial color={WOOD} roughness={0.85} />
      </mesh>

      {/* Counter top */}
      <mesh position={[0, 0.92, 0.02]} castShadow receiveShadow>
        <boxGeometry args={[1.62, 0.06, 0.66]} />
        <meshStandardMaterial color={COUNTER} roughness={0.5} />
      </mesh>

      {/* Basin */}
      <mesh position={[0, 0.91, 0]}>
        <boxGeometry args={[0.7, 0.04, 0.42]} />
        <meshStandardMaterial color={BASIN} roughness={0.3} metalness={0.4} />
      </mesh>

      {/* Basin inside */}
      <mesh position={[0, 0.84, 0]}>
        <boxGeometry args={[0.66, 0.12, 0.38]} />
        <meshStandardMaterial color={BASIN} roughness={0.3} metalness={0.4} />
      </mesh>

      {/* Faucet post */}
      <mesh position={[0, 1.18, -0.12]} castShadow>
        <cylinderGeometry args={[0.025, 0.028, 0.52, 8]} />
        <meshStandardMaterial color={METAL} roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Faucet neck (horizontal) */}
      <mesh position={[0, 1.38, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.32, 8]} />
        <meshStandardMaterial color={METAL} roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Cabinet door lines */}
      <mesh position={[-0.41, 0.44, 0.312]}>
        <boxGeometry args={[0.72, 0.76, 0.01]} />
        <meshStandardMaterial color='#5e4228' roughness={0.9} />
      </mesh>
      <mesh position={[0.41, 0.44, 0.312]}>
        <boxGeometry args={[0.72, 0.76, 0.01]} />
        <meshStandardMaterial color='#5e4228' roughness={0.9} />
      </mesh>
    </group>
  )
}
