import { createRouter, createWebHashHistory } from 'vue-router'

const routes: any[] = [
    {
        path: '/',
        redirect: '/front/consult'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/register/index.vue')
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
            {
                name: 'userArticleDetail',
                path: 'articleDetail/:type/:id',
                component: () => import('@/components/front/articleDetails.vue')
            }
        ]
    },
    {
        name: 'admin',
        path: '/admin',
        component: () => import('@/views/manage/index.vue'),
        redirect: '/admin/home',
        children: [
            {
                name: 'home',
                path: 'home',
                component: () => import('@/views/manage/home/index.vue'),
            },
            {
                name: 'article',
                path: 'article',
                component: () => import('@/views/manage/article/index.vue'),
            },
            {
                name: 'addArticle',
                path: 'add',
                component: () => import('@/views/manage/article/cpns/addArticle.vue')
            },
            {
                name: 'articleDetail',
                path: 'articleDetail/:type/:id',
                component: () => import('@/components/front/articleDetails.vue')
            },
            {
                name: 'category',
                path: 'category',
                component: () => import('@/views/manage/category/index.vue')
            },
            {
                name: 'user',
                path: 'user',
                component: () => import('@/views/manage/user/index.vue')
            },
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
    history: createWebHashHistory(),
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