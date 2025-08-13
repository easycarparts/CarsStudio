import { useState, useRef, useEffect, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useKeyboardAware } from '@/lib/use-keyboard-aware'


interface MobileDropdownProps {
  trigger: ReactNode
  children: ReactNode
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  className?: string
}

export function MobileDropdown({
  trigger,
  children,
  isOpen,
  onOpenChange,
  className = ''
}: MobileDropdownProps) {
  const triggerRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const { keyboardHeight, isKeyboardOpen } = useKeyboardAware()

  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0, width: 0 })
  const [shouldRenderAsBottomSheet, setShouldRenderAsBottomSheet] = useState(false)

  // Calculate menu position and determine if it should be a bottom sheet
  useEffect(() => {
    if (!triggerRef.current || !isOpen) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const viewportHeight = window.visualViewport?.height || window.innerHeight
    const spaceBelow = viewportHeight - triggerRect.bottom
    const spaceAbove = triggerRect.top
    const menuHeight = 180 // Approximate menu height

    const shouldBeBottomSheet = spaceBelow < menuHeight && spaceAbove > menuHeight

    setShouldRenderAsBottomSheet(shouldBeBottomSheet)

    if (shouldBeBottomSheet) {
      // Position as bottom sheet
      setMenuPosition({
        top: 0,
        left: 0,
        width: window.innerWidth
      })
    } else {
      // Position below trigger
      setMenuPosition({
        top: triggerRect.bottom + 4,
        left: triggerRect.left,
        width: triggerRect.width
      })
    }
  }, [isOpen, keyboardHeight, isKeyboardOpen])

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        onOpenChange(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onOpenChange])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onOpenChange(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onOpenChange])

  const menuContent = (
    <motion.div
      ref={menuRef}
      initial={{ opacity: 0, scale: 0.95, y: shouldRenderAsBottomSheet ? 20 : -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: shouldRenderAsBottomSheet ? 20 : -10 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className={`
        bg-gray-800 border border-gray-600 rounded-lg shadow-xl
        ${shouldRenderAsBottomSheet 
          ? 'fixed bottom-0 left-0 right-0 z-[9999] max-h-[60vh] overflow-y-auto' 
          : 'absolute z-[9999] max-h-48 overflow-y-auto'
        }
        ${className}
      `}
      style={{
        top: shouldRenderAsBottomSheet ? 'auto' : menuPosition.top,
        left: shouldRenderAsBottomSheet ? 0 : menuPosition.left,
        width: shouldRenderAsBottomSheet ? '100%' : menuPosition.width,
        bottom: shouldRenderAsBottomSheet ? `calc(var(--keyboard-h, 0px) + 1rem)` : 'auto'
      }}
    >
      {children}
    </motion.div>
  )

  return (
    <div className="relative">
      <div
        ref={triggerRef}
        onClick={() => onOpenChange(!isOpen)}
        className="cursor-pointer"
      >
        {trigger}
      </div>
      
      <AnimatePresence>
        {isOpen && (
          createPortal(
            menuContent,
            document.body
          )
        )}
      </AnimatePresence>
    </div>
  )
}
