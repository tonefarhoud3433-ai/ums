import SideBar from '../SideBar/SideBar'
import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'

export default function MasterLayout() {
  return (
    <>
      <div className="d-flex">
          <div>
            <SideBar/>
          </div>
          <div className="w-100">
            <NavBar/>
            <Outlet/>
          </div>
        </div>
    </>
  )
}
