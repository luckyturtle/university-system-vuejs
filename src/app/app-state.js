import Vue from 'vue';
import Vuex from 'vuex';
import { courseState } from './courses';
import { authState } from './auth';
import sharedState from './shared/shared-state';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    courseState,
    authState,
    sharedState
  }
});