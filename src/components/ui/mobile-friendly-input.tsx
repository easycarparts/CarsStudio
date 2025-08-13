import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from './input'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface MobileFriendlyInputProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
  label: string
  options: string[]
  onOptionSelect?: (option: string) => void
  className?: string
  disabled?: boolean
}

export function MobileFriendlyInput({
  value,
  onChange,
  placeholder,
  label,
  options,
  onOptionSelect,
  className = '',
  disabled = false
}: MobileFriendlyInputProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filteredOptions, setFilteredOptions] = useState(options)
  const [inputValue, setInputValue] = useState(value)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Filter options based on input
  useEffect(() => {
    if (inputValue) {
      setFilteredOptions(
        options.filter(option =>
          option.toLowerCase().includes(inputValue.toLowerCase())
        )
      )
    } else {
      setFilteredOptions(options)
    }
  }, [inputValue, options])

  // Update input value when prop changes
  useEffect(() => {
    setInputValue(value)
  }, [value])

  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle mobile keyboard events
  useEffect(() => {
    const handleResize = () => {
      // Close dropdown when keyboard opens (viewport height changes)
      if (window.visualViewport) {
        const currentHeight = window.visualViewport.height
        if (currentHeight < window.innerHeight * 0.8) {
          setIsOpen(false)
        }
      }
    }

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize)
      return () => window.visualViewport?.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    onChange(newValue)
    
    // Open dropdown when typing
    if (newValue && !isOpen) {
      setIsOpen(true)
    }
  }

  const handleInputFocus = () => {
    // Don't auto-open on mobile - let user type first
    if (window.innerWidth > 768) {
      setIsOpen(true)
    }
  }

  const handleInputClick = () => {
    // On mobile, show options when clicking the input
    if (window.innerWidth <= 768) {
      setIsOpen(!isOpen)
    }
  }

  const handleOptionSelect = (option: string) => {
    setInputValue(option)
    onChange(option)
    setIsOpen(false)
    onOptionSelect?.(option)
    
    // Focus back to input for better UX
    inputRef.current?.focus()
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      inputRef.current?.focus()
    }
  }

  return (
    <div className={`space-y-3 ${className}`} ref={containerRef}>
      <label className="text-white font-medium">{label}</label>
      <div className="relative">
        <div className="relative">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onClick={handleInputClick}
            placeholder={placeholder}
            className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 pr-10"
            disabled={disabled}
          />
          <button
            type="button"
            onClick={toggleDropdown}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            disabled={disabled}
          >
            {isOpen ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && filteredOptions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute z-50 w-full mt-1 bg-gray-800 border border-gray-600 rounded-lg max-h-48 overflow-y-auto shadow-lg"
              style={{
                // Ensure dropdown is above keyboard on mobile
                maxHeight: window.innerWidth <= 768 ? '200px' : '192px'
              }}
            >
              {filteredOptions.map((option, index) => (
                <button
                  key={`${option}-${index}`}
                  onClick={() => handleOptionSelect(option)}
                  className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg"
                >
                  {option}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
