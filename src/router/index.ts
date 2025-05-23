import { createRouter, createWebHistory } from 'vue-router'

const routes: any[] = [
    {
        path: '/',
        redirect: '/front/consult'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/front/login/index.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/front/register/index.vue')
    },
    {
        path: '/front',
        name: 'front',
        children: [
            {
                path: 'consult',
                name: 'consult',
                component: () => import('@/views/front/consult/index.vue')
            },
            {
                path: 'nature',
                name: 'nature',
                component: () => import('@/views/front/nature/index.vue')
            },
            {
                path: 'action',
                name: 'action',
                component: () => import('@/views/front/action/index.vue')
            },
            {
                path: 'about',
                name: 'about',
                component: () => import('@/views/front/about/index.vue')
            },
        ]
    },
    {
        name: 'admin',
        path: '/admin',
        redirect: '/admin/article',
        children: [
            {
                name: 'article',
                path: 'article',
                component: () => import('@/views/admin/article/index.vue')
            }
        ]
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/error/404.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404'
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
    console.log('from', ' : ', from);
    console.log('to', ' : ', to);
    return true
})

export default router