import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useKeyboardAware } from '@/lib/use-keyboard-aware'
import { useFocusIntoView } from '@/lib/use-focus-into-view'

interface CreatableComboOption {
  label: string
  value: string
}

interface CreatableComboProps {
  value: string
  onChange: (val: string) => void
  options: CreatableComboOption[]
  placeholder?: string
  label?: string
  allowCreate?: boolean
  validate?: (raw: string) => string | null
  disabled?: boolean
  className?: string
}

export function CreatableCombo({
  value,
  onChange,
  options,
  placeholder = 'Select or type...',
  label,
  allowCreate = true,
  validate,
  disabled = false,
  className = ''
}: CreatableComboProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [error, setError] = useState<string | null>(null)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  
  const { keyboardHeight, isKeyboardOpen } = useKeyboardAware()
  const { handleFocus } = useFocusIntoView()
  
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0, width: 0 })
  const [shouldRenderAsBottomSheet, setShouldRenderAsBottomSheet] = useState(false)

  // Filter options based on query
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(query.toLowerCase()) ||
    option.value.toLowerCase().includes(query.toLowerCase())
  )

  // Check if query matches any existing option exactly
  const hasExactMatch = filteredOptions.some(option => 
    option.label.toLowerCase() === query.toLowerCase() ||
    option.value.toLowerCase() === query.toLowerCase()
  )

  // Show "Add" option if no exact match and allowCreate is true
  const showAddOption = allowCreate && query && !hasExactMatch && !error

  // Calculate menu position and determine if it should be a bottom sheet
  useEffect(() => {
    if (!containerRef.current || !isOpen) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const viewportHeight = window.visualViewport?.height || window.innerHeight
    const spaceBelow = viewportHeight - containerRect.bottom
    const spaceAbove = containerRect.top
    const menuHeight = Math.min(filteredOptions.length * 48 + (showAddOption ? 48 : 0), 240) // Approximate menu height

    const shouldBeBottomSheet = spaceBelow < menuHeight && spaceAbove > menuHeight

    setShouldRenderAsBottomSheet(shouldBeBottomSheet)

    if (shouldBeBottomSheet) {
      setMenuPosition({
        top: 0,
        left: 0,
        width: window.innerWidth
      })
    } else {
      setMenuPosition({
        top: containerRect.bottom + 4,
        left: containerRect.left,
        width: containerRect.width
      })
    }
  }, [isOpen, keyboardHeight, isKeyboardOpen, filteredOptions.length, showAddOption])

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        e.preventDefault()
        setIsOpen(true)
        setHighlightedIndex(0)
      }
      return
    }

    const totalOptions = filteredOptions.length + (showAddOption ? 1 : 0)

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex(prev => 
          prev < totalOptions - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : totalOptions - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (highlightedIndex >= 0) {
          if (highlightedIndex < filteredOptions.length) {
            handleSelect(filteredOptions[highlightedIndex].value)
          } else if (showAddOption) {
            handleCreate(query)
          }
        }
        break
      case 'Escape':
        e.preventDefault()
        setIsOpen(false)
        setHighlightedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }, [isOpen, highlightedIndex, filteredOptions, showAddOption, query])

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    setQuery(newQuery)
    setIsOpen(true)
    setHighlightedIndex(-1)
    
    // Clear error when user starts typing
    if (error) setError(null)
    
    // Validate if validation function provided
    if (validate) {
      const validationError = validate(newQuery)
      setError(validationError)
    }
  }

  // Handle option selection
  const handleSelect = (selectedValue: string) => {
    const selectedOption = options.find(opt => opt.value === selectedValue)
    if (selectedOption) {
      onChange(selectedValue)
      setQuery(selectedOption.label)
    }
    setIsOpen(false)
    setHighlightedIndex(-1)
    inputRef.current?.blur()
  }

  // Handle creating new value
  const handleCreate = (newValue: string) => {
    if (validate) {
      const validationError = validate(newValue)
      if (validationError) {
        setError(validationError)
        return
      }
    }
    
    onChange(newValue)
    setQuery(newValue)
    setIsOpen(false)
    setHighlightedIndex(-1)
    inputRef.current?.blur()
  }

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
        setHighlightedIndex(-1)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Handle blur
  const handleBlur = () => {
    // Delay closing to allow for option clicks
    setTimeout(() => {
      setIsOpen(false)
      setHighlightedIndex(-1)
    }, 150)
  }

  // Focus management
  const handleInputFocus = () => {
    if (inputRef.current) {
      handleFocus()
    }
    setIsOpen(true)
    setHighlightedIndex(-1)
  }

  // Update query when value changes externally
  useEffect(() => {
    const selectedOption = options.find(opt => opt.value === value)
    if (selectedOption) {
      setQuery(selectedOption.label)
    } else {
      setQuery(value)
    }
  }, [value, options])

  const menuContent = (
    <motion.div
      ref={menuRef}
      initial={{ opacity: 0, scale: 0.95, y: shouldRenderAsBottomSheet ? 20 : -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: shouldRenderAsBottomSheet ? 20 : -10 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className={`
        bg-gray-800 border border-gray-600 rounded-lg shadow-xl
        ${shouldRenderAsBottomSheet 
          ? 'fixed bottom-0 left-0 right-0 z-[9999] max-h-[60vh] overflow-y-auto' 
          : 'absolute z-[9999] max-h-60 overflow-y-auto'
        }
      `}
      style={{
        top: shouldRenderAsBottomSheet ? 'auto' : menuPosition.top,
        left: shouldRenderAsBottomSheet ? 0 : menuPosition.left,
        width: shouldRenderAsBottomSheet ? '100%' : menuPosition.width,
        bottom: shouldRenderAsBottomSheet ? `calc(var(--keyboard-h, 0px) + 1rem)` : 'auto'
      }}
      role="listbox"
    >
      {filteredOptions.length === 0 && !showAddOption ? (
        <div className="px-4 py-3 text-gray-400 text-sm">
          No options found
        </div>
      ) : (
        <>
          {filteredOptions.map((option, index) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`
                px-4 py-3 cursor-pointer transition-colors
                ${index === highlightedIndex 
                  ? 'bg-gray-700 text-white' 
                  : 'text-gray-300 hover:bg-gray-700'
                }
              `}
              role="option"
              aria-selected={index === highlightedIndex}
            >
              {option.label}
            </div>
          ))}
          
          {showAddOption && (
            <div
              onClick={() => handleCreate(query)}
              className={`
                px-4 py-3 cursor-pointer transition-colors border-t border-gray-600
                ${highlightedIndex === filteredOptions.length 
                  ? 'bg-gray-700 text-white' 
                  : 'text-green-400 hover:bg-gray-700'
                }
              `}
              role="option"
              aria-selected={highlightedIndex === filteredOptions.length}
            >
              Add "{query}"
            </div>
          )}
        </>
      )}
    </motion.div>
  )

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="text-white font-medium">
          {label}
        </label>
      )}
      
      <div ref={containerRef} className="relative">
        <input
          ref={inputRef}
          onFocus={handleInputFocus}
          type="text"
          value={query}
          onChange={handleInputChange}

          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full bg-gray-800 border border-gray-600 text-white rounded-lg px-4 py-3 
            focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent 
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? 'border-red-500' : ''}
            placeholder:text-gray-400
          `}
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls="creatable-combo-menu"
          aria-activedescendant={highlightedIndex >= 0 ? `option-${highlightedIndex}` : undefined}
        />
        
        {/* Error message */}
        {error && (
          <div className="mt-1 text-red-400 text-sm">
            {error}
          </div>
        )}
        
        {/* Dropdown arrow */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
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
      
      <AnimatePresence>
        {isOpen && (
          createPortal(
            menuContent,
            document.body
          )
        )}
      </AnimatePresence>
    </div>
  )
}
