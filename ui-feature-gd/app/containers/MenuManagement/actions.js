/*
 *
 * MenuManagement actions
 *
 */

import { DEFAULT_ACTION,TABLE_DATA_REQUEST,TABLE_DATA_RESPONSE, MENUVIEW_LIST,
   MENUVIEW_LIST_SUCCESS,MENUVIEW_LIST_ERROR,ROLE_LIST,ROLE_LIST_SUCCESS,ROLE_LIST_ERROR,ROLEGROUP_LIST,
   ROLEGROUP_LIST_SUCCESS,ROLEGROUP_LIST_ERROR } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function tableDataRequest(params) {
  return {
    type: TABLE_DATA_REQUEST,
    params
  };
}
export function tableDataResponse(results) {
  return {
    type: TABLE_DATA_REQUEST,
    results
  };
}

//export function for menu view API
export function menuViewList() {
  return {
    type: MENUVIEW_LIST,
  };
}
export function menuViewListSuccess(menuViewList) {
  return {
    type: MENUVIEW_LIST_SUCCESS,
    menuViewList
  };
}
export function menuViewListError(error) {
  return {
    type: MENUVIEW_LIST_ERROR,
    error
  };
}

//export function for Role API
export function roleList() {
  return {
    type: ROLE_LIST,
  };
}
export function roleListSuccess(roleList) {
  return {
    type: ROLE_LIST_SUCCESS,
    roleList
  };
}
export function roleListError(error) {
  return {
    type: ROLE_LIST_ERROR,
    error
  };
}

//export function for Rolegroup API
export function rolegroupList() {
  return {
    type: ROLEGROUP_LIST,
  };
}
export function rolegroupListSuccess(rolegroupList) {
  return {
    type: ROLEGROUP_LIST_SUCCESS,
    rolegroupList
  };
}
export function rolegroupListError(error) {
  return {
    type: ROLEGROUP_LIST_ERROR,
    error
  };
}