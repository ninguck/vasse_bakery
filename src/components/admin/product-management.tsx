"use client"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ProductForm } from "./product-form"
import { productApi } from "@/lib/api"
import { Product } from "@/types/products"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"

export function ProductManagement() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const [deletingProductId, setDeletingProductId] = useState<string | null>(null)

    // Fetch products on component mount
    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        try {
        setLoading(true)
        setError(null)
        const data = await productApi.getAll() as Product[]
        setProducts(data)
        } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        toast.error("Failed to fetch products")
        } finally {
        setLoading(false)
        }
    }

    const handleDeleteProduct = async (productId: string) => {
        if (!confirm("Are you sure you want to delete this product?")) {
        return
        }

        try {
        setDeletingProductId(productId)
        await productApi.delete(productId)
        setProducts(products.filter(product => product.id !== productId))
        toast.success("Product deleted successfully")
        } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to delete product"
        toast.error(errorMessage)
        } finally {
        setDeletingProductId(null)
        }
    }

    const handleEditProduct = (product: Product) => {
        setEditingProduct(product)
    }

    const handleProductCreated = (newProduct: Product) => {
        setProducts([newProduct, ...products])
        setIsCreateDialogOpen(false)
        toast.success("Product created successfully")
    }

    const handleProductUpdated = (updatedProduct: Product) => {
        setProducts(products.map(product => 
        product.id === updatedProduct.id ? updatedProduct : product
        ))
        setEditingProduct(null)
        toast.success("Product updated successfully")
    }

    // Calculate statistics from real data
    const totalProducts = products.length
    const categories = new Set(products.map(p => p.category?.name).filter(Boolean)).size
    const averagePrice = products.length > 0 
        ? products.reduce((sum, product) => {
            const menuItemPrices = product.menuItems.map(item => item.price)
            return sum + (menuItemPrices.length > 0 ? menuItemPrices[0] : 0)
        }, 0) / products.length
        : 0

    const filteredProducts = products.filter(
        (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (loading) {
        return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold text-chocolate">Product Management</h1>
                <p className="text-chocolate/70 mt-1">Loading products...</p>
            </div>
            </div>
            <div className="flex items-center justify-center py-12">
            <div className="text-chocolate">Loading...</div>
            </div>
        </div>
        )
    }

    if (error) {
        return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold text-chocolate">Product Management</h1>
                <p className="text-chocolate/70 mt-1">Error loading products</p>
            </div>
            </div>
            <Card className="bg-white border-sage/20">
            <CardContent className="pt-6">
                <div className="text-center text-red-600">
                <p className="mb-4">{error}</p>
                <Button onClick={fetchProducts} className="bg-caramel hover:bg-caramel/90 text-white">
                    Retry
                </Button>
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
            <h1 className="text-3xl font-bold text-chocolate">Product Management</h1>
            <p className="text-chocolate/70 mt-1">Manage your bakery's product catalog</p>
            </div>

            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
                <Button className="bg-caramel hover:bg-caramel/90 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Add Product
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-white">
                <DialogHeader>
                <DialogTitle className="text-chocolate">Create New Product</DialogTitle>
                <DialogDescription className="text-chocolate/70">
                    Add a new product to your bakery catalog
                </DialogDescription>
                </DialogHeader>
                <ProductForm onClose={() => setIsCreateDialogOpen(false)} onSuccess={handleProductCreated} />
            </DialogContent>
            </Dialog>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
            <Card className="bg-white border-sage/20">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-chocolate/70">Total Products</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-chocolate">{totalProducts}</div>
                <p className="text-xs text-chocolate/60 mt-1">Active products</p>
            </CardContent>
            </Card>

            <Card className="bg-white border-sage/20">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-chocolate/70">Categories</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-chocolate">{categories}</div>
                <p className="text-xs text-chocolate/60 mt-1">Unique categories</p>
            </CardContent>
            </Card>

            <Card className="bg-white border-sage/20">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-chocolate/70">Menu Items</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-caramel">
                {products.reduce((sum, product) => sum + product.menuItems.length, 0)}
                </div>
                <p className="text-xs text-chocolate/60 mt-1">Total menu items</p>
            </CardContent>
            </Card>

            <Card className="bg-white border-sage/20">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-chocolate/70">Avg. Price</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-chocolate">
                ${averagePrice.toFixed(2)}
                </div>
                <p className="text-xs text-chocolate/60 mt-1">Across all products</p>
            </CardContent>
            </Card>
        </div>

        <Card className="bg-white border-sage/20">
            <CardHeader>
            <div className="flex items-center justify-between">
                <div>
                <CardTitle className="text-chocolate">Products</CardTitle>
                <CardDescription className="text-chocolate/70">
                    Manage your product inventory and details ({filteredProducts.length} of {totalProducts})
                </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-chocolate/40 h-4 w-4" />
                    <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    className="pl-10 border-sage/20 focus:border-caramel"
                    />
                </div>
                <Button variant="outline" className="border-sage/20 text-chocolate hover:bg-beige/30 bg-transparent">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                </Button>
                </div>
            </div>
            </CardHeader>
            <CardContent>
            {filteredProducts.length === 0 ? (
                <div className="text-center py-8 text-chocolate/60">
                {searchTerm ? "No products match your search." : "No products found."}
                </div>
            ) : (
                <Table>
                <TableHeader>
                    <TableRow className="border-sage/20">
                    <TableHead className="text-chocolate/70">Product</TableHead>
                    <TableHead className="text-chocolate/70">Category</TableHead>
                    <TableHead className="text-chocolate/70">Menu Items</TableHead>
                    <TableHead className="text-chocolate/70">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredProducts.map((product) => (
                    <TableRow key={product.id} className="border-sage/20">
                        <TableCell>
                        <div className="flex items-center space-x-3">
                            <img
                            src={product.mainImageUrl || "/placeholder.svg"}
                            alt={product.title}
                            className="w-12 h-12 rounded-lg object-cover border border-sage/20"
                            />
                            <div>
                            <div className="flex items-center space-x-2">
                                <span className="font-medium text-chocolate">{product.title}</span>
                                {product.badgeText && (
                                <Badge
                                    style={{ 
                                    backgroundColor: (product.badgeColor || "#E6C366") + "20", 
                                    color: product.badgeColor || "#E6C366" 
                                    }}
                                    className="text-xs"
                                >
                                    {product.badgeIcon === "star" && "⭐"}
                                    {product.badgeIcon === "sparkles" && "✨"}
                                    {product.badgeIcon === "fire" && "🔥"}
                                    {product.badgeText}
                                </Badge>
                                )}
                            </div>
                            <div className="text-sm text-chocolate/60 max-w-xs truncate">
                                {product.description}
                            </div>
                            </div>
                        </div>
                        </TableCell>
                        <TableCell>
                        {product.category ? (
                            <Badge variant="secondary" className="bg-sage/20 text-chocolate">
                            {product.category.name}
                            </Badge>
                        ) : (
                            <span className="text-chocolate/40 text-sm">No category</span>
                        )}
                        </TableCell>
                        <TableCell>
                        <div className="text-sm text-chocolate">
                            {product.menuItems.length} item{product.menuItems.length !== 1 ? 's' : ''}
                        </div>
                        {product.menuItems.length > 0 && (
                            <div className="text-xs text-chocolate/60">
                            From ${Math.min(...product.menuItems.map(item => item.price)).toFixed(2)}
                            </div>
                        )}
                        </TableCell>
                        <TableCell>
                        <div className="flex items-center space-x-2">
                            <Button
                            variant="ghost"
                            size="sm"
                            className="text-chocolate hover:bg-beige/30"
                            onClick={() => handleEditProduct(product)}
                            >
                            <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-600 hover:bg-red-50"
                            onClick={() => handleDeleteProduct(product.id)}
                            disabled={deletingProductId === product.id}
                            >
                            <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            )}
            </CardContent>
        </Card>

        {/* Edit Product Dialog */}
        {editingProduct && (
            <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
            <DialogContent className="max-w-2xl bg-white">
                <DialogHeader>
                <DialogTitle className="text-chocolate">Edit Product</DialogTitle>
                <DialogDescription className="text-chocolate/70">
                    Update product information
                </DialogDescription>
                </DialogHeader>
                <ProductForm 
                product={editingProduct} 
                onClose={() => setEditingProduct(null)} 
                onSuccess={handleProductUpdated}
                />
            </DialogContent>
            </Dialog>
        )}
        </div>
    )
}
