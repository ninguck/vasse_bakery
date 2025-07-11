"use client";

import type { ReactNode } from "react"
import { useState } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebare"

export default function AdminLayout({ children }: { children: ReactNode }) {
    const [activeSection, setActiveSection] = useState("dashboard")
    
    return (
        <div className="flex min-h-screen bg-beige">
            <AdminSidebar activeSection={activeSection} onSectionChange={setActiveSection}/>
        <div className="flex flex-col flex-1">
            <AdminHeader />
            <main className="flex-1 p-6">{children}</main>
        </div>
        </div>
    )
}
