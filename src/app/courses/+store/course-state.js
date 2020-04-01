// import { setSnackbarSuccess } from '../../shared/+store/snackbar-state';
import { http } from '../../services/httpClient';
import { dbStorage } from '../../utils/firebaseConfig';
import { toastSuccess, toastError } from '@/plugins/toasted';

const initialState = {
  allCourses: [],
  allStudents: [],
  course: {
    _id: null
  },
  courseSearch: null
};

export const actionTypes = {
  getAllCourses: '[COURSE] GET ALL COURSES SUCCESS',
  getCourse: '[COURSE] GET SINGLE COURSE SUCCESS',
  deleteCourse: '[COURSE] DELETE COURSE SUCCESS',
  createCourse: '[COURSE] CREATE NEW COURSE SUCCESS',
  getAllStudents: '[STUDENT] GET ALL STUDENTS SUCCESS',
  postStudent: '[STUDENT] POST STUDENT SUCCESS',
  updateStudent: '[STUDENT] UPDATE STUDENT SUCCESS',
  removeStudent: '[STUDENT] REMOVE STUDENT FROM COURSE SUCCESS',
  getCourseSearch: '[COURSE] SEARCH COURSES SUCCESS',
  resetCourses: '[COURSE] RESET ALL COURSES AND SEARCH COURSE'
};

export const {
  getAllCourses,
  getAllStudents,
  getCurrentCourseInfo,
  postStudent,
  updateStudent,
  removeStudent,
  getCourse,
  getCourseStudents,
  deleteCourse,
  createCourse,
  getCourseSearch,
  resetCourses
} = actionTypes;

const getters = {
  allCourses: state => state.allCourses,
  allStudents: state => state.allStudents,
  course: state => state.course,
  courseSearch: state => state.courseSearch
};

const actions = {
  async [getAllCourses]({ commit }) {
    const { data } = await http.get('courses');
    const list = data.map(async course => {
      const { data: students } = await http.get(
        `students/?query={"courses":"${course._id}"}`
      );
      return { ...course, students };
    });
    Promise.all(list).then(data => {
      commit(getAllCourses, data);
    });
  },
  async [getCourse]({ commit }, payload) {
    const { id } = payload;
    const { data: students } = await http.get(
      `students/?query={"courses":"${id}"}`
    );
    const { data: courses } = await http.get(`courses/?query={"_id":"${id}"}`);
    const data = Object.assign(courses[0], { students });
    commit(getCourse, data);
  },
  async [deleteCourse]({ commit }, payload) {
    if (!confirm('Are you sure you want to delete this course?')) {
      return;
    }
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
    toastSuccess('Successfully Deleted');
    // dispatch(setSnackbarSuccess, {
    //   message: 'Successfully Deleted'
    // });
  },
  async [getAllStudents]({ commit }) {
    try {
      const { data: students } = await http.get('students');
      commit(getAllStudents, students);
    } catch (err) {
      toastError(`Something went wrong! ${err}`);
    }
  },
  async [postStudent](_, payload) {
    try {
      const { student } = payload;
      await http.post('students', student);
      toastSuccess('Successfully create student!');
    } catch (err) {
      toastError(`Something went wrong! ${err}`);
    }
    // dispatch(setSnackbarSuccess, {
    //   message: 'Successfully Created'
    // });
  },
  async [removeStudent](_, payload) {
    try {
      const { student, course } = payload;
      student.courses = student.courses.filter(c => c !== course._id);
      await http.put(`students/${student._id}`, student);
      toastSuccess('Successfully remove student!');
    } catch (err) {
      toastError(`Something went wrong! ${err}`);
    }
    // dispatch(setSnackbarSuccess, {
    //   message: 'Successfully Removed'
    // });
  },
  async [updateStudent](_, payload) {
    try {
      const { student } = payload;
      await http.put(`students/${student._id}`, student);
      toastSuccess('Successfully !');
    } catch (err) {
      toastError(`Something went wrong! ${err}`);
    }
    // dispatch(setSnackbarSuccess, {
    //   message: 'Successfully Updated'
    // });
  },
  async [createCourse]({ commit }, payload) {
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
        try {
          const url = await task.snapshot.ref.getDownloadURL();
          const course = Object.assign(payload, { imageUrl: url });
          const { data } = await http.post('courses', course);
          commit(createCourse, { course: data });
          toastSuccess('Successfully create course!');
          // dispatch(setSnackbarSuccess, {
          //   message: 'Successfully Created'
          // });
        } catch (err) {
          toastError(`Something went wrong! ${err}`);
        }
      }
    );
  },
  async [getCourseSearch]({ commit }, payload) {
    const { courses, searchInput } = payload;
    const foundCourses = courses.filter(c =>
      c.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    commit(getCourseSearch, foundCourses);
  },
  async [resetCourses]({ commit }) {
    commit(resetCourses);
  }
};

const mutations = {
  [getAllCourses](state, payload) {
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
  [getAllStudents](state, payload) {
    Object.assign(state, { allStudents: payload });
  },
  [getCourseSearch](state, payload) {
    Object.assign(state, { courseSearch: payload });
  },
  [resetCourses](state) {
    Object.assign(state, { courseSearch: null });
  }
};

export default {
  getters,
  mutations,
  actions,
  state: initialState
};
