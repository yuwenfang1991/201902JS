// 实际项目中 我们一般会根据功能去划分 路由映射表
export default [
    // {
    //     path:'/',
    //     name:'home',
    //     component:()=> import('../views/Home.vue')
    // },
    // {
    //     path:'/about',
    //     name:'about',
    //     component:()=> import('../views/About.vue')
    // }
    {
        path: '/',
        component: () => import('../views/views'),
        redirect:'home',
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('../views/home')
            },
            {
                path: '/list',
                name: 'list',
                component: () => import('../views/list')
            },
            {
                path: '/collect',
                name: 'collect',
                component: () => import('../views/collect')
            },
            {
                path: '/add',
                name: 'add',
                component: () => import('../views/add')
            }
        ]
        
    },

    {
        path:'/login',
        component:()=>import('../views/login/login.vue')
    }

]