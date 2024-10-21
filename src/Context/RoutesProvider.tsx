import Login from '@/Pages/Login'
import EmployeeRoutes from '@/Routes/EmployeeRoutes'
import ManagerRoutes from '@/Routes/ManagerRoutes'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'

export default function RouterProvider() {

    return (
        <Router>
            <Toaster richColors position='top-right' />
            <Routes>
                <Route path='/manager/*' Component={ManagerRoutes} />
                <Route path='/employee' Component={EmployeeRoutes} />
                <Route path='/login' Component={Login} />
            </Routes>
        </Router>
    )
}
