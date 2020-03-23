import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import {default as courseState, createCourse} from '../../courses/+store/course-state';
import { testAction, asyncCallback } from '../../util/unit-test';
import { AppCreate } from '../../courses/components';

Vue.use(Vuetify);
Vue.use(VueRouter);

const localVue = createLocalVue();

localVue.use(Vuex);

describe('AppCreate.vue', () => {
  let actions;
  let state;
  let store;
  let vuetify;
  let router;
  let wrapper;
  let options;
  beforeEach(() => {
    vuetify = new Vuetify();
    router = new VueRouter();

    state = {};

    actions = {
      [createCourse]: asyncCallback(createCourse, [
        { _id: 1, title: 'test' },
        { _id: 2, title: 'test2' }
      ])
    };

    store = new Vuex.Store({
      modules: {
        courseState: {
          state,
          actions,
          getters: courseState.getters
        }
      }
    });

    options = {
      store,
      localVue,
      vuetify,
      router,
      mocks: {
        _id: '5e6144c4ca822500151256t3',
        title: 'Javascript',
        duration: '4',
        startDate: '2020-04-29',
        students: [],
        description: 'Demo demo',
        available: true,
        imageUrl: 'https://demo.test'
      }
    };

    wrapper = shallowMount(AppCreate, options);
  });

  it('actions', done => {
    testAction(
      actions[createCourse],
      null,
      { allCourses: null },
      [
        {
          type: createCourse,
          payload: [
            { _id: 1, title: 'test' },
            { _id: 2, title: 'test2' }
          ]
        }
      ],
      done
    );
  });

  it('is vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  // it('route should be "/courses"', () => {
  //   expect(wrapper.vm.$route.path).toEqual('/');
  // });

  it('input fileds should be "5"', () => {
    const textFields = wrapper.findAll('v-text-field-stub').length;
    const inputFields = wrapper.findAll('v-file-input-stub').length;
    const menuFields = wrapper.findAll('v-menu-stub').length;
    const textAreaFields = wrapper.findAll('v-textarea-stub').length;
    const totalFileds = textAreaFields + inputFields + menuFields + textFields;
    expect(totalFileds).toEqual(5);
  });
});

describe('AppCreate.vue', () => {
  let actions;
  let state;
  let store;
  let vuetify;
  let router;
  let wrapper;

  beforeEach(() => {
    vuetify = new Vuetify();
    router = new VueRouter();

    state = {};

    actions = {
      [createCourse]: jest.fn()
    };

    store = new Vuex.Store({
      modules: {
        courseState: {
          state,
          actions,
          getters: courseState.getters
        }
      }
    });

    wrapper = shallowMount(AppCreate, {
      store,
      localVue,
      vuetify,
      router
    });
  });

  it('calls store action "createCourse" when button is clicked', () => {
    wrapper.find('.btn-submit').trigger('click');
    wrapper.vm.create();
    expect(actions[createCourse]).toHaveBeenCalled();
  });
});
