import { motion } from 'framer-motion'
import { ServiceCard } from '@/components/ServiceCard'
import { MobileStepWrapper } from '@/components/ui/mobile-step-wrapper'
import { trackEvent } from '@/lib/utils'

interface ServiceSelectMobileProps {
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

export function ServiceSelectMobile({ selectedService, onServiceSelect, onNext }: ServiceSelectMobileProps) {
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
    <MobileStepWrapper
      onNext={handleNext}
      nextDisabled={!selectedService}
      nextText={selectedService ? 'Next' : 'Select a service to continue'}
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
    </MobileStepWrapper>
  )
}
