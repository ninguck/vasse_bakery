"use client"

import { usePathname, useRouter } from "next/navigation"
import { Package, Menu, Tag, HelpCircle } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const navigationItems = [
  {
    path: "/admin/products",
    label: "Products",
    icon: Package,
    description: "Manage bakery products",
  },
  {
    path: "/admin/menu-items",
    label: "Menu Items",
    icon: Menu,
    description: "Manage menu offerings",
  },
  {
    path: "/admin/categories",
    label: "Categories",
    icon: Tag,
    description: "Organize products & menu",
  },
  {
    path: "/admin/faqs",
    label: "FAQs",
    icon: HelpCircle,
    description: "Customer questions",
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="h-full w-64 bg-white border-r border-sage/20 shadow-sm">
      <div className="p-6">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-chocolate mb-4">Management</h2>

          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname.startsWith(item.path)

            return (
              <Link key={item.path} href={item.path}>
                <div
                  className={cn(
                    "w-full cursor-pointer rounded-md p-3 hover:bg-beige/30 transition-colors",
                    isActive && "bg-caramel/20 text-chocolate border-l-4 border-caramel"
                  )}
                >
                  <div className="flex items-start space-x-3">
                    <Icon
                      className={cn(
                        "h-5 w-5 mt-0.5",
                        isActive ? "text-caramel" : "text-chocolate/70"
                      )}
                    />
                    <div>
                      <div
                        className={cn(
                          "font-medium",
                          isActive ? "text-chocolate" : "text-chocolate/80"
                        )}
                      >
                        {item.label}
                      </div>
                      <div className="text-xs text-chocolate/60 mt-1">{item.description}</div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-8 pt-6 border-t border-sage/20">
          <h3 className="text-sm font-medium text-chocolate/70 mb-3">Quick Stats</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-chocolate/70">Total Products</span>
              <span className="font-medium text-chocolate">24</span>
            </div>
            <div className="flex justify-between">
              <span className="text-chocolate/70">Menu Items</span>
              <span className="font-medium text-chocolate">18</span>
            </div>
            <div className="flex justify-between">
              <span className="text-chocolate/70">Categories</span>
              <span className="font-medium text-chocolate">6</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
