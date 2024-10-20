
import './App.css'
import Provider from './Context/Provider'
import RouterProvider from './Context/RoutesProvider'
// import EmployeeRoutes from './Routes/EmployeeRoutes'

function App() {


  return (
    <Provider>
      <RouterProvider />
    </Provider>
  )
}

export default App
