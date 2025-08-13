import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { SearchableSelect } from '@/components/SearchableSelect'
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
const years = Array.from({ length: 26 }, (_, i) => (2025 - i).toString())
const makes = [...new Set(vehicles.map(v => v.make))].sort()

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

  const handleYearChange = (newYear: string) => {
    onYearChange(newYear)
    // Clear make and model when year changes
    if (newYear !== year) {
      onMakeChange('')
      onModelChange('')
    }
  }

  const handleMakeChange = (newMake: string) => {
    onMakeChange(newMake)
    // Clear model when make changes
    if (newMake !== make) {
      onModelChange('')
    }
  }

  const handleModelChange = (newModel: string) => {
    onModelChange(newModel)
  }

  const handleNext = () => {
    onNext()
  }

  const handleBack = () => {
    onBack()
  }

  // Get model options for the selected make
  const getModelOptions = () => {
    if (!year || !make) return []
    return [...new Set(filteredModels.map(v => v.model))].sort()
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

      {/* Year Selection */}
      <SearchableSelect
        value={year}
        onChange={handleYearChange}
        options={years.map(y => ({ value: y, label: y }))}
        placeholder="Search year..."
        label="Year"
      />

      {/* Make Selection */}
      <SearchableSelect
        value={make}
        onChange={handleMakeChange}
        options={makes.map(m => ({ value: m, label: m }))}
        placeholder="Search make..."
        label="Make"
        disabled={!year}
      />

      {/* Model Selection */}
      <SearchableSelect
        value={model}
        onChange={handleModelChange}
        options={getModelOptions().map(m => ({ value: m, label: m }))}
        placeholder="Search model..."
        label="Model"
        disabled={!year || !make}
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
