import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AutoInput from '@/components/AutoInput'
import { Vehicle } from '@/types/funnel'
import vehiclesData from '@/data/vehicles.json'

interface CarBasicsProps {
  year: string
  make: string
  model: string
  onYearChange: (year: string) => void
  onMakeChange: (make: string) => void
  onModelChange: (model: string) => void
  onNext: () => void
  onBack: () => void
}

const vehicles: Vehicle[] = vehiclesData
const years = Array.from({ length: 50 }).map((_, i) => {
  const y = new Date().getFullYear() + 1 - i
  return { label: String(y) }
})
const makes = [...new Set(vehicles.map(v => v.make))].sort().map(m => ({ label: m }))

export function CarBasics({
  year,
  make,
  model,
  onYearChange,
  onMakeChange,
  onModelChange,
  onNext,
  onBack
}: CarBasicsProps) {
  const [filteredModels, setFilteredModels] = useState<Vehicle[]>([])

  console.log('CarBasics rendered with:', { year, make, model }) // Debug log

  // Native datalist filters automatically; no custom filtering needed

  // Filter models based on year and make
  useEffect(() => {
    if (year && make) {
      setFilteredModels(vehicles.filter(v => 
        v.year.toString() === year && 
        v.make.toLowerCase().includes(make.toLowerCase())
      ))
    } else {
      setFilteredModels([])
    }
  }, [year, make])

  // No custom dropdowns anymore

  const handleYearChange = (newYear: string) => {
    console.log('Year changed to:', newYear) // Debug log
    onYearChange(newYear)
  }

  const handleMakeChange = (newMake: string) => {
    console.log('Make changed to:', newMake) // Debug log
    onMakeChange(newMake)
  }

  const handleModelChange = (newModel: string) => {
    console.log('Model changed to:', newModel) // Debug log
    onModelChange(newModel)
  }

  const handleNext = () => {
    console.log('Next button clicked') // Debug log
    onNext()
  }

  const handleBack = () => {
    console.log('Back button clicked') // Debug log
    onBack()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">Tell us about your car</h2>
        <p className="text-gray-400">Help us provide a more accurate quote</p>
      </div>

      {/* Year */}
      <AutoInput
        id="year-desktop"
        label="Year"
        placeholder="Start typing (e.g., 2023)…"
        options={years}
        value={year}
        onChange={handleYearChange}
        inputMode="numeric"
        autoComplete="off"
      />

      {/* Make */}
      <AutoInput
        id="make-desktop"
        label="Make"
        placeholder="Start typing (e.g., BMW)…"
        options={makes}
        value={make}
        onChange={handleMakeChange}
        autoComplete="off"
      />

      {/* Model */}
      <AutoInput
        id="model-desktop"
        label="Model"
        placeholder="Start typing (e.g., M3)…"
        options={[...new Set(filteredModels.map(v => v.model))].sort().map(m => ({ label: m }))}
        value={model}
        onChange={handleModelChange}
        autoComplete="off"
      />

      {/* Navigation */}
      <div className="flex gap-3 pt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleBack}
          className="flex-1 bg-gray-700 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-gray-600 transition-all"
        >
          Back
        </motion.button>
        <motion.button
          whileHover={{ scale: year && make && model ? 1.02 : 1 }}
          whileTap={{ scale: year && make && model ? 0.98 : 1 }}
          onClick={handleNext}
          disabled={!year || !make || !model}
          className={`flex-1 py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
            year && make && model
              ? 'bg-primary text-white hover:bg-red-600'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          Next
        </motion.button>
      </div>
    </motion.div>
  )
}
