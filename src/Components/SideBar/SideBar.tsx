  import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
  import { Link, useNavigate } from 'react-router-dom';
  import { FaHome, FaRegUser } from "react-icons/fa";
  import { RiUserAddLine } from 'react-icons/ri';
  import { CgProfile } from 'react-icons/cg';
  import { CiLogout } from 'react-icons/ci';
  import styles from "./SideBar.module.css"
  import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
  import { useContext, useState } from 'react';
  import { GrSystem } from 'react-icons/gr';
  import { AuthContext } from '../../Context/AuthContext';

  interface User {
    id:number
    firstName:string
    image:string
  }

  interface AuthContextType {
    userData: User | null
    saveUserData: () => void
  }

  export default function SideBar() {

    const context = useContext(AuthContext);
    const { userData } = useContext(AuthContext) as AuthContextType
    const navigate = useNavigate();

    const[collapse,setCollapse]=useState(false)
    const toggleCollapse=()=>{
      setCollapse(!collapse)
    }

    const handleLogout = () => {
  localStorage.removeItem("userToken");

  if (context?.saveUserData) {
    context.saveUserData();
  }
  navigate("/login");
  }

    return (
      <div className='sidebarContainer'>
        <Sidebar collapsed={collapse} className='vh-100'>
          <div>
          {collapse ? <div className='text-center my-3 text-warning'><GrSystem size={25} /></div> : <h3 className={styles.header}>UMS</h3>}
          </div>
          <div className='text-center my-5'>
            <img src={userData?.image} alt="profile" className={`rounded-circle ${collapse ? "w-75" : "w-50"}`} />
            {!collapse && (
              <div className="my-5">
              <h5 className={styles.name}>{userData?.firstName}</h5>
              <p className={styles.role}>Admin</p>
            </div>
            )}
          </div>
          <Menu>
            <MenuItem icon={<FaHome />} component={<Link to="/dashboard" />}> Home</MenuItem>
            <MenuItem icon={<FaRegUser />} component={<Link to="/dashboard/users-list" />}> Users</MenuItem>
            <MenuItem icon={<RiUserAddLine />} component={<Link to="/dashboard/add-user" />}> Add User</MenuItem>
            <MenuItem icon={<CgProfile />} component={<Link to="/dashboard/profile" />}> Profile</MenuItem>
            <MenuItem icon={<CiLogout />} onClick={handleLogout}> Logout</MenuItem>
          </Menu>
        </Sidebar>
        {collapse ? <MdOutlineKeyboardDoubleArrowRight onClick={toggleCollapse} size={25} className={styles.arrow} /> 
        : <MdOutlineKeyboardDoubleArrowLeft onClick={toggleCollapse} size={25} className={styles.arrow} />}
      </div>
    )
  }
