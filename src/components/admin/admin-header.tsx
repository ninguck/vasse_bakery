"use client"

import { Bell, Settings, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { supabase } from "@/lib/supabase"

export function AdminHeader() {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const getUser = async () => {
            try {
                if (!supabase) {
                    console.warn('Supabase client not available')
                    setLoading(false)
                    return
                }
                
                const { data: { user }, error } = await supabase.auth.getUser()
                if (error) {
                    console.error('Error getting user:', error)
                } else {
                    setUser(user)
                }
            } catch (error) {
                console.error('Error in getUser:', error)
            } finally {
                setLoading(false)
            }
        }
        
        getUser()
    }, [])

    const handleLogout = async () => {
        try {
            if (!supabase) {
                toast.error("Supabase not configured")
                return
            }
            
            const { error } = await supabase.auth.signOut()
            if (error) {
                toast.error("Error signing out")
                return
            }
            toast.success("Signed out successfully")
            router.push("/admin/login")
        } catch (error) {
            toast.error("An unexpected error occurred")
            console.error("Logout error:", error)
        }
    }

    const getUserInitials = (email: string) => {
        if (!email) return "AB"
        return email.split('@')[0].substring(0, 2).toUpperCase()
    }

    if (loading) {
        return (
            <header className="bg-white border-b border-sage/20 px-6 py-4 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-wheat rounded-full flex items-center justify-center">
                                <span className="text-chocolate font-bold text-lg">🥐</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-chocolate">Vasse Bakery</h1>
                                <p className="text-sm text-chocolate/70">Admin Portal</p>
                            </div>
                        </div>
                    </div>
                    <div className="animate-pulse bg-gray-200 h-8 w-32 rounded"></div>
                </div>
            </header>
        )
    }

    return (
        <header className="bg-white border-b border-sage/20 px-6 py-4 shadow-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-wheat rounded-full flex items-center justify-center">
                            <span className="text-chocolate font-bold text-lg">🥐</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-chocolate">Vasse Bakery</h1>
                            <p className="text-sm text-chocolate/70">Admin Portal</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="icon" className="text-chocolate hover:bg-beige/30">
                        <Bell className="h-5 w-5" />
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="flex items-center space-x-2 hover:bg-beige/30">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback className="bg-caramel text-white">
                                        {user ? getUserInitials(user.email) : "AB"}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="text-chocolate font-medium">
                                    {user ? user.email : "Admin"}
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 bg-white border-sage/20">
                            <DropdownMenuLabel className="text-chocolate">My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-sage/20" />
                            <DropdownMenuItem className="text-chocolate hover:bg-beige/30">
                                <User className="mr-2 h-4 w-4" />
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-chocolate hover:bg-beige/30">
                                <Settings className="mr-2 h-4 w-4" />
                                Settings
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-sage/20" />
                            <DropdownMenuItem 
                                className="text-chocolate hover:bg-beige/30"
                                onClick={handleLogout}
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}
