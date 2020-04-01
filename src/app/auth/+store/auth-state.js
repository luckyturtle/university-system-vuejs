import { toastSuccess, toastError } from '@/plugins/toasted';
import { http } from '../../services/httpClient';

const initialState = {
  isAuth: localStorage.getItem('authtoken') !== null,
  authtoken: localStorage.getItem('authtoken')
};

export const actionTypes = {
  login: '[AUTH] LOGIN SUCCESS',
  register: '[AUTH] REGISTER SUCCESS',
  logout: '[AUTH] LOGOUT SUCCESS'
};

export const { login, logout, register } = actionTypes;

const getters = {
  authtoken: state => state.authtoken,
  isAuth: state => state.isAuth
};

const actions = {
  async [login]({ commit }, payload) {
    try {
      const { username, password } = payload;
      const { data } = await http.post('login', { username, password });
      localStorage.setItem('authtoken', data._kmd.authtoken);
      localStorage.setItem('userInfo', JSON.stringify(data));
      toastSuccess('Successfully Logged!');
      commit(login, {
        userInfo: data,
        authtoken: data._kmd.authtoken,
        isAuth: true
      });
    } catch (err) {
      toastError(`Something went wrong! ${err}`);
    }
  },
  [logout]({ commit }) {
    localStorage.clear();
    toastSuccess('Successfully Logout!');
    commit(logout);
  },
  async [register](_, payload) {
    try {
      await http.post('', payload);
      toastSuccess('Successfully Registered!');
    } catch (err) {
      toastError(`Something went wrong! ${err}`);
    }
  }
};

const mutations = {
  [login](state, payload) {
    Object.assign(state, payload);
  },
  [logout](state) {
    Object.assign(state, { isAuth: false, authtoken: null, userInfo: null });
  }
};

export default {
  state: initialState,
  getters,
  actions,
  mutations
};
