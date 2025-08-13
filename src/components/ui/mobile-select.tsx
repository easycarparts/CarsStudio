import { useState } from 'react'
import { MobileDropdown } from './mobile-dropdown'
import { useMobile } from '@/lib/use-mobile'

interface SelectOption {
  value: string
  label: string
  description?: string
}

interface MobileSelectProps {
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  label?: string
  className?: string
  disabled?: boolean
}

export function MobileSelect({
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  label,
  className = '',
  disabled = false
}: MobileSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { isMobile } = useMobile()

  const selectedOption = options.find(option => option.value === value)

  // Use native select on mobile (≤640px)
  if (isMobile) {
    return (
      <div className={`space-y-2 ${className}`}>
        {label && (
          <label className="text-white font-medium">
            {label}
          </label>
        )}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="w-full bg-gray-800 border border-gray-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    )
  }

  // Use custom dropdown on desktop
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="text-white font-medium">
          {label}
        </label>
      )}
      <MobileDropdown
        trigger={
          <div className={`
            w-full bg-gray-800 border border-gray-600 text-white rounded-lg px-4 py-3 
            focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent 
            disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-500'}
          `}>
            <div className="flex items-center justify-between">
              <span className={selectedOption ? 'text-white' : 'text-gray-400'}>
                {selectedOption ? selectedOption.label : placeholder}
              </span>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        }
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      >
        <div className="py-2">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
              className={`
                px-4 py-3 cursor-pointer hover:bg-gray-700 transition-colors
                ${option.value === value ? 'bg-gray-700 text-white' : 'text-gray-300'}
              `}
            >
              <div className="font-medium">{option.label}</div>
              {option.description && (
                <div className="text-sm text-gray-400 mt-1">{option.description}</div>
              )}
            </div>
          ))}
        </div>
      </MobileDropdown>
    </div>
  )
}
