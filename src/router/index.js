import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import TestComposition from '../views/TestComposition.vue'
import ApiView from '../views/ApiView.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/about',
            name: 'about',
            component: AboutView
        },
        {
            path: '/test-composition',
            name: 'testComposition',
            component: TestComposition
        },
        {
            path: '/api',
            name: 'api',
            component: ApiView
        }
    ]
})

export default router