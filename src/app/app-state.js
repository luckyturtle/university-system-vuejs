import Vue from 'vue';
import Vuex from 'vuex';
import  courseState  from './courses/+store/course-state';
import  authState  from './auth/+store/auth-state';
import userState from './user/+store/user-state';
import snackbarState from './shared/+store/snackbar-state';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    courseState,
    authState,
    userState,
    snackbarState
  }
});