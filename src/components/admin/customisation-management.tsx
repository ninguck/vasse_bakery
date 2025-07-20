"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Plus, 
  Image as ImageIcon, 
  Edit, 
  Trash2, 
  Save, 
  Loader2, 
  Star, 
  Upload, 
  X,
  Coffee,
  Heart,
  Sparkles,
  Flame,
  Leaf,
  MapPin,
  Clock,
  Utensils,
  Cake,
  Cookie,
  Gift
} from "lucide-react"
import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { useMiscContent } from "@/hooks/useMiscContent"
import { miscContentApi, MiscContent } from "@/lib/api"
import { toast } from "sonner"

// Bakery-related Lucide React icons (only using available icons)
const BAKERY_ICONS = [
  { value: "coffee", label: "Coffee", icon: Coffee },
  { value: "cake", label: "Cake", icon: Cake },
  { value: "cookie", label: "Cookie", icon: Cookie },
  { value: "heart", label: "Heart", icon: Heart },
  { value: "sparkles", label: "Sparkles", icon: Sparkles },
  { value: "flame", label: "Flame", icon: Flame },
  { value: "leaf", label: "Leaf", icon: Leaf },
  { value: "map-pin", label: "Location", icon: MapPin },
  { value: "clock", label: "Clock", icon: Clock },
  { value: "utensils", label: "Utensils", icon: Utensils },
  { value: "gift", label: "Gift", icon: Gift },
  { value: "star", label: "Star", icon: Star },
]

interface HeroFormData {
  imageUrl: string
  icon: string
  largeText: string
  smallText: string
}

