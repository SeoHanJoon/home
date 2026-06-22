'use client'

import * as THREE from 'three'

const FLOOR_LIVING  = '#3d2b1a'   // 거실/주방 + 침실
const FLOOR_BEDROOM = '#4a3525'   // 안방
const FLOOR_HALL    = '#3a2a18'   // 복도
const WALL          = '#e8d5b7'
const WALL_DARK     = '#d4c0a0'
const SKIRTING      = '#c8b898'
const CEIL          = '#1a1210'

function Wall({
  position,
  size,
  color = WALL,
}: {
  position: [number, number, number]
  size: [number, number, number]
  color?: string
}) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.9} />
    </mesh>
  )
}

// Door jambs for visual polish
function DoorJamb({ x, z, axis }: { x: number; z: number; axis: 'x' | 'z' }) {
  const isX = axis === 'x'
  const w = isX ? 0.14 : 0.44
  const d = isX ? 0.44 : 0.14
  return (
    <>
      <mesh position={[x + (isX ? 0 : -1.05), 1.3, z + (isX ? -1.05 : 0)]} castShadow>
        <boxGeometry args={[w, 2.6, d]} />
        <meshStandardMaterial color={SKIRTING} roughness={0.7} />
      </mesh>
      <mesh position={[x + (isX ? 0 : 1.05), 1.3, z + (isX ? 1.05 : 0)]} castShadow>
        <boxGeometry args={[w, 2.6, d]} />
        <meshStandardMaterial color={SKIRTING} roughness={0.7} />
      </mesh>
    </>
  )
}

export function House() {
  return (
    <group>
      {/* ── FLOORS ─────────────────────────────────────────────── */}
      {/* 거실/주방: x∈[-7,7], z∈[-6,0] */}
      <mesh position={[0, -0.1, -3]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14.4, 6.0]} />
        <meshStandardMaterial color={FLOOR_LIVING} roughness={0.9} />
      </mesh>

      {/* 안방: x∈[-7,-3.5], z∈[0,6] */}
      <mesh position={[-5.25, -0.1, 3]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[3.5, 6.0]} />
        <meshStandardMaterial color={FLOOR_BEDROOM} roughness={0.9} />
      </mesh>

      {/* 복도: x∈[-3.5,0], z∈[0,6] */}
      <mesh position={[-1.75, -0.1, 3]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[3.5, 6.0]} />
        <meshStandardMaterial color={FLOOR_HALL} roughness={0.85} />
      </mesh>

      {/* 침실: x∈[0,7], z∈[0,6] */}
      <mesh position={[3.5, -0.1, 3]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[7.0, 6.0]} />
        <meshStandardMaterial color={FLOOR_LIVING} roughness={0.9} />
      </mesh>

      {/* ── OUTER WALLS ────────────────────────────────────────── */}
      {/* North: left of 나가는문 (gap x∈[-1,1]) */}
      <Wall position={[-4.2, 1.5, -6.2]} size={[6.0, 3.0, 0.38]} />
      <Wall position={[4.2, 1.5, -6.2]}  size={[6.0, 3.0, 0.38]} />
      {/* 나가는문 lintel */}
      <Wall position={[0, 2.72, -6.2]} size={[2.1, 0.56, 0.38]} color={WALL_DARK} />
      {/* South */}
      <Wall position={[0, 1.5, 6.2]} size={[14.4, 3.0, 0.38]} />
      {/* West */}
      <Wall position={[-7.2, 1.5, 0]} size={[0.38, 3.0, 12.8]} />
      {/* East */}
      <Wall position={[7.2, 1.5, 0]} size={[0.38, 3.0, 12.8]} />

      {/* ── MIDDLE HORIZONTAL WALL (z=0): doorway x∈[-3.5,0] ── */}
      {/* left segment: x∈[-7,-3.5]  center=(-5.25) width=3.5 */}
      <Wall position={[-5.25, 1.5, 0]} size={[3.5, 3.0, 0.32]} />
      {/* right segment: x∈[0,7]  center=3.5 width=7 */}
      <Wall position={[3.5, 1.5, 0]}   size={[7.0, 3.0, 0.32]} />

      {/* ── x=-3.5 WALL: 안방 east / 복도 west (door z∈[2,4]) ── */}
      {/* top segment: z∈[0,2] */}
      <Wall position={[-3.5, 1.5, 1.0]} size={[0.32, 3.0, 2.0]} />
      {/* bottom segment: z∈[4,6.2] */}
      <Wall position={[-3.5, 1.5, 5.1]} size={[0.32, 3.0, 2.2]} />

      {/* ── x=0 WALL: 복도 east / 침실 west (door z∈[2,4]) ───── */}
      {/* top segment: z∈[0,2] */}
      <Wall position={[0.0, 1.5, 1.0]} size={[0.32, 3.0, 2.0]} />
      {/* bottom segment: z∈[4,6.2] */}
      <Wall position={[0.0, 1.5, 5.1]} size={[0.32, 3.0, 2.2]} />

      {/* ── DOOR JAMBS ─────────────────────────────────────────── */}
      {/* 나가는문 (north wall, axis=z) */}
      <mesh position={[-1.12, 1.3, -6.1]} castShadow>
        <boxGeometry args={[0.12, 2.6, 0.44]} />
        <meshStandardMaterial color={SKIRTING} roughness={0.7} />
      </mesh>
      <mesh position={[1.12, 1.3, -6.1]} castShadow>
        <boxGeometry args={[0.12, 2.6, 0.44]} />
        <meshStandardMaterial color={SKIRTING} roughness={0.7} />
      </mesh>

      {/* 안방↔복도 door jambs (x=-3.5 wall, z=2 and z=4) */}
      <mesh position={[-3.5, 1.3, 2.0]} castShadow>
        <boxGeometry args={[0.44, 2.6, 0.12]} />
        <meshStandardMaterial color={SKIRTING} roughness={0.7} />
      </mesh>
      <mesh position={[-3.5, 1.3, 4.0]} castShadow>
        <boxGeometry args={[0.44, 2.6, 0.12]} />
        <meshStandardMaterial color={SKIRTING} roughness={0.7} />
      </mesh>

      {/* 복도↔침실 door jambs (x=0 wall, z=2 and z=4) */}
      <mesh position={[0.0, 1.3, 2.0]} castShadow>
        <boxGeometry args={[0.44, 2.6, 0.12]} />
        <meshStandardMaterial color={SKIRTING} roughness={0.7} />
      </mesh>
      <mesh position={[0.0, 1.3, 4.0]} castShadow>
        <boxGeometry args={[0.44, 2.6, 0.12]} />
        <meshStandardMaterial color={SKIRTING} roughness={0.7} />
      </mesh>

      {/* ── SKIRTING BOARDS ────────────────────────────────────── */}
      <Wall position={[-7.06, 0.12, 0]}  size={[0.06, 0.24, 12.4]} color={SKIRTING} />
      <Wall position={[7.06, 0.12, 0]}   size={[0.06, 0.24, 12.4]} color={SKIRTING} />
      <Wall position={[0, 0.12, 6.06]}   size={[14.4, 0.24, 0.06]} color={SKIRTING} />
      <Wall position={[-4.2, 0.12, -6.06]} size={[6.0, 0.24, 0.06]} color={SKIRTING} />
      <Wall position={[4.2, 0.12, -6.06]}  size={[6.0, 0.24, 0.06]} color={SKIRTING} />

      {/* ── CEILING (dark panels) ──────────────────────────────── */}
      {/* 거실/주방 */}
      <mesh position={[0, 3.02, -3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14.4, 6.0]} />
        <meshStandardMaterial color={CEIL} roughness={1.0} side={THREE.BackSide} />
      </mesh>
      {/* 안방 */}
      <mesh position={[-5.25, 3.02, 3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.5, 6.0]} />
        <meshStandardMaterial color={CEIL} roughness={1.0} side={THREE.BackSide} />
      </mesh>
      {/* 복도 */}
      <mesh position={[-1.75, 3.02, 3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.5, 6.0]} />
        <meshStandardMaterial color={CEIL} roughness={1.0} side={THREE.BackSide} />
      </mesh>
      {/* 침실 */}
      <mesh position={[3.5, 3.02, 3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[7.0, 6.0]} />
        <meshStandardMaterial color={CEIL} roughness={1.0} side={THREE.BackSide} />
      </mesh>
    </group>
  )
}
