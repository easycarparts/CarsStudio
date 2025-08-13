import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface StickyButtonProps {
  onClick: () => void
  disabled?: boolean
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary'
}

export function StickyButton({
  onClick,
  disabled = false,
  children,
  className = '',
  variant = 'primary'
}: StickyButtonProps) {
  const baseClasses = "w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all"
  
  const variantClasses = {
    primary: disabled
      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
      : 'bg-primary text-white hover:bg-red-600',
    secondary: disabled
      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
      : 'bg-gray-700 text-white hover:bg-gray-600'
  }

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 p-4 z-50"
      style={{
        // Ensure button is above any potential keyboard on mobile
        bottom: 'env(safe-area-inset-bottom, 0px)'
      }}
    >
      <motion.button
        whileHover={{ scale: !disabled ? 1.02 : 1 }}
        whileTap={{ scale: !disabled ? 0.98 : 1 }}
        onClick={onClick}
        disabled={disabled}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      >
        {children}
      </motion.button>
    </div>
  )
}
