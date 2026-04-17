import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import NewTaskView from '../views/NewTaskView.vue'

const routes = [
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
        path: '/new-task',
        name: 'new-task',
        component: NewTaskView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router