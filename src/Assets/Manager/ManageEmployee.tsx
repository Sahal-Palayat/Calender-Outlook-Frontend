import { Pencil, Trash2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import useManage from "@/Hooks/Manager/useManage"

// Mock data for demonstration


export default function EmployeeManagement() {
    const { editingEmployee, filteredEmployees, handleDelete, handleEdit, isAddingEmployee, searchTerm, setEditingEmployee, setIsAddingEmployee, setSearchTerm } = useManage()

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-blue dark:text-blue-light">Employee Management</h1>
            <div className="mb-4 flex justify-between items-center">
                <div className="relative">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search employees..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 border-blue dark:border-blue-light"
                    />
                </div>
                <Button onClick={() => setIsAddingEmployee(true)} className="bg-green text-white hover:bg-green/90">
                    Add Employee
                </Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Mobile</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredEmployees.map((employee) => (
                        <TableRow key={employee.id}>
                            <TableCell>{employee.name}</TableCell>
                            <TableCell>{employee.email}</TableCell>
                            <TableCell>{employee.mobile}</TableCell>
                            <TableCell>
                                <Button variant="ghost" size="icon" onClick={() => handleEdit(employee)}>
                                    <Pencil className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleDelete(employee.id)}>
                                    <Trash2 className="h-4 w-4 text-red" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={editingEmployee !== null} onOpenChange={() => setEditingEmployee(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Employee</DialogTitle>
                    </DialogHeader>
                    {/* {editingEmployee && (
                        // <AddEmployee
                        //     initialValues={editingEmployee}
                        //     onSubmit={(values) => handleSaveEdit({ ...editingEmployee, ...values })}
                        // />
                    )} */}
                </DialogContent>
            </Dialog>

            <Dialog open={isAddingEmployee} onOpenChange={setIsAddingEmployee}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Employee</DialogTitle>
                    </DialogHeader>
                    {/* <AddEmployee
                        onSubmit={(values) => {
                            setEmployees([...employees, { id: employees.length + 1, ...values }])
                            setIsAddingEmployee(false)
                        }}
                    /> */}
                </DialogContent>
            </Dialog>
        </div>
    )
}