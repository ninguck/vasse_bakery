"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ImageUpload } from "@/components/ui/image-upload"
import { GalleryUpload } from "@/components/ui/gallery-upload"
import { productApi, categoryApi } from "@/lib/api"

import { Product } from "@/types/products"
import { Category } from "@/types/categories"
import { toast } from "sonner"

interface ProductFormProps {
    product?: Product | null
    onClose: () => void
    onSuccess: (product: Product) => void
}

const badgeColors = [
    { name: "Caramel", value: "caramel", hex: "#D6A77A" },
    { name: "Sage", value: "sage", hex: "#C4D5BE" },
    { name: "Chocolate", value: "chocolate", hex: "#5C3A21" },
    { name: "Beige", value: "beige", hex: "#F5EBDD" },
    { name: "Cream", value: "cream", hex: "#FFFFFF" },
]

const badgeIcons = [
    { name: "Star", value: "star" },
    { name: "Sparkles", value: "sparkles" },
    { name: "Fire", value: "fire" },
    { name: "Heart", value: "heart" },
]

export function ProductForm({ product, onClose, onSuccess }: ProductFormProps) {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: product?.title || "",
        description: product?.description || "",
        mainImageUrl: product?.mainImageUrl || "",
        galleryImageUrls: product?.galleryImageUrls || [],
        categoryId: product?.categoryId || "",
        badgeText: product?.badgeText || "",
        badgeColor: product?.badgeColor || "#E6C366",
        badgeIcon: product?.badgeIcon || "",
    })

    useEffect(() => {
        async function fetchCategories() {
        try {
            const data = await categoryApi.getAll() as Category[]
            setCategories(data)
        } catch (err) {
            toast.error("Failed to load categories")
        }
        }
        fetchCategories()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
        let newProduct: Product
        if (product) {
            newProduct = await productApi.update(product.id, formData) as Product
            toast.success("Product updated successfully")
        } else {
            newProduct = await productApi.create(formData) as Product
            toast.success("Product created successfully")
        }
        onSuccess(newProduct)
        } catch (err: any) {
        toast.error(err.message || "Failed to save product")
        } finally {
        setLoading(false)
        }
    }

    const renderBadgeIcon = (iconType: string) => {
        switch (iconType) {
        case "star":
            return "⭐"
        case "sparkles":
            return "✨"
        case "fire":
            return "🔥"
        case "heart":
            return "❤️"
        default:
            return ""
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
            <Label htmlFor="title" className="text-chocolate">
                Product Name
            </Label>
            <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter product name"
                className="border-sage/20 focus:border-caramel"
                required
            />
            </div>
            <div className="space-y-2">
            <Label htmlFor="mainImageUrl" className="text-chocolate">
                Main Image
            </Label>
            <ImageUpload
                value={formData.mainImageUrl}
                onChange={(url) => setFormData({ ...formData, mainImageUrl: url })}
                onRemove={() => setFormData({ ...formData, mainImageUrl: "" })}
                placeholder="Upload main product image"
                disabled={loading}
            />
            </div>
        </div>

        <div className="space-y-2">
            <Label htmlFor="galleryImageUrls" className="text-chocolate">
                Gallery Images (Optional)
            </Label>
            <GalleryUpload
                value={formData.galleryImageUrls}
                onChange={(urls) => setFormData({ ...formData, galleryImageUrls: urls })}
                placeholder="Upload additional product images"
                disabled={loading}
                maxImages={5}
            />
            <p className="text-xs text-chocolate/60">
                Add up to 5 additional images for the product gallery
            </p>
        </div>

        <div className="space-y-2">
            <Label htmlFor="description" className="text-chocolate">
            Description
            </Label>
            <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter product description"
            className="border-sage/20 focus:border-caramel"
            rows={3}
            required
            />
        </div>

        <div className="space-y-2">
            <Label htmlFor="categoryId" className="text-chocolate">
            Category
            </Label>
            <Select
            value={formData.categoryId || ""}
            onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
            >
            <SelectTrigger className="border-sage/20 focus:border-caramel">
                <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-white border-sage/20">
                {categories
                .filter(category => category.id && category.id !== "")
                .map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                    {category.name}
                    </SelectItem>
                ))}
            </SelectContent>
            </Select>
        </div>

        <div className="space-y-4 p-4 border border-sage/20 rounded-lg bg-beige/10">
            <Label className="text-chocolate font-medium">Optional Badge (Leave empty for no badge)</Label>

            <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="badgeText" className="text-chocolate text-sm">
                Badge Text
                </Label>
                <Input
                id="badgeText"
                value={formData.badgeText}
                onChange={(e) => setFormData({ ...formData, badgeText: e.target.value })}
                placeholder="e.g., Popular, New, Hot"
                className="border-sage/20 focus:border-caramel"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="badgeIcon" className="text-chocolate text-sm">
                Badge Icon
                </Label>
                <Select
                value={formData.badgeIcon}
                onValueChange={(value) => setFormData({ ...formData, badgeIcon: value })}
                >
                <SelectTrigger className="border-sage/20 focus:border-caramel">
                    <SelectValue placeholder="Select icon" />
                </SelectTrigger>
                <SelectContent className="bg-white border-sage/20">
                    {badgeIcons.map((icon) => (
                    <SelectItem key={icon.value} value={icon.value}>
                        {renderBadgeIcon(icon.value)} {icon.name}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>
            </div>

            <div className="space-y-2">
            <Label className="text-chocolate text-sm">Badge Color</Label>
            <div className="grid grid-cols-5 gap-2">
                {badgeColors.map((color) => (
                <button
                    key={color.value}
                    type="button"
                    className={`flex items-center justify-center p-2 rounded-md border transition-colors ${
                    formData.badgeColor === color.value
                        ? "border-caramel bg-caramel/10"
                        : "border-sage/20 hover:bg-beige/30"
                    }`}
                    onClick={() => setFormData({ ...formData, badgeColor: color.value })}
                >
                    <div
                    className="w-6 h-6 rounded-full border border-chocolate/20"
                    style={{ backgroundColor: color.hex }}
                    />
                </button>
                ))}
            </div>
            </div>

            {formData.badgeText && (
            <div className="space-y-2">
                <Label className="text-chocolate text-sm">Badge Preview</Label>
                <div>
                <Badge
                    className={`text-sm bg-${formData.badgeColor}`}
                >
                    {renderBadgeIcon(formData.badgeIcon)} {formData.badgeText}
                </Badge>
                </div>
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
            {product ? "Update Product" : "Create Product"}
            </Button>
        </div>
        </form>
    )
}
