import Navbar from "@/Assets/Components/Navbar";
import AddEmployee from "@/Pages/Manager/AddEmployee";
import ManageEmployee from "@/Pages/Manager/ManageEmployee";
import { Route, Routes } from "react-router-dom";

export default function ManagerRoutes() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" Component={ManageEmployee} />
                <Route path="/add" Component={AddEmployee} />
                {/* <Route exact path="/employees/:id" component={EmployeeDetail} />
            <Route exact path="/employees/:id/edit" component={EmployeeForm} /> */}
            </Routes>
        </>
    )
}


