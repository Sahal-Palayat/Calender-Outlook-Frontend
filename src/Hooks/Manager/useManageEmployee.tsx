import IUser from "@/Interfaces/Auth"
import GetEmployeeService from "@/Services/Manager/GetEmployee"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

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

    const handleEdit = (employee: any) => {
        // setEditingEmployee(employee)
    }

    const handleDelete = (id: string) => {
        // setEmployees(employees.filter((employee) => employee._id !== id))
    }

    const handleSaveEdit = (updatedEmployee: any) => {
        // setEmployees(employees.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp)))
        setEditingEmployee(null)
    }
    return { employees, handleEdit, handleDelete, handleSaveEdit, isAddingEmployee, editingEmployee, setEditingEmployee, setIsAddingEmployee, filteredEmployees, searchTerm, setSearchTerm }
}


