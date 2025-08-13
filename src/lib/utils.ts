import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Phone number sanitization for UAE
export function sanitizePhoneNumber(phone: string): string {
  // Remove all non-digit characters
  let cleaned = phone.replace(/\D/g, '')
  
  // Handle UAE phone numbers
  if (cleaned.startsWith('0')) {
    // Convert 05xxxxxxxx to +9715xxxxxxxx
    cleaned = '+971' + cleaned.substring(1)
  } else if (cleaned.startsWith('971')) {
    // Convert 971xxxxxxxx to +971xxxxxxxx
    cleaned = '+' + cleaned
  } else if (cleaned.startsWith('5') && cleaned.length === 9) {
    // Convert 5xxxxxxxx to +9715xxxxxxxx
    cleaned = '+971' + cleaned
  } else if (!cleaned.startsWith('+')) {
    // Add +971 prefix if no country code
    cleaned = '+971' + cleaned
  }
  
  return cleaned
}

// Lead grading function
export function calculateLeadGrade(data: {
  service: string
  package?: string
  timing: string
  carMake?: string
}): 'A' | 'B' | 'C' {
  let score = 0
  
  // Service weight
  if (data.service === 'ppf' && data.package === 'full_body') {
    score += 5
  } else if (data.service === 'wrapping' && data.package === 'full_wrap') {
    score += 4
  } else if (data.service === 'ppf' && (data.package === 'full_front' || data.package === 'track_pack')) {
    score += 3
  } else if (data.service === 'detailing') {
    score += 2
  }
  
  // Timing weight
  const timingScores: Record<string, number> = {
    'asap': 3,
    'this_week': 2,
    'next_week': 1
  }
  score += timingScores[data.timing] || 1
  
  // Car segment weight
  const luxuryMakes = ['Porsche', 'BMW', 'Mercedes-Benz', 'Audi', 'Lexus', 'Lotus', 'Bentley', 'Rolls-Royce', 'Ferrari', 'Lamborghini', 'McLaren', 'Aston Martin']
  const midMakes = ['Ford', 'Toyota', 'Honda', 'Nissan', 'Volkswagen', 'Hyundai', 'Kia', 'Mazda', 'Subaru', 'Mitsubishi']
  
  if (data.carMake && luxuryMakes.includes(data.carMake)) {
    score += 3
  } else if (data.carMake && midMakes.includes(data.carMake)) {
    score += 2
  } else {
    score += 1
  }
  
  // Grade mapping (adjusted for no budget scoring)
  if (score >= 8) return 'A'
  if (score >= 5) return 'B'
  return 'C'
}

// Image compression utility
export function compressImage(file: File, maxWidth: number = 1280, quality: number = 0.7): Promise<File> {
  return new Promise((resolve) => {
    try {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      if (!ctx) {
        console.warn('Canvas context not available, returning original file')
        resolve(file)
        return
      }
      
      const img = new Image()
      
      img.onload = () => {
        try {
          // Calculate new dimensions
          let { width, height } = img
          if (width > maxWidth) {
            height = (height * maxWidth) / width
            width = maxWidth
          }
          
          canvas.width = width
          canvas.height = height
          
          // Draw and compress
          ctx.drawImage(img, 0, 0, width, height)
          canvas.toBlob((blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now()
              })
              resolve(compressedFile)
            } else {
              console.warn('Failed to create blob, returning original file')
              resolve(file)
            }
          }, 'image/jpeg', quality)
        } catch (error) {
          console.warn('Error during image compression:', error)
          resolve(file)
        }
      }
      
      img.onerror = () => {
        console.warn('Failed to load image for compression, returning original file')
        resolve(file)
      }
      
      img.src = URL.createObjectURL(file)
    } catch (error) {
      console.warn('Error setting up image compression:', error)
      resolve(file)
    }
  })
}

// UTM parameter extraction
export function getUTMParams(): Record<string, string> {
  const urlParams = new URLSearchParams(window.location.search)
  return {
    utm_source: urlParams.get('utm_source') || '',
    utm_campaign: urlParams.get('utm_campaign') || '',
    utm_content: urlParams.get('utm_content') || '',
    utm_adset: urlParams.get('utm_adset') || '',
    utm_term: urlParams.get('utm_term') || ''
  }
}

// WhatsApp message template
export function generateWhatsAppMessage(data: {
  service: string
  year?: string
  make?: string
  model?: string
  package?: string
  finish?: string
  brand?: string
  condition: string
  timing: string
  name?: string
  colorIdea?: string
}): string {
  let packageInfo = data.package || ''
  if (data.finish) {
    packageInfo += ` ${data.finish}`
  }
  if (data.brand) {
    packageInfo += ` ${data.brand}`
  }
  
  const carInfo = data.year && data.make && data.model 
    ? `${data.year} ${data.make} ${data.model}`
    : 'Not specified'
  
  const serviceName = data.service === 'wrapping' ? 'Vehicle Wrapping' : 
                     data.service === 'ppf' ? 'Paint Protection Film (PPF)' : 
                     data.service === 'detailing' ? 'Car Detailing' : data.service
  
  const greeting = data.name ? `Hi, I'm *${data.name}*!` : 'Hi!'
  
  // Build vehicle details with conditional color idea
  let vehicleDetails = `• Car: *${carInfo}*
• Package: *${packageInfo}*
• Condition: *${data.condition}*
• Timeline: *${data.timing}*`

  // Add color idea only if user provided one
  if (data.colorIdea && data.colorIdea.trim()) {
    vehicleDetails += `\n• Color Idea: *${data.colorIdea.trim()}*`
  }
  
  return `${greeting}

I'm interested in getting a *${serviceName}* for my vehicle.

*Vehicle Details:*
${vehicleDetails}

Looking forward to your quote!`
}

// Analytics tracking
export function trackEvent(eventName: string, params: Record<string, any> = {}) {
  // Google Analytics 4 (if available)
  if (typeof (window as any).gtag !== 'undefined' && (window as any).gtag) {
    try {
      (window as any).gtag('event', eventName, params)
    } catch (error) {
      console.warn('Google Analytics tracking failed:', error)
    }
  }
}

// Local storage utilities
export function saveToLocalStorage(key: string, data: any) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.warn('Failed to save to localStorage:', error)
  }
}

export function loadFromLocalStorage(key: string) {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  } catch (error) {
    console.warn('Failed to load from localStorage:', error)
    return null
  }
}

// Debounce utility
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}
