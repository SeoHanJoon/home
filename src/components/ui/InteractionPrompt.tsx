'use client'

import { useGameStore } from '@/store/gameStore'
import { FURNITURE_CONFIGS } from '@/data/gameConfig'

export function InteractionPrompt() {
  const nearbyFurniture = useGameStore((s) => s.nearbyFurniture)
  const activeModal = useGameStore((s) => s.activeModal)

  if (!nearbyFurniture || activeModal) return null

  const furniture = FURNITURE_CONFIGS.find((f) => f.id === nearbyFurniture)
  if (!furniture) return null

  return (
    <div className='fixed bottom-8 left-1/2 -translate-x-1/2 pointer-events-none select-none z-10'>
      <div
        style={{
          background: 'rgba(10,8,6,0.82)',
          border: '1.5px solid rgba(255,245,220,0.3)',
          borderRadius: '8px',
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          backdropFilter: 'blur(4px)',
          animation: 'promptFadeIn 0.2s ease',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '28px',
            height: '28px',
            background: 'rgba(255,245,210,0.15)',
            border: '1.5px solid rgba(255,245,210,0.45)',
            borderRadius: '5px',
            fontSize: '13px',
            fontWeight: 700,
            color: '#fff5d2',
            fontFamily: 'monospace',
          }}
        >
          E
        </span>
        <span
          style={{
            fontSize: '14px',
            color: '#f5e8c8',
            fontFamily: 'monospace',
            letterSpacing: '0.03em',
          }}
        >
          {furniture.content.emoji}&nbsp;&nbsp;{furniture.label} 살펴보기
        </span>
      </div>
    </div>
  )
}
