import { toastSuccess } from '../../utils/toasted';
import { http } from '../../services/httpClient';
const initialState = {
  userInfo: null,
  userCourses: []
};

export const actionTypes = {
  setUserInfo: '[USER] SET USER INFO',
  updateUserInfo: '[USER] UPDATE USER INFO',
  getUserCourses: '[USER] GET COURSES FOR CURRENT USER'
};

export const { setUserInfo, updateUserInfo, getUserCourses } = actionTypes;

const getters = {
  userInfo: state => state.userInfo,
  userCourses: state => state.userCourses
};

const actions = {
  async [setUserInfo]({ commit }) {
    const userId = JSON.parse(localStorage.getItem('userInfo'))._id;

    if (userId) {
      const { data } = await http.get(userId);
      commit(setUserInfo, data);
    }
  },
  async [updateUserInfo]({ commit }, payload) {
    const userId = JSON.parse(localStorage.getItem('userInfo'))._id;

    const { data } = await http.put(userId, payload);
    commit(setUserInfo, data);
    toastSuccess('Successfully update user info!');
  },
  async [getUserCourses]({ commit }) {
    const userId = JSON.parse(localStorage.getItem('userInfo'))._id;

    const { data } = await http.get(
      `courses/?query={"_acl.creator":"${userId}"}`
    );
    commit(getUserCourses, data);
  }
};

const mutations = {
  [setUserInfo](state, payload) {
    Object.assign(state, { userInfo: payload });
  },
  [getUserCourses](state, payload) {
    Object.assign(state, { userCourses: payload });
  }
};

export default {
  state: initialState,
  getters,
  actions,
  mutations
};
