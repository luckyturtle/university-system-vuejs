
import { authGuard } from '../utils/guards';

export default [
  { path: '', redirect: { name: 'course-list' } },
  {
    path: '/courses',
    name: 'course-list',
    component: () => import('../courses/components/List.vue'),
    beforeEnter: authGuard

  },
  {
    path: '/create-course',
    name: 'course-create',
    component: () => import('../courses/components/Create.vue'),
    beforeEnter: authGuard
  },
  {
    path: '/courses/:id',
    name: 'detail',
    component: () => import('../courses/components/Detail.vue'),
    beforeEnter: authGuard
  }
];
