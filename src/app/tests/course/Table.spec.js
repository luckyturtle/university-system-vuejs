import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import {
  default as courseState,
  postStudent,
  getStudents,
  updateStudent,
  removeStudent
} from '../../courses/+store/course-state';
import AppTable from '../../courses/components/Table.vue';

Vue.use(Vuetify);

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

describe('Testing AppTable.vue', () => {
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
      allStudents: [
        {
          _id: '5e5d78a6607a840015b28c1e',
          name: 'Preslava Petrova',
          town: 'Plovdiv',
          age: '27',
          groupe: '2',
          courses: ['5e616186138f3f0015214ca0', '5e6144b9412a070016a46c56']
        },
        {
          _id: '5e5d78a6ee02ad0016de3ff7',
          name: 'Stoyan Todorv',
          town: 'Plovdiv',
          age: '27',
          groupe: '2',
          courses: [
            '5e6144c4ca822500155df3b9',
            '5e6144b9412a070016a46c56',
            '5e700ba19451ab00177b09f8',
            '5e700c2067feff001a6aacd3'
          ]
        }
      ]
    };

    mutations = courseState.mutations;

    actions = {
      [getStudents]: jest.fn()
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
      vuetify,
      propsData: {
        course: {
          _id: '2d6144c4ca822500155df3b9',
          title: 'Typescript',
          duration: '4',
          startDate: '2020-03-29',
          students: [],
          description: 'Test test',
          available: true,
          imageUrl: 'https://test.test'
        }
      },
      data() {
        return {
          students: []
        };
      }
    };

    wrapper = shallowMount(AppTable, options);
  });

  it('Is Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  //   it('Dispatched action "getStudents" in created hook', () => {

  //     expect(actions[getStudents]).toHaveBeenCalled();
  //   });

  //   it('Call "next()" when "next" arrow button is clicked', () => {
  //     const next = jest.fn();
  //     wrapper.setMethods({
  //       next
  //     });
  //     wrapper.find('.btn-next').trigger('click');
  //     expect(next).toHaveBeenCalled();
  //   });

  // it('Should render the course, duration and start date title', () => {
  //   const {
  //     title,
  //     duration,
  //     startDate
  //   } = wrapper.vm.$store.getters.allCourses[0];

  //   const htmlElement = wrapper.find('.title').html();
  //   expect(htmlElement).toContain(courseTitle);
  // });
});
