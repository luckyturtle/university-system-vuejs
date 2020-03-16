import { http } from '../../shared/services';
import { dbStorage } from '../../shared/services';
import { setSnackbarSuccess } from '../../shared/+store/snackbar-state';
const initialState = {
  allCourses: [],
  students: [],
  course: null
};

const actionTypes = {
  getCourses: '[COURSE] GET ALL COURSES SUCCESS',
  getCourse: '[COURSE] GET SINGLE COURSE SUCCESS',
  deleteCourse: '[COURSE] DELETE COURSE SUCCESS',
  createCourse: '[COURSE] CREATE NEW COURSE SUCCESS',
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
  deleteCourse,
  createCourse
} = actionTypes;

const getters = {
  allCourses: state => state.allCourses,
  allStudents: state => state.students,
  course: state => state.course
};

const actions = {
  async [getCourses]({ commit }) {
    const { data } = await http.get('courses');
    commit(actionTypes.getCourses, data);
  },
  async [getCourse]({ commit }, payload) {
    const { id } = payload;
    const students = await http.get(`students/?query={"courses":"${id}"}`);
    const course = await http.get(`courses/?query={"_id":"${id}"}`);
    const data = Object.assign(course.data[0], { students: students.data });
    commit(getCourse, data);
  },
  async [deleteCourse]({ commit, dispatch }, payload) {
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
    dispatch(setSnackbarSuccess, {
      message: 'Successfully Deleted'
    });
  },
  async [getStudents]({ commit }) {
    const { data } = await http.get('students');
    commit(actionTypes.getStudents, data);
  },
  async [postStudent]({ dispatch }, payload) {
    const { student } = payload;
    await http.post('students', student);
    dispatch(setSnackbarSuccess, {
      message: 'Successfully Created'
    });
  },
  async [removeStudent]({ dispatch }, payload) {
    const { student, course } = payload;
    alert('Are you sure you want to delete this student?');
    student.courses = student.courses.filter(c => c !== course._id);
    await http.put(`students/${student._id}`, student);
    dispatch(setSnackbarSuccess, {
      message: 'Successfully Removed'
    });
  },
  async [updateStudent]({ dispatch }, payload) {
    const { student } = payload;
    await http.put(`students/${student._id}`, student);
    dispatch(setSnackbarSuccess, {
      message: 'Successfully Updated'
    });
  },
  async [createCourse]({ dispatch }, payload) {
    const { selectedFile: selectedFile } = payload;
    const task = dbStorage
      .ref()
      .child(`images/${selectedFile.name}`)
      .put(selectedFile);
    task.on(
      'state_changed',
      snapshot => {
        console.log(snapshot);
      },
      error => console.error(error),
      async function() {
        const url = await task.snapshot.ref.getDownloadURL();
        const course = Object.assign(payload, { imageUrl: url });
        await http.post('courses', course);
        dispatch(setSnackbarSuccess, {
          message: 'Successfully Removed'
        });
      }
    );
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
