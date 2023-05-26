import { Suspense } from "react";
import Cookies from "js-cookie"
import { Navigate } from "react-router-dom";


export default function PublicLayout({children}){
  
  const user = Cookies.get("userData")
  if(user) return <Navigate to="/home" />

  return(
    <Suspense>
      {children}
    </Suspense>
  )
}