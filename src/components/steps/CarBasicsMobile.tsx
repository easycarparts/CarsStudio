import { useState, useEffect } from 'react'
import AutoInput from '@/components/AutoInput'
import { MobileStepWrapper } from '@/components/ui/mobile-step-wrapper'
import { Vehicle } from '@/types/funnel'
import vehiclesData from '@/data/vehicles.json'

interface CarBasicsMobileProps {
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

export function CarBasicsMobile({
  year,
  make,
  model,
  onYearChange,
  onMakeChange,
  onModelChange,
  onNext,
  onBack
}: CarBasicsMobileProps) {
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
    if (!year || !make) return [] as { label: string }[]
    return [...new Set(filteredModels.map(v => v.model))].sort().map(m => ({ label: m }))
  }

  return (
    <MobileStepWrapper
      onNext={handleNext}
      onBack={handleBack}
      nextDisabled={!year || !make || !model}
      showBackButton={true}
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">Tell us about your car</h2>
        <p className="text-gray-400">Help us provide a more accurate quote</p>
      </div>

      {/* Year */}
      <AutoInput
        id="year"
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
        id="make"
        label="Make"
        placeholder="Start typing (e.g., BMW)…"
        options={makes}
        value={make}
        onChange={handleMakeChange}
        autoComplete="off"
      />

      {/* Model */}
      <AutoInput
        id="model"
        label="Model"
        placeholder="Start typing (e.g., M3)…"
        options={getModelOptions()}
        value={model}
        onChange={handleModelChange}
        autoComplete="off"
      />
    </MobileStepWrapper>
  )
}
