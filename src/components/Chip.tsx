
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ChipProps {
  label: string
  isSelected: boolean
  onClick: () => void
  className?: string
  description?: string
}

export function Chip({ label, isSelected, onClick, className, description }: ChipProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "w-full px-4 py-4 rounded-lg border-2 transition-all duration-200 text-left cursor-pointer",
        isSelected
          ? "border-red-500 bg-red-500 text-white"
          : "border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-500 hover:bg-gray-700",
        className
      )}
    >
      <div className="font-medium text-base">{label}</div>
      {description && (
        <div className={cn(
          "text-sm mt-2",
          isSelected ? "text-white/80" : "text-gray-400"
        )}>
          {description}
        </div>
      )}
    </motion.button>
  )
}
