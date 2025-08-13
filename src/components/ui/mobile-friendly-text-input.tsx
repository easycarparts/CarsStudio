import { Input } from './input'
import { useFocusIntoView } from '@/lib/use-focus-into-view'

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
  const { elementRef, handleFocus } = useFocusIntoView()
  const inputRef = elementRef as React.RefObject<HTMLInputElement>

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
        onFocus={handleFocus}
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
