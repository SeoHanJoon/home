'use client'

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useGameStore } from '@/store/gameStore'
import { FURNITURE_CONFIGS } from '@/data/gameConfig'

const CAMERA_OFFSET = new THREE.Vector3(0, 13, 10)
const FOLLOW_LERP   = 0.06
const ZOOM_LERP     = 0.08

// Distance from furniture and height for the fixed showcase camera position
const VIEW_DIST   = 4.2
const VIEW_HEIGHT = 3.5

export function CameraController() {
  const { camera } = useThree()
  const camTarget = useRef(new THREE.Vector3())
  const dirTemp   = useRef(new THREE.Vector3())

  useFrame(() => {
    const { playerX, playerZ, activeModal } = useGameStore.getState()

    if (activeModal) {
      const config = FURNITURE_CONFIGS.find((f) => f.id === activeModal)
      if (config) {
        const [fx, fy, fz] = config.position

        if (config.cameraView) {
          // Use hand-crafted view for furniture that needs a specific angle
          const [cx, cy, cz] = config.cameraView.position
          const [lx, ly, lz] = config.cameraView.lookAt
          camTarget.current.set(cx, cy, cz)
          camera.position.lerp(camTarget.current, ZOOM_LERP)
          camera.lookAt(lx, ly, lz)
        } else {
          // Generic: place camera VIEW_DIST units toward room centre, VIEW_HEIGHT above
          dirTemp.current.set(-fx, 0, -fz)
          const len = dirTemp.current.length()
          if (len > 0) dirTemp.current.divideScalar(len)
          camTarget.current.set(
            fx + dirTemp.current.x * VIEW_DIST,
            fy + VIEW_HEIGHT,
            fz + dirTemp.current.z * VIEW_DIST,
          )
          camera.position.lerp(camTarget.current, ZOOM_LERP)
          camera.lookAt(fx, fy + 0.8, fz)
        }
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
