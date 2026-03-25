import { lazy , Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AuthLayout from './Components/AuthLayout/AuthLayout'
import MasterLayout from './Components/MasterLayout/MasterLayout'
import { ToastContainer} from 'react-toastify';
const Login = lazy(() => import('./Components/Login/Login'))
const NotFound = lazy(() => import('./Components/NotFound/NotFound'))
const Home = lazy(() => import('./Components/Home/Home'))
const UsersList = lazy(() => import('./Components/UsersList/UsersList'))
const AddUser = lazy(() => import('./Components/AddUser/AddUser'))
const Profile = lazy(() => import('./Components/Profile/Profile'))


function App() {

  const routes=createBrowserRouter([
    {
      path:"/",
      element:<AuthLayout/>,
      errorElement:<NotFound/>,
      children:[
        {index:true,element:<Login/>},
        {path:"login",element:<Login/>},
      ]
    },
    {
      path:"dashboard",
      element:<MasterLayout/>,
      errorElement:<NotFound/>,
      children:[
        {index:true,element:<Home/>},
        {path:"home",element:<Home/>},
        {path:"users-list",element:<UsersList/>},
        {path:"add-user",element:<AddUser/>},
        {path:`edit-user/:id`,element:<AddUser/>},
        {path:"profile",element:<Profile/>}
      ]
    }
  ])

  return (
    <>
    <ToastContainer/>
      <Suspense fallback={<h2 className="text-center mt-5">Loading...</h2>}>
        <RouterProvider router={routes}/>
      </Suspense>
    </>
  )
}

export default App
