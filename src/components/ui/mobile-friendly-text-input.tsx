import React, { useRef, useEffect } from 'react'
import { Input } from './input'

interface MobileFriendlyTextInputProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
  label: string
  type?: 'text' | 'email' | 'tel'
  className?: string
  disabled?: boolean
  required?: boolean
}

export function MobileFriendlyTextInput({
  value,
  onChange,
  placeholder,
  label,
  type = 'text',
  className = '',
  disabled = false,
  required = false
}: MobileFriendlyTextInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  // Handle mobile keyboard interactions
  useEffect(() => {
    const handleFocus = () => {
      // Scroll to input on mobile when focused
      if (window.innerWidth <= 768 && inputRef.current) {
        setTimeout(() => {
          inputRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          })
        }, 300) // Small delay to let keyboard open
      }
    }

    const input = inputRef.current
    if (input) {
      input.addEventListener('focus', handleFocus)
      return () => input.removeEventListener('focus', handleFocus)
    }
  }, [])

  return (
    <div className={`space-y-3 ${className}`}>
      <label className="text-white font-medium">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <Input
        ref={inputRef}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
        disabled={disabled}
        required={required}
        // Mobile-specific attributes
        autoComplete={type === 'email' ? 'email' : type === 'tel' ? 'tel' : 'off'}
        inputMode={type === 'tel' ? 'tel' : 'text'}
      />
    </div>
  )
}
