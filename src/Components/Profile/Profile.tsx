import axios from "axios";
import styles from "./Profile.module.css"
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";


interface UserFormData {
  firstName:string;
  lastName:string;
  email:string;
  age:number;
  phone:string;
  birthDate:string;
}

export default function Profile() {


    const context = useContext(AuthContext)
    const [user , setUser]=useState<UserFormData | null>(null)


    

  useEffect(() => {


    const getUser = async () => {
    try {

      if(!context?.userData?.id) return

      const response = await axios.get(
        `https://dummyjson.com/users/${context.userData.id}`
      )

      setUser(response.data)

    } catch {
      toast.error("Failed to load user data")
    }
  }


    getUser()
  }, [context?.userData?.id])
  

  return (
    <div style={{backgroundColor:"#F8F8F8" , minHeight:"calc(100vh - 62px)"}}>
      <div className={`mx-4 py-4`}>
        <div className="d-flex justify-content-between">
          <h3 className="fw-bold">Profile</h3>
        </div>
          <hr />
        <div className="container">
          <form className="shadow-lg p-5 rounded-4 my-5 mx-3">
          <div className="row my-3">
            <div className="col-md-6">
              <label className={styles.label}>First Name</label>
                <div className="input-field my-2">
                  <input type="text" className={`form-control input-animation ${styles.input}`} defaultValue={user?.firstName}/>
                </div>
            </div>
            <div className="col-md-6">
              <label className={styles.label}>Last Name</label>
                <div className="input-field my-2">
                  <input type="text" className={`form-control input-animation ${styles.input}`} defaultValue={user?.lastName}
                  />
                </div>
            </div>
          </div>
          <div className="row my-3">
            <div className="col-md-6">
              <label className={styles.label}>Email</label>
                <div className="input-field my-2">
                  <input type="text" className={`form-control input-animation ${styles.input}`} defaultValue={user?.email}
                  />
                </div>
            </div>
            <div className="col-md-6">
              <label className={styles.label}>Age</label>
                <div className="input-field my-2">
                  <input type="text" className={`form-control input-animation ${styles.input}`} defaultValue={user?.age}
                  />
                </div>
            </div>
          </div>
          <div className="row my-3">
            <div className="col-md-6">
              <label className={styles.label}>Phone Number</label>
                <div className="input-field my-2">
                  <input type="text" className={`form-control input-animation ${styles.input}`} defaultValue={user?.phone}
                  />
                </div>
            </div>
            <div className="col-md-6">
              <label className={styles.label}>Birth Date</label>
                <div className="input-field my-2">
                  <input type="text" className={`form-control input-animation ${styles.input}`} defaultValue={user?.birthDate}
                  />
                </div>
            </div>
          </div>
        </form>
        </div>
      </div>
    </div>
  )
}
