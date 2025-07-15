"use client"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, Tag, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CategoryForm } from "@/components/admin/category-form"
import { categoryApi } from "@/lib/api"
import { Category } from "@/types/categories"
import { toast } from "sonner"

export function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  // Fetch categories from API
  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true)
        const data = await categoryApi.getAll() as Category[]
        setCategories(data)
      } catch (error) {
        console.error("Failed to fetch categories:", error)
        toast.error("Failed to load categories")
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  // Calculate statistics
  const totalCategories = categories.length
  const totalProducts = categories.reduce((sum, category) => sum + category.products.length, 0)
  const totalMenuItems = categories.reduce((sum, category) => sum + category.menuItems.length, 0)

  const handleDelete = async (id: string) => {
    try {
      await categoryApi.delete(id)
      setCategories(categories.filter(category => category.id !== id))
      toast.success("Category deleted successfully")
    } catch (error: any) {
      console.error("Failed to delete category:", error)
      toast.error(error.message || "Failed to delete category")
    }
  }

  const handleCreateSuccess = (newCategory: Category) => {
    setCategories([...categories, newCategory])
    setIsCreateDialogOpen(false)
  }

  const handleEditSuccess = (updatedCategory: Category) => {
    setCategories(categories.map(category => 
      category.id === updatedCategory.id ? updatedCategory : category
    ))
    setEditingCategory(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-chocolate">Category Management</h1>
          <p className="text-chocolate/70 mt-1">Organize your products and menu items into categories</p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-caramel hover:bg-caramel/90 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg bg-white">
            <DialogHeader>
              <DialogTitle className="text-chocolate">Create New Category</DialogTitle>
              <DialogDescription className="text-chocolate/70">
                Add a new category to organize your products and menu items
              </DialogDescription>
            </DialogHeader>
            <CategoryForm onClose={() => setIsCreateDialogOpen(false)} onSuccess={handleCreateSuccess} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-white border-sage/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-chocolate/70">Total Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chocolate">{totalCategories}</div>
            <p className="text-xs text-chocolate/60 mt-1">Active categories</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-sage/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-chocolate/70">Products Organized</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chocolate">{totalProducts}</div>
            <p className="text-xs text-chocolate/60 mt-1">Across all categories</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-sage/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-chocolate/70">Menu Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chocolate">{totalMenuItems}</div>
            <p className="text-xs text-chocolate/60 mt-1">Categorized items</p>
          </CardContent>
        </Card>
      </div>

      {loading ? (
        <div className="text-center py-8 text-chocolate/60">Loading categories...</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Card key={category.id} className="bg-white border-sage/20 hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-chocolate">{category.name}</CardTitle>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-chocolate hover:bg-beige/30"
                      onClick={() => setEditingCategory(category)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-600 hover:bg-red-50"
                      onClick={() => handleDelete(category.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Package className="h-4 w-4 text-chocolate/60" />
                      <span className="text-sm text-chocolate/70">Products</span>
                    </div>
                    <Badge variant="secondary" className="bg-sage/20 text-chocolate">
                      {category.products.length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Tag className="h-4 w-4 text-chocolate/60" />
                      <span className="text-sm text-chocolate/70">Menu Items</span>
                    </div>
                    <Badge variant="secondary" className="bg-caramel/20 text-chocolate">
                      {category.menuItems.length}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Category Dialog */}
      <Dialog open={!!editingCategory} onOpenChange={() => setEditingCategory(null)}>
        <DialogContent className="max-w-lg bg-white">
          <DialogHeader>
            <DialogTitle className="text-chocolate">Edit Category</DialogTitle>
            <DialogDescription className="text-chocolate/70">Update category information</DialogDescription>
          </DialogHeader>
          <CategoryForm 
            category={editingCategory} 
            onClose={() => setEditingCategory(null)} 
            onSuccess={handleEditSuccess}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
} 