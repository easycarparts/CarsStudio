import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
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
  const [showYearSuggestions, setShowYearSuggestions] = useState(false)
  const [showMakeSuggestions, setShowMakeSuggestions] = useState(false)
  const [showModelSuggestions, setShowModelSuggestions] = useState(false)
  const [filteredMakes, setFilteredMakes] = useState(makes)
  const [filteredModels, setFilteredModels] = useState<Vehicle[]>([])
  
  const yearRef = useRef<HTMLDivElement>(null)
  const makeRef = useRef<HTMLDivElement>(null)
  const modelRef = useRef<HTMLDivElement>(null)

  console.log('CarBasics rendered with:', { year, make, model }) // Debug log

  // Filter makes based on input
  useEffect(() => {
    if (make) {
      setFilteredMakes(makes.filter(m => 
        m.toLowerCase().includes(make.toLowerCase())
      ))
    } else {
      setFilteredMakes(makes)
    }
  }, [make])

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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (yearRef.current && !yearRef.current.contains(event.target as Node)) {
        setShowYearSuggestions(false)
      }
      if (makeRef.current && !makeRef.current.contains(event.target as Node)) {
        setShowMakeSuggestions(false)
      }
      if (modelRef.current && !modelRef.current.contains(event.target as Node)) {
        setShowModelSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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

      {/* Year Selection */}
      <div className="space-y-3" ref={yearRef}>
        <label className="text-white font-medium">Year</label>
        <div className="relative">
          <Input
            value={year}
            onChange={(e) => {
              console.log('Year input changed:', e.target.value) // Debug log
              handleYearChange(e.target.value)
            }}
            onFocus={() => {
              console.log('Year input focused') // Debug log
              setShowYearSuggestions(true)
            }}
            placeholder="Select year"
            className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
          />
          {showYearSuggestions && (
            <div className="absolute z-50 w-full mt-1 bg-gray-800 border border-gray-600 rounded-lg max-h-48 overflow-y-auto shadow-lg">
              {years.map((y) => (
                <button
                  key={y}
                  onClick={() => {
                    console.log('Year selected:', y) // Debug log
                    handleYearChange(y)
                    setShowYearSuggestions(false)
                  }}
                  className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors"
                >
                  {y}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Make Selection */}
      <div className="space-y-3" ref={makeRef}>
        <label className="text-white font-medium">Make</label>
        <div className="relative">
          <Input
            value={make}
            onChange={(e) => {
              console.log('Make input changed:', e.target.value) // Debug log
              handleMakeChange(e.target.value)
            }}
            onFocus={() => {
              console.log('Make input focused') // Debug log
              setShowMakeSuggestions(true)
            }}
            placeholder="Select make"
            className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
          />
          {showMakeSuggestions && filteredMakes.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-gray-800 border border-gray-600 rounded-lg max-h-48 overflow-y-auto shadow-lg">
              {filteredMakes.map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    console.log('Make selected:', m) // Debug log
                    handleMakeChange(m)
                    setShowMakeSuggestions(false)
                  }}
                  className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors"
                >
                  {m}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Model Selection */}
      <div className="space-y-3" ref={modelRef}>
        <label className="text-white font-medium">Model</label>
        <div className="relative">
          <Input
            value={model}
            onChange={(e) => {
              console.log('Model input changed:', e.target.value) // Debug log
              handleModelChange(e.target.value)
            }}
            onFocus={() => {
              console.log('Model input focused') // Debug log
              setShowModelSuggestions(true)
            }}
            placeholder="Select model"
            className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
          />
          {showModelSuggestions && filteredModels.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-gray-800 border border-gray-600 rounded-lg max-h-48 overflow-y-auto shadow-lg">
              <div className="dropdown-suggestions">
                {filteredModels.map((v) => (
                  <button
                    key={`${v.year}-${v.make}-${v.model}`}
                    onClick={() => {
                      console.log('Model selected:', v.model) // Debug log
                      handleModelChange(v.model)
                      setShowModelSuggestions(false)
                    }}
                    className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors"
                  >
                    {v.model}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

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
