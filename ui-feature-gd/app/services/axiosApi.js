/**
 * Axios Request Wrapper
 * ---------------------
 */

import axios from 'axios';



/**
 * Create an Axios Client with defaults
 * 
 */


//axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';

const client = axios.create({
  //baseURL: API.baseURL
});

//client.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
//client.defaults.headers.common['Access-Control-Request-Headers'] = 'Authorization';
//client.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

// Add a request interceptor
/*
client.interceptors.request.use(
  config => {
    BrowserStorage.initializeStorage();

    const token = BrowserStorage.getItem('access_token');

    if (token) {
      config.headers = { Authorization: `Bearer ${token}` };

      //config.headers['Authorization'] = 'Bearer ' + token;
    }
    // config.headers['Content-Type'] = 'application/json';
    console.log(config);
    return config;
  },
  error => {
    Promise.reject(error)
  });



//Add a response interceptor

client.interceptors.response.use((response) => {
  console.log("axios response", response);
  BrowserStorage.initializeStorage();
  return response
}, function (error) {
  const originalRequest = error.config;

  if (error.response.status === 401 && originalRequest.url === API.RENEW_ACCESS_TOKEN) {
    //router.push('/login');

    alert('session timed out');
    return Promise.reject(error);
  }

  if (error.response.status === 401 && !originalRequest._retry) {
    alert('invalid');
    originalRequest._retry = true;
    const KeycloakToken = BrowserStorage.getItem('token');
    return axios.post(API.RENEW_ACCESS_TOKEN,
      {
        "client_id": KC.clientId,
        "grant_type": "refresh_token",
        "refresh_token": KeycloakToken.refresh_token
      })
      .then(res => {
        if (res.status === 200) {
          BrowserStorage.setItem('token', res.data);
          BrowserStorage.setItem('access_token', res.data.access_token);
          client.defaults.headers.common['Authorization'] = 'Bearer ' + BrowserStorage.getItem('access_token');
          return axios(originalRequest);
        }
      })
  }
  return Promise.reject(error);
});



/**
 * Request Wrapper with default success/error actions
 */

const request = function (options) {

  const onSuccess = function (response) {
    console.debug('Request Successful!', response);
    return response;
  }

  const onError = function (error) {

    console.error('Request Failed:', error.config);
    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
      console.error('Headers:', error.response.headers);
      //return error;

    } else {
      // Something else happened while setting up the request
      // triggered the error
      console.error('Error Message:', error.message);
    }
    return Promise.reject(error.response || error.message);
  }

  return client(options)
    .then(onSuccess)
    .catch(onError);
}


export default request;