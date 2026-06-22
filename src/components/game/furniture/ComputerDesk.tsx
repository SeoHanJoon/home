'use client'

const DESK = '#6b5040'
const DESK_TOP = '#7d5e48'
const MONITOR_BODY = '#2a2a2e'
const SCREEN = '#1a2a4a'
const KEYBOARD = '#3a3a40'

export function ComputerDesk() {
  return (
    <group>
      {/* Desktop */}
      <mesh position={[0, 0.74, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.07, 0.78]} />
        <meshStandardMaterial color={DESK_TOP} roughness={0.65} />
      </mesh>

      {/* Desk legs */}
      {[[-0.72, -0.3], [-0.72, 0.3], [0.72, -0.3], [0.72, 0.3]].map(
        ([lx, lz], i) => (
          <mesh key={i} position={[lx, 0.35, lz]} castShadow>
            <cylinderGeometry args={[0.04, 0.04, 0.7, 8]} />
            <meshStandardMaterial color={DESK} roughness={0.8} />
          </mesh>
        )
      )}

      {/* Monitor stand */}
      <mesh position={[0, 0.88, 0.18]} castShadow>
        <cylinderGeometry args={[0.06, 0.1, 0.27, 8]} />
        <meshStandardMaterial color={MONITOR_BODY} roughness={0.4} />
      </mesh>

      {/* Monitor body */}
      <mesh position={[0, 1.22, 0.2]} castShadow>
        <boxGeometry args={[0.88, 0.54, 0.06]} />
        <meshStandardMaterial color={MONITOR_BODY} roughness={0.4} />
      </mesh>

      {/* Screen */}
      <mesh position={[0, 1.22, 0.24]}>
        <boxGeometry args={[0.82, 0.48, 0.01]} />
        <meshStandardMaterial color={SCREEN} roughness={0.1} emissive={SCREEN} emissiveIntensity={0.3} />
      </mesh>

      {/* Keyboard */}
      <mesh position={[0, 0.78, -0.08]} castShadow>
        <boxGeometry args={[0.55, 0.025, 0.18]} />
        <meshStandardMaterial color={KEYBOARD} roughness={0.5} />
      </mesh>

      {/* Mouse */}
      <mesh position={[0.36, 0.77, -0.06]}>
        <boxGeometry args={[0.1, 0.025, 0.14]} />
        <meshStandardMaterial color={KEYBOARD} roughness={0.4} />
      </mesh>

      {/* Desk shelf / cable management strip */}
      <mesh position={[0, 0.78, 0.32]}>
        <boxGeometry args={[1.55, 0.04, 0.08]} />
        <meshStandardMaterial color={DESK} roughness={0.7} />
      </mesh>
    </group>
  )
}
