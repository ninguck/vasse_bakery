"use client"

import type { ReactNode } from "react"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebare"
import { ProductManagement } from "@/components/admin/product-management"
import { MenuItemManagement } from "@/components/admin/menu-item-management"
import { CategoryManagement } from "@/components/admin/category-management"
import { FAQManagement } from "@/components/admin/faq-management"
import { CustomisationManagement } from "@/components/admin/customisation-management"
import { supabase } from "@/lib/supabase"

export default function AdminLayout({ children }: { children: ReactNode }) {
    const [activeSection, setActiveSection] = useState("products")
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const pathname = usePathname()
    
    // Don't run auth check on login page
    const isLoginPage = pathname === '/admin/login'
    
    useEffect(() => {
        // Skip auth check if we're on the login page
        if (isLoginPage) {
            setLoading(false)
            return
        }
        
        const checkAuth = async () => {
            try {
                if (!supabase) {
                    console.warn('Supabase not configured')
                    setLoading(false)
                    return
                }
                
                const { data: { session }, error } = await supabase.auth.getSession()
                
                if (error) {
                    console.error('Auth check error:', error)
                    router.push('/admin/login')
                    return
                }
                
                if (!session) {
                    console.log('No session found, redirecting to login')
                    router.push('/admin/login')
                    return
                }
                
                console.log('User authenticated:', session.user.email)
                setIsAuthenticated(true)
            } catch (error) {
                console.error('Auth check failed:', error)
                router.push('/admin/login')
            } finally {
                setLoading(false)
            }
        }
        
        checkAuth()
    }, [router, isLoginPage])
    
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
    
    // If we're on the login page, just render children without auth check
    if (isLoginPage) {
        return <>{children}</>
    }
    
    if (loading) {
        return (
            <div className="min-h-screen bg-beige flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-caramel mx-auto"></div>
                    <p className="text-chocolate mt-4">Loading admin panel...</p>
                </div>
            </div>
        )
    }
    
    if (!isAuthenticated) {
        return null // Will redirect to login
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
