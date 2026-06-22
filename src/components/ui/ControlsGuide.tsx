'use client'

import { useState } from 'react'

export function ControlsGuide() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        background: 'rgba(10,8,6,0.80)',
        border: '1.5px solid rgba(200,164,100,0.25)',
        borderRadius: '10px',
        padding: '14px 18px',
        zIndex: 10,
        backdropFilter: 'blur(4px)',
        minWidth: '180px',
      }}
    >
      <div
        style={{
          fontSize: '11px',
          color: '#c8a464',
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '0.08em',
          marginBottom: '10px',
          textTransform: 'uppercase',
        }}
      >
        조작 방법
      </div>

      {[
        ['↑ ↓ ← →', '이동'],
        ['W A S D', '이동'],
        ['E', '상호작용'],
        ['ESC', '닫기'],
      ].map(([key, desc]) => (
        <div
          key={key}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '6px',
          }}
        >
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: '12px',
              color: '#f5e8c8',
              background: 'rgba(255,245,210,0.08)',
              border: '1px solid rgba(200,164,100,0.3)',
              borderRadius: '4px',
              padding: '2px 8px',
              minWidth: '68px',
              textAlign: 'center',
              display: 'inline-block',
            }}
          >
            {key}
          </span>
          <span style={{ fontSize: '12px', color: '#a89070', fontFamily: 'monospace' }}>
            {desc}
          </span>
        </div>
      ))}

      <button
        onClick={() => setDismissed(true)}
        style={{
          marginTop: '10px',
          width: '100%',
          background: 'transparent',
          border: '1px solid rgba(200,164,100,0.2)',
          borderRadius: '5px',
          color: '#6a5840',
          fontFamily: 'monospace',
          fontSize: '11px',
          padding: '4px 0',
          cursor: 'pointer',
        }}
      >
        닫기
      </button>
    </div>
  )
}
