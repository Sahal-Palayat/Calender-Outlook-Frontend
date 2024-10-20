import { useState } from "react"

const initialEmployees = [
    { id: 1, name: "John Doe", email: "john@example.com", mobile: "1234567890" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", mobile: "9876543210" },
]
export default function useManage() {
    const [employees, setEmployees] = useState(initialEmployees)
    const [searchTerm, setSearchTerm] = useState("")
    const [editingEmployee, setEditingEmployee] = useState<any>(null)
    const [isAddingEmployee, setIsAddingEmployee] = useState(false)

    const filteredEmployees = employees.filter((employee) =>
        Object.values(employee).some((value) =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    )

    const handleEdit = (employee: any) => {
        setEditingEmployee(employee)
    }

    const handleDelete = (id: number) => {
        setEmployees(employees.filter((employee) => employee.id !== id))
    }

    const handleSaveEdit = (updatedEmployee: any) => {
        setEmployees(employees.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp)))
        setEditingEmployee(null)
    }
    return { employees,initialEmployees, handleEdit, handleDelete, handleSaveEdit, isAddingEmployee, editingEmployee, setEditingEmployee, setIsAddingEmployee, filteredEmployees, searchTerm, setSearchTerm }
}


