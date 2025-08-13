import { useRef, useCallback } from 'react'

export function useFocusIntoView() {
  const elementRef = useRef<HTMLElement>(null)

  const scrollIntoView = useCallback((delay = 300) => {
    if (elementRef.current) {
      setTimeout(() => {
        elementRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest'
        })
      }, delay)
    }
  }, [])

  const handleFocus = useCallback(() => {
    scrollIntoView()
  }, [scrollIntoView])

  return {
    elementRef,
    scrollIntoView,
    handleFocus
  }
}
