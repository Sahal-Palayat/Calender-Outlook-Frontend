import Navbar from "@/Assets/Components/Navbar";
import Login from "@/Pages/Login";
import AddEmployee from "@/Pages/Manager/AddEmployee";
import ManageEmployee from "@/Pages/Manager/ManageEmployee";
import Register from "@/Pages/Manager/Register";
import { Route, Routes } from "react-router-dom";

export default function ManagerRoutes() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" Component={ManageEmployee} />
                <Route path="/add" Component={AddEmployee} />
                <Route path="/login" Component={Login} />
                <Route path="/register" Component={Register} />
                {/* <Route exact path="/employees/:id" component={EmployeeDetail} />
            <Route exact path="/employees/:id/edit" component={EmployeeForm} /> */}
            </Routes>
        </>
    )
}


