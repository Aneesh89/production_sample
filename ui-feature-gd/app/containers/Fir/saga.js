import { call, put, select, takeLatest,takeEvery,all,takeLeading } from 'redux-saga/effects';
import { 
  DEFAULT_ACTION,
  AGE_UP,
  AGE_DOWN,
  AGE_UP_ASYNC,
  AGE_DOWN_ASYNC,
  FETCH_TAB,
  FETCH_TAB_ASYNC
} from './constants';
import { FirIconsJson } from '../Fir/AddFir/firicon_json';
import { delay } from 'redux-saga';
import http from '../../services/http';
const API_URL_Test="https://run.mocky.io/v3/00a9f9c5-1b0b-43a9-b75e-404f1b36b75f";
const API_URL_TAB="https://run.mocky.io/v3/5360d1ca-908e-43d2-b049-7fec615cf1c5";
const API_URL_T="https://restcountries.eu/rest/v2/all";
// Individual exports for testing




function* ageUpAsync() {
  // 
  // yield delay(4000);
  yield put({ type: AGE_UP_ASYNC, value: 1 });
  console.log("hyy up");
}
function* ageDownAsync() {
  // 
  //  yield delay(4000);
  yield put({ type: AGE_DOWN_ASYNC, value: 1 });
  console.log("hyy down");
}
// export function* watchAgeUp() {
//   yield takeLatest("AGE_UP", ageUpAsync);
// }
///watcher function
function* fetchTab() //watchIncrementAsync
{
  yield takeLeading(FETCH_TAB,fetchTabAsync)
}
function* fetchTabAsync() {
  // 
  //  yield delay(4000);
  // yield put({ type: FETCH_TAB_ASYNC, value: 1 });
  // console.log("hyy tab async");
  const response = yield fetch(API_URL_Test);
  const data = yield response.json();
  // console.log(data);
  yield put({ type: FETCH_TAB_ASYNC, data: data});
}

export default function* firSaga() {
  // See example in containers/HomePage/saga.js
  console.log("firSaga ");
  yield takeEvery(AGE_UP, ageUpAsync);
  yield takeEvery(AGE_DOWN, ageDownAsync);
  yield all([fetchTab()]);
  // yield all([
  //   //watchIncrementAsync
  //   watchAgeUp()
  // ])
}
