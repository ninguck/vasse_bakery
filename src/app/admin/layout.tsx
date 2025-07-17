"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebare"
import { ProductManagement } from "@/components/admin/product-management"
import { MenuItemManagement } from "@/components/admin/menu-item-management"
import { CategoryManagement } from "@/components/admin/category-management"
import { FAQManagement } from "@/components/admin/faq-management"
import { CustomisationManagement } from "@/components/admin/customisation-management"

export default function AdminLayout({ children }: { children: ReactNode }) {
    const [activeSection, setActiveSection] = useState("products")
    
    const renderSection = () => {
        switch (activeSection) {
            case "products":
                return <ProductManagement />
            case "menu-items":
                return <MenuItemManagement />
            case "categories":
                return <CategoryManagement />
            case "faqs":
                return <FAQManagement />
            case "customisation":
                return <CustomisationManagement />
            default:
                return (
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-chocolate">Dashboard</h1>
                            <p className="text-chocolate/70 mt-1">Welcome to your admin dashboard</p>
                        </div>
                        <div className="bg-white border-sage/20 rounded-lg p-6">
                            <p className="text-chocolate/70">Select a section from the sidebar to get started.</p>
                        </div>
                    </div>
                )
        }
    }
    
    return (
        <div className="flex min-h-screen bg-beige">
            <AdminSidebar activeSection={activeSection} onSectionChange={setActiveSection}/>
            <div className="flex flex-col flex-1">
                <AdminHeader />
                <main className="flex-1 p-6 ml-64">
                    {renderSection()}
                </main>
            </div>
        </div>
    )
}
