import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styles from "./Login.module.css"
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';

interface LoginFormInput{
  username:string;
  password:string;
}

interface AuthContextType {
  saveUserData:()=>void
}

export default function Login() {

  const {saveUserData} = useContext(AuthContext) as AuthContextType

//1-useForm()
const{register,handleSubmit,formState:{errors}}=useForm<LoginFormInput>();
const navigate=useNavigate();
//2-function
const onSubmit=async(data:LoginFormInput)=>{
  try {
    const response = await axios.post("https://dummyjson.com/auth/login",data);
    localStorage.setItem("userToken",response?.data?.accessToken);
    saveUserData()
    toast.success("logged successfully , welcome")
    navigate("/dashboard");    
  } catch  {
    toast.error("user or password is wrong ..")    
  } 
}

  return (
    <div className='login-container'>
      <div className='container-fluid'>
        <div className="row justify-content-center align-items-center vh-100">
          <div className={`col-11 col-sm-8 col-md-6 col-lg-4 col-xl-3 bg-white rounded-4 p-5 shadow-lg ${styles.loginCard}`}>
            <h3 className='login-header'>User Management System</h3>
            <div className="my-5 text-center">
              <h5 className='sign-in'>Sign In</h5>
              <small>Enter your credentials to access your account</small>
            </div>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <label>User Name</label>
                <div className="input-field my-2">
                <input autoComplete="current-username" type="text" className='form-control input-animation' placeholder='Enter your user name'
                {...register("username",{required:"this field is required"})}
                />
                {errors.username && <span className='text-danger'>{errors.username.message}</span>}
                </div>
                <label>Password</label>
                <div className="input-field my-2">
                <input autoComplete="current-password" type="password" className='form-control input-animation' placeholder='Enter your password'
                {...register("password",{required:"this field is required"})}
                />
                {errors.password && <span className='text-danger'>{errors.password.message}</span>}
                </div>
                <button type='submit' className='btn btn-warning w-100 my-3 rounded-3 login-btn'>Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
