'use client'

import * as THREE from 'three'

const FLOOR_LIVING  = '#3d2b1a'
const FLOOR_BEDROOM = '#4a3525'
const FLOOR_ROOM2   = '#3e2c1e'
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

// Thin door jamb post
function Jamb({ x, y, z, w, h, d }: { x: number; y: number; z: number; w: number; h: number; d: number }) {
  return (
    <mesh position={[x, y, z]} castShadow>
      <boxGeometry args={[w, h, d]} />
      <meshStandardMaterial color={SKIRTING} roughness={0.7} />
    </mesh>
  )
}

export function House() {
  return (
    <group>
      {/* ── FLOORS ─────────────────────────────────────────────────────────── */}
      {/* 거실/주방: x∈[-7,7], z∈[-6,0] */}
      <mesh position={[0, -0.1, -3]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14.4, 6.0]} />
        <meshStandardMaterial color={FLOOR_LIVING} roughness={0.9} />
      </mesh>

      {/* 안방: x∈[-7,-2], z∈[0,6], center=(-4.5, 3) */}
      <mesh position={[-4.5, -0.1, 3]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[5.0, 6.0]} />
        <meshStandardMaterial color={FLOOR_BEDROOM} roughness={0.9} />
      </mesh>

      {/* 침실: x∈[-2,7], z∈[0,6], center=(2.5, 3) */}
      <mesh position={[2.5, -0.1, 3]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[9.0, 6.0]} />
        <meshStandardMaterial color={FLOOR_ROOM2} roughness={0.9} />
      </mesh>

      {/* ── OUTER WALLS ────────────────────────────────────────────────────── */}
      {/* North — 나가는문 gap x∈[-1,1] */}
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

      {/* ── MIDDLE HORIZONTAL WALL (z=0) ───────────────────────────────────── */}
      {/* 안방 문: x∈[-5.5,-2]  침실 문: x∈[-2,0]  (x=-2 = dividing wall post) */}
      {/* Left solid: x∈[-7,-5.5] */}
      <Wall position={[-6.25, 1.5, 0]} size={[1.5, 3.0, 0.32]} />
      {/* Right solid: x∈[0,7] */}
      <Wall position={[3.5, 1.5, 0]}   size={[7.0, 3.0, 0.32]} />

      {/* ── DIVIDING WALL: x=-2, z∈[0,6] (안방 | 침실, 문 없음) ───────────── */}
      <Wall position={[-2.0, 1.5, 3.0]} size={[0.32, 3.0, 6.0]} />

      {/* ── DOOR JAMBS ─────────────────────────────────────────────────────── */}
      {/* 나가는문 jambs */}
      <Jamb x={-1.12} y={1.3} z={-6.1} w={0.12} h={2.6} d={0.44} />
      <Jamb x={ 1.12} y={1.3} z={-6.1} w={0.12} h={2.6} d={0.44} />

      {/* 안방 문 jambs (left side x=-5.5, right side = dividing wall at x=-2) */}
      <Jamb x={-5.5} y={1.3} z={0.0} w={0.12} h={2.6} d={0.44} />
      {/* x=-2 post is provided by dividing wall itself */}

      {/* 침실 문 right jamb x=0 (left jamb = dividing wall at x=-2) */}
      <Jamb x={0.0} y={1.3} z={0.0} w={0.12} h={2.6} d={0.44} />

      {/* ── SKIRTING BOARDS ─────────────────────────────────────────────────── */}
      <Wall position={[-7.06, 0.12, 0]}   size={[0.06, 0.24, 12.4]} color={SKIRTING} />
      <Wall position={[7.06, 0.12, 0]}    size={[0.06, 0.24, 12.4]} color={SKIRTING} />
      <Wall position={[0, 0.12, 6.06]}    size={[14.4, 0.24, 0.06]} color={SKIRTING} />
      <Wall position={[-4.2, 0.12, -6.06]} size={[6.0, 0.24, 0.06]} color={SKIRTING} />
      <Wall position={[4.2, 0.12, -6.06]}  size={[6.0, 0.24, 0.06]} color={SKIRTING} />

      {/* ── CEILING ──────────────────────────────────────────────────────────── */}
      {/* 거실/주방 */}
      <mesh position={[0, 3.02, -3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14.4, 6.0]} />
        <meshStandardMaterial color={CEIL} roughness={1.0} side={THREE.BackSide} />
      </mesh>
      {/* 안방 */}
      <mesh position={[-4.5, 3.02, 3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5.0, 6.0]} />
        <meshStandardMaterial color={CEIL} roughness={1.0} side={THREE.BackSide} />
      </mesh>
      {/* 침실 */}
      <mesh position={[2.5, 3.02, 3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[9.0, 6.0]} />
        <meshStandardMaterial color={CEIL} roughness={1.0} side={THREE.BackSide} />
      </mesh>
    </group>
  )
}
