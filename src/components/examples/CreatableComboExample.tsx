import { useState } from 'react'
import { CreatableCombo } from '@/components/ui/creatable-combo'

export function CreatableComboExample() {
  const [year, setYear] = useState('')
  const [make, setMake] = useState('')

  // Year validation function
  const validateYear = (value: string): string | null => {
    if (!value) return null
    
    // Check if it's a 4-digit number
    if (!/^\d{4}$/.test(value)) {
      return 'Year must be a 4-digit number'
    }
    
    const yearNum = parseInt(value)
    const currentYear = new Date().getFullYear()
    const minYear = 1980
    
    if (yearNum < minYear || yearNum > currentYear + 1) {
      return `Year must be between ${minYear} and ${currentYear + 1}`
    }
    
    return null
  }

  // Example options
  const yearOptions = [
    { label: '2025', value: '2025' },
    { label: '2024', value: '2024' },
    { label: '2023', value: '2023' },
    { label: '2022', value: '2022' },
    { label: '2021', value: '2021' },
    { label: '2020', value: '2020' }
  ]

  const makeOptions = [
    { label: 'BMW', value: 'BMW' },
    { label: 'Mercedes-Benz', value: 'Mercedes-Benz' },
    { label: 'Audi', value: 'Audi' },
    { label: 'Porsche', value: 'Porsche' },
    { label: 'Ferrari', value: 'Ferrari' },
    { label: 'Lamborghini', value: 'Lamborghini' }
  ]

  return (
    <div className="space-y-6 p-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">CreatableCombo Example</h2>
        <p className="text-gray-400">Try typing custom values or selecting from the dropdown</p>
      </div>

      <div className="max-w-md mx-auto space-y-4">
        {/* Year field with validation */}
        <CreatableCombo
          value={year}
          onChange={setYear}
          options={yearOptions}
          placeholder="Enter year (1980-2026)"
          label="Vehicle Year"
          validate={validateYear}
          allowCreate={true}
        />

        {/* Make field without validation */}
        <CreatableCombo
          value={make}
          onChange={setMake}
          options={makeOptions}
          placeholder="Enter or select make"
          label="Vehicle Make"
          allowCreate={true}
        />

        {/* Display selected values */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-white font-semibold mb-2">Selected Values:</h3>
          <div className="space-y-1 text-sm">
            <div className="text-gray-400">Year: <span className="text-white">{year || 'Not selected'}</span></div>
            <div className="text-gray-400">Make: <span className="text-white">{make || 'Not selected'}</span></div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-white font-semibold mb-2">How to use:</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>• Type to filter existing options</li>
            <li>• Use arrow keys to navigate</li>
            <li>• Press Enter to select</li>
            <li>• Type a custom value and select "Add"</li>
            <li>• Year field validates 4-digit years between 1980-2026</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
