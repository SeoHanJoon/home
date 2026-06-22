'use client'

const FRAME = '#5c3d1e'
const MATTRESS_LO = '#e8e0d5'
const MATTRESS_HI = '#d5e0e8'
const RAIL = '#4a3018'

// Width (x): 2.8  Depth (z): 1.3  Height: 2.2
const W = 1.4   // half-width
const D = 0.65  // half-depth

export function BunkBed() {
  return (
    <group>
      {/* Four corner posts */}
      {[[-W, -D], [-W, D], [W, -D], [W, D]].map(([px, pz], i) => (
        <mesh key={i} position={[px, 1.1, pz]} castShadow>
          <cylinderGeometry args={[0.07, 0.07, 2.2, 8]} />
          <meshStandardMaterial color={FRAME} roughness={0.85} />
        </mesh>
      ))}

      {/* Lower bed slats */}
      <mesh position={[0, 0.46, 0]} receiveShadow>
        <boxGeometry args={[W * 2, 0.09, D * 2]} />
        <meshStandardMaterial color={FRAME} roughness={0.9} />
      </mesh>

      {/* Lower mattress */}
      <mesh position={[0, 0.62, 0]} castShadow receiveShadow>
        <boxGeometry args={[W * 2 - 0.14, 0.22, D * 2 - 0.1]} />
        <meshStandardMaterial color={MATTRESS_LO} roughness={0.7} />
      </mesh>

      {/* Lower pillow */}
      <mesh position={[-0.75, 0.76, 0]} castShadow>
        <boxGeometry args={[0.65, 0.12, 0.48]} />
        <meshStandardMaterial color='#f5f0ea' roughness={0.7} />
      </mesh>

      {/* Upper bed slats */}
      <mesh position={[0, 1.56, 0]} receiveShadow>
        <boxGeometry args={[W * 2, 0.09, D * 2]} />
        <meshStandardMaterial color={FRAME} roughness={0.9} />
      </mesh>

      {/* Upper mattress */}
      <mesh position={[0, 1.72, 0]} castShadow receiveShadow>
        <boxGeometry args={[W * 2 - 0.14, 0.22, D * 2 - 0.1]} />
        <meshStandardMaterial color={MATTRESS_HI} roughness={0.7} />
      </mesh>

      {/* Upper pillow */}
      <mesh position={[-0.75, 1.88, 0]} castShadow>
        <boxGeometry args={[0.65, 0.12, 0.48]} />
        <meshStandardMaterial color='#eaf0f5' roughness={0.7} />
      </mesh>

      {/* Safety rail (upper, right side) */}
      <mesh position={[W, 2.0, 0]} castShadow>
        <boxGeometry args={[0.06, 0.36, D * 2]} />
        <meshStandardMaterial color={RAIL} roughness={0.8} />
      </mesh>

      {/* Ladder rungs */}
      {[0.58, 0.92, 1.26, 1.60].map((y, i) => (
        <mesh key={i} position={[W + 0.06, y, 0]} castShadow>
          <boxGeometry args={[0.06, 0.06, 0.56]} />
          <meshStandardMaterial color={FRAME} roughness={0.8} />
        </mesh>
      ))}

      {/* Ladder side rails */}
      <mesh position={[W + 0.05, 0.95, 0.26]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 1.32, 6]} />
        <meshStandardMaterial color={FRAME} roughness={0.8} />
      </mesh>
      <mesh position={[W + 0.05, 0.95, -0.26]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 1.32, 6]} />
        <meshStandardMaterial color={FRAME} roughness={0.8} />
      </mesh>
    </group>
  )
}
