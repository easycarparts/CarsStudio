import React, { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { compressImage } from '@/lib/utils'
import { Camera, X, Upload } from 'lucide-react'

interface PhotoUploadProps {
  photos: File[]
  onPhotosChange: (photos: File[]) => void
  maxPhotos?: number
  className?: string
}

export function PhotoUpload({ photos, onPhotosChange, maxPhotos = 3, className }: PhotoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length === 0) return

    setIsUploading(true)
    try {
      const compressedFiles = await Promise.all(
        files.slice(0, maxPhotos - photos.length).map(async (file) => {
          try {
            return await compressImage(file)
          } catch (error) {
            console.warn('Failed to compress image, using original:', error)
            return file
          }
        })
      )
      
      onPhotosChange([...photos, ...compressedFiles])
    } catch (error) {
      console.error('Error processing images:', error)
      // Fallback to original files if compression fails
      onPhotosChange([...photos, ...files.slice(0, maxPhotos - photos.length)])
    } finally {
      setIsUploading(false)
    }
  }

  const handleCameraCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = 'image/*'
      fileInputRef.current.capture = 'environment'
      fileInputRef.current.click()
    }
  }

  const handleGallerySelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = 'image/*'
      fileInputRef.current.removeAttribute('capture')
      fileInputRef.current.click()
    }
  }

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index)
    onPhotosChange(newPhotos)
  }

  return (
    <div className={className}>
      <div className="space-y-4">
        {/* Photo previews */}
        <div className="grid grid-cols-3 gap-3">
          <AnimatePresence>
            {photos.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative aspect-square rounded-lg overflow-hidden bg-gray-800"
              >
                <img
                  src={URL.createObjectURL(photo)}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.warn('Failed to load image preview')
                    e.currentTarget.style.display = 'none'
                  }}
                />
                <button
                  onClick={() => removePhoto(index)}
                  className="absolute top-1 right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs hover:bg-red-600 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Upload buttons */}
        {photos.length < maxPhotos && (
          <div className="flex gap-3">
            <Button
              onClick={handleCameraCapture}
              disabled={isUploading}
              variant="outline"
              className="flex-1"
            >
              <Camera className="w-4 h-4 mr-2" />
              Camera
            </Button>
            <Button
              onClick={handleGallerySelect}
              disabled={isUploading}
              variant="outline"
              className="flex-1"
            >
              <Upload className="w-4 h-4 mr-2" />
              Gallery
            </Button>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {isUploading && (
          <div className="text-center text-gray-400 text-sm">
            Processing photos...
          </div>
        )}

        <div className="text-center text-gray-400 text-xs">
          {photos.length}/{maxPhotos} photos • You can skip this step
        </div>
      </div>
    </div>
  )
}
