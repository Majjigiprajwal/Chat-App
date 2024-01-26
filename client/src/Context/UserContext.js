import React from 'react'
import { parseJwt } from '../util/jwtParser';
import { createContext, useContext, useState} from "react";


const userContext = createContext()

export const UserContextProvider = ({children})=>{
    const [userInfo,setUserInfo] = useState({
        userId :'',
        userName :''
    })

    const token = JSON.parse(localStorage.getItem('token'))

    if(token){
        const userData = parseJwt(token);
    }
    const values = {
        userInfo,
        setUserInfo
    }

    return(<userContext.Provider value={values}>{children}</userContext.Provider>)
}

export const useUserInfo= ()=> useContext(userContext)