'use client'

const FRAME = '#5c3d1e'
const MATTRESS_LO = '#e8e0d5'
const MATTRESS_HI = '#d5e0e8'
const RAIL = '#4a3018'

// Width (x): 3.6  Depth (z): 1.8  Height: 2.4
const W = 1.8   // half-width
const D = 0.9   // half-depth

export function BunkBed() {
  return (
    <group>
      {/* Four corner posts */}
      {[[-W, -D], [-W, D], [W, -D], [W, D]].map(([px, pz], i) => (
        <mesh key={i} position={[px, 1.2, pz]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 2.4, 8]} />
          <meshStandardMaterial color={FRAME} roughness={0.85} />
        </mesh>
      ))}

      {/* Lower bed slats */}
      <mesh position={[0, 0.46, 0]} receiveShadow>
        <boxGeometry args={[W * 2, 0.1, D * 2]} />
        <meshStandardMaterial color={FRAME} roughness={0.9} />
      </mesh>

      {/* Lower mattress */}
      <mesh position={[0, 0.64, 0]} castShadow receiveShadow>
        <boxGeometry args={[W * 2 - 0.16, 0.24, D * 2 - 0.12]} />
        <meshStandardMaterial color={MATTRESS_LO} roughness={0.7} />
      </mesh>

      {/* Lower pillow */}
      <mesh position={[-1.0, 0.8, 0]} castShadow>
        <boxGeometry args={[0.75, 0.13, 0.52]} />
        <meshStandardMaterial color='#f5f0ea' roughness={0.7} />
      </mesh>

      {/* Upper bed slats */}
      <mesh position={[0, 1.58, 0]} receiveShadow>
        <boxGeometry args={[W * 2, 0.1, D * 2]} />
        <meshStandardMaterial color={FRAME} roughness={0.9} />
      </mesh>

      {/* Upper mattress */}
      <mesh position={[0, 1.76, 0]} castShadow receiveShadow>
        <boxGeometry args={[W * 2 - 0.16, 0.24, D * 2 - 0.12]} />
        <meshStandardMaterial color={MATTRESS_HI} roughness={0.7} />
      </mesh>

      {/* Upper pillow */}
      <mesh position={[-1.0, 1.92, 0]} castShadow>
        <boxGeometry args={[0.75, 0.13, 0.52]} />
        <meshStandardMaterial color='#eaf0f5' roughness={0.7} />
      </mesh>

      {/* Safety rail (upper, +x side = room-facing side after rotation) */}
      <mesh position={[W, 2.06, 0]} castShadow>
        <boxGeometry args={[0.07, 0.38, D * 2]} />
        <meshStandardMaterial color={RAIL} roughness={0.8} />
      </mesh>

      {/* Ladder rungs */}
      {[0.60, 0.96, 1.32, 1.68].map((y, i) => (
        <mesh key={i} position={[W + 0.07, y, 0]} castShadow>
          <boxGeometry args={[0.07, 0.07, 0.62]} />
          <meshStandardMaterial color={FRAME} roughness={0.8} />
        </mesh>
      ))}

      {/* Ladder side rails */}
      <mesh position={[W + 0.06, 1.0, 0.29]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 1.44, 6]} />
        <meshStandardMaterial color={FRAME} roughness={0.8} />
      </mesh>
      <mesh position={[W + 0.06, 1.0, -0.29]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 1.44, 6]} />
        <meshStandardMaterial color={FRAME} roughness={0.8} />
      </mesh>
    </group>
  )
}
