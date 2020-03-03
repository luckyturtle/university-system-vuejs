// import axios from 'axios'

// const baseUrl = 'https://baas.kinvey.com';
// const appKey = 'kid_BkLVMjt4U';
// const appSecret = 'e3622f177f85429b86921b036f43a8a4';

// export const user = axios.create({
//     baseURL: `${baseUrl}/user/${appKey}`,
//     headers: { 'Content-Type': 'application/json', Authorization: 'Basic ' + btoa(`${appKey}:${appSecret}`) }
// });

// export function appdata(token) {
//     return axios.create({
//         baseURL: `${baseUrl}/appdata/${appKey}`,
//         headers: { 'Content-Type': 'application/json', Authorization: 'Kinvey ' + token }
//     });
// }



// function makeAuth(type) {
//     return type === 'Basic'
//         ? 'Basic ' + btoa(`${appKey}:${appSecret}`)
//         : 'Kinvey ' + sessionStorage.getItem('authtoken');
// }

// function makeHeaders(type) {
//     const headers = {
//         method,
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: makeAuth(type),
//         },
//     };
//     return headers;
// }

// Interceptors
// You can intercept requests or responses before they are handled by then or catch.

// // Add a request interceptor
// axios.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     return config;
//   }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   });

// // Add a response interceptor
// axios.interceptors.response.use(function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
//   }, function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
//   });
// If you need to remove an interceptor later you can.

// const myInterceptor = axios.interceptors.request.use(function () {/*...*/});
// axios.interceptors.request.eject(myInterceptor);
// You can add interceptors to a custom instance of axios.

// const instance = axios.create();
// instance.interceptors.request.use(function () {/*...*/});
// Handling Errors
// axios.get('/user/12345')
//   .catch(function (error) {
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       // that falls out of the range of 2xx
//       console.log(error.response.data);
//       console.log(error.response.status);
//       console.log(error.response.headers);
//     } else if (error.request) {
//       // The request was made but no response was received
//       // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//       // http.ClientRequest in node.js
//       console.log(error.request);
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.log('Error', error.message);
//     }
//     console.log(error.config);
//   });