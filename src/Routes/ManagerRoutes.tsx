import Login from "@/Pages/Manager/Login";
import AddEmployee from "@/Pages/Manager/AddEmployee";
import ManageEmployee from "@/Pages/Manager/ManageEmployee";
import Register from "@/Pages/Manager/Register";
import Tasks from "@/Pages/Manager/Tasks";
import { Route, Routes } from "react-router-dom";

export default function ManagerRoutes() {
    return (
        <>
            <Routes>
                <Route path="/employees" Component={ManageEmployee} />
                <Route path="/add" Component={AddEmployee} />
                <Route path="/login" Component={Login} />
                <Route path="/register" Component={Register} />
                <Route path="/" Component={Tasks} />
            </Routes>
        </>
    )
}


