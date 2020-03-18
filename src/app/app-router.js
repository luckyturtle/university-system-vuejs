import Vue from 'vue';
import VueRouter from 'vue-router';
import { authRoutes } from './auth'
import { courseRoutes } from './courses'
import { AppProfile } from './shared/components';
import { AppWelcome } from './shared/components';
import { AppNotFound } from './shared/components';

Vue.use(VueRouter)

const appRoutes = [
    {
        path: '/',
        name: 'welcome',
        component: AppWelcome,
        props: { isAuth: true }
    },
    {
        path: '/profile',
        name: 'profile',
        component: AppProfile
    },
    {
        path: '*',
        name: 'page-not-found',
        component: AppNotFound
    }
]

const routes = [...appRoutes, ...authRoutes, ...courseRoutes]

export default new VueRouter({
    mode: 'history',
    routes,
})
