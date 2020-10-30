import { call, put, select, takeLatest } from 'redux-saga/effects';
import http from '../../services/http';
import { FETCH_USER_URL } from '../../services/authService';
import { FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from './constants';
import { fetchUserSuccess, fetchUserFailure } from './actions';

import { GET_MENU } from '../Layout/Api';
import {
  FETCH_MENU
} from '../Layout/constants';
import { fetchMenuSuccess, fetchMenuFailure } from '../Layout/actions';

export function* getUser() {
  console.log("SAGA")

  try {
    // Call our request helper (see 'utils/request')
    const user = yield call(http.post, FETCH_USER_URL);
    yield put(fetchUserSuccess(user.data));
  } catch (err) {
    yield put(fetchUserFailure(err));
  }


}

// Individual exports for testing
export default function* appSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(FETCH_USER, getUser);
  //yield takeLatest(FETCH_MENU, getMenu);
}