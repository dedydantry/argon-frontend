import { Suspense } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie"

// eslint-disable-next-line react/prop-types
export default function PublicLayout({children}){

  const user = Cookies.get("userData")

  if(!user) return <Navigate to="/signin" />

  return(
    <Suspense>
      {children}
    </Suspense>
  )

}