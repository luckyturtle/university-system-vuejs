import AppLogin from './components/Login';
import AppRegister from './components/Register';
import { innerGuard } from '../shared/services/guards';

export default [
  {
    path: '/login',
    name: 'login',
    component: AppLogin,
    beforeEnter: innerGuard
  },
  {
    path: '/register',
    name: 'register',
    component: AppRegister,
    beforeEnter: innerGuard
  }
];
