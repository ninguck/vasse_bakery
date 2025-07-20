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
  Phone,
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

interface LocationFormData {
  address: string
  hours: string
  contact: string
}

export function CustomisationManagement() {
  const { miscContent, isLoading, error, mutate } = useMiscContent()
  const [showHeroDialog, setShowHeroDialog] = useState(false)
  const [showLocationDialog, setShowLocationDialog] = useState(false)
  const [editingHero, setEditingHero] = useState<MiscContent | null>(null)
  const [editingLocation, setEditingLocation] = useState<MiscContent | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [heroFormData, setHeroFormData] = useState<HeroFormData>({
    imageUrl: '',
    icon: '',
    largeText: '',
    smallText: ''
  })
  const [locationFormData, setLocationFormData] = useState<LocationFormData>({
    address: '',
    hours: '',
    contact: ''
  })

  // Predefined location sections with fixed icons and titles
  const LOCATION_SECTIONS = [
    { value: 'address', label: 'Address', icon: 'map-pin' },
    { value: 'hours', label: 'Opening Hours', icon: 'clock' },
    { value: 'contact', label: 'Contact', icon: 'phone' }
  ]

  // Filter content by section
  const heroContent = miscContent.filter(item => item.section === 'hero')
  const locationContent = miscContent.filter(item => item.section === 'location')

  const resetHeroForm = () => {
    setHeroFormData({
      imageUrl: '',
      icon: '',
      largeText: '',
      smallText: ''
    })
  }

  const resetLocationForm = () => {
    setLocationFormData({
      address: '',
      hours: '',
      contact: ''
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

  const handleLocationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Save all three sections
      const sectionsToSave = [
        {
          section: 'location',
          icon: 'map-pin',
          largeText: 'Address',
          message: locationFormData.address
        },
        {
          section: 'location',
          icon: 'clock',
          largeText: 'Opening Hours',
          message: locationFormData.hours
        },
        {
          section: 'location',
          icon: 'phone',
          largeText: 'Contact',
          message: locationFormData.contact
        }
      ]

      // Find existing location items to update, or create new ones
      for (const sectionData of sectionsToSave) {
        const existingItem = locationContent.find(item => item.icon === sectionData.icon)
        
        if (existingItem) {
          // Update existing item
          await miscContentApi.update(existingItem.id, sectionData)
        } else {
          // Create new item
          await miscContentApi.create(sectionData)
        }
      }
      
      toast.success('Location information updated successfully')
      mutate() // Refresh the data
    } catch (error) {
      console.error('Error saving location content:', error)
      toast.error('Failed to save location content')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditLocation = () => {
    // Load existing location data into form
    const addressItem = locationContent.find(item => item.icon === 'map-pin')
    const hoursItem = locationContent.find(item => item.icon === 'clock')
    const contactItem = locationContent.find(item => item.icon === 'phone')
    
    setLocationFormData({
      address: addressItem?.message || '',
      hours: hoursItem?.message || '',
      contact: contactItem?.message || ''
    })
    setShowLocationDialog(true)
  }

  const handleCloseLocationDialog = () => {
    setShowLocationDialog(false)
    resetLocationForm()
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

      {/* Location Management */}
      <Card className="bg-white border-sage/20">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg text-chocolate">Location Information</CardTitle>
              <p className="text-sm text-chocolate/50 mt-1">Manage your bakery's address, opening hours, and contact information</p>
            </div>
            <Dialog open={showLocationDialog} onOpenChange={setShowLocationDialog}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-caramel hover:bg-caramel/90 text-white" onClick={handleEditLocation}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Location Info
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-chocolate">Edit Location Information</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleLocationSubmit} className="space-y-6">
                  {/* Address Section */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-caramel" />
                      <Label htmlFor="location-address" className="text-chocolate font-medium">Address</Label>
                    </div>
                    <textarea
                      id="location-address"
                      value={locationFormData.address}
                      onChange={(e) => setLocationFormData({ ...locationFormData, address: e.target.value })}
                      placeholder="Enter your bakery address"
                      rows={3}
                      className="w-full px-3 py-2 border border-sage/20 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-caramel/20"
                    />
                    <p className="text-xs text-chocolate/60">Your bakery's physical address</p>
                  </div>

                  {/* Opening Hours Section */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-caramel" />
                      <Label htmlFor="location-hours" className="text-chocolate font-medium">Opening Hours</Label>
                    </div>
                    <textarea
                      id="location-hours"
                      value={locationFormData.hours}
                      onChange={(e) => setLocationFormData({ ...locationFormData, hours: e.target.value })}
                      placeholder="Enter your opening hours"
                      rows={3}
                      className="w-full px-3 py-2 border border-sage/20 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-caramel/20"
                    />
                    <p className="text-xs text-chocolate/60">Your bakery's opening hours</p>
                  </div>

                  {/* Contact Section */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-caramel" />
                      <Label htmlFor="location-contact" className="text-chocolate font-medium">Contact</Label>
                    </div>
                    <textarea
                      id="location-contact"
                      value={locationFormData.contact}
                      onChange={(e) => setLocationFormData({ ...locationFormData, contact: e.target.value })}
                      placeholder="Enter your contact information"
                      rows={3}
                      className="w-full px-3 py-2 border border-sage/20 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-caramel/20"
                    />
                    <p className="text-xs text-chocolate/60">Your contact information</p>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCloseLocationDialog}
                      disabled={isSubmitting}
                      className="border-sage/20 text-chocolate"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
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
                          Save All Location Info
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-caramel" />
              <span className="ml-2 text-chocolate">Loading location content...</span>
            </div>
          ) : locationContent.length === 0 ? (
            <div className="text-chocolate/60 py-8 text-center">
              No location content found. Click "Edit Location Info" to add your location information!
            </div>
          ) : (
            <div className="space-y-4">
              {locationContent.map((item) => (
                <div
                  key={item.id}
                  className="p-4 border border-sage/20 rounded-lg bg-white"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="bg-sage/10 text-sage border-sage/20 flex-shrink-0">
                      Location
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
                    {item.message && (
                      <p className="text-sm text-chocolate/70 break-words whitespace-pre-line">{item.message}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 