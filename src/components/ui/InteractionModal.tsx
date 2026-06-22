'use client'

import { useGameStore } from '@/store/gameStore'
import { FURNITURE_CONFIGS } from '@/data/gameConfig'

export function InteractionModal() {
  const activeModal = useGameStore((s) => s.activeModal)
  const closeModal = useGameStore((s) => s.closeModal)

  if (!activeModal) return null

  const furniture = FURNITURE_CONFIGS.find((f) => f.id === activeModal)
  if (!furniture) return null

  const { content } = furniture

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.65)',
        zIndex: 20,
        backdropFilter: 'blur(2px)',
      }}
      onClick={closeModal}
    >
      <div
        style={{
          background: '#1a1410',
          border: '2px solid #c8a464',
          borderRadius: '12px',
          width: 'min(520px, 90vw)',
          maxHeight: '80vh',
          overflowY: 'auto',
          boxShadow: '0 0 40px rgba(180,140,60,0.18)',
          animation: 'modalSlideIn 0.22s ease',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            borderBottom: '1px solid rgba(200,164,100,0.25)',
            padding: '18px 22px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '28px' }}>{content.emoji}</span>
            <div>
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#f5e8c8',
                  fontFamily: 'monospace',
                  letterSpacing: '0.04em',
                }}
              >
                {content.title}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: '#a89070',
                  fontFamily: 'monospace',
                  marginTop: '2px',
                }}
              >
                {content.subtitle}
              </div>
            </div>
          </div>
          <button
            onClick={closeModal}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(200,164,100,0.3)',
              borderRadius: '6px',
              color: '#c8a464',
              width: '30px',
              height: '30px',
              cursor: 'pointer',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '20px 22px' }}>
          <pre
            style={{
              fontFamily: 'monospace',
              fontSize: '14px',
              color: '#d8c8a8',
              lineHeight: 1.75,
              whiteSpace: 'pre-wrap',
              margin: 0,
            }}
          >
            {content.body}
          </pre>

          {content.links && content.links.length > 0 && (
            <div
              style={{
                marginTop: '20px',
                paddingTop: '16px',
                borderTop: '1px solid rgba(200,164,100,0.18)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
              }}
            >
              {content.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '7px 16px',
                    background: 'rgba(200,164,100,0.12)',
                    border: '1px solid rgba(200,164,100,0.35)',
                    borderRadius: '6px',
                    color: '#c8a464',
                    fontFamily: 'monospace',
                    fontSize: '13px',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = 'rgba(200,164,100,0.22)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = 'rgba(200,164,100,0.12)')
                  }
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div
          style={{
            borderTop: '1px solid rgba(200,164,100,0.15)',
            padding: '10px 22px',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <span style={{ fontSize: '12px', color: '#6a5840', fontFamily: 'monospace' }}>
            ESC or click outside to close
          </span>
        </div>
      </div>
    </div>
  )
}
