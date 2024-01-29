import React from 'react'
import { Outlet, Navigate } from "react-router-dom";
const protectedRoutes = () => {
  return (
    <div>
       <div>
       {window.localStorage.getItem("token") ? (
        <Outlet />
      ) : (
        <Navigate to="/" />
      )}
    </div>
    </div>
  )
}

export default protectedRoutes
