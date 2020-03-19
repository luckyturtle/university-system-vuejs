import Vue from 'vue';
import VueRouter from 'vue-router';
import { authRoutes } from './auth';
import { courseRoutes } from './courses';
import { AppWelcome, AppNotFound } from './core/components';
import { AppProfile } from './user/components';

Vue.use(VueRouter);

const appRoutes = [
  {
    path: '/',
    name: 'welcome',
    component: AppWelcome
  },
  {
    path: '/profile',
    name: 'profile',
    component: AppProfile
  },
  {
    path: '*',
    name: 'not-found',
    component: AppNotFound
  }
];

const routes = [...appRoutes, ...authRoutes, ...courseRoutes];

export default new VueRouter({
  mode: 'history',
  routes
});
