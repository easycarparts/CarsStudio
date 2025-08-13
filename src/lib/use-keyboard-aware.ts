import { useState, useEffect } from 'react'

export function useKeyboardAware() {
  const [keyboardHeight, setKeyboardHeight] = useState(0)
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)

  useEffect(() => {
    if (!window.visualViewport) {
      console.warn('VisualViewport API not supported')
      return
    }

    const handleViewportChange = () => {
      const viewport = window.visualViewport!
      const windowHeight = window.innerHeight
      const viewportHeight = viewport.height
      const newKeyboardHeight = Math.max(0, windowHeight - viewportHeight)
      
      setKeyboardHeight(newKeyboardHeight)
      setIsKeyboardOpen(newKeyboardHeight > 150) // Consider keyboard open if >150px
      
      // Set CSS custom property for keyboard height
      document.documentElement.style.setProperty('--keyboard-h', `${newKeyboardHeight}px`)
      
      // Toggle body class
      if (newKeyboardHeight > 150) {
        document.body.classList.add('keyboard-open')
      } else {
        document.body.classList.remove('keyboard-open')
      }
    }

    // Initial call
    handleViewportChange()

    // Listen for viewport changes
    window.visualViewport!.addEventListener('resize', handleViewportChange)
    window.visualViewport!.addEventListener('scroll', handleViewportChange)

    return () => {
      window.visualViewport!.removeEventListener('resize', handleViewportChange)
      window.visualViewport!.removeEventListener('scroll', handleViewportChange)
    }
  }, [])

  return {
    keyboardHeight,
    isKeyboardOpen
  }
}
