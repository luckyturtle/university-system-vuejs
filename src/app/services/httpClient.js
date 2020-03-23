import axios from 'axios';
// import store from '../../app-state';
// import { setSnackbarError } from '../+store/snackbar-state';
import { cacheAdapterEnhancer } from 'axios-extensions';

import { toastError } from '../utils/toasted';

const baseUrl = 'https://baas.kinvey.com';
const appKey = 'kid_r1iJRsULU';
const appSecret = 'edc60c8e88534c27bba5af3824f3e919';

const cacheConfig = {
  enabledByDefault: false,
  cacheFlag: 'useCache'
};

const config = {
  baseURL: baseUrl,
  headers: {
    'Cache-Control': 'no-cache'
  },
  adapter: cacheAdapterEnhancer(axios.defaults.adapter, cacheConfig)
};

const http = axios.create(config);

const authInterceptor = function(config) {
  if (
    (config.url === 'login' || config.url === '') &&
    config.method === 'post'
  ) {
    config.baseURL = `${baseUrl}/user/${appKey}`;
    config.headers = {
      ...config.headers,
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(`${appKey}:${appSecret}`)
    };
  } else {
    const token = localStorage.getItem('authtoken');
    config.baseURL = `${baseUrl}/appdata/${appKey}`;
    config.headers = {
      ...config.headers,
      'Content-Type': 'application/json',
      Authorization: 'Kinvey ' + token
    };
  }
  return config;
};

const loggerInterceptor = config => {
  return config;
};

// Adding the request interceptors
http.interceptors.request.use(authInterceptor);
http.interceptors.request.use(loggerInterceptor);

// Adding the response interceptors
const errorInterceptor = function(error) {
  if (error.response.status === 401) {
    toastError(
      `${error.response.statusText}: ${error.response.data.description}`
    );
    // store.dispatch(setSnackbarError, {
    //   message: `${error.response.statusText}: ${error.response.data.description}`
    // });
  } else if (error.response.status === 500) {
    toastError(`${error.response.statusText}: Server Error`);
    // store.dispatch(setSnackbarError, {
    //   message: `${error.response.statusText}: Server Error`
    // });
  } else {
    toastError(`${error.response.statusText}`);
    // store.dispatch(setSnackbarError, {
    //   message: `${error.response.statusText}`
    // });
  }

  return Promise.reject(error);
};

const responseInterceptor = function(response) {
  return response;
};

http.interceptors.response.use(responseInterceptor, errorInterceptor);

// http.interceptors.response.use(
//   response => {
//     return response;
//   },
//   error => {
//     if (error.response.status === 401) {
//       store.dispatch(setSnackbarError, {
//         message: `${error.response.statusText}: ${error.response.data.description}`
//       });
//     } else {
//       store.dispatch(setSnackbarError, {
//         message: `${error.response.statusText}`
//       });
//     }

//     return Promise.reject(error);
//   }
// );

export { http };
