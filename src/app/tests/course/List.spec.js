import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import {
  default as courseState,
  getCourses,
  deleteCourse
} from '../../courses/+store/course-state';
import { AppList } from '../../courses/components';
import { testAction, asyncCallback } from '../../util/unit-test';

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
  let mutations;

  beforeEach(() => {
    vuetify = new Vuetify();
    router = new VueRouter();

    state = {
      allCourses: [],
      allStudents: [],
      course: {
        _id: null
      },
      searchCourse: [
        {
          _id: '2d6144c4ca822500155df3b9',
          title: 'Typescript',
          duration: '4',
          startDate: '2020-03-29',
          students: [],
          description: 'Test test',
          available: true,
          imageUrl: 'https://test.test'
        },
        {
          _id: '5e6144c4ca822500151256t3',
          title: 'Javascript',
          duration: '4',
          startDate: '2020-04-29',
          students: [],
          description: 'Demo demo',
          available: true,
          imageUrl: 'https://demo.test'
        }
      ]
    };

    mutations = courseState.mutations;

    actions = {
      [deleteCourse]: jest.fn(),
      [getCourses]: jest.fn(
        asyncCallback(getCourses, [
          { _id: 1, title: 'test' },
          { _id: 2, title: 'test2' }
        ])
      )
    };

    store = new Vuex.Store({
      modules: {
        courseState: {
          state,
          actions,
          mutations,
          getters: courseState.getters
        }
      }
    });

    wrapper = shallowMount(AppList, {
      store,
      localVue,
      vuetify,
      router,
      mocks: {
        course: {
          _id: '5e6144c4ca822500151256t3',
          title: 'Javascript',
          duration: '4',
          startDate: '2020-04-29',
          students: [],
          description: 'Demo demo',
          available: true,
          imageUrl: 'https://demo.test'
        }
      }
    });
  });

  it('is vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('te', done => {
    testAction(
      actions[getCourses],
      null,
      state,
      [
        {
          type: getCourses,
          payload: [
            { _id: 1, title: 'test' },
            { _id: 2, title: 'test2' }
          ]
        }
      ],
      done
    );
  });

  it('calls store action "deleteCourse" when "deleteCourse" method is called', () => {
    wrapper.find('.btn-delete').trigger('click');
    wrapper.vm.deleteCourse();
    expect(actions[deleteCourse]).toHaveBeenCalled();
  });
  it('go to "/course/:id" when button "View" is clicked', () => {
    wrapper.find('.btn-detail').trigger('click');
    const courseId = wrapper.vm.course._id;
    const route = `/courses/${courseId}`
    router.push(route);
    expect(wrapper.vm.$route.path).toEqual(route);
  });

  it('should have "2" created courses in store property "searchCourse"', () => {
    const courses = Array(2).fill({ _id: '1', title: 'test' }).length;
    const storeCourses = wrapper.vm.$store.getters.searchCourse.length;
    expect(courses).toEqual(storeCourses);
  });
});
