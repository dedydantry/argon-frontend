// ** Router imports
import { Navigate, useRoutes } from "react-router-dom"
import {getRoutes} from './index'
const Router = () => {

  const allRoutes = getRoutes()

  const routes = useRoutes([
    {
      path: '/',
      index: true,
      element: <Navigate replace to='/home' />
    },
    ...allRoutes
  ])

  return routes
}

export default Router