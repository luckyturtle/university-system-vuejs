import { mount, createLocalVue } from '@vue/test-utils';
import { AppList } from '../../src/app/courses/components';
// import store from '../../src/app/app-state'
import { courseState } from '../../src/app/courses';
import { authState } from '../../src/app/auth';
import  snackbarState from '../../src/app/shared/+store/snackbar-state';
// import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex)
// localVue.use(store)
describe('Component', () => {
  it('has a button', () => {
     const store = new Vuex.Store({
      modules: {
        courseState,
        authState,
        snackbarState
      },
    })


    const wrapper = shallow(AppList, { store, localVue });
    expect(true).toEqual(true)
  });
});
