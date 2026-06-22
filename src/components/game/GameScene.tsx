'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { ALL_COLLISION_BOXES, FURNITURE_CONFIGS, PLAYER_RADIUS, PLAYER_SPEED } from '@/data/gameConfig'
import { useGameStore } from '@/store/gameStore'
import { useKeyboardInput } from '@/hooks/useKeyboardInput'
import { Character } from './Character'
import { House } from './House'
import { CameraController } from './CameraController'
import { KitchenSink } from './furniture/KitchenSink'
import { Refrigerator } from './furniture/Refrigerator'
import { DiningTable } from './furniture/DiningTable'
import { BunkBed } from './furniture/BunkBed'
import { ComputerDesk } from './furniture/ComputerDesk'
import { Bed } from './furniture/Bed'

function checkCollision(x: number, z: number): boolean {
  const r = PLAYER_RADIUS
  return ALL_COLLISION_BOXES.some(
    (b) => x + r > b.minX && x - r < b.maxX && z + r > b.minZ && z - r < b.maxZ
  )
}

export function GameScene() {
  const { keysRef, consumeJustPressed } = useKeyboardInput()
  const posRef = useRef({ x: 0, z: -3 })
  const rotRef = useRef(0)

  useFrame((_, delta) => {
    const store = useGameStore.getState()

    // Block movement when modal is open
    if (store.activeModal) {
      if (consumeJustPressed('Escape') || consumeJustPressed('KeyE')) {
        store.closeModal()
      }
      return
    }

    // E key — open interaction
    if (consumeJustPressed('KeyE') && store.nearbyFurniture) {
      store.openModal(store.nearbyFurniture)
      return
    }
    if (consumeJustPressed('Escape')) {
      store.closeModal()
    }

    // ── Movement ──────────────────────────────────────────────
    const keys = keysRef.current
    let dx = 0
    let dz = 0

    if (keys.has('ArrowUp') || keys.has('KeyW')) dz -= 1
    if (keys.has('ArrowDown') || keys.has('KeyS')) dz += 1
    if (keys.has('ArrowLeft') || keys.has('KeyA')) dx -= 1
    if (keys.has('ArrowRight') || keys.has('KeyD')) dx += 1

    // Normalize diagonal
    const len = Math.sqrt(dx * dx + dz * dz)
    if (len > 0) {
      dx /= len
      dz /= len
    }

    const speed = PLAYER_SPEED
    const newX = posRef.current.x + dx * speed * delta
    const newZ = posRef.current.z + dz * speed * delta

    // Slide collision (check axes independently)
    const canX = !checkCollision(newX, posRef.current.z)
    const canZ = !checkCollision(posRef.current.x, newZ)

    posRef.current.x = canX ? newX : posRef.current.x
    posRef.current.z = canZ ? newZ : posRef.current.z

    const isMoving = dx !== 0 || dz !== 0

    if (isMoving) {
      rotRef.current = Math.atan2(dx, dz)
    }

    store.setPlayerState(posRef.current.x, posRef.current.z, rotRef.current, isMoving)

    // ── Proximity detection ───────────────────────────────────
    let closestId: string | null = null
    let closestDist = Infinity

    for (const f of FURNITURE_CONFIGS) {
      const dx = posRef.current.x - f.position[0]
      const dz = posRef.current.z - f.position[2]
      const dist = Math.sqrt(dx * dx + dz * dz)
      if (dist < f.interactionRadius && dist < closestDist) {
        closestDist = dist
        closestId = f.id
      }
    }

    if (closestId !== store.nearbyFurniture) {
      store.setNearbyFurniture(closestId)
    }
  })

  return (
    <>
      {/* Lighting */}
      <ambientLight color='#fff5e0' intensity={0.45} />
      <directionalLight
        position={[4, 12, 6]}
        intensity={0.85}
        color='#fff8f0'
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
      />
      {/* Room point lights */}
      <pointLight position={[0, 2.8, -3]} intensity={0.5} color='#fffbe8' />
      <pointLight position={[-4.5, 2.8, 3]} intensity={0.4} color='#fff5d8' />
      <pointLight position={[3.5, 2.8, 3]} intensity={0.4} color='#fff5d8' />

      {/* Scene */}
      <House />
      <Character />
      <CameraController />

      {/* Furniture */}
      {/* 주방싱크대: 서쪽 벽, 상단 오픈 공간 중앙 */}
      <group position={[-6.5, 0, -3]} rotation={[0, Math.PI / 2, 0]}>
        <KitchenSink />
      </group>
      {/* 냉장고: 상단 오픈 공간 좌측 내부 */}
      <group position={[-3.5, 0, -4.8]}>
        <Refrigerator />
      </group>
      {/* 거실식탁: 상단 오픈 공간 우측 */}
      <group position={[4, 0, -3]}>
        <DiningTable />
      </group>
      {/* 2층침대: 안방 (x∈[-7,-3.5]) 중앙 */}
      <group position={[-5.25, 0, 3]}>
        <BunkBed />
      </group>
      {/* 컴퓨터책상: 침실 (x∈[0,7]) 상단 우측 */}
      <group position={[4.5, 0, 1.5]} rotation={[0, Math.PI, 0]}>
        <ComputerDesk />
      </group>
      {/* 침대: 침실 하단 중앙 */}
      <group position={[3.5, 0, 4.5]}>
        <Bed />
      </group>
    </>
  )
}
