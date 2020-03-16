import { setSnackbarSuccess } from '../../shared/+store/snackbar-state';
const initialState = {
  isAuth: localStorage.getItem('authtoken') !== null,
  authtoken: localStorage.getItem('authtoken'),
  userInfo: null
};

const actionTypes = {
  loginSuccess: '[AUTH] LOGIN SUCCESS',
  registerSuccess: '[AUTH] REGISTER SUCCESS',
  logoutSuccess: '[AUTH] LOGOUT SUCCESS'
};

export const { loginSuccess, logoutSuccess, registerSuccess } = actionTypes;

const getters = {
  authtoken: state => state.authtoken,
  isAuth: state => state.isAuth
};

const actions = {
  async [loginSuccess]({ commit, dispatch }, payload) {
    const  data  = payload;
    localStorage.setItem('authtoken', data._kmd.authtoken);
    dispatch(setSnackbarSuccess, {
      message: 'Successfully Logged!'
    });
    commit(loginSuccess, {
      userInfo: data,
      authtoken: data._kmd.authtoken,
      isAuth: true
    });
  },
  async [logoutSuccess]({ commit, dispatch }) {
    localStorage.clear();
    dispatch(setSnackbarSuccess, {
      message: 'Successfully Logout!'
    });
    commit(logoutSuccess);
  }
};

const mutations = {
  [loginSuccess](state, payload) {
    Object.assign(state, payload);
  },
  [logoutSuccess](state) {
    Object.assign(state, { isAuth: false, authtoken: null, userInfo: null });
  }
};

export default {
  state: initialState,
  getters,
  actions,
  mutations
};
