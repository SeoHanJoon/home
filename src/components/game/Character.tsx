'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useGameStore } from '@/store/gameStore'

const CHALK = '#F5F2EC'
const DARK = '#1a1a2e'

export function Character() {
  const groupRef = useRef<THREE.Group>(null)
  const leftLegRef = useRef<THREE.Group>(null)
  const rightLegRef = useRef<THREE.Group>(null)
  const leftArmRef = useRef<THREE.Group>(null)
  const rightArmRef = useRef<THREE.Group>(null)
  const targetRotRef = useRef(0)

  useFrame((state) => {
    const { playerX, playerZ, playerRotation, isMoving } = useGameStore.getState()
    const t = state.clock.elapsedTime

    if (!groupRef.current) return

    // Position
    groupRef.current.position.x = playerX
    groupRef.current.position.z = playerZ

    // Smooth Y rotation — handle angle wrapping
    targetRotRef.current = playerRotation
    const cur = groupRef.current.rotation.y
    const diff = ((targetRotRef.current - cur + Math.PI) % (Math.PI * 2)) - Math.PI
    groupRef.current.rotation.y += diff * 0.14

    // Bob
    groupRef.current.position.y = isMoving
      ? Math.sin(t * 10) * 0.025
      : Math.sin(t * 1.8) * 0.008

    // Walk swing
    const swing = isMoving ? Math.sin(t * 10) * 0.5 : 0
    const targetSwing = swing
    if (leftLegRef.current)
      leftLegRef.current.rotation.x = THREE.MathUtils.lerp(leftLegRef.current.rotation.x, targetSwing, 0.25)
    if (rightLegRef.current)
      rightLegRef.current.rotation.x = THREE.MathUtils.lerp(rightLegRef.current.rotation.x, -targetSwing, 0.25)
    if (leftArmRef.current)
      leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, -swing * 0.55, 0.25)
    if (rightArmRef.current)
      rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, swing * 0.55, 0.25)
  })

  return (
    <group ref={groupRef}>
      {/* Body */}
      <mesh position={[0, 0.925, 0]} castShadow>
        <cylinderGeometry args={[0.17, 0.22, 0.65, 10]} />
        <meshStandardMaterial color={CHALK} roughness={0.88} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.47, 0]} castShadow>
        <sphereGeometry args={[0.22, 16, 12]} />
        <meshStandardMaterial color={CHALK} roughness={0.88} />
      </mesh>

      {/* Eye left */}
      <mesh position={[-0.09, 1.52, 0.19]}>
        <sphereGeometry args={[0.038, 8, 8]} />
        <meshStandardMaterial color={DARK} roughness={0.5} />
      </mesh>

      {/* Eye right */}
      <mesh position={[0.09, 1.52, 0.19]}>
        <sphereGeometry args={[0.038, 8, 8]} />
        <meshStandardMaterial color={DARK} roughness={0.5} />
      </mesh>

      {/* Nose */}
      <mesh position={[0, 1.44, 0.21]}>
        <sphereGeometry args={[0.026, 8, 8]} />
        <meshStandardMaterial color={DARK} roughness={0.6} />
      </mesh>

      {/* Left arm pivot at shoulder */}
      <group ref={leftArmRef} position={[-0.26, 1.15, 0]}>
        <mesh position={[-0.08, -0.2, 0]} rotation={[0, 0, 0.28]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.44, 8]} />
          <meshStandardMaterial color={CHALK} roughness={0.88} />
        </mesh>
        {/* Hand */}
        <mesh position={[-0.17, -0.4, 0]}>
          <sphereGeometry args={[0.072, 8, 8]} />
          <meshStandardMaterial color={CHALK} roughness={0.88} />
        </mesh>
      </group>

      {/* Right arm pivot at shoulder */}
      <group ref={rightArmRef} position={[0.26, 1.15, 0]}>
        <mesh position={[0.08, -0.2, 0]} rotation={[0, 0, -0.28]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.44, 8]} />
          <meshStandardMaterial color={CHALK} roughness={0.88} />
        </mesh>
        {/* Hand */}
        <mesh position={[0.17, -0.4, 0]}>
          <sphereGeometry args={[0.072, 8, 8]} />
          <meshStandardMaterial color={CHALK} roughness={0.88} />
        </mesh>
      </group>

      {/* Left leg pivot at hip */}
      <group ref={leftLegRef} position={[-0.1, 0.63, 0]}>
        <mesh position={[0, -0.275, 0]} castShadow>
          <cylinderGeometry args={[0.065, 0.065, 0.5, 8]} />
          <meshStandardMaterial color={CHALK} roughness={0.88} />
        </mesh>
        {/* Left foot */}
        <mesh position={[0, -0.56, 0.07]}>
          <boxGeometry args={[0.14, 0.09, 0.22]} />
          <meshStandardMaterial color={CHALK} roughness={0.88} />
        </mesh>
      </group>

      {/* Right leg pivot at hip */}
      <group ref={rightLegRef} position={[0.1, 0.63, 0]}>
        <mesh position={[0, -0.275, 0]} castShadow>
          <cylinderGeometry args={[0.065, 0.065, 0.5, 8]} />
          <meshStandardMaterial color={CHALK} roughness={0.88} />
        </mesh>
        {/* Right foot */}
        <mesh position={[0, -0.56, 0.07]}>
          <boxGeometry args={[0.14, 0.09, 0.22]} />
          <meshStandardMaterial color={CHALK} roughness={0.88} />
        </mesh>
      </group>

      {/* Shadow blob on floor */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[0.28, 16]} />
        <meshBasicMaterial color='#000000' transparent opacity={0.18} />
      </mesh>
    </group>
  )
}
