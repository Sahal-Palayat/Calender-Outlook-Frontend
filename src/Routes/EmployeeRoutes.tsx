import EmployeeDashboard from "@/Pages/Employee/EmployeeDashboard";
import EmployeeLogin from "@/Pages/Employee/EmployeeLogin";
import { Route, Routes } from "react-router-dom";


export default function EmployeeRoutes() {
    return (
        <Routes>
            <Route path="/login" Component={EmployeeLogin} />
            <Route path="/" Component={EmployeeDashboard} />
        </Routes>
    )
}


