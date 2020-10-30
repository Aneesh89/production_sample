/*
 *
 * App reducer
 *
 */
import produce from 'immer';
import AuthService from '../../services/authService'
import {
  SET_SESSION,
  GET_SESSION,
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  SET_USER,
  GET_USER,
  FETCH_UNITS,
  FETCH_UNITS_SUCCESS,
  FETCH_UNITS_FAILURE,
  SET_UNIT,
  GET_UNIT,
  FETCH_MENU,
  FETCH_MENU_SUCCESS,
  FETCH_MENU_FAILURE,
  SET_MENU,
  GET_MENU,
  SET_NXT_PG,
  GET_NXT_PG,
  LOGOUT

} from './constants';

export const initialState = {
  session: true,
  units: {
    loading: false,
    error: false,
    list: false
  },
  unit: {
    unitCd: false,
    unit: false
  },
  user: {
    loading: false,
    error: false,
    data: false
  },
  menu: {
    loading: false,
    error: false,
    list: false
  },
  nxt_pg: false
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_SESSION:
        draft.session = action.session
        break;
      case FETCH_USER:
        draft.user.loading = true;
        draft.user.error = false;
        draft.user.data = false;
        break;
      case FETCH_USER_SUCCESS:
        draft.user.loading = false;
        draft.user.error = false;
        draft.user.data = action.user;
        draft.nxt_pg = action.user.nextPageFlag;
        draft.session = true;
        break;
      case FETCH_USER_FAILURE:
        draft.user.loading = false;
        draft.user.error = action.error;
        break;
      case FETCH_UNITS:
        draft.units.loading = true;
        draft.units.error = false;
        draft.units.list = false;
        break;
      case FETCH_UNITS_SUCCESS:
        draft.units.loading = false;
        draft.units.error = false;
        draft.units.list = action.units;
        break;
      case FETCH_UNITS_FAILURE:
        draft.units.loading = false;
        draft.units.error = action.error;
        break;
      case FETCH_MENU:
        draft.menu.loading = true;
        draft.menu.error = false;
        draft.menu.list = false;
        break;
      case FETCH_MENU_SUCCESS:
        draft.menu.loading = false;
        draft.menu.error = false;
        draft.menu.list = action.menu;
        break;
      case FETCH_MENU_FAILURE:
        draft.menu.loading = false;
        draft.menu.error = action.error;
        break;
      case SET_NXT_PG:
        draft.nxt_pg = action.pg;
        break;
      case SET_UNIT:
        draft.unit.unitCd = action.unit.unitCd;
        draft.unit.unit = action.unit.unit;
        draft.unit.unitType = action.unit.unitType;
        break;

      case LOGOUT:
        return initialState;
        break;
    }
  });

export default appReducer;