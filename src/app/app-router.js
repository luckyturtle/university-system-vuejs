import Vue from 'vue';
import VueRouter from 'vue-router';
import authRoutes from './auth/auth-routes'
import courseRoutes from './courses/course-routes'
import { Profile } from './shared/components';
import { Welcome } from './shared/components';
import { NotFound } from './shared/components';

Vue.use(VueRouter)

const appRoutes = [
    {
        path: '/',
        name: 'welcome',
        component: Welcome,
        props: { isAuth: true }
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile
    },
    {
        path: '*',
        name: 'page-not-found',
        component: NotFound
    }
]

const routes = [...appRoutes, ...authRoutes, ...courseRoutes]

export default new VueRouter({
    mode: 'history',
    routes,
})
