import { useState } from 'react'
import { motion } from 'framer-motion'
import { MobileFriendlyTextInput } from '@/components/ui/mobile-friendly-text-input'
import { MobileStepWrapper } from '@/components/ui/mobile-step-wrapper'
import { Button } from '@/components/ui/button'
import { generateWhatsAppMessage, calculateLeadGrade, trackEvent } from '@/lib/utils'
import { FunnelData } from '@/types/funnel'

interface ContactWhatsAppMobileProps {
  data: FunnelData
  onNameChange: (name: string) => void
  onBack: () => void
}

export function ContactWhatsAppMobile({
  data,
  onNameChange,
  onBack
}: ContactWhatsAppMobileProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [whatsappMessage, setWhatsappMessage] = useState('')

  const handleWhatsAppSubmit = async () => {
    if (!data.name) return

    setIsLoading(true)
    
    try {
      // Calculate lead grade
      const grade = calculateLeadGrade({
        service: data.service,
        package: data.package,
        timing: data.timing,
        carMake: data.make
      })

      // Generate WhatsApp message
      const message = generateWhatsAppMessage({
        service: data.service,
        year: data.year,
        make: data.make,
        model: data.model,
        package: data.package,
        finish: data.finish,
        brand: data.brand,
        condition: data.condition,
        timing: data.timing,
        name: data.name,
        colorIdea: data.colorIdea
      })

      setWhatsappMessage(message)

      // Track event
      trackEvent('lead_submit', {
        service: data.service,
        grade
      })

      // Open WhatsApp to the specified number with prefilled message
      const whatsappUrl = `https://wa.me/971567191045?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, '_blank')

      // Show confirmation
      setShowConfirmation(true)
      
      // Track WhatsApp click
      trackEvent('contact_whatsapp', {
        service: data.service,
        grade
      })

    } catch (error) {
      console.error('Error opening WhatsApp:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(whatsappMessage)
  }

  if (showConfirmation) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 text-center px-4 sm:px-0"
      >
        <div className="space-y-4">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white">WhatsApp Opened!</h2>
          <p className="text-gray-400">Your details have been included in the message</p>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-800 p-4 rounded-lg text-left">
            <p className="text-sm text-gray-400 mb-2">Message Preview:</p>
            <p className="text-white text-sm whitespace-pre-wrap">{whatsappMessage}</p>
          </div>
          
          <div className="flex gap-3">
            <Button
              onClick={copyToClipboard}
              className="flex-1 bg-gray-700 hover:bg-gray-600"
            >
              Copy Message
            </Button>
            <Button
              onClick={() => setShowConfirmation(false)}
              className="flex-1 bg-primary hover:bg-red-600"
            >
              Send Another
            </Button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <MobileStepWrapper
      onNext={handleWhatsAppSubmit}
      nextDisabled={!data.name || isLoading}
      nextText={isLoading ? 'Opening WhatsApp...' : 'Open WhatsApp'}
      onBack={onBack}
      showBackButton={true}
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">Almost there!</h2>
        <p className="text-gray-400">Enter your name to get your personalized quote</p>
      </div>

      <MobileFriendlyTextInput
        value={data.name || ''}
        onChange={onNameChange}
        placeholder="Enter your name"
        label="Your Name"
        type="text"
        required
      />

      <div className="space-y-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-white font-semibold mb-2">Quote Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Service:</span>
              <span className="text-white">{data.service}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Package:</span>
              <span className="text-white">{data.package}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Car:</span>
              <span className="text-white">{data.year} {data.make} {data.model}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Timing:</span>
              <span className="text-white">{data.timing}</span>
            </div>
          </div>
        </div>
      </div>
    </MobileStepWrapper>
  )
}
