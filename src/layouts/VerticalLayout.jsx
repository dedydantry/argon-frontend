import Layout from './MainLayout'
import { Outlet } from "react-router-dom";

export default function VerticalLayout(props){
  return(

    <Layout {...props}>
      <Outlet/>
    </Layout>
   
  )
}