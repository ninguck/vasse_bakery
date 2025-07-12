"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { menuItemApi, productApi, categoryApi } from "@/lib/api"
import { MenuItem } from "@/types/menuItems"
import { Product } from "@/types/products"
import { Category } from "@/types/categories"
import { toast } from "sonner"

interface MenuItemFormProps {
    menuItem?: MenuItem | null
    onClose: () => void
    onSuccess?: (menuItem: MenuItem) => void
}

export function MenuItemForm({ menuItem, onClose, onSuccess }: MenuItemFormProps) {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [formData, setFormData] = useState({
        name: menuItem?.name || "",
        description: menuItem?.description || "",
        price: menuItem?.price?.toString() || "",
        linkType: menuItem?.productId ? "product" : menuItem?.categoryId ? "category" : "none",
        linkedProductId: menuItem?.productId || "",
        linkedCategoryId: menuItem?.categoryId || "",
    })

    // Fetch products and categories for dropdowns
    useEffect(() => {
        async function fetchData() {
        try {
            const [productsData, categoriesData] = await Promise.all([
            productApi.getAll() as Promise<Product[]>,
            categoryApi.getAll() as Promise<Category[]>
            ])
            setProducts(productsData)
            setCategories(categoriesData)
        } catch (error) {
            console.error("Failed to fetch data:", error)
            toast.error("Failed to load products and categories")
        }
        }
        fetchData()
    }, [])

      const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Prepare the data for API
      const apiData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        productId: formData.linkType === "product" ? formData.linkedProductId : null,
        categoryId: formData.linkType === "category" ? formData.linkedCategoryId : null,
      }

      // For new menu items, require at least one link
      if (!menuItem && formData.linkType === "none") {
        toast.error("Please link to a product or category")
        setLoading(false)
        return
      }

      let newMenuItem: MenuItem
      if (menuItem) {
        newMenuItem = await menuItemApi.update(menuItem.id, apiData) as MenuItem
        toast.success("Menu item updated successfully")
      } else {
        newMenuItem = await menuItemApi.create(apiData) as MenuItem
        toast.success("Menu item created successfully")
      }

      onSuccess?.(newMenuItem)
      onClose()
    } catch (error: any) {
      console.error("Failed to save menu item:", error)
      toast.error(error.message || "Failed to save menu item")
    } finally {
      setLoading(false)
    }
  }

    const handleLinkTypeChange = (value: string) => {
        setFormData({
        ...formData,
        linkType: value,
        linkedProductId: "",
        linkedCategoryId: "",
        })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
            <Label htmlFor="name" className="text-chocolate">
                Menu Item Name
            </Label>
            <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter menu item name"
                className="border-sage/20 focus:border-caramel"
                required
            />
            </div>
            <div className="space-y-2">
            <Label htmlFor="price" className="text-chocolate">
                Price ($)
            </Label>
            <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0.00"
                className="border-sage/20 focus:border-caramel"
                required
            />
            </div>
        </div>

        <div className="space-y-2">
            <Label htmlFor="description" className="text-chocolate">
            Description
            </Label>
            <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter menu item description"
            className="border-sage/20 focus:border-caramel"
            rows={3}
            required
            />
        </div>

        <div className="space-y-4 p-4 border border-sage/20 rounded-lg bg-beige/10">
            <Label className="text-chocolate font-medium">Link to Product or Category</Label>

            <RadioGroup value={formData.linkType} onValueChange={handleLinkTypeChange}>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="none" />
                <Label htmlFor="none" className="text-chocolate">
                No link
                </Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="product" id="product" />
                <Label htmlFor="product" className="text-chocolate">
                Link to a specific product
                </Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="category" id="category" />
                <Label htmlFor="category" className="text-chocolate">
                Link to a category
                </Label>
            </div>
            </RadioGroup>

            {formData.linkType === "product" && (
            <div className="space-y-2">
                <Label htmlFor="linkedProduct" className="text-chocolate">
                Select Product
                </Label>
                <Select
                value={formData.linkedProductId}
                onValueChange={(value) => setFormData({ ...formData, linkedProductId: value })}
                >
                <SelectTrigger className="border-sage/20 focus:border-caramel">
                    <SelectValue placeholder="Choose a product" />
                </SelectTrigger>
                <SelectContent className="bg-white border-sage/20">
                    {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                        {product.title}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>
            )}

            {formData.linkType === "category" && (
            <div className="space-y-2">
                <Label htmlFor="linkedCategory" className="text-chocolate">
                Select Category
                </Label>
                <Select
                value={formData.linkedCategoryId}
                onValueChange={(value) => setFormData({ ...formData, linkedCategoryId: value })}
                >
                <SelectTrigger className="border-sage/20 focus:border-caramel">
                    <SelectValue placeholder="Choose a category" />
                </SelectTrigger>
                <SelectContent className="bg-white border-sage/20">
                    {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                        {category.name}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>
            )}
        </div>

        <div className="flex justify-end space-x-2 pt-4">
            <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="border-sage/20 text-chocolate hover:bg-beige/30 bg-transparent"
            disabled={loading}
            >
            Cancel
            </Button>
            <Button type="submit" className="bg-caramel hover:bg-caramel/90 text-white" disabled={loading}>
            {menuItem ? "Update Menu Item" : "Create Menu Item"}
            </Button>
        </div>
        </form>
    )
} 