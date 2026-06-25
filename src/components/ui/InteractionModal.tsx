'use client'

import { useGameStore } from '@/store/gameStore'
import { FURNITURE_CONFIGS } from '@/data/gameConfig'

const PAPER_LINES = `repeating-linear-gradient(
  to bottom,
  transparent 0px,
  transparent 31px,
  rgba(100,120,200,0.11) 31px,
  rgba(100,120,200,0.11) 32px
)`

export function InteractionModal() {
  const activeModal = useGameStore((s) => s.activeModal)
  const closeModal  = useGameStore((s) => s.closeModal)

  if (!activeModal) return null

  const furniture = FURNITURE_CONFIGS.find((f) => f.id === activeModal)
  if (!furniture) return null

  const { content } = furniture

  return (
    /* Dim overlay */
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(5px)',
        animation: 'dimIn 0.4s ease forwards',
      }}
      onClick={closeModal}
    >
      {/* Paper card */}
      <div
        key={activeModal}
        style={{
          position: 'relative',
          width: 'min(500px, 88vw)',
          maxHeight: '82vh',
          overflowY: 'auto',
          backgroundColor: '#fdf6e8',
          backgroundImage: PAPER_LINES,
          backgroundSize: '100% 32px',
          backgroundPositionY: '112px',
          boxShadow:
            '0 1px 2px rgba(0,0,0,0.12), 0 6px 20px rgba(0,0,0,0.2), 0 24px 56px rgba(0,0,0,0.25)',
          borderRadius: '2px',
          padding: '44px 48px 40px 52px',
          fontFamily: "Georgia, 'Times New Roman', serif",
          animation: 'paperSlideUp 0.75s cubic-bezier(0.16,1,0.3,1) 0.35s both',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Red margin line */}
        <div style={{
          position: 'absolute',
          left: '40px', top: 0, bottom: 0,
          width: '2px',
          background: 'rgba(210,70,70,0.28)',
          pointerEvents: 'none',
        }} />

        {/* Fold corner */}
        <div style={{
          position: 'absolute',
          top: 0, right: 0,
          width: 0, height: 0,
          borderStyle: 'solid',
          borderWidth: '0 30px 30px 0',
          borderColor: 'transparent rgba(180,155,110,0.45) transparent transparent',
        }} />

        {/* Close button */}
        <button
          onClick={closeModal}
          style={{
            position: 'absolute',
            top: '14px',
            right: '38px',
            background: 'none',
            border: 'none',
            fontSize: '22px',
            color: '#a08060',
            cursor: 'pointer',
            lineHeight: 1,
            padding: '2px 6px',
          }}
        >
          ×
        </button>

        {/* Emoji */}
        <div style={{ fontSize: '36px', marginBottom: '10px', lineHeight: 1 }}>
          {content.emoji}
        </div>

        {/* Title */}
        <div style={{
          fontSize: '24px',
          fontWeight: 700,
          color: '#1e1408',
          letterSpacing: '-0.01em',
          marginBottom: '4px',
          lineHeight: 1.2,
        }}>
          {content.title}
        </div>

        {/* Subtitle */}
        <div style={{
          fontSize: '13px',
          color: '#907858',
          fontStyle: 'italic',
          marginBottom: '22px',
        }}>
          {content.subtitle}
        </div>

        {/* Ink divider */}
        <div style={{
          height: '1px',
          background: 'rgba(60,40,20,0.2)',
          marginBottom: '22px',
        }} />

        {/* Body — line-height 2 matches 32px paper lines */}
        <pre style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: '14.5px',
          color: '#2a1c0c',
          lineHeight: 2.2,
          whiteSpace: 'pre-wrap',
          margin: 0,
        }}>
          {content.body}
        </pre>

        {/* Links */}
        {content.links && content.links.length > 0 && (
          <div style={{
            marginTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
          }}>
            {content.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target='_blank'
                rel='noopener noreferrer'
                style={{
                  display: 'inline-block',
                  padding: '6px 16px',
                  background: 'rgba(40,24,8,0.07)',
                  border: '1px solid rgba(60,40,20,0.25)',
                  borderRadius: '2px',
                  color: '#5c3d18',
                  fontFamily: "Georgia, serif",
                  fontSize: '13px',
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = 'rgba(40,24,8,0.13)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = 'rgba(40,24,8,0.07)')
                }
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        )}

        {/* Close hint */}
        <div style={{
          marginTop: '28px',
          fontSize: '11px',
          color: '#b09878',
          textAlign: 'right',
          fontStyle: 'italic',
        }}>
          ESC 또는 바깥 클릭으로 닫기
        </div>
      </div>
    </div>
  )
}
