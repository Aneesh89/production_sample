import { userApi, adminApi } from 'services/constants';

export const GET_MENU = adminApi + 'getMenu';
export const GET_UNITS = userApi + 'getUnitList';
//export const GET_UNITS = API.baseURL+"http://localhost:5001/user/getUnitList";
export const SET_UNIT = userApi + 'unitSelection';
export const GET_USER = userApi + 'getUser';
export const CHANGE_PASSWORD = userApi + 'changePassword';