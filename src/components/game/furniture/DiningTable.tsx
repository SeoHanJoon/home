'use client'

const TABLE_WOOD = '#8B5E3C'
const TABLE_TOP = '#a06838'
const CHAIR_WOOD = '#7a5230'

function Chair({ x, z, ry }: { x: number; z: number; ry: number }) {
  return (
    <group position={[x, 0, z]} rotation={[0, ry, 0]}>
      {/* Seat */}
      <mesh position={[0, 0.44, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.46, 0.06, 0.46]} />
        <meshStandardMaterial color={CHAIR_WOOD} roughness={0.8} />
      </mesh>
      {/* Backrest */}
      <mesh position={[0, 0.78, -0.2]} castShadow>
        <boxGeometry args={[0.46, 0.6, 0.06]} />
        <meshStandardMaterial color={CHAIR_WOOD} roughness={0.8} />
      </mesh>
      {/* Legs */}
      {[[-0.18, -0.18], [-0.18, 0.18], [0.18, -0.18], [0.18, 0.18]].map(
        ([lx, lz], i) => (
          <mesh key={i} position={[lx, 0.21, lz]} castShadow>
            <cylinderGeometry args={[0.025, 0.025, 0.42, 6]} />
            <meshStandardMaterial color={CHAIR_WOOD} roughness={0.8} />
          </mesh>
        )
      )}
    </group>
  )
}

export function DiningTable() {
  return (
    <group>
      {/* Table top */}
      <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.1, 0.08, 1.2]} />
        <meshStandardMaterial color={TABLE_TOP} roughness={0.6} />
      </mesh>

      {/* Table legs */}
      {[[-0.85, -0.45], [-0.85, 0.45], [0.85, -0.45], [0.85, 0.45]].map(
        ([lx, lz], i) => (
          <mesh key={i} position={[lx, 0.38, lz]} castShadow>
            <cylinderGeometry args={[0.055, 0.055, 0.76, 8]} />
            <meshStandardMaterial color={TABLE_WOOD} roughness={0.8} />
          </mesh>
        )
      )}

      {/* Chairs — 2 on each long side, 1 on each short side */}
      <Chair x={0} z={-0.9} ry={0} />
      <Chair x={0} z={0.9} ry={Math.PI} />
      <Chair x={-1.1} z={0} ry={Math.PI / 2} />
      <Chair x={1.1} z={0} ry={-Math.PI / 2} />
    </group>
  )
}
