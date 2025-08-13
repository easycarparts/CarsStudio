import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { generateWhatsAppMessage, calculateLeadGrade, trackEvent } from '@/lib/utils'
import { FunnelData } from '@/types/funnel'

interface ContactWhatsAppProps {
  data: FunnelData
  onNameChange: (name: string) => void
  onBack: () => void
}

export function ContactWhatsApp({
  data,
  onNameChange,
  onBack
}: ContactWhatsAppProps) {
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
        className="space-y-6 text-center"
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

        <div className="bg-gray-800 rounded-lg p-4 text-left">
          <h3 className="text-white font-medium mb-2">Message Preview:</h3>
          <div className="text-gray-300 text-sm whitespace-pre-wrap max-h-40 overflow-y-auto">
            {whatsappMessage}
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={copyToClipboard}
            variant="outline"
            className="flex-1"
          >
            Copy Details
          </Button>
          <Button
            onClick={() => window.location.reload()}
            className="flex-1"
          >
            Start New Quote
          </Button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">Get Your Quote on WhatsApp</h2>
        <p className="text-gray-400">We'll send you a detailed quote instantly</p>
      </div>

      {/* Name Input (Required) */}
      <div className="space-y-3">
        <label className="text-white font-medium">Your Name</label>
        <Input
          value={data.name || ''}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Enter your name"
          className="bg-gray-800 border-gray-600 text-white"
        />
        <p className="text-gray-400 text-sm">
          We'll use your name to personalize your quote
        </p>
      </div>

      {/* Trust Indicators */}
      <div className="bg-gray-800 rounded-lg p-4 space-y-2">
        <div className="flex items-center text-green-400 text-sm">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          No spam, WhatsApp only
        </div>
        <div className="flex items-center text-green-400 text-sm">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Instant quote within 30 seconds
        </div>
        <div className="flex items-center text-green-400 text-sm">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Top-rated UAE installers
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBack}
          className="flex-1 bg-gray-700 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-gray-600 transition-all"
        >
          Back
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleWhatsAppSubmit}
          disabled={!data.name || isLoading}
          className="flex-1 bg-green-600 text-white py-4 px-6 rounded-lg font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? 'Opening WhatsApp...' : 'Get My Quote on WhatsApp'}
        </motion.button>
      </div>
    </motion.div>
  )
}
