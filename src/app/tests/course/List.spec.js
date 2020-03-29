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
import AppList from '../../courses/components/List.vue';
import { testAction, asyncCallback } from '../../utils/unit-test';

Vue.use(Vuetify);

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

describe('Testing AppList.vue', () => {
  let store;
  let state;
  let actions;
  let mutations;
  let router;
  let vuetify;
  let wrapper;
  let options;

  beforeEach(() => {
    vuetify = new Vuetify();
    router = new VueRouter();
    state = {
      allCourses: [
        {
          _id: '2d6144c4ca822500155df3b9',
          title: 'Typescript',
          duration: '4',
          startDate: '2020-03-29',
          students: [],
          description: 'Test test',
          available: true,
          imageUrl: 'https://test.test'
        }
      ],
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

    options = {
      store,
      router,
      localVue,
      vuetify
    };

    wrapper = shallowMount(AppList, options);
  });

  it('Is Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('Renders the course title', () => {
    const courseTitle = wrapper.vm.$store.getters.allCourses[0].title;
    const htmlElement = wrapper.find('.title').html();
    expect(htmlElement).toContain(courseTitle);
  });

  it('Calls "deleteCourse" when "delete" button is clicked', async () => {
    const deleteCourse = jest.fn();
    wrapper.setMethods({
      deleteCourse
    });
    wrapper.find('.btn-delete').trigger('click');
    await wrapper.vm.$nextTick();
    expect(deleteCourse).toHaveBeenCalled();
  });

  it('Dispatched action "deleteCourse" when "delete" button is clicked', async () => {
    wrapper.find('.btn-delete').trigger('click');
    await wrapper.vm.$nextTick();
    expect(actions[deleteCourse]).toHaveBeenCalled();
  });
  it('Direct to "/course/:id" after click button "View"', async () => {
    const course = store.getters.allCourses[0];
    const route = `/course/${course._id}`;
    wrapper.find('.btn-detail').trigger('click');
    await wrapper.vm.$nextTick();
    wrapper.vm.$router.push(route);
    expect(wrapper.vm.$route.path).toEqual(route);
  });

  // it('test', done => {
  //   testAction(
  //     actions[getCourses],
  //     null,
  //     state,
  //     [
  //       {
  //         type: getCourses,
  //         payload: [
  //           { _id: 1, title: 'test' },
  //           { _id: 2, title: 'test2' }
  //         ]
  //       }
  //     ],
  //     done
  //   );
  // });
});
