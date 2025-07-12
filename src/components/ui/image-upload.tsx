"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, X, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { uploadImage, UploadResult } from "@/lib/supabase"
import { toast } from "sonner"

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  onRemove?: () => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function ImageUpload({ 
  value, 
  onChange, 
  onRemove, 
  placeholder = "Upload image",
  className = "",
  disabled = false 
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return

    setUploading(true)
    try {
      const file = acceptedFiles[0]
      const result: UploadResult = await uploadImage(file)
      
      if (result.error) {
        toast.error(`Upload failed: ${result.error}`)
        return
      }

      if (result.url) {
        onChange(result.url)
        toast.success("Image uploaded successfully")
      }
    } catch (error) {
      console.error("Upload error:", error)
      toast.error("Failed to upload image")
    } finally {
      setUploading(false)
    }
  }, [onChange])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1,
    disabled: disabled || uploading
  })

  return (
    <div className={`space-y-4 ${className}`}>
      {value ? (
        <div className="relative group">
          <img
            src={value}
            alt="Uploaded image"
            className="w-full h-48 object-cover rounded-lg border border-sage/20"
          />
          {onRemove && (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={onRemove}
              disabled={disabled}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      ) : (
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
                <ImageIcon className="h-8 w-8 text-chocolate/60" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-chocolate">
                {uploading ? "Uploading..." : placeholder}
              </p>
              <p className="text-xs text-chocolate/60 mt-1">
                {isDragActive 
                  ? "Drop the image here" 
                  : "Drag & drop an image, or click to select"
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 