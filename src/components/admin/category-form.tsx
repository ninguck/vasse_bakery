"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { categoryApi } from "@/lib/api"
import { Category } from "@/types/categories"
import { toast } from "sonner"

interface CategoryFormProps {
  category?: Category | null
  onClose: () => void
  onSuccess?: (category: Category) => void
}

export function CategoryForm({ category, onClose, onSuccess }: CategoryFormProps) {
  const [formData, setFormData] = useState({
    name: category?.name || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      let newCategory: Category
      if (category) {
        newCategory = await categoryApi.update(category.id, formData) as Category
        toast.success("Category updated successfully")
      } else {
        newCategory = await categoryApi.create(formData) as Category
        toast.success("Category created successfully")
      }

      onSuccess?.(newCategory)
      onClose()
    } catch (error: any) {
      console.error("Failed to save category:", error)
      toast.error(error.message || "Failed to save category")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-chocolate">
          Category Name
        </Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter category name"
          className="border-sage/20 focus:border-caramel"
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="border-sage/20 text-chocolate hover:bg-beige/30 bg-transparent"
        >
          Cancel
        </Button>
        <Button type="submit" className="bg-caramel hover:bg-caramel/90 text-white">
          {category ? "Update Category" : "Create Category"}
        </Button>
      </div>
    </form>
  )
} 