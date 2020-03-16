import axios from 'axios';
import store from '../../app-state';
import { setSnackbarError } from '../+store/snackbar-state';

const baseUrl = 'https://baas.kinvey.com';
const appKey = 'kid_BkLVMjt4U';
const appSecret = 'e3622f177f85429b86921b036f43a8a4';

const config = {
  baseURL: baseUrl
};

const http = axios.create(config);

const authInterceptor = function(config) {
  if (
    (config.url === 'login' || config.url === '') &&
    config.method === 'post'
  ) {
    config.baseURL = `${baseUrl}/user/${appKey}`;
    config.headers = {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(`${appKey}:${appSecret}`)
    };
  } else {
    const token = store.getters.authtoken;
    config.baseURL = `${baseUrl}/appdata/${appKey}`;
    config.headers = {
      'Content-Type': 'application/json',
      Authorization: 'Kinvey ' + token
    };
  }
  return config;
};

const loggerInterceptor = config => {
  /** Add logging here */
  return config;
};

/** Adding the request interceptors */
http.interceptors.request.use(authInterceptor);
http.interceptors.request.use(loggerInterceptor);

/** Adding the response interceptors */
http.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      store.dispatch(setSnackbarError, {
        message: `${error.response.statusText}: ${error.response.data.description}`
      });
    } else {
      store.dispatch(setSnackbarError, {
        message: `${error.response.statusText}`
      });
    }

    return Promise.reject(error);
  }
);

export { http };
