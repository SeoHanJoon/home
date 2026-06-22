'use client'

import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useGameStore } from '@/store/gameStore'

const CAMERA_OFFSET = new THREE.Vector3(0, 13, 10)
const LOOKAT_OFFSET = new THREE.Vector3(0, 0, -0.5)
const LERP_FACTOR = 0.06

export function CameraController() {
  const { camera } = useThree()

  useFrame(() => {
    const { playerX, playerZ } = useGameStore.getState()

    const targetPos = new THREE.Vector3(playerX, 0, playerZ)
    const desiredCamPos = targetPos.clone().add(CAMERA_OFFSET)
    const lookAt = targetPos.clone().add(LOOKAT_OFFSET)

    camera.position.lerp(desiredCamPos, LERP_FACTOR)
    camera.lookAt(lookAt)
  })

  return null
}
