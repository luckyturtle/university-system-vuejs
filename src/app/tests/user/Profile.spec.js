import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import userState from '../../user/+store/user-state';
import AppProfile from '../../user/components/Profile.vue';

Vue.use(Vuetify);

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

describe('Testing AppProfile.vue', () => {
  let store;
  let state;
  let actions;
  let mutations;
  let router;
  let vuetify;
  let wrapper;

  beforeEach(() => {
    vuetify = new Vuetify();
    router = new VueRouter();
    state = {};

    mutations = userState.mutations;

    actions = {};

    store = new Vuex.Store({
      modules: {
        userState: {
          state,
          actions,
          mutations,
          getters: userState.getters
        }
      }
    });

    wrapper = shallowMount(AppProfile, {
      store,
      router,
      localVue,
      vuetify
    });
  });

  it('Is Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });
});
