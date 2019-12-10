import Home from '../../page/Home';
import Login from '../../page/Login'

const outerConfig = [
    {
        path:'/',
        component:Home,
        auth:true,
    },{
        path:'/home',
        component:Home,
        auth:true,
    },{
        path:'/login',
        component:Login,
    }
]
export default outerConfig;