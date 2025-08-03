"use client"

import { useEffect, useState } from "react"
import { Package, Menu, Tag, HelpCircle, Wrench, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { productApi, categoryApi, menuItemApi, faqApi, miscContentApi } from "@/lib/api"

interface AdminSidebarProps {
    activeSection: string
    onSectionChange: (section: string) => void
}

const navigationItems = [
    {
        id: "products",
        label: "Products",
        icon: Package,
        description: "Manage bakery products",
    },
    {
        id: "menu-items",
        label: "Menu Items",
        icon: Menu,
        description: "Manage menu offerings",
    },
    {
        id: "categories",
        label: "Categories",
        icon: Tag,
        description: "Organize products & menu",
    },
    {
        id: "faqs",
        label: "FAQs",
        icon: HelpCircle,
        description: "Customer questions",
    },
    {
        id: "our-story",
        label: "Our Story",
        icon: BookOpen,
        description: "Manage timeline milestones",
    },
    {
        id: "customisation",
        label: "Customisation",
        icon: Wrench,
        description: "Site-wide settings",
    },
]

export function AdminSidebar({ activeSection, onSectionChange }: AdminSidebarProps) {
    const [stats, setStats] = useState({
        products: 0,
        menuItems: 0,
        categories: 0,
        faqs: 0,
        miscContent: 0,
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchStats() {
            try {
                setLoading(true)
                const [products, menuItems, categories, faqs, miscContent] = await Promise.all([
                    productApi.getAll(),
                    menuItemApi.getAll(),
                    categoryApi.getAll(),
                    faqApi.getAll(),
                    miscContentApi.getAll(),
                ])

                setStats({
                    products: Array.isArray(products) ? products.length : 0,
                    menuItems: Array.isArray(menuItems) ? menuItems.length : 0,
                    categories: Array.isArray(categories) ? categories.length : 0,
                    faqs: Array.isArray(faqs) ? faqs.length : 0,
                    miscContent: Array.isArray(miscContent) ? miscContent.length : 0,
                })
            } catch (error) {
                console.error("Failed to fetch stats:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchStats()
    }, [])

    return (
        <aside className="fixed left-0 top-[73px] h-[calc(100vh-73px)] w-64 bg-white border-r border-sage/20 shadow-sm">
        <div className="p-6">
            <div className="space-y-2">
            <h2 className="text-lg font-semibold text-chocolate mb-4">Management</h2>

            {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = activeSection === item.id

                return (
                <Button
                    key={item.id}
                    variant="ghost"
                    className={cn(
                    "w-full justify-start h-auto p-3 text-left hover:bg-beige/30",
                    isActive && "bg-caramel/20 text-chocolate border-l-4 border-caramel",
                    )}
                    onClick={() => onSectionChange(item.id)}
                >
                    <div className="flex items-start space-x-3">
                    <Icon className={cn("h-5 w-5 mt-0.5", isActive ? "text-caramel" : "text-chocolate/70")} />
                    <div>
                        <div className={cn("font-medium", isActive ? "text-chocolate" : "text-chocolate/80")}>
                        {item.label}
                        </div>
                        <div className="text-xs text-chocolate/60 mt-1">{item.description}</div>
                    </div>
                    </div>
                </Button>
                )
            })}
            </div>

            <div className="mt-8 pt-6 border-t border-sage/20">
            <h3 className="text-sm font-medium text-chocolate/70 mb-3">Quick Stats</h3>
            <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                <span className="text-chocolate/70">Total Products</span>
                <span className="font-medium text-chocolate">
                    {loading ? "..." : stats.products}
                </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                <span className="text-chocolate/70">Menu Items</span>
                <span className="font-medium text-chocolate">
                    {loading ? "..." : stats.menuItems}
                </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                <span className="text-chocolate/70">Categories</span>
                <span className="font-medium text-chocolate">
                    {loading ? "..." : stats.categories}
                </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                <span className="text-chocolate/70">FAQs</span>
                <span className="font-medium text-chocolate">
                    {loading ? "..." : stats.faqs}
                </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                <span className="text-chocolate/70">Site Content</span>
                <span className="font-medium text-chocolate">
                    {loading ? "..." : stats.miscContent}
                </span>
                </div>
            </div>
            </div>
        </div>
        </aside>
    )
}
