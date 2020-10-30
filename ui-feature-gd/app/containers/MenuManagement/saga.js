// import { take, call, put, select } from 'redux-saga/effects';
import { take, call, put, select,takeLatest } from 'redux-saga/effects';
import {
  tableDataRequest,
  menuViewList,
  menuViewListSuccess,
  menuViewListError,
  roleList,
  roleListSuccess,
  roleListError,
  rolegroupList,
  rolegroupListSuccess,
  rolegroupListError
} from './actions';
import {
  TABLE_DATA_REQUEST,
  TABLE_DATA_RESPONSE,
  MENUVIEW_LIST,
  MENUVIEW_LIST_SUCCESS,
  MENUVIEW_LIST_ERROR,
  ROLE_LIST,
  ROLE_LIST_SUCCESS,
  ROLE_LIST_ERROR,
  ROLEGROUP_LIST,
  ROLEGROUP_LIST_SUCCESS,
  ROLEGROUP_LIST_ERROR
} from './constants';
import request from 'utils/request';
import axios from 'axios';
import http from '../../services/http';
import{MENU_VIEW_LIST_URL,ROLE_LIST_URL,ROLEGROUP_LIST_URL} from '../../services/authService';

export default function* menuManagementSaga() {
  yield takeLatest(TABLE_DATA_REQUEST,postTableData);
  yield takeLatest(MENUVIEW_LIST,getMenuViewlist);
  yield takeLatest(ROLE_LIST,getRolelist);
  yield takeLatest(ROLEGROUP_LIST,getRolegrouplist);

}

export function* postTableData(action){
  console.log('Action params of Table Data Request:',action.params);
  
}

export function* getMenuViewlist(){
  console.log("saga getMenuViewlist")
  
  try {
    const menulist = yield call(http.post, MENU_VIEW_LIST_URL);
    yield put(menuViewListSuccess(menulist.data));
  } catch (err) {
    yield put(menuViewListError(err));
  }

}

export function* getRolelist(){
  console.log("saga getRolelist")
  
  try {
    const rolelist = yield call(http.post, ROLE_LIST_URL);
    yield put(roleListSuccess(rolelist.data));
  } catch (err) {
    yield put(roleListError(err));
  }

}

export function* getRolegrouplist(){
  console.log("saga getRolegrouplist")
  
  try {
    // Call our request helper (see 'utils/request')
    const rolegrouplist = yield call(http.post, ROLEGROUP_LIST_URL);
    yield put(rolegroupListSuccess(rolegrouplist.data));
  } catch (err) {
    yield put(rolegroupListError(err));
  }

}