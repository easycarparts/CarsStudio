export interface FunnelData {
  service: string
  year?: string
  make?: string
  model?: string
  package?: string
  finish?: string
  brand?: string
  addons?: string[]
  condition: string
  timing: string
  phone?: string
  name?: string
  colorIdea?: string
  photos: File[]
  grade: 'A' | 'B' | 'C'
}

export interface Vehicle {
  year: number
  make: string
  model: string
  segment: string
}

export interface ServiceConfig {
  name: string
  description: string
  packages: Array<{
    id: string
    name: string
    description: string
  }>
  finishes?: Array<{
    id: string
    name: string
    description: string
  }>
  brands?: Array<{
    id: string
    name: string
    description: string
  }>
  addons?: Array<{
    id: string
    name: string
    description: string
  }>
}

export interface ServicesConfig {
  services: {
    wrapping: ServiceConfig
    ppf: ServiceConfig
    detailing: ServiceConfig
  }
  conditions: Array<{
    id: string
    name: string
    description: string
  }>
  timing: Array<{
    id: string
    name: string
    description: string
  }>
}
