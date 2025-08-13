import { useState, useEffect } from 'react'

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
      setViewportHeight(window.innerHeight)
    }

    // Check on mount
    checkMobile()

    // Check on resize
    window.addEventListener('resize', checkMobile)

    // Check on orientation change
    window.addEventListener('orientationchange', () => {
      setTimeout(checkMobile, 100) // Small delay for orientation change
    })

    // Handle viewport changes (keyboard open/close on mobile)
    if (window.visualViewport) {
      const handleViewportChange = () => {
        if (window.visualViewport) {
          setViewportHeight(window.visualViewport.height)
        }
      }

      window.visualViewport.addEventListener('resize', handleViewportChange)
      return () => {
        window.removeEventListener('resize', checkMobile)
        window.removeEventListener('orientationchange', checkMobile)
        window.visualViewport?.removeEventListener('resize', handleViewportChange)
      }
    }

    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('orientationchange', checkMobile)
    }
  }, [])

  return {
    isMobile,
    viewportHeight,
    isKeyboardOpen: viewportHeight < window.innerHeight * 0.8
  }
}
