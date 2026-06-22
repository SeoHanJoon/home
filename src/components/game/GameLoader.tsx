'use client'

import dynamic from 'next/dynamic'

const GameCanvas = dynamic(() => import('./GameCanvas'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: '#1a1410',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '16px',
        fontFamily: 'monospace',
        color: '#c8a464',
      }}
    >
      <div style={{ fontSize: '32px' }}>🏠</div>
      <div style={{ fontSize: '14px', letterSpacing: '0.1em' }}>Loading...</div>
    </div>
  ),
})

export default function GameLoader() {
  return <GameCanvas />
}
