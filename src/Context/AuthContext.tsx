import { jwtDecode } from "jwt-decode";
import {  useEffect, useState, type ReactNode , createContext } from "react";

interface User {
    id:number
    firstName:string
    lastName:string
    email:string
    age:number
    phone:string
    birthDate:string
}

interface AuthContextType  {
    userData:User | null
    saveUserData:()=>void
}

export const AuthContext = createContext<AuthContextType | null>(null)

interface AuthContextProvProp {
    children:ReactNode
}

export default function AuthContextProvider({children}:AuthContextProvProp){

    const [userData,setUserData]=useState<User|null>(null)


    const saveUserData = ()=>{
        const encodedToken = localStorage.getItem("userToken")
        if (encodedToken) {
            const decodedToken = jwtDecode<User>(encodedToken)
            setUserData(decodedToken)
        }
    }
    
    //refresh
    useEffect(()=>{
        if(localStorage.getItem('userToken')){
            saveUserData()
        }
    },[])

    return (
        <AuthContext.Provider value={{userData, saveUserData}}>{children}</AuthContext.Provider>
    )
}