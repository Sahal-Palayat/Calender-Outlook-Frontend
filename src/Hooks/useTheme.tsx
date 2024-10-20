import { DarkModeContext } from "@/Context/ThemeContext"
import { useContext } from "react"

export default function useTheme() {
    const context = useContext(DarkModeContext)
    if (context === undefined) {
        throw new Error('useDarkMode must be used within a DarkModeProvider')
    }
    return context
}