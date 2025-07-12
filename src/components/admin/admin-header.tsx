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

export function AdminHeader() {
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
                    <AvatarFallback className="bg-caramel text-white">AB</AvatarFallback>
                    </Avatar>
                    <span className="text-chocolate font-medium">Admin Baker</span>
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
                <DropdownMenuItem className="text-chocolate hover:bg-beige/30">
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
