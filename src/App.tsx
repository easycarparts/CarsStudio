import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Stepper } from '@/components/Stepper'
import { ServiceSelect } from '@/components/steps/ServiceSelect'
import { ServiceSelectMobile } from '@/components/steps/ServiceSelectMobile'
import { CarBasics } from '@/components/steps/CarBasics'
import { CarBasicsMobile } from '@/components/steps/CarBasicsMobile'
import { PackageScope } from '@/components/steps/PackageScope'
import { PackageScopeMobile } from '@/components/steps/PackageScopeMobile'
import { ConditionTimingLocation } from '@/components/steps/ConditionTimingLocation'
import { ConditionTimingLocationMobile } from '@/components/steps/ConditionTimingLocationMobile'
import { ContactWhatsApp } from '@/components/steps/ContactWhatsApp'
import { ContactWhatsAppMobile } from '@/components/steps/ContactWhatsAppMobile'
import { FunnelData } from '@/types/funnel'
import { trackEvent, saveToLocalStorage, loadFromLocalStorage } from '@/lib/utils'
import { useMobile } from '@/lib/use-mobile'

const TOTAL_STEPS = 5

const initialData: FunnelData = {
  service: '',
  year: '',
  make: '',
  model: '',
  package: '',
  finish: '',
  brand: '',
  addons: [],
  condition: '',
  timing: '',
  name: '',
  colorIdea: '',
  photos: [],
  grade: 'C'
}

function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<FunnelData>(initialData)
  const { isMobile } = useMobile()

  // Load saved data on mount
  useEffect(() => {
    const savedData = loadFromLocalStorage('car-funnel-lead')
    if (savedData) {
      setData(savedData)
    }
  }, [])

  // Track page view after component mounts
  useEffect(() => {
    // Small delay to ensure tracking pixels are loaded
    const timer = setTimeout(() => {
      trackEvent('view_content', {
        step: currentStep,
        service: data.service || 'none'
      })
    }, 100)
    
    return () => clearTimeout(timer)
  }, [currentStep, data.service])

  // Save data on changes
  useEffect(() => {
    saveToLocalStorage('car-funnel-lead', data)
  }, [data])

  // Track step progress
  useEffect(() => {
    // Small delay to ensure tracking pixels are loaded
    const timer = setTimeout(() => {
      trackEvent('step_progress', {
        step: currentStep,
        service: data.service || 'none'
      })
    }, 100)
    
    return () => clearTimeout(timer)
  }, [currentStep, data.service])

  const updateData = (updates: Partial<FunnelData>) => {
    setData(prev => ({ ...prev, ...updates }))
  }

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return isMobile ? (
          <ServiceSelectMobile
            selectedService={data.service}
            onServiceSelect={(service) => updateData({ service })}
            onNext={nextStep}
          />
        ) : (
          <ServiceSelect
            selectedService={data.service}
            onServiceSelect={(service) => updateData({ service })}
            onNext={nextStep}
          />
        )
      case 2:
        return isMobile ? (
          <CarBasicsMobile
            year={data.year || ''}
            make={data.make || ''}
            model={data.model || ''}
            onYearChange={(year) => updateData({ year })}
            onMakeChange={(make) => updateData({ make })}
            onModelChange={(model) => updateData({ model })}
            onNext={nextStep}
            onBack={prevStep}
          />
        ) : (
          <CarBasics
            year={data.year || ''}
            make={data.make || ''}
            model={data.model || ''}
            onYearChange={(year) => updateData({ year })}
            onMakeChange={(make) => updateData({ make })}
            onModelChange={(model) => updateData({ model })}
            onNext={nextStep}
            onBack={prevStep}
          />
        )
      case 3:
        return isMobile ? (
          <PackageScopeMobile
            service={data.service}
            package={data.package || ''}
            finish={data.finish || ''}
            brand={data.brand || ''}
            addons={data.addons || []}
            colorIdea={data.colorIdea || ''}
            onPackageChange={(pkg) => updateData({ package: pkg })}
            onFinishChange={(finish) => updateData({ finish })}
            onBrandChange={(brand) => updateData({ brand })}
            onAddonsChange={(addons) => updateData({ addons })}
            onColorIdeaChange={(colorIdea) => updateData({ colorIdea })}
            onNext={nextStep}
            onBack={prevStep}
          />
        ) : (
          <PackageScope
            service={data.service}
            package={data.package || ''}
            finish={data.finish || ''}
            brand={data.brand || ''}
            addons={data.addons || []}
            colorIdea={data.colorIdea || ''}
            onPackageChange={(pkg) => updateData({ package: pkg })}
            onFinishChange={(finish) => updateData({ finish })}
            onBrandChange={(brand) => updateData({ brand })}
            onAddonsChange={(addons) => updateData({ addons })}
            onColorIdeaChange={(colorIdea) => updateData({ colorIdea })}
            onNext={nextStep}
            onBack={prevStep}
          />
        )
      case 4:
        return isMobile ? (
          <ConditionTimingLocationMobile
            condition={data.condition}
            timing={data.timing}
            onConditionChange={(condition) => updateData({ condition })}
            onTimingChange={(timing) => updateData({ timing })}
            onNext={nextStep}
            onBack={prevStep}
          />
        ) : (
          <ConditionTimingLocation
            condition={data.condition}
            timing={data.timing}
            onConditionChange={(condition) => updateData({ condition })}
            onTimingChange={(timing) => updateData({ timing })}
            onNext={nextStep}
            onBack={prevStep}
          />
        )
      case 5:
        return isMobile ? (
          <ContactWhatsAppMobile
            data={data}
            onNameChange={(name) => updateData({ name })}
            onBack={prevStep}
          />
        ) : (
          <ContactWhatsApp
            data={data}
            onNameChange={(name) => updateData({ name })}
            onBack={prevStep}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with Logo */}
             <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800 safe-area-top">
         <div className="w-full h-20">
           <div className="flex items-center justify-between px-4 h-full">
             <div className="flex items-center h-full">
               <img 
                 src="/car-logo.png" 
                 alt="Cars Studio Logo" 
                 className="h-12 w-auto object-contain"
               />
             </div>
            <div className="text-right">
              <div className="text-white font-semibold">Instant Quote</div>
              <div className="text-gray-400 text-xs">30 seconds</div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="sticky top-20 z-40 bg-black/95 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 py-3">
          <Stepper currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className={isMobile ? "w-full" : "max-w-md mx-auto"}>
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </div>
      </main>


    </div>
  )
}

export default App
