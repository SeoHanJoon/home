'use client'

const FRAME = '#5c3d1e'
const MATTRESS_LO = '#e8e0d5'
const MATTRESS_HI = '#d5e0e8'
const RAIL = '#4a3018'

export function BunkBed() {
  return (
    <group>
      {/* Four corner posts */}
      {[[-0.9, -0.42], [-0.9, 0.42], [0.9, -0.42], [0.9, 0.42]].map(
        ([px, pz], i) => (
          <mesh key={i} position={[px, 1.0, pz]} castShadow>
            <cylinderGeometry args={[0.06, 0.06, 2.0, 8]} />
            <meshStandardMaterial color={FRAME} roughness={0.85} />
          </mesh>
        )
      )}

      {/* Lower bed slats */}
      <mesh position={[0, 0.42, 0]} receiveShadow>
        <boxGeometry args={[1.85, 0.08, 0.88]} />
        <meshStandardMaterial color={FRAME} roughness={0.9} />
      </mesh>

      {/* Lower mattress */}
      <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.75, 0.18, 0.82]} />
        <meshStandardMaterial color={MATTRESS_LO} roughness={0.7} />
      </mesh>

      {/* Lower pillow */}
      <mesh position={[-0.55, 0.66, 0]} castShadow>
        <boxGeometry args={[0.55, 0.1, 0.36]} />
        <meshStandardMaterial color='#f5f0ea' roughness={0.7} />
      </mesh>

      {/* Upper bed slats */}
      <mesh position={[0, 1.42, 0]} receiveShadow>
        <boxGeometry args={[1.85, 0.08, 0.88]} />
        <meshStandardMaterial color={FRAME} roughness={0.9} />
      </mesh>

      {/* Upper mattress */}
      <mesh position={[0, 1.55, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.75, 0.18, 0.82]} />
        <meshStandardMaterial color={MATTRESS_HI} roughness={0.7} />
      </mesh>

      {/* Upper pillow */}
      <mesh position={[-0.55, 1.67, 0]} castShadow>
        <boxGeometry args={[0.55, 0.1, 0.36]} />
        <meshStandardMaterial color='#eaf0f5' roughness={0.7} />
      </mesh>

      {/* Safety rail (upper) */}
      <mesh position={[0.88, 1.82, 0]} castShadow>
        <boxGeometry args={[0.05, 0.3, 0.88]} />
        <meshStandardMaterial color={RAIL} roughness={0.8} />
      </mesh>

      {/* Ladder rungs (right side) */}
      {[0.52, 0.82, 1.12, 1.42].map((y, i) => (
        <mesh key={i} position={[0.96, y, 0]} castShadow>
          <boxGeometry args={[0.05, 0.05, 0.5]} />
          <meshStandardMaterial color={FRAME} roughness={0.8} />
        </mesh>
      ))}

      {/* Ladder side rails */}
      <mesh position={[0.94, 0.8, 0.22]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 1.2, 6]} />
        <meshStandardMaterial color={FRAME} roughness={0.8} />
      </mesh>
      <mesh position={[0.94, 0.8, -0.22]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 1.2, 6]} />
        <meshStandardMaterial color={FRAME} roughness={0.8} />
      </mesh>
    </group>
  )
}
