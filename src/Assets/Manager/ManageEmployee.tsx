import { Pencil, Trash2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import useManage from "@/Hooks/Manager/useManageEmployee"
import { useNavigate } from "react-router-dom"


export default function EmployeeManagement() {
    const { editingEmployee, filteredEmployees, handleDelete, handleEdit, searchTerm, setEditingEmployee, setSearchTerm } = useManage()
    const navigate = useNavigate()

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
                <Button onClick={() => navigate("/manager/add")} className="bg-green text-white hover:bg-green/90">
                    Add Employee
                </Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Profile</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredEmployees.map((employee) => (
                        <TableRow key={employee._id}>
                            <TableCell><img src={employee.profile as string} className="w-8 h-8 rounded-full" alt="" /></TableCell>
                            <TableCell>{employee.name}</TableCell>
                            <TableCell>{employee.email}</TableCell>
                            <TableCell>{employee.position || "Developer"}</TableCell>
                            <TableCell>
                                <Button variant="ghost" size="icon" onClick={() => handleEdit(employee)}>
                                    <Pencil className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleDelete(employee._id)}>
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
        </div>
    )
}