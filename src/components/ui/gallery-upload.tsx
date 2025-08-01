"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, X, Image as ImageIcon, Plus, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { uploadImage, UploadResult } from "@/lib/supabase"
import { toast } from "sonner"

interface GalleryUploadProps {
  value?: string[]
  onChange: (urls: string[]) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  maxImages?: number
}

export function GalleryUpload({ 
  value = [], 
  onChange, 
  placeholder = "Upload gallery images",
  className = "",
  disabled = false,
  maxImages = 5
}: GalleryUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [replacingIndex, setReplacingIndex] = useState<number | null>(null)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return
    
    // If replacing a specific image
    if (replacingIndex !== null) {
      if (acceptedFiles.length > 1) {
        toast.error("Please select only one image to replace")
        return
      }
      
      setUploading(true)
      try {
        const file = acceptedFiles[0]
        const result: UploadResult = await uploadImage(file)
        
        if (result.error) {
          toast.error(`Upload failed: ${result.error}`)
          return
        }

        if (result.url) {
          const newUrls = [...value]
          newUrls[replacingIndex] = result.url
          onChange(newUrls)
          toast.success("Image replaced successfully")
        }
      } catch (error) {
        console.error("Upload error:", error)
        toast.error("Failed to upload image")
      } finally {
        setUploading(false)
        setReplacingIndex(null)
      }
      return
    }

    // Normal upload for new images
    if (value.length + acceptedFiles.length > maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`)
      return
    }

    setUploading(true)
    try {
      const uploadPromises = acceptedFiles.map(file => uploadImage(file))
      const results = await Promise.all(uploadPromises)
      
      const newUrls = results
        .filter(result => !result.error)
        .map(result => result.url)
      
      if (newUrls.length > 0) {
        onChange([...value, ...newUrls])
        toast.success(`${newUrls.length} image(s) uploaded successfully`)
      }

      const errors = results.filter(result => result.error)
      if (errors.length > 0) {
        toast.error(`${errors.length} image(s) failed to upload`)
      }
    } catch (error) {
      console.error("Upload error:", error)
      toast.error("Failed to upload images")
    } finally {
      setUploading(false)
    }
  }, [value, onChange, maxImages, replacingIndex])

  const removeImage = (index: number) => {
    const newUrls = value.filter((_, i) => i !== index)
    onChange(newUrls)
  }

  const replaceImage = (index: number) => {
    setReplacingIndex(index)
    // Trigger file input click
    document.getElementById(`replace-gallery-input-${index}`)?.click()
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    disabled: disabled || uploading || (value.length >= maxImages && replacingIndex === null)
  })

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Gallery Grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {value.map((url, index) => (
            <div key={index} className="relative group">
              <img
                src={url}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg border border-sage/20"
              />
              <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeImage(index)}
                  disabled={disabled}
                >
                  <X className="h-3 w-3" />
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => replaceImage(index)}
                  disabled={disabled || uploading}
                >
                  <RefreshCw className="h-3 w-3" />
                </Button>
              </div>
              {/* Hidden dropzone for replacement */}
              <div
                {...getRootProps()}
                className="absolute inset-0 cursor-pointer"
                style={{ pointerEvents: disabled || uploading ? 'none' : 'auto' }}
              >
                <input {...getInputProps()} id={`replace-gallery-input-${index}`} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Zone */}
      {value.length < maxImages && replacingIndex === null && (
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
            ${isDragActive 
              ? 'border-caramel bg-caramel/10' 
              : 'border-sage/20 hover:border-caramel/50 hover:bg-beige/10'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input {...getInputProps()} />
          <div className="space-y-2">
            <div className="flex justify-center">
              {uploading ? (
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-caramel"></div>
              ) : (
                <Plus className="h-8 w-8 text-chocolate/60" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-chocolate">
                {uploading ? "Uploading..." : placeholder}
              </p>
              <p className="text-xs text-chocolate/60 mt-1">
                {isDragActive 
                  ? "Drop images here" 
                  : `Drag & drop images, or click to select (${value.length}/${maxImages})`
                }
              </p>
            </div>
          </div>
        </div>
      )}

      {replacingIndex !== null && (
        <div className="text-center p-4 bg-beige/20 rounded-lg border border-sage/20">
          <p className="text-sm text-chocolate">
            Select a new image to replace gallery image {replacingIndex + 1}
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setReplacingIndex(null)}
            className="mt-2"
          >
            Cancel
          </Button>
        </div>
      )}

      {value.length >= maxImages && replacingIndex === null && (
        <p className="text-xs text-chocolate/60 text-center">
          Maximum {maxImages} images reached
        </p>
      )}
    </div>
  )
} 