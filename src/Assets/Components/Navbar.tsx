import * as React from "react"
import { Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DarkModeToggle } from "./DarkModeToggle"

export default function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false)
    const employeeName = "John Doe"

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
                        </Sheet>
                        <a href="#" className="text-xl font-bold text-blue dark:text-blue-light">
                            Company Logo
                        </a>
                    </div>
                    <div className="flex items-center space-x-4">
                        <DarkModeToggle />
                        <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {employeeName}
                            </span>
                            <Button variant="ghost" size="icon" className="rounded-full bg-gray-200 dark:bg-gray-700">
                                <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                <span className="sr-only">User menu</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}