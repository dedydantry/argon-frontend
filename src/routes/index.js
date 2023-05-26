import { lazy } from "react";

import PublicLayout from "../layouts/middleware/PublicLayout";
import PrivateLayout from "../layouts/middleware/PrivateLayout";
import BlankLayout from "../layouts/BlankLayout";
import VerticalLayout from "../layouts/VerticalLayout";

const Home = lazy(() => import('../pages/Home'))
const Signin = lazy(() => import('../pages/Signin'))
const Attendance = lazy(() => import('../pages/Attendance'))
const Profile = lazy(() => import('../pages/Profile'))
const Employee = lazy(() => import('../pages/Employee'))

const Routes =   [
    {
        path:'/home',
        name:'Home',
        element:<Home/>
    },
    {
        path:'/attendance',
        name:'attendance',
        element:<Attendance/>
    },
    {
        path:'/profile',
        name:'profile',
        element:<Profile/>
    },
    {
        path:'/employee',
        name:'employee',
        element:<Employee/>
    },
    {
        path:'/signin',
        element:<Signin/>,
        meta:{
            publicLayout:true
        }
    }
]


const mergeLayout = () => {

    const privateLayout = []
    const publicLayout = []
    Routes.forEach(x => {
        const RouterTag = x.meta?.publicLayout ? PublicLayout : PrivateLayout
        x.element = (
            <RouterTag route={x}>
                {x.element}
            </RouterTag>
        )
        if(x.meta && x.meta.publicLayout){
            privateLayout.push(x)
        }else{
            publicLayout.push(x)
        }
    });

    return [privateLayout, publicLayout]
}


const getLayout = {
    blank:<BlankLayout/>,
    vertical:<VerticalLayout/>
}

const getRoutes = () => {
    const merged = mergeLayout()
    const AllRoutes = [
        {
            path: "/",
            element: getLayout.blank,
            children: merged[0]
        },
        {
            path: "/",
            element: getLayout.vertical,
            children: merged[1]
        }
    ]
    return AllRoutes
}


export { getRoutes }