'use client'

import { Canvas } from '@react-three/fiber'
import { GameScene } from './GameScene'
import { InteractionPrompt } from '../ui/InteractionPrompt'
import { InteractionModal } from '../ui/InteractionModal'
import { ControlsGuide } from '../ui/ControlsGuide'

export default function GameCanvas() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#1a1410', overflow: 'hidden' }}>
      <Canvas
        shadows
        camera={{ position: [0, 13, 10], fov: 50, near: 0.1, far: 200 }}
        gl={{ antialias: true, alpha: false }}
        style={{ width: '100%', height: '100%' }}
      >
        <color attach='background' args={['#1a1410']} />
        <fog attach='fog' args={['#1a1410', 22, 45]} />
        <GameScene />
      </Canvas>

      {/* HTML overlay */}
      <InteractionPrompt />
      <InteractionModal />
      <ControlsGuide />
    </div>
  )
}
