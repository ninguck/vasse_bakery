"use client"

import { useEffect, useState } from "react"
import { Plus, Edit, Trash2, Search, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { MenuItemForm } from "@/components/admin/menu-item-form"
import { menuItemApi } from "@/lib/api"
import { MenuItem } from "@/types/menuItems"
import { toast } from "sonner"

export function MenuItemManagement() {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [editingMenuItem, setEditingMenuItem] = useState<MenuItem | null>(null)

    // Fetch menu items from API
    useEffect(() => {
        async function fetchMenuItems() {
        try {
            setLoading(true)
            const data = await menuItemApi.getAll() as MenuItem[]
            setMenuItems(data)
        } catch (error) {
            console.error("Failed to fetch menu items:", error)
            toast.error("Failed to load menu items")
        } finally {
            setLoading(false)
        }
        }

        fetchMenuItems()
    }, [])

    // Calculate statistics
    const totalItems = menuItems.length
    const availableItems = menuItems.length // Assuming all items are available
    const averagePrice = menuItems.length > 0 
        ? menuItems.reduce((sum, item) => sum + item.price, 0) / menuItems.length 
        : 0
    const categories = new Set(menuItems.map(item => item.category?.name).filter(Boolean)).size

    const filteredMenuItems = menuItems.filter(
        (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.product?.title && item.product.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.category?.name && item.category.name.toLowerCase().includes(searchTerm.toLowerCase())),
    )

    const handleDelete = async (id: string) => {
        try {
        await menuItemApi.delete(id)
        setMenuItems(menuItems.filter(item => item.id !== id))
        toast.success("Menu item deleted successfully")
        } catch (error) {
        console.error("Failed to delete menu item:", error)
        toast.error("Failed to delete menu item")
        }
    }

    const handleCreateSuccess = (newMenuItem: MenuItem) => {
        setMenuItems([...menuItems, newMenuItem])
        setIsCreateDialogOpen(false)
    }

    const handleEditSuccess = (updatedMenuItem: MenuItem) => {
        setMenuItems(menuItems.map(item => 
        item.id === updatedMenuItem.id ? updatedMenuItem : item
        ))
        setEditingMenuItem(null)
    }

    return (
        <div className="space-y-6">
        <div className="flex items-center justify-between">
            <div>
            <h1 className="text-3xl font-bold text-chocolate">Menu Item Management</h1>
            <p className="text-chocolate/70 mt-1">Manage your bakery's menu offerings and pricing</p>
            </div>

            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
                <Button className="bg-caramel hover:bg-caramel/90 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Add Menu Item
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-white">
                <DialogHeader>
                <DialogTitle className="text-chocolate">Create New Menu Item</DialogTitle>
                <DialogDescription className="text-chocolate/70">Add a new item to your bakery menu</DialogDescription>
                </DialogHeader>
                <MenuItemForm onClose={() => setIsCreateDialogOpen(false)} onSuccess={handleCreateSuccess} />
            </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={!!editingMenuItem} onOpenChange={() => setEditingMenuItem(null)}>
            <DialogContent className="max-w-2xl bg-white">
                <DialogHeader>
                <DialogTitle className="text-chocolate">Edit Menu Item</DialogTitle>
                <DialogDescription className="text-chocolate/70">Update menu item details</DialogDescription>
                </DialogHeader>
                <MenuItemForm 
                menuItem={editingMenuItem} 
                onClose={() => setEditingMenuItem(null)} 
                onSuccess={handleEditSuccess} 
                />
            </DialogContent>
            </Dialog>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
            <Card className="bg-white border-sage/20">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-chocolate/70">Total Menu Items</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-chocolate">{totalItems}</div>
                <p className="text-xs text-chocolate/60 mt-1">All menu items</p>
            </CardContent>
            </Card>

            <Card className="bg-white border-sage/20">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-chocolate/70">Available Items</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-sage-700">{availableItems}</div>
                <p className="text-xs text-chocolate/60 mt-1">Currently serving</p>
            </CardContent>
            </Card>

            <Card className="bg-white border-sage/20">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-chocolate/70">Avg. Price</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-chocolate">${averagePrice.toFixed(2)}</div>
                <p className="text-xs text-chocolate/60 mt-1">Across all items</p>
            </CardContent>
            </Card>

            <Card className="bg-white border-sage/20">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-chocolate/70">Categories</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-chocolate">{categories}</div>
                <p className="text-xs text-chocolate/60 mt-1">Menu categories</p>
            </CardContent>
            </Card>
        </div>

        <Card className="bg-white border-sage/20">
            <CardHeader>
            <div className="flex items-center justify-between">
                <div>
                <CardTitle className="text-chocolate">Menu Items</CardTitle>
                <CardDescription className="text-chocolate/70">Manage your menu offerings and pricing</CardDescription>
                </div>
                <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-chocolate/40 h-4 w-4" />
                <Input
                    placeholder="Search menu items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-sage/20 focus:border-caramel"
                />
                </div>
            </div>
            </CardHeader>
            <CardContent>
            {loading ? (
                <div className="text-center py-8 text-chocolate/60">Loading menu items...</div>
            ) : (
                <Table>
                <TableHeader>
                    <TableRow className="border-sage/20">
                    <TableHead className="text-chocolate/70">Menu Item</TableHead>
                    <TableHead className="text-chocolate/70">Price</TableHead>
                    <TableHead className="text-chocolate/70">Linked To</TableHead>
                    <TableHead className="text-chocolate/70">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredMenuItems.map((item) => (
                    <TableRow key={item.id} className="border-sage/20">
                        <TableCell>
                        <div>
                            <div className="font-medium text-chocolate">{item.name}</div>
                            <div className="text-sm text-chocolate/60 max-w-xs">{item.description}</div>
                        </div>
                        </TableCell>
                        <TableCell>
                        <div className="flex items-center">
                            <DollarSign className="h-4 w-4 text-chocolate/60 mr-1" />
                            <span className="font-medium text-chocolate">{item.price.toFixed(2)}</span>
                        </div>
                        </TableCell>
                        <TableCell>
                        {item.product ? (
                            <Badge variant="outline" className="border-caramel/30 text-caramel">
                            Product: {item.product.title}
                            </Badge>
                        ) : item.category ? (
                            <Badge variant="outline" className="border-sage/30 text-sage-700">
                            Category: {item.category.name}
                            </Badge>
                        ) : (
                            <span className="text-chocolate/40 text-sm">No link</span>
                        )}
                        </TableCell>
                        <TableCell>
                        <div className="flex items-center space-x-2">
                            <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-chocolate hover:bg-beige/30"
                            onClick={() => setEditingMenuItem(item)}
                            >
                            <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-600 hover:bg-red-50"
                            onClick={() => handleDelete(item.id)}
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
        </div>
    )
} 