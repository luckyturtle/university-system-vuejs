import store from '../../app-state';

export const authGuard = function(to, from, next) {
  if (!store.getters.isAuth) {
    next({ name: 'login' });
  }
  next();
};

export const innerGuard = function(to, from, next) {  
  if (to.name === 'login' || to.name === 'register') {
    next('/');
  } else if (from.name === 'login' || from.name === 'register') {
    next();
  }
  next();
};
