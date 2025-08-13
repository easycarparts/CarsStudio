import { useState, useEffect } from 'react'
import { SearchableSelect } from '@/components/SearchableSelect'
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
const years = Array.from({ length: 26 }, (_, i) => (2025 - i).toString())
const makes = [...new Set(vehicles.map(v => v.make))].sort()

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
    if (!year || !make) return []
    return [...new Set(filteredModels.map(v => v.model))].sort()
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
    </MobileStepWrapper>
  )
}
