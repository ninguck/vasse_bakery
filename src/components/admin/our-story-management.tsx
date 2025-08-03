"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  Loader2, 
  Upload, 
  X,
  Calendar,
  Image as ImageIcon
} from "lucide-react"
import { useState, useCallback, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { useMiscContent } from "@/hooks/useMiscContent"
import { miscContentApi, MiscContent } from "@/lib/api"
import { toast } from "sonner"

interface MilestoneFormData {
  year: string
  title: string
  description: string
  imageUrl: string
  imageAlt: string
}

export function OurStoryManagement() {
  const { miscContent, isLoading, error, mutate } = useMiscContent()
  const [showDialog, setShowDialog] = useState(false)
  const [editingMilestone, setEditingMilestone] = useState<MiscContent | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [milestoneFormData, setMilestoneFormData] = useState<MilestoneFormData>({
    year: '',
    title: '',
    description: '',
    imageUrl: '',
    imageAlt: ''
  })

  // Filter content by section
  const ourStoryContent = miscContent.filter(item => item.section === 'our-story')

  const resetForm = () => {
    setMilestoneFormData({
      year: '',
      title: '',
      description: '',
      imageUrl: '',
      imageAlt: ''
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
      setMilestoneFormData(prev => ({ ...prev, imageUrl: data.url }))
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Store milestone data as JSON in the message field
      const milestoneData = {
        year: milestoneFormData.year,
        title: milestoneFormData.title,
        description: milestoneFormData.description,
        imageUrl: milestoneFormData.imageUrl,
        imageAlt: milestoneFormData.imageAlt
      }

      const formData = {
        section: 'our-story',
        largeText: milestoneFormData.title, // Use title as largeText for display
        message: JSON.stringify(milestoneData), // Store full data as JSON
        imageUrl: milestoneFormData.imageUrl,
        icon: 'calendar' // Use calendar icon for milestones
      }

      if (editingMilestone) {
        await miscContentApi.update(editingMilestone.id, formData)
        toast.success('Milestone updated successfully')
      } else {
        await miscContentApi.create(formData)
        toast.success('Milestone created successfully')
      }
      
      setShowDialog(false)
      setEditingMilestone(null)
      resetForm()
      mutate() // Refresh the data
    } catch (error) {
      console.error('Error saving milestone:', error)
      toast.error('Failed to save milestone')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (item: MiscContent) => {
    try {
      // Parse the JSON data from message field
      const milestoneData = item.message ? JSON.parse(item.message) : {}
      
      setEditingMilestone(item)
      setMilestoneFormData({
        year: milestoneData.year || '',
        title: milestoneData.title || item.largeText || '',
        description: milestoneData.description || '',
        imageUrl: milestoneData.imageUrl || item.imageUrl || '',
        imageAlt: milestoneData.imageAlt || ''
      })
      setShowDialog(true)
    } catch (error) {
      console.error('Error parsing milestone data:', error)
      toast.error('Error loading milestone data')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this milestone?')) return

    try {
      await miscContentApi.delete(id)
      toast.success('Milestone deleted successfully')
      mutate() // Refresh the data
    } catch (error) {
      console.error('Error deleting milestone:', error)
      toast.error('Failed to delete milestone')
    }
  }

  const handleCloseDialog = () => {
    setShowDialog(false)
    setEditingMilestone(null)
    resetForm()
  }

  const removeImage = () => {
    setMilestoneFormData(prev => ({ ...prev, imageUrl: '' }))
  }

  // Helper function to parse milestone data
  const parseMilestoneData = (item: MiscContent) => {
    try {
      if (item.message) {
        return JSON.parse(item.message)
      }
      return {
        year: '',
        title: item.largeText || '',
        description: '',
        imageUrl: item.imageUrl || '',
        imageAlt: ''
      }
    } catch (error) {
      return {
        year: '',
        title: item.largeText || '',
        description: '',
        imageUrl: item.imageUrl || '',
        imageAlt: ''
      }
    }
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-chocolate">Our Story Management</h1>
            <p className="text-chocolate/70 mt-1">Manage your bakery's story and timeline</p>
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
          <h1 className="text-3xl font-bold text-chocolate">Our Story Management</h1>
          <p className="text-chocolate/70 mt-1">Manage your bakery's story and timeline milestones</p>
        </div>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button className="bg-caramel hover:bg-caramel/90 text-white" onClick={() => setEditingMilestone(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Milestone
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-chocolate">
                {editingMilestone ? 'Edit Milestone' : 'Add Milestone'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Year */}
              <div>
                <Label htmlFor="milestone-year" className="text-chocolate">Year *</Label>
                <Input
                  id="milestone-year"
                  value={milestoneFormData.year}
                  onChange={(e) => setMilestoneFormData({ ...milestoneFormData, year: e.target.value })}
                  placeholder="e.g., 2018"
                  required
                  className="border-sage/20"
                />
                <p className="text-xs text-chocolate/60 mt-1">The year this milestone occurred</p>
              </div>

              {/* Title */}
              <div>
                <Label htmlFor="milestone-title" className="text-chocolate">Title *</Label>
                <Input
                  id="milestone-title"
                  value={milestoneFormData.title}
                  onChange={(e) => setMilestoneFormData({ ...milestoneFormData, title: e.target.value })}
                  placeholder="e.g., The Beginning"
                  required
                  className="border-sage/20"
                />
                <p className="text-xs text-chocolate/60 mt-1">The title of this milestone</p>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="milestone-description" className="text-chocolate">Description *</Label>
                <textarea
                  id="milestone-description"
                  value={milestoneFormData.description}
                  onChange={(e) => setMilestoneFormData({ ...milestoneFormData, description: e.target.value })}
                  placeholder="Describe what happened during this milestone..."
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-sage/20 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-caramel/20"
                />
                <p className="text-xs text-chocolate/60 mt-1">A detailed description of this milestone</p>
              </div>

              {/* Image Upload */}
              <div>
                <Label className="text-chocolate">Milestone Image</Label>
                {milestoneFormData.imageUrl ? (
                  <div className="relative mt-2">
                    <img
                      src={milestoneFormData.imageUrl}
                      alt="Milestone preview"
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
                <p className="text-xs text-chocolate/60 mt-1">An image representing this milestone</p>
              </div>

              {/* Image Alt Text */}
              <div>
                <Label htmlFor="milestone-imageAlt" className="text-chocolate">Image Alt Text</Label>
                <Input
                  id="milestone-imageAlt"
                  value={milestoneFormData.imageAlt}
                  onChange={(e) => setMilestoneFormData({ ...milestoneFormData, imageAlt: e.target.value })}
                  placeholder="e.g., Vasse Bakery grand opening in 2018"
                  className="border-sage/20"
                />
                <p className="text-xs text-chocolate/60 mt-1">Description of the image for accessibility</p>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseDialog}
                  disabled={isSubmitting}
                  className="border-sage/20 text-chocolate"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || !milestoneFormData.year || !milestoneFormData.title || !milestoneFormData.description}
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
                      {editingMilestone ? 'Update Milestone' : 'Create Milestone'}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Milestones List */}
      <Card className="bg-white border-sage/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-chocolate flex items-center gap-2">
            <Calendar className="h-5 w-5 text-caramel" />
            Timeline Milestones
          </CardTitle>
          <p className="text-sm text-chocolate/70 mt-1">Manage the milestones in your bakery's story timeline</p>
        </CardHeader>
        <CardContent className="overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-caramel" />
              <span className="ml-2 text-chocolate">Loading milestones...</span>
            </div>
          ) : ourStoryContent.length === 0 ? (
            <div className="text-chocolate/60 py-8 text-center">
              No milestones found. Create your first milestone to start building your story!
            </div>
          ) : (
            <div className="space-y-4">
              {ourStoryContent.map((item) => {
                const milestoneData = parseMilestoneData(item)
                return (
                  <div
                    key={item.id}
                    className="grid grid-cols-[1fr_auto] gap-4 p-4 border border-sage/20 rounded-lg bg-white"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="bg-caramel/10 text-caramel border-caramel/20 flex-shrink-0">
                          {milestoneData.year || 'No Year'}
                        </Badge>
                        <Calendar className="h-4 w-4 text-caramel flex-shrink-0" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium text-chocolate break-words">{milestoneData.title}</p>
                        <p className="text-sm text-chocolate/70 break-words">{milestoneData.description}</p>
                        {milestoneData.imageUrl && (
                          <div className="flex items-center gap-2 mt-2">
                            <ImageIcon className="h-4 w-4 text-sage/60" />
                            <img
                              src={milestoneData.imageUrl}
                              alt={milestoneData.imageAlt || "Milestone"}
                              className="w-12 h-12 object-cover rounded border border-sage/20 flex-shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <p className="text-xs text-chocolate/60 truncate">
                                {milestoneData.imageAlt || 'No alt text'}
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
                        onClick={() => handleEdit(item)}
                        className="border-sage/20 text-chocolate hover:bg-sage/5"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(item.id)}
                        className="border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 