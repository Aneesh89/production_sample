/*
 *
 * Login reducer
 *
 */
import produce from 'immer';
import {
  SET_LOGGED_OUT,
  SET_SESSION
} from './constants';

export const initialState = {
  logged_out: true,
  session: false

};

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_LOGGED_OUT:
        draft.logged_out = action.LoggedOut
        break;
      case SET_SESSION:
        draft.session = action.Session
        break;
    }
  })

export default loginReducer;
