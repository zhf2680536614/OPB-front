import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../store'
import Login from '@/views/front/login/index.vue'
import Register from '@/views/front/register/index.vue'

const routes: any[] = [
    {
        path:'/',
        redirect: '/login'
    },
    {
        path:'/login',
        name:'login',
        component: Login
    },
    {
        path:'/register',
        name:'register',
        component:Register
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

router.beforeEach((to, from) => {
    // const userStore = useUserStore()
    // if (userStore.token && to.path !== '/login' ) {
    //     console.log('你还未登录');
    //     return '/login'
    // }
    console.log('from',' : ',from);
    console.log('to',' : ' ,to);
    return true
})

export default router