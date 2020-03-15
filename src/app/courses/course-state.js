import { http } from '../shared/services';
import { actionTypes as snackbarActionTypes } from '../shared/shared-state';
const initialState = {
  allCourses: [],
  students: [],
  course: null
};

const actionTypes = {
  getCourses: '[COURSE] GET ALL COURSES SUCCESS',
  getCourse: '[COURSE] GET SINGLE COURSE SUCCESS',
  deleteCourse: '[COURSE] DELETE COURSE SUCCESS',
  getStudents: '[STUDENT] GET ALL STUDENTS SUCCESS',
  postStudent: '[STUDENT] POST STUDENT SUCCESS',
  updateStudent: '[STUDENT] UPDATE STUDENT SUCCESS',
  removeStudent: '[STUDENT] REMOVE STUDENT FROM COURSE SUCCESS'
};

export const {
  getCourses,
  getStudents,
  getCurrentCourseInfo,
  postStudent,
  updateStudent,
  removeStudent,
  getCourse,
  getCourseStudents,
  deleteCourse
} = actionTypes;

const getters = {
  allCourses: state => state.allCourses,
  allStudents: state => state.students,
  course: state => state.course
};

const actions = {
  async [getCourses]({ commit, dispatch }) {
    try {
      const { data } = await http.get('courses');
      commit(actionTypes.getCourses, data);
    } catch (error) {
      dispatch(snackbarActionTypes.setSnackbarError, {
        message: error.message
      });
      console.error(error);
    }
  },
  async [getCourse]({ commit, dispatch }, payload) {
    try {
      const { id } = payload;
      const students = await http.get(`students/?query={"courses":"${id}"}`);
      const course = await http.get(`courses/?query={"_id":"${id}"}`);
      const data = Object.assign(course.data[0], { students: students.data });
      commit(getCourse, data);
    } catch (error) {
      dispatch(snackbarActionTypes.setSnackbarError, {
        message: error.message
      });
      console.error(error);
    }
  },
  async [deleteCourse]({ commit, dispatch }, payload) {
    try {
      const { id } = payload;

      const { data } = await http.get('students');
      data
        .filter(s => s.courses.includes(id))
        .map(s => {
          s.courses = s.courses.filter(c => c !== id);
          return s;
        })
        .forEach(student => {
          http.put(`students/${student._id}`, student);
        });
      await http.delete(`courses/${id}`);
      commit(deleteCourse, id);
      dispatch(snackbarActionTypes.setSnackbarSuccess, {
        message: 'Successfully Deleted'
      });
    } catch (error) {
      dispatch(snackbarActionTypes.setSnackbarError, {
        message: error.message
      });
      console.error(error);
    }
  },
  async [getStudents]({ commit, dispatch }) {
    try {
      const { data } = await http.get('students');
      commit(actionTypes.getStudents, data);
    } catch (error) {
      dispatch(snackbarActionTypes.setSnackbarError, {
        message: error.message
      });
      console.error(error);
    }
  },
  async [postStudent]({ dispatch }, payload) {
    try {
      const { student } = payload;
      await http.post('students', student);
      dispatch(snackbarActionTypes.setSnackbarSuccess, {
        message: 'Successfully Created'
      });
    } catch (error) {
      dispatch(snackbarActionTypes.setSnackbarError, {
        message: error.message
      });
      console.error(error);
    }
  },
  async [removeStudent]({ dispatch }, payload) {
    try {
      const { student, course } = payload;
      alert('Are you sure you want to delete this student?');
      student.courses = student.courses.filter(c => c !== course._id);
      await http.put(`students/${student._id}`, student);
      dispatch(snackbarActionTypes.setSnackbarSuccess, {
        message: 'Successfully Removed'
      });
    } catch (error) {
      dispatch(snackbarActionTypes.setSnackbarError, {
        message: error.message
      });
      console.error(error);
    }
  },
  async [updateStudent]({ dispatch }, payload) {
    try {
      const { student } = payload;
      await http.put(`students/${student._id}`, student);
      dispatch(snackbarActionTypes.setSnackbarSuccess, {
        message: 'Successfully Updated'
      });
    } catch (error) {
      dispatch(snackbarActionTypes.setSnackbarError, {
        message: error.message
      });
      console.error(error);
    }
  }
};

const mutations = {
  [getCourses](state, payload) {
    Object.assign(state, { allCourses: payload });
  },
  [getCourse](state, payload) {
    Object.assign(state, { course: payload });
  },
  [deleteCourse](state, payload) {
    const list = state.allCourses.filter(c => c._id !== payload);
    Object.assign(state, { allCourses: list });
  },
  [getStudents](state, payload) {
    Object.assign(state, { students: payload });
  }
};

export default {
  getters,
  mutations,
  actions,
  state: initialState
};
