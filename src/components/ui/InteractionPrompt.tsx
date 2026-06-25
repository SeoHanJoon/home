'use client'

import { useGameStore } from '@/store/gameStore'
import { FURNITURE_CONFIGS } from '@/data/gameConfig'

export function InteractionPrompt() {
  const nearbyFurniture = useGameStore((s) => s.nearbyFurniture)
  const activeModal     = useGameStore((s) => s.activeModal)

  // Unmount only when not near any furniture.
  // While modal is open, keep in DOM so the slide-out transition plays.
  if (!nearbyFurniture) return null

  const furniture = FURNITURE_CONFIGS.find((f) => f.id === nearbyFurniture)
  if (!furniture) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '32px',
        left: '50%',
        pointerEvents: 'none',
        userSelect: 'none',
        zIndex: 10,
        transition: 'transform 0.42s cubic-bezier(0.4,0,0.2,1), opacity 0.38s ease',
        transform: activeModal
          ? 'translateX(-50%) translateY(calc(100% + 48px))'
          : 'translateX(-50%) translateY(0)',
        opacity: activeModal ? 0 : 1,
      }}
    >
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
