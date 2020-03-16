import Vue from 'vue';
import Vuex from 'vuex';
import { courseState } from './courses';
import { authState } from './auth';
import snackbarState from './shared/+store/snackbar-state';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    courseState,
    authState,
    snackbarState
  }
});