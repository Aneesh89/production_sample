/*
 *
 * Fir reducer
 *
 */
import produce from 'immer';
import { 
  DEFAULT_ACTION,
  AGE_UP,
  AGE_DOWN,
  AGE_UP_ASYNC,
  AGE_DOWN_ASYNC,
  FETCH_TAB,
  FETCH_TAB_ASYNC
} from './constants';

export const initialState = {
  age: 20,
  uI:[],
  lastActiveTab:''
};
/* eslint-disable default-case, no-param-reassign */
const firReducer = (state = initialState, action) =>
  produce(state, draft => {
    // const newState = { ...state };
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case AGE_UP_ASYNC:
        draft.age += action.value;
        break;
      case AGE_DOWN_ASYNC:
        draft.age -= action.value;
        break;
      case FETCH_TAB_ASYNC:
        draft.uI = action.data[0].uI;
        draft.lastActiveTab = action.data[0].lastActiveTab;
        // console.log(draft.uI[0].currentTab);
        // console.log(action.data[0].currentTab);
        break;
    }
    //  return newState;
  });

export default firReducer;
