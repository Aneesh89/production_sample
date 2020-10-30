import axios from 'axios';
import { KC, API } from './constants';
import BrowserStorage from './storage';
import qs from 'qs';
import{store} from '../utils/store';
import {setSession} from '../containers/App/actions';
import { toast } from 'react-toastify';


const http = axios.create({
  //baseURL: API.baseURL,
  //headers: {'Content-Type': 'application/json'},
});

function getAccessToken(){
  //return ls.getItem('a');
  return BrowserStorage.getItem('a');
}

///Add request header using interceptor
http.interceptors.request.use(
  
  function (config) {
    
    BrowserStorage.initializeStorage();
    //const token = store.getItem('a');
    //if (token) config.headers.Authorization = `Bearer ${getAccessToken()}`;
    //(config.headers.Authorization != '')?config.headers.Authorization = '':config.headers.Authorization = '';

    
    config.headers.Authorization = `Bearer ${getAccessToken()}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

///Manage response and renew token if needed 
http.interceptors.response.use((response) => {
  BrowserStorage.initializeStorage();
  return response;
}, function (error) {
  
  const originalRequest = error.config;

  
  if ( (error.response.status === 401 || error.response.status === 400 ) && originalRequest.url === ( API.RENEW_ACCESS_TOKEN)) {
    //router.push('/login');
    const state = store.getState();
    store.dispatch(setSession(false));
    return Promise.reject(error);
  }

  if ((error.response.status === 401 || error.response.status === 400 )  && !originalRequest._retry) {
    
    originalRequest._retry = true;
    const refresh_token = BrowserStorage.getItem('r');

    return axios.post(API.RENEW_ACCESS_TOKEN, qs.stringify({
      client_id: KC.clientId,
      grant_type: "refresh_token",
      refresh_token: refresh_token
    })
      ,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
         // 'Access-Control-Allow-Origin': '*'
        }
      })
      .then(res => {
        if (res.status === 200) {
          BrowserStorage.setItem('r', res.data.refresh_token);
          BrowserStorage.setItem('a', res.data.access_token);
          //axios.defaults.headers.post['Authorization'] = `Bearer ${getAccessToken()}`;
          originalRequest.headers.Authorization=`Bearer ${getAccessToken()}`;
          
          //console.log("ORIGINAL REQUEST",originalRequest);
          return axios(originalRequest);
        }
      }).catch(error => {

        if ( (error.response.status === 401 || error.response.status === 400 )) {
          //router.push('/login');
          const state = store.getState();
          store.dispatch(setSession(false));
          
        }else{
          toast("Unexpected Error",{ position: 'top-center',autoClose: 3000, type: 'error' }); 
        }
         

      })
  }
  return Promise.reject(error);
});

export default http;