import IUser from "@/Interfaces/Auth"
import DeleteEmployeeService from "@/Services/Manager/DeleteEmployee"
import GetEmployeeService from "@/Services/Manager/GetEmployee"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export default function useManage() {
    const [employees, setEmployees] = useState<IUser[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [editingEmployee, setEditingEmployee] = useState<any>(null)
    const [isAddingEmployee, setIsAddingEmployee] = useState(false)
    const navigate = useNavigate()
    const filteredEmployees = employees.filter((employee) =>
        Object.values(employee).some((value) =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    )

    async function Verify() {
        const token = Cookies.get('token');
        if (token) {
            try {
                const res = await GetEmployeeService()
                setEmployees(res.employees)
            } catch (e) {
                navigate("/manager/login")
            }
        } else navigate('manager/login')
    }

    useEffect(() => {
        Verify()
    }, [])



    const handleDelete = async (idx: string) => {
        const id = toast.loading("Removing user")
        try {
            const res = await DeleteEmployeeService(idx)
            toast.success(res.message, { id })
            setEmployees(employees.filter((employee) => employee._id !== idx))
        } catch (e: any) {
            toast.error(e.message, { id })
        }
    }
    return { employees, handleDelete, isAddingEmployee, editingEmployee, setEditingEmployee, setIsAddingEmployee, filteredEmployees, searchTerm, setSearchTerm }
}


