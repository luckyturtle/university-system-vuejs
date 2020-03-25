import { authGuard } from '../utils/guards';
import AppUser from './User.vue';
export default [
  {
    path: '/user',
    component: AppUser,
    children: [
      {
        path: '',
        redirect: { name: 'profile' }
      },
      {
        path: 'profile',
        name: 'profile',
        component: () =>
          import(
            /* webpackChunkName: "course-list" */ '../user/components/Profile.vue'
          ),
        beforeEnter: authGuard
      }
    ]
  }
];
