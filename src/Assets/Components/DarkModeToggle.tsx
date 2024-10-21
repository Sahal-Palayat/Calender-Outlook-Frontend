import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useTheme from '../../Hooks/useTheme'

export function DarkModeToggle() {
    const { isDarkMode, toggleDarkMode } = useTheme()

    return (
        <Button
            onClick={toggleDarkMode}
            variant="secondary"
            size="icon"
            className="rounded-full transition-colors text-gray-300 hover:none border-black border-2 duration-200"
        >
            {isDarkMode ? (
                <Sun className="h-[1.2rem] w-[1.2rem] text-blue rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            ) : (
                <Moon className="h-[1.2rem] w-[1.2rem] text-blue-dark rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            )}
        </Button>
    )
}