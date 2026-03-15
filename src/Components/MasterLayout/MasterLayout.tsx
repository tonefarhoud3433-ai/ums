import SideBar from '../SideBar/SideBar'
import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import styles from "./MasterLayout.module.css"

export default function MasterLayout() {
  return (
    <>
      <div className="d-flex">
          <div className={styles.sidebar}>
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
