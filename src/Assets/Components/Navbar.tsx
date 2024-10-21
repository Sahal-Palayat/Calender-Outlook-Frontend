import { LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
// import { useState } from "react"
import useUser from "@/Hooks/useUser"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"

export default function Navbar() {
    // const [isOpen, setIsOpen] = useState(false)
    const { user, setUser } = useUser()
    const navigate = useNavigate()
    function Logout() {
        Cookies.remove("token")
        setUser(null)
        navigate("/employee/login")
    }
    return (
        <nav className="bg-white dark:bg-gray-800 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        {/* <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="mr-4 text-gray-500 dark:text-gray-400">
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">Open menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                                <nav className="flex flex-col space-y-4">
                                    <a href="#" className="text-blue dark:text-blue-light hover:underline">Home</a>
                                    <a href="#" className="text-blue dark:text-blue-light hover:underline">Dashboard</a>
                                    <a href="#" className="text-blue dark:text-blue-light hover:underline">Projects</a>
                                    <a href="#" className="text-blue dark:text-blue-light hover:underline">Team</a>
                                    <a href="#" className="text-blue dark:text-blue-light hover:underline">Settings</a>
                                </nav>
                            </SheetContent>
                        </Sheet> */}
                        <a href="#" className="text-xl font-bold text-blue dark:text-blue-light">
                            UpLook
                        </a>
                    </div>
                    <div className="flex items-center space-x-4">
                        {/* <DarkModeToggle /> */}
                        <div className="flex items-center space-x-3">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {user && user.name}
                            </span>
                            {user && (
                                <>
                                    <Button variant="ghost" size="icon" className="rounded-full bg-gray-200 dark:bg-gray-700">
                                        <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                    </Button>
                                    <Button onClick={Logout} variant="ghost" size="icon" className="rounded-full bg-gray-200 dark:bg-gray-700">
                                        <LogOut className="h-5 w-5 text-red dark:text-gray-400" />
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}