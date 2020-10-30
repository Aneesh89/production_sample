/*
 *
 * App actions
 *
 */

import {
  SET_SESSION,
  CHECK_LOGIN,
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  FETCH_UNITS,
  FETCH_UNITS_SUCCESS,
  FETCH_UNITS_FAILURE,
  SET_UNIT,
  FETCH_MENU,
  FETCH_MENU_SUCCESS,
  FETCH_MENU_FAILURE,
  SET_MENU,
  SET_NXT_PG,
  LOGOUT,

} from './constants';



export const fetchUser = () => ({
  type: FETCH_USER
});

export const fetchUserSuccess = (user) => ({
  type: FETCH_USER_SUCCESS,
  user
});

export const fetchUserFailure = (error) => ({
  type: FETCH_USER_FAILURE,
  error
});

export const setSession = (session) => ({
  type: SET_SESSION,
  session
});

export const fetchUnits = () => ({
  type: FETCH_UNITS
});

export const fetchUnitsSuccess = (units) => ({
  type: FETCH_UNITS_SUCCESS,
  units
});

export const fetchUnitsFailure = (error) => ({
  type: FETCH_UNITS_FAILURE,
  error
});

export const setUnit = (unit) => ({
  type: SET_UNIT,
  unit
});

export const fetchMenu = () => ({
  type: FETCH_MENU
});

export const fetchMenuSuccess = (menu) => ({
  type: FETCH_MENU_SUCCESS,
  menu
});

export const fetchMenuFailure = (error) => ({
  type: FETCH_MENU_FAILURE,
  error
});


export const setNxtPg = (pg) => ({
  type: SET_NXT_PG,
  pg
});

export const logout = () => ({
  type: LOGOUT
});








