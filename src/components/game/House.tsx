'use client'

import { useMemo } from 'react'
import * as THREE from 'three'

const FLOOR_COLOR = '#3d2b1a'
const WALL_COLOR = '#e8d5b7'
const WALL_SHADOW = '#d4c0a0'
const FLOOR_ROOM = '#4a3525'
const SKIRTING = '#c8b898'

function Wall({
  position,
  size,
  color = WALL_COLOR,
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

export function House() {
  const floorTexture = useMemo(() => {
    // Simple repeating wood grain visual via vertex colors (no actual texture file needed)
    return null
  }, [])

  return (
    <group>
      {/* ── FLOOR ───────────────────────────────────────── */}
      {/* Main floor tile (거실/주방) */}
      <mesh position={[0, -0.1, -3]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14.8, 6.2]} />
        <meshStandardMaterial color={FLOOR_COLOR} roughness={0.9} />
      </mesh>

      {/* 안방 floor x∈[-7,-3.5] z∈[0,6] */}
      <mesh position={[-5.25, -0.1, 3]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[3.5, 6.0]} />
        <meshStandardMaterial color={FLOOR_ROOM} roughness={0.9} />
      </mesh>

      {/* Central sealed area floor x∈[-3.5,0] z∈[0,6] — darker, inaccessible */}
      <mesh position={[-1.75, -0.1, 3]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[3.5, 6.0]} />
        <meshStandardMaterial color='#2a1e12' roughness={0.95} />
      </mesh>

      {/* 침실 floor x∈[0,7] z∈[0,6] */}
      <mesh position={[3.5, -0.1, 3]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[7.0, 6.0]} />
        <meshStandardMaterial color={FLOOR_COLOR} roughness={0.9} />
      </mesh>

      {/* ── OUTER WALLS ─────────────────────────────────── */}
      {/* North wall — left of door (door: x ∈ [-1, 1]) */}
      <Wall position={[-4.2, 1.5, -6.2]} size={[6.0, 3.0, 0.38]} />
      {/* North wall — right of door */}
      <Wall position={[4.2, 1.5, -6.2]} size={[6.0, 3.0, 0.38]} />

      {/* Door frame top lintel */}
      <Wall position={[0, 2.7, -6.2]} size={[2.1, 0.6, 0.38]} color={WALL_SHADOW} />

      {/* South wall */}
      <Wall position={[0, 1.5, 6.2]} size={[14.8, 3.0, 0.38]} />

      {/* West wall */}
      <Wall position={[-7.2, 1.5, 0]} size={[0.38, 3.0, 12.8]} />

      {/* East wall */}
      <Wall position={[7.2, 1.5, 0]} size={[0.38, 3.0, 12.8]} />

      {/* ── MIDDLE HORIZONTAL WALL (z=0) ────────────────── */}
      {/* Left doorway: x∈[-5,-3.5] → 안방  Right doorway: x∈[0,1.5] → 침실 */}
      {/* Left segment: x∈[-7,-5] */}
      <Wall position={[-6.0, 1.5, 0]} size={[2.0, 3.0, 0.32]} />
      {/* Center segment: x∈[-3.5,0] (above sealed central area) */}
      <Wall position={[-1.75, 1.5, 0]} size={[3.5, 3.0, 0.32]} />
      {/* Right segment: x∈[1.5,7] */}
      <Wall position={[4.25, 1.5, 0]} size={[5.5, 3.0, 0.32]} />

      {/* ── INNER VERTICAL WALLS (lower section) ──────── */}
      {/* x=-3.5: right wall of 안방 / left wall of sealed central, z∈[0,6.2] */}
      <Wall position={[-3.5, 1.5, 3.1]} size={[0.32, 3.0, 6.2]} />
      {/* x=0: right wall of sealed central / left wall of 침실, z∈[0,6.2] */}
      <Wall position={[0.0, 1.5, 3.1]} size={[0.32, 3.0, 6.2]} />

      {/* ── SKIRTING BOARDS (decorative trim) ────────────── */}
      <Wall position={[-7.06, 0.12, 0]} size={[0.06, 0.24, 12.4]} color={SKIRTING} />
      <Wall position={[7.06, 0.12, 0]} size={[0.06, 0.24, 12.4]} color={SKIRTING} />
      <Wall position={[0, 0.12, 6.06]} size={[14.4, 0.24, 0.06]} color={SKIRTING} />
      <Wall position={[-4.2, 0.12, -6.06]} size={[6.0, 0.24, 0.06]} color={SKIRTING} />
      <Wall position={[4.2, 0.12, -6.06]} size={[6.0, 0.24, 0.06]} color={SKIRTING} />

      {/* ── DOOR FRAME (나가는문) ─────────────────────────── */}
      {/* Left jamb */}
      <mesh position={[-1.12, 1.3, -6.1]} castShadow>
        <boxGeometry args={[0.12, 2.6, 0.44]} />
        <meshStandardMaterial color={SKIRTING} roughness={0.7} />
      </mesh>
      {/* Right jamb */}
      <mesh position={[1.12, 1.3, -6.1]} castShadow>
        <boxGeometry args={[0.12, 2.6, 0.44]} />
        <meshStandardMaterial color={SKIRTING} roughness={0.7} />
      </mesh>

      {/* ── CEILING PANELS (dark) ─────────────────────────── */}
      {/* 거실/주방 ceiling */}
      <mesh position={[0, 3.02, -3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14.4, 6.0]} />
        <meshStandardMaterial color='#1a1210' roughness={1.0} side={THREE.BackSide} />
      </mesh>
      {/* 안방 ceiling x∈[-7,-3.5] */}
      <mesh position={[-5.25, 3.02, 3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.5, 6.0]} />
        <meshStandardMaterial color='#1a1210' roughness={1.0} side={THREE.BackSide} />
      </mesh>
      {/* Central sealed ceiling x∈[-3.5,0] */}
      <mesh position={[-1.75, 3.02, 3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.5, 6.0]} />
        <meshStandardMaterial color='#0e0c08' roughness={1.0} side={THREE.BackSide} />
      </mesh>
      {/* 침실 ceiling x∈[0,7] */}
      <mesh position={[3.5, 3.02, 3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[7.0, 6.0]} />
        <meshStandardMaterial color='#1a1210' roughness={1.0} side={THREE.BackSide} />
      </mesh>
    </group>
  )
}
