import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../store'
import Login from '@/views/front/login/index.vue'

const routes: any[] = [
    {
        path:'/',
        redirect: '/login'
    },
    {
        path:'/login',
        name:'login',
        component: Login
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

router.beforeEach((to, from) => {
    const userStore = useUserStore()
    if (userStore.token && to.path !== '/login') {
        console.log('你还未登录');
        return '/login'
    }
    console.log('to',' : ' ,to);
    console.log('from',' : ',from);
    return true
})

export default router