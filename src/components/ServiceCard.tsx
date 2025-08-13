
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ServiceCardProps {
  service: {
    id: string
    name: string
    description: string
    icon?: string
  }
  isSelected: boolean
  onClick: () => void
  className?: string
}

export function ServiceCard({ service, isSelected, onClick, className }: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <Card 
        className={cn(
          "transition-all duration-200 border-2",
          isSelected 
            ? "border-primary bg-primary/10" 
            : "border-gray-700 bg-gray-800/50 hover:border-gray-600",
          className
        )}
      >
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center space-y-3">
            {service.icon && (
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">{service.icon}</span>
              </div>
            )}
            <CardTitle className="text-xl font-bold text-white">
              {service.name}
            </CardTitle>
            <CardDescription className="text-gray-300 text-sm">
              {service.description}
            </CardDescription>
            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-6 h-6 bg-primary rounded-full flex items-center justify-center"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
