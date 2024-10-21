import { UserContext } from "@/Context/UserContext"
import { useContext } from "react"

export default function useUser() {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error("Ayyoo")
    }
    return context
}
