import Vue from 'vue';
import VueRouter from 'vue-router';
import { authRoutes } from './auth';
import { courseRoutes } from './courses';
import { AppWelcome, AppNotFound } from './core/components';
import { userRoutes } from './user';
Vue.use(VueRouter);

const appRoutes = [
  {
    path: '/',
    name: 'home',
    component: AppWelcome
  },
  {
    path: '*',
    name: 'not-found',
    component: AppNotFound
  }
];

const routes = [...appRoutes, ...authRoutes, ...courseRoutes, ...userRoutes];

export default new VueRouter({
  mode: 'history',
  routes
});
