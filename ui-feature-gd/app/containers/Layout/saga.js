
import { call, put, select, takeLatest } from 'redux-saga/effects';
import http from '../../services/http';
import { GET_MENU } from './Api';




// Individual exports for testing
export default function* layoutSaga() {
  // See example in containers/HomePage/saga.js
  //yield takeLatest(FETCH_MENU, getMenu);
}
