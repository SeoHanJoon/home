'use client'

import { useEffect, useRef, useCallback } from 'react'

export function useKeyboardInput() {
  const keysRef = useRef<Set<string>>(new Set())
  const justPressedRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!keysRef.current.has(e.code)) {
        justPressedRef.current.add(e.code)
      }
      keysRef.current.add(e.code)
      // Prevent arrow keys from scrolling the page
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault()
      }
    }
    const onKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.code)
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  const consumeJustPressed = useCallback((code: string): boolean => {
    if (justPressedRef.current.has(code)) {
      justPressedRef.current.delete(code)
      return true
    }
    return false
  }, [])

  return { keysRef, consumeJustPressed }
}
