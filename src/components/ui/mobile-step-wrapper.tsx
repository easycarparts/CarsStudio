import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface MobileStepWrapperProps {
  children: ReactNode
  onNext?: () => void
  onBack?: () => void
  nextDisabled?: boolean
  nextText?: string
  showBackButton?: boolean
  backText?: string
  className?: string
  nextButtonClassName?: string
  isWhatsAppButton?: boolean
}

export function MobileStepWrapper({
  children,
  onNext,
  onBack,
  nextDisabled = false,
  nextText = 'Next',
  showBackButton = false,
  backText = 'Back',
  className = '',
  nextButtonClassName,
  isWhatsAppButton = false
}: MobileStepWrapperProps) {
  return (
    <div className={`flex flex-col min-h-[100dvh] ${className}`}>
      {/* Main content area with padding bottom to account for sticky button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="flex-1 space-y-6 px-4 sm:px-0 pb-24" // pb-24 accounts for sticky button height
      >
        {children}
      </motion.div>

      {/* Sticky navigation buttons */}
      {(onNext || onBack) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 p-4 z-50"
          style={{
            // Ensure button is above any potential keyboard on mobile
            bottom: 'env(safe-area-inset-bottom, 0px)'
          }}
        >
          <div className="flex gap-3">
            {showBackButton && onBack && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onBack}
                className="flex-1 bg-gray-700 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-gray-600 transition-all"
              >
                {backText}
              </motion.button>
            )}
            
            {onNext && (
              <motion.button
                whileHover={{ scale: !nextDisabled ? 1.02 : 1 }}
                whileTap={{ scale: !nextDisabled ? 0.98 : 1 }}
                onClick={onNext}
                disabled={nextDisabled}
                className={`flex-1 py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
                  nextButtonClassName || (
                    !nextDisabled
                      ? isWhatsAppButton
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-primary text-white hover:bg-red-600'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  )
                }`}
              >
                {nextText}
              </motion.button>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}
