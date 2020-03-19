import { http, dbStorage } from '../../shared/services';
import { setSnackbarSuccess } from '../../shared/+store/snackbar-state';

const initialState = {
  allCourses: [],
  allStudents: [],
  course: {
    _id: null
  },
  searchCourse: null
};

const actionTypes = {
  getCourses: '[COURSE] GET ALL COURSES SUCCESS',
  getCourse: '[COURSE] GET SINGLE COURSE SUCCESS',
  deleteCourse: '[COURSE] DELETE COURSE SUCCESS',
  createCourse: '[COURSE] CREATE NEW COURSE SUCCESS',
  getStudents: '[STUDENT] GET ALL STUDENTS SUCCESS',
  postStudent: '[STUDENT] POST STUDENT SUCCESS',
  updateStudent: '[STUDENT] UPDATE STUDENT SUCCESS',
  removeStudent: '[STUDENT] REMOVE STUDENT FROM COURSE SUCCESS',
  getSearchCourse: '[COURSE] SEARCH COURSES SUCCESS',
  resetCourses: '[COURSE] RESET ALL COURSES AND SEARCH COURSE'
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
  createCourse,
  getSearchCourse,
  resetCourses
} = actionTypes;

const getters = {
  allCourses: state => state.allCourses,
  allStudents: state => state.allStudents,
  course: state => state.course,
  searchCourse: state => state.searchCourse
};

const actions = {
  async [getCourses]({ commit }) {
    const { data } = await http.get('courses');
    const list = data.map(async c => {
      const { data } = await http.get(`students/?query={"courses":"${c._id}"}`);
      return { ...c, students: data };
    });
    Promise.all(list).then(data => {
      commit(actionTypes.getCourses, data);
    });
  },
  async [getCourse]({ commit }, payload) {
    const { id } = payload;
    const students = await http.get(`students/?query={"courses":"${id}"}`);
    const course = await http.get(`courses/?query={"_id":"${id}"}`);
    const data = Object.assign(course.data[0], { students: students.data });
    commit(getCourse, data);
  },
  async [deleteCourse]({ commit, dispatch }, payload) {
    alert('Are you sure you want to delete this course?');
    const { id } = payload;
    const { data: students } = await http.get('students');
    students
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
  async [createCourse]({ commit, dispatch }, payload) {
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
        const { data } = await http.post('courses', course);
        commit(createCourse, { course: data });
        dispatch(setSnackbarSuccess, {
          message: 'Successfully Created'
        });
      }
    );
  },
  async [getSearchCourse]({ commit }, payload) {
    const { courses, searchInput } = payload;
    const foundCourses = courses.filter(c =>
      c.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    commit(getSearchCourse, foundCourses);
  },
  async [resetCourses]({ commit }) {
    commit(resetCourses);
  }
};

const mutations = {
  [getCourses](state, payload) {
    Object.assign(state, { allCourses: payload });
  },
  [createCourse](state, payload) {
    const { course } = payload;
    const list = state.allCourses.concat(course);
    Object.assign(state, { allCourses: list });
  },
  [getCourse](state, payload) {
    Object.assign(state, { course: payload });
  },
  [deleteCourse](state, payload) {
    const list = state.allCourses.filter(c => c._id !== payload);
    Object.assign(state, { allCourses: list });
  },
  [getStudents](state, payload) {
    Object.assign(state, { allStudents: payload });
  },
  [getSearchCourse](state, payload) {
    Object.assign(state, { searchCourse: payload });
  },
  [resetCourses](state) {
    Object.assign(state, { allCourses: [], searchCourse: null });
  }
};

export default {
  getters,
  mutations,
  actions,
  state: initialState
};
