'use client'

const BODY = '#dddbd5'
const TRIM = '#b8b6b0'
const HANDLE = '#888880'
const ACCENT = '#c0beb8'

export function Refrigerator() {
  return (
    <group>
      {/* Main body */}
      <mesh position={[0, 0.95, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.85, 1.9, 0.72]} />
        <meshStandardMaterial color={BODY} roughness={0.4} />
      </mesh>

      {/* Top freezer door line */}
      <mesh position={[0, 1.42, 0.365]}>
        <boxGeometry args={[0.86, 0.02, 0.01]} />
        <meshStandardMaterial color={TRIM} roughness={0.3} />
      </mesh>

      {/* Freezer section (top ~35%) */}
      <mesh position={[0, 1.62, 0.37]}>
        <boxGeometry args={[0.84, 0.56, 0.01]} />
        <meshStandardMaterial color={ACCENT} roughness={0.35} />
      </mesh>

      {/* Main door (bottom ~65%) */}
      <mesh position={[0, 0.78, 0.37]}>
        <boxGeometry args={[0.84, 1.1, 0.01]} />
        <meshStandardMaterial color={ACCENT} roughness={0.35} />
      </mesh>

      {/* Upper handle */}
      <mesh position={[0.3, 1.62, 0.41]} castShadow>
        <cylinderGeometry args={[0.022, 0.022, 0.38, 8]} />
        <meshStandardMaterial color={HANDLE} roughness={0.2} metalness={0.7} />
      </mesh>

      {/* Lower handle */}
      <mesh position={[0.3, 0.9, 0.41]} castShadow>
        <cylinderGeometry args={[0.022, 0.022, 0.55, 8]} />
        <meshStandardMaterial color={HANDLE} roughness={0.2} metalness={0.7} />
      </mesh>
    </group>
  )
}
