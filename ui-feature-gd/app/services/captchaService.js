// Captcha service
import request from './axiosApi';
import axios from 'axios';
import {loginApi} from './constants';

const GET_CAPTCHA= loginApi+'getCaptcha';

function get() {
    return request({
      url:  GET_CAPTCHA,
      method: 'GET'
    });
  }
  
  const captchaService = {
    get
  }


  
  export default captchaService;

