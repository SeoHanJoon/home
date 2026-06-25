'use client'

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useGameStore } from '@/store/gameStore'
import { FURNITURE_CONFIGS } from '@/data/gameConfig'

const CAMERA_OFFSET = new THREE.Vector3(0, 13, 10)
const FOLLOW_LERP   = 0.06
const ZOOM_LERP     = 0.09

export function CameraController() {
  const { camera } = useThree()
  const camTarget = useRef(new THREE.Vector3())

  useFrame(() => {
    const { playerX, playerZ, activeModal } = useGameStore.getState()

    if (activeModal) {
      const config = FURNITURE_CONFIGS.find((f) => f.id === activeModal)
      if (config) {
        const [fx, fy, fz] = config.position
        // Zoom to a position above and slightly south of the furniture.
        // y=5 clears all walls (max wall height 3) so no geometry clips the view.
        camTarget.current.set(fx, 5, fz + 3)
        camera.position.lerp(camTarget.current, ZOOM_LERP)
        camera.lookAt(fx, fy + 0.8, fz)
        return
      }
    }

    // Normal follow mode
    camTarget.current.set(playerX, 0, playerZ).add(CAMERA_OFFSET)
    camera.position.lerp(camTarget.current, FOLLOW_LERP)
    camera.lookAt(playerX, 0, playerZ - 0.5)
  })

  return null
}
