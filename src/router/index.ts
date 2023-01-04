
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [{
    path: '/',
    name: 'Message',
    component: () => import('@/pages/Message.vue')
}, {
    path: '/photo',
    name: 'Photo',
    component: () => import('@/pages/Photo.vue')
}]

const router = createRouter({
    history: createWebHistory(),
    routes
})

//导出router
export default router
