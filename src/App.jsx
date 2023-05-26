import { Suspense } from "react";
import Router from "./routes/Router";

export default function App(){

  return(
    <Suspense fallback={null}>
      <Router/>
    </Suspense>
  )
  
}