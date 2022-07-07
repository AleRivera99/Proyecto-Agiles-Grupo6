// Layout

import LayoutAdmin from '../layouts/LayoutAdmin'
import LayoutBasic from '../layouts/LayoutBasic'

//Admin Pages

import AdminHome from '../pages/Admin' 
import AdminSignIn from '../pages/Admin/SignIn'
import AdminUsers from '../pages/Admin/Users'
import AdminDieta from '../pages/Admin/Dieta'
import AdminRecetas from '../pages/Admin/Recetas'

//Pages
import Home from '../pages/Home'
import Recetas from '../pages/Recetas'
import Dietas from '../pages/Dietas'

//Other
import Error404 from '../pages/Error404'


const routes =[
    {
        path: "/admin",
        component: LayoutAdmin,
        exact: false,
        routes:[
            {
                path: "/admin",
                component: AdminHome,
                exact: true
            },
            {
                path: "/admin/login",
                component: AdminSignIn,
                exact:true
            },
            {
                path: "/admin/users",
                component: AdminUsers,
                exact:true
            },
            {
                path: "/admin/dieta",
                component:AdminDieta,
                exact: true
            },
            {
                path: "/admin/recetas",
                component:AdminRecetas,
                exact: true
            },
            {
                component:Error404
            }

        ]
    },
    {
        path: "/" ,
        component: LayoutBasic,
        exact: false,
        routes: [
            {
                path: "/",
                component: Home,
                exact: true
            },
            {
                path: "/recetas",
                component: Recetas,
                exact : true
            },
            {
                path: "/dietas",
                component: Dietas,
                exact : true
            },
            {
                component:Error404
            }
        ]
    }
];

export default routes;