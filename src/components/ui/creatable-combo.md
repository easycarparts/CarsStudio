# CreatableCombo Component

A mobile-friendly creatable combobox component with keyboard navigation, validation, and portal rendering.

## Features

✅ **Mobile Keyboard Safety**: Integrates with `useKeyboardAware` and `useFocusIntoView` hooks  
✅ **Portal Rendering**: Dropdown renders in portal to avoid clipping  
✅ **Bottom Sheet Fallback**: Automatically switches to bottom sheet on mobile when space is limited  
✅ **Keyboard Navigation**: Full keyboard support (Arrow keys, Enter, Escape)  
✅ **Validation**: Optional validation with inline error display  
✅ **Accessibility**: Proper ARIA roles and keyboard navigation  
✅ **Custom Values**: Allows creating new values not in the options list  

## Props

```typescript
interface CreatableComboProps {
  value: string                    // Current selected value
  onChange: (val: string) => void  // Callback when value changes
  options: CreatableComboOption[]  // Available options
  placeholder?: string             // Input placeholder text
  label?: string                   // Field label
  allowCreate?: boolean            // Allow creating custom values (default: true)
  validate?: (raw: string) => string | null  // Validation function
  disabled?: boolean               // Disable the input
  className?: string               // Additional CSS classes
}

interface CreatableComboOption {
  label: string  // Display text
  value: string  // Actual value
}
```

## Basic Usage

```tsx
import { CreatableCombo } from '@/components/ui/creatable-combo'

function MyComponent() {
  const [value, setValue] = useState('')
  
  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' }
  ]

  return (
    <CreatableCombo
      value={value}
      onChange={setValue}
      options={options}
      placeholder="Select or type..."
      label="My Field"
    />
  )
}
```

## With Validation

```tsx
function YearField() {
  const [year, setYear] = useState('')
  
  const validateYear = (value: string): string | null => {
    if (!value) return null
    
    // Check if it's a 4-digit number
    if (!/^\d{4}$/.test(value)) {
      return 'Year must be a 4-digit number'
    }
    
    const yearNum = parseInt(value)
    const currentYear = new Date().getFullYear()
    
    if (yearNum < 1980 || yearNum > currentYear + 1) {
      return `Year must be between 1980 and ${currentYear + 1}`
    }
    
    return null
  }

  const yearOptions = [
    { label: '2025', value: '2025' },
    { label: '2024', value: '2024' },
    { label: '2023', value: '2023' }
  ]

  return (
    <CreatableCombo
      value={year}
      onChange={setYear}
      options={yearOptions}
      placeholder="Enter year (1980-2026)"
      label="Vehicle Year"
      validate={validateYear}
      allowCreate={true}
    />
  )
}
```

## Keyboard Navigation

- **Arrow Down**: Open dropdown and navigate down
- **Arrow Up**: Navigate up through options
- **Enter**: Select highlighted option or create custom value
- **Escape**: Close dropdown
- **Click outside**: Close dropdown

## Mobile Behavior

- **Portal Rendering**: Dropdown renders in document body to avoid clipping
- **Bottom Sheet**: Automatically switches to bottom sheet when space below is limited
- **Keyboard Awareness**: Positions above keyboard using `--keyboard-h` CSS variable
- **Focus Management**: Automatically scrolls input into view when focused

## Styling

The component uses Tailwind CSS classes that match the dark theme:

- **Input**: `bg-gray-800 border-gray-600 text-white`
- **Dropdown**: `bg-gray-800 border-gray-600`
- **Hover States**: `hover:bg-gray-700`
- **Focus Ring**: `focus:ring-2 focus:ring-red-500`
- **Error State**: `border-red-500` with error message below

## Accessibility

- **ARIA Roles**: `combobox`, `listbox`, `option`
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Proper labels and descriptions
- **Focus Management**: Maintains focus state correctly

## Integration with Existing Hooks

The component automatically integrates with:

- `useKeyboardAware`: For keyboard height detection
- `useFocusIntoView`: For automatic scrolling on focus
- `useMobile`: For mobile-specific behavior (if needed)

## Example Implementation

See `src/components/examples/CreatableComboExample.tsx` for a complete working example with validation.