export function CustomisationManagement() {
  const { miscContent, isLoading, error, mutate } = useMiscContent()
  const [showHeroDialog, setShowHeroDialog] = useState(false)
  const [editingHero, setEditingHero] = useState<MiscContent | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [heroFormData, setHeroFormData] = useState<HeroFormData>({
    imageUrl: '',
    icon: '',
    largeText: '',
    smallText: ''
  })

  // Filter hero content
  const heroContent = miscContent.filter(item => item.section === 'hero')

  const resetHeroForm = () => {
    setHeroFormData({
      imageUrl: '',
      icon: '',
      largeText: '',
      smallText: ''
    })
  }

  // Image upload functionality
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return

    const file = acceptedFiles[0]
    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()
      setHeroFormData(prev => ({ ...prev, imageUrl: data.url }))
      toast.success('Image uploaded successfully')
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Failed to upload image')
    } finally {
      setIsUploading(false)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1,
    disabled: isUploading
  })

  const handleHeroSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = {
        section: 'hero', // Pre-filled for hero section
        imageUrl: heroFormData.imageUrl,
        icon: heroFormData.icon,
        largeText: heroFormData.largeText,
        smallText: heroFormData.smallText,
        message: null // Not used for hero section
      }

      if (editingHero) {
        // Update existing hero item
        await miscContentApi.update(editingHero.id, formData)
        toast.success('Hero content updated successfully')
      } else {
        // Create new hero item
        await miscContentApi.create(formData)
        toast.success('Hero content created successfully')
      }
      
      setShowHeroDialog(false)
      setEditingHero(null)
      resetHeroForm()
      mutate() // Refresh the data
    } catch (error) {
      console.error('Error saving hero content:', error)
      toast.error('Failed to save hero content')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditHero = (item: MiscContent) => {
    setEditingHero(item)
    setHeroFormData({
      imageUrl: item.imageUrl || '',
      icon: item.icon || '',
      largeText: item.largeText || '',
      smallText: item.smallText || ''
    })
    setShowHeroDialog(true)
  }

  const handleDeleteHero = async (id: string) => {
    if (!confirm('Are you sure you want to delete this hero content?')) return

    try {
      await miscContentApi.delete(id)
      toast.success('Hero content deleted successfully')
      mutate() // Refresh the data
    } catch (error) {
      console.error('Error deleting hero content:', error)
      toast.error('Failed to delete hero content')
    }
  }

  const handleCloseHeroDialog = () => {
    setShowHeroDialog(false)
    setEditingHero(null)
    resetHeroForm()
  }

  const removeImage = () => {
    setHeroFormData(prev => ({ ...prev, imageUrl: '' }))
  }

  // Helper function to render icon
  const renderIcon = (iconValue: string) => {
    const iconOption = BAKERY_ICONS.find(icon => icon.value === iconValue)
    if (!iconOption) return null
    
    const IconComponent = iconOption.icon
    return <IconComponent className="h-5 w-5 text-caramel" />
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-chocolate">Site Customisation</h1>
            <p className="text-chocolate/70 mt-1">Manage general customisable sections of your site</p>
          </div>
        </div>
        <Card className="bg-white border-sage/20">
          <CardContent className="pt-6">
            <div className="text-red-500 text-center py-8">
              Error loading content: {error.message}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-chocolate">Site Customisation</h1>
          <p className="text-chocolate/70 mt-1">Manage general customisable sections of your site</p>
        </div>
      </div>

      {/* Hero Section */}
      <Card className="bg-white border-sage/20">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg text-chocolate flex items-center gap-2">
              <Star className="h-5 w-5 text-caramel" />
              Hero Section
            </CardTitle>
            <p className="text-sm text-chocolate/70 mt-1">Manage hero images, icons, and text displayed on your homepage</p>
          </div>
          <Dialog open={showHeroDialog} onOpenChange={setShowHeroDialog}>
            <DialogTrigger asChild>
              <Button className="bg-caramel hover:bg-caramel/90 text-white" onClick={() => setEditingHero(null)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Hero Content
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-chocolate">
                  {editingHero ? 'Edit Hero Content' : 'Add Hero Content'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleHeroSubmit} className="space-y-4">
                {/* Image Upload */}
                <div>
                  <Label className="text-chocolate">Hero Image *</Label>
                  {heroFormData.imageUrl ? (
                    <div className="relative mt-2">
                      <img
                        src={heroFormData.imageUrl}
                        alt="Hero preview"
                        className="w-full h-32 object-cover rounded-lg border border-sage/20"
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div
                      {...getRootProps()}
                      className={`mt-2 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                        isDragActive
                          ? 'border-caramel bg-caramel/5'
                          : 'border-sage/20 hover:border-caramel/50'
                      }`}
                    >
                      <input {...getInputProps()} />
                      {isUploading ? (
                        <div className="flex items-center justify-center">
                          <Loader2 className="h-6 w-6 animate-spin text-caramel" />
                          <span className="ml-2 text-chocolate">Uploading...</span>
                        </div>
                      ) : (
                        <div>
                          <Upload className="h-8 w-8 mx-auto text-sage/60 mb-2" />
                          <p className="text-chocolate/70">
                            {isDragActive
                              ? 'Drop the image here'
                              : 'Drag & drop an image here, or click to select'}
                          </p>
                          <p className="text-xs text-chocolate/50 mt-1">
                            Supports: JPG, PNG, GIF, WebP
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                  <p className="text-xs text-chocolate/60 mt-1">The main image displayed in your hero section</p>
                </div>

                {/* Icon Selection */}
                <div>
                  <Label htmlFor="hero-icon" className="text-chocolate">Icon</Label>
                  <Select
                    value={heroFormData.icon}
                    onValueChange={(value) => setHeroFormData({ ...heroFormData, icon: value })}
                  >
                    <SelectTrigger className="border-sage/20 bg-white">
                      <SelectValue placeholder="Select an icon" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-sage/20">
                      {BAKERY_ICONS.map((iconOption) => {
                        const IconComponent = iconOption.icon
                        return (
                          <SelectItem key={iconOption.value} value={iconOption.value}>
                            <div className="flex items-center gap-2">
                              <IconComponent className="h-4 w-4 text-caramel" />
                              <span>{iconOption.label}</span>
                            </div>
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-chocolate/60 mt-1">An icon to display alongside your text</p>
                </div>

                <div>
                  <Label htmlFor="hero-largeText" className="text-chocolate">Large Text *</Label>
                  <Input
                    id="hero-largeText"
                    value={heroFormData.largeText}
                    onChange={(e) => setHeroFormData({ ...heroFormData, largeText: e.target.value })}
                    placeholder="e.g., Premium Coffee"
                    required
                    className="border-sage/20"
                  />
                  <p className="text-xs text-chocolate/60 mt-1">The main headline text for your hero section</p>
                </div>

                <div>
                  <Label htmlFor="hero-smallText" className="text-chocolate">Small Text</Label>
                  <Input
                    id="hero-smallText"
                    value={heroFormData.smallText}
                    onChange={(e) => setHeroFormData({ ...heroFormData, smallText: e.target.value })}
                    placeholder="e.g., Freshly brewed daily"
                    className="border-sage/20"
                  />
                  <p className="text-xs text-chocolate/60 mt-1">Subtitle or supporting text</p>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCloseHeroDialog}
                    disabled={isSubmitting}
                    className="border-sage/20 text-chocolate"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting || !heroFormData.imageUrl || !heroFormData.largeText}
                    className="bg-caramel hover:bg-caramel/90 text-white"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        {editingHero ? 'Update Hero' : 'Create Hero'}
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-caramel" />
              <span className="ml-2 text-chocolate">Loading hero content...</span>
            </div>
          ) : heroContent.length === 0 ? (
            <div className="text-chocolate/60 py-8 text-center">
              No hero content found. Create your first hero section!
            </div>
          ) : (
                        <div className="space-y-4">
              {heroContent.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[1fr_auto] gap-4 p-4 border border-sage/20 rounded-lg bg-white"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="bg-caramel/10 text-caramel border-caramel/20 flex-shrink-0">
                        Hero Section
                      </Badge>
                      {item.icon && (
                        <div className="flex-shrink-0">
                          {renderIcon(item.icon)}
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      {item.largeText && (
                        <p className="font-medium text-chocolate break-words">{item.largeText}</p>
                      )}
                      {item.smallText && (
                        <p className="text-sm text-chocolate/70 break-words">{item.smallText}</p>
                      )}
                      {item.imageUrl && (
                        <div className="flex items-center gap-2 mt-2">
                          <img
                            src={item.imageUrl}
                            alt="Hero preview"
                            className="w-12 h-12 object-cover rounded border border-sage/20 flex-shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-chocolate/60 truncate">
                              {item.imageUrl}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditHero(item)}
                      className="border-sage/20 text-chocolate hover:bg-sage/5"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteHero(item.id)}
                      className="border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Placeholder for future sections */}
      <Card className="bg-white border-sage/20 opacity-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-chocolate/70">More Sections Coming Soon</CardTitle>
          <p className="text-sm text-chocolate/50 mt-1">About section, address, and other customisable areas will be added here</p>
        </CardHeader>
        <CardContent>
          <div className="text-chocolate/40 py-4 text-center">
            Additional customisation sections will be implemented here...
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 