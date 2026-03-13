import { useForm } from "react-hook-form";
import styles from "./AddUser.module.css"
import { useNavigate , useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

interface UserFormData {
  firstName:string;
  lastName:string;
  email:string;
  age:number;
  phone:string;
  birthDate:string;
}

export default function AddUser() {

  //use params
  const {id} = useParams()

  const{register,handleSubmit,formState:{errors}, reset}=useForm<UserFormData>();
  const navigate=useNavigate();
  //2-function
  const onSubmit=async(data:UserFormData)=>{
    try {
      if(id){
        await axios.put(`https://dummyjson.com/users/${id}`, data)
        toast.success("User Updated Successfully")
      } else {
        await axios.post(`https://dummyjson.com/users/add`, data)
        toast.success("User Added Successfully")
      }
      navigate("/dashboard/users-list")
    } catch{
      toast.error("Something wrong happened");
    }
  }


  useEffect(()=>{

    const getUser = async ()=>{
      try {
        const response = await axios.get(`https://dummyjson.com/users/${id}`)
        reset(response?.data)
      } catch(error){
        toast.error("Faild to load user data")
        console.log(error);
      }
    }


    if(id) {
      getUser()
    };
  },[id , reset])


  return (
    <div style={{backgroundColor:"#F8F8F8" , minHeight:"calc(100vh - 62px)"}}>
      <div className={`mx-4 py-4`}>
        <div className="d-flex justify-content-between">
          <h3 className="fw-bold">{id ? "Update User" : "Add User"}</h3>
        </div>
          <hr />
        <div className="container">
          <form onSubmit={handleSubmit(onSubmit)} className="shadow-lg p-5 rounded-4 my-5 mx-3">
          <div className="row my-3">
            <div className="col-md-6">
              <label className={styles.label}>First Name</label>
                <div className="input-field my-2">
                  <input type="text" className={`form-control input-animation ${styles.input}`} placeholder='Enter your First Name'
                  {...register("firstName",{required:"this field is required"})}
                  />
                  {errors.firstName && <span className='text-danger'>{errors.firstName.message}</span>}
                </div>
            </div>
            <div className="col-md-6">
              <label className={styles.label}>Last Name</label>
                <div className="input-field my-2">
                  <input type="text" className={`form-control input-animation ${styles.input}`} placeholder='Enter your Last Name'
                  {...register("lastName",{required:"this field is required"})}
                  />
                  {errors.lastName && <span className='text-danger'>{errors.lastName.message}</span>}
                </div>
            </div>
          </div>
          <div className="row my-3">
            <div className="col-md-6">
              <label className={styles.label}>Email</label>
                <div className="input-field my-2">
                  <input type="text" className={`form-control input-animation ${styles.input}`} placeholder='Enter your Email'
                  {...register("email",{required:"this field is required",pattern:{
                    value:/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message:"Your email is not valid"
                  }})}
                  />
                  {errors.email && <span className='text-danger'>{errors.email.message}</span>}
                </div>
            </div>
            <div className="col-md-6">
              <label className={styles.label}>Age</label>
                <div className="input-field my-2">
                  <input type="number" className={`form-control input-animation ${styles.input}`} placeholder='Enter your Age'
                  {...register("age",{required:"this field is required",max:{value:60,message:"Sorry max age is 60"},min:{value:18,message:"Sorry min age is 18"}})}
                  />
                  {errors.age && <span className='text-danger'>{errors.age.message}</span>}
                </div>
            </div>
          </div>
          <div className="row my-3">
            <div className="col-md-6">
              <label className={styles.label}>Phone Number</label>
                <div className="input-field my-2">
                  <input type="text" className={`form-control input-animation ${styles.input}`} placeholder='Enter your Phone Number'
                  {...register("phone",{required:"this field is required"})}
                  />
                  {errors.phone && <span className='text-danger'>{errors.phone.message}</span>}
                </div>
            </div>
            <div className="col-md-6">
              <label className={styles.label}>Birth Date</label>
                <div className="input-field my-2">
                  <input type="text" className={`form-control input-animation ${styles.input}`} placeholder='Enter your Birth Date'
                  {...register("birthDate",{required:"this field is required"})}
                  />
                  {errors.birthDate && <span className='text-danger'>{errors.birthDate.message}</span>}
                </div>
            </div>
          </div>
          <div className="text-center mt-5">
            <button className="btn btn-warning w-25 p-2 text-white my-3 ">{id? "Update" : "Add"}</button>
          </div>
        </form>
        </div>
      </div>
    </div>
  )
}
