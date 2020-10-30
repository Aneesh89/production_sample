//import {CONFIG} from '../app';
const CONFIG = process.env.CONFIG;
export const KC = CONFIG.KC;
export const BASE_URL = CONFIG.HTTP + '://' + CONFIG.BASE_URL;


//Service Endpoints
export const loginApi = BASE_URL + ':' + CONFIG.LOGIN.PORT + '/' + CONFIG.BASE_PATH + '/' + CONFIG.LOGIN.CONTEXT_PATH + '/';
export const userApi = BASE_URL + ':' + CONFIG.USER.PORT + '/' + CONFIG.BASE_PATH + '/' + CONFIG.USER.CONTEXT_PATH + '/';
export const adminApi = BASE_URL + ':' + CONFIG.ADMIN.PORT + '/' + CONFIG.BASE_PATH + '/' + CONFIG.ADMIN.CONTEXT_PATH + '/';
export const gdApi = BASE_URL + ':' + CONFIG.GD.PORT + '/' + CONFIG.BASE_PATH + '/' + CONFIG.GD.CONTEXT_PATH + '/';
export const firApi = BASE_URL + ':' + CONFIG.FIR.PORT + '/' + CONFIG.BASE_PATH + '/' + CONFIG.FIR.CONTEXT_PATH + '/';



//Common endpoints
export const GET_MASTER_DATA = adminApi + 'keyValue';
export const GET_MASTER_DATA_DATE_TIME = adminApi + 'getDateTime';

/*
export const devApi = {
  devHost: '10.5.35.127',
  devHttp: 'http',
};

export const loginApi = {
  loginUrl: `${devApi.devHttp}://${devApi.devHost}:31081/cctns/login/`,
};

export const userApi = {
  userUrl: `${devApi.devHttp}://${devApi.devHost}:31070/cctns/user/`,
};

export const adminApi = {
  adminUrl: `${devApi.devHttp}://${devApi.devHost}:31060/cctns/admin/`,
};
*/
// export const API = {
//   // baseURL:'http://10.64.199.202:9081/cctns/',
//   RENEW_ACCESS_TOKEN: `${CONFIG.HTTP}://${KC.keycloakHost}:${KC.keycloakPort}/auth/realms/${KC.realmName}/protocol/openid-connect/token`,
//   CHECK_USER_INFO: `${CONFIG.HTTP}://${KC.keycloakHost}:${KC.keycloakPort}/auth/realms/${KC.realmName}/protocol/openid-connect/userinfo`,
// };

export const API = {
  // baseURL:'http://10.64.199.202:9081/cctns/',
  RENEW_ACCESS_TOKEN: CONFIG.HTTP + '://' + KC.keycloakHost + ':' + KC.keycloakPort + '/auth/realms/' + KC.realmName + '/protocol/openid-connect/token',
  CHECK_USER_INFO: CONFIG.HTTP + '://' + KC.keycloakHost + ':' + KC.keycloakPort + '/auth/realms/' + KC.realmName + '/protocol/openid-connect/userinfo',
};



