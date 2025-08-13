import { z } from 'zod'

export const phoneSchema = z.object({
  phone: z.string()
    .min(1, 'Phone number is required')
    .refine((phone) => {
      const cleaned = phone.replace(/\D/g, '')
      return cleaned.length >= 9 && cleaned.length <= 15
    }, 'Please enter a valid phone number')
})

export const contactSchema = z.object({
  phone: z.string()
    .min(1, 'Phone number is required')
    .refine((phone) => {
      const cleaned = phone.replace(/\D/g, '')
      return cleaned.length >= 9 && cleaned.length <= 15
    }, 'Please enter a valid phone number'),
  name: z.string().optional()
})

export const funnelSchema = z.object({
  service: z.string().min(1, 'Please select a service'),
  year: z.string().optional(),
  make: z.string().optional(),
  model: z.string().optional(),
  package: z.string().optional(),
  finish: z.string().optional(),
  brand: z.string().optional(),
  addons: z.array(z.string()).optional(),
  condition: z.string().min(1, 'Please select condition'),
  timing: z.string().min(1, 'Please select timing'),
  emirate: z.string().min(1, 'Please select emirate'),
  neighborhood: z.string().min(1, 'Please enter neighborhood'),
  budget: z.string().min(1, 'Please select budget'),
  intent: z.string().min(1, 'Please select intent'),
  phone: z.string()
    .min(1, 'Phone number is required')
    .refine((phone) => {
      const cleaned = phone.replace(/\D/g, '')
      return cleaned.length >= 9 && cleaned.length <= 15
    }, 'Please enter a valid phone number'),
  name: z.string().optional(),
  photos: z.array(z.instanceof(File)).optional(),
  grade: z.enum(['A', 'B', 'C'])
})
