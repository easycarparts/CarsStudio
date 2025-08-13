
import { motion } from 'framer-motion'
import { ServiceCard } from '@/components/ServiceCard'
import { trackEvent } from '@/lib/utils'

interface ServiceSelectProps {
  selectedService: string
  onServiceSelect: (service: string) => void
  onNext: () => void
}

const services = [
  {
    id: 'wrapping',
    name: 'Wrapping',
    description: 'Full/partial wrap, color change, chrome delete',
    icon: '🎨'
  },
  {
    id: 'ppf',
    name: 'Paint Protection Film (PPF)',
    description: 'Full front / track pack / full body',
    icon: '🛡️'
  },
  {
    id: 'detailing',
    name: 'Detailing',
    description: 'Interior / exterior / full, extras',
    icon: '✨'
  }
]

export function ServiceSelect({ selectedService, onServiceSelect, onNext }: ServiceSelectProps) {
  const handleServiceSelect = (serviceId: string) => {
    onServiceSelect(serviceId)
    trackEvent('select_service', { service: serviceId })
  }

  const handleNext = () => {
    if (selectedService) {
      onNext()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">What service do you need?</h2>
        <p className="text-gray-400">Select the service you're interested in</p>
      </div>

      <div className="grid gap-4">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            isSelected={selectedService === service.id}
            onClick={() => handleServiceSelect(service.id)}
          />
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleNext}
        disabled={!selectedService}
        className="w-full bg-primary text-white py-4 px-6 rounded-lg font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        Next
      </motion.button>
    </motion.div>
  )
}
