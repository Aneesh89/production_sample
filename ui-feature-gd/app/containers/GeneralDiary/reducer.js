/*
 *
 * GeneralDiary reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, SET_ACTSECTION, SET_COMMENTS_COUNT,SET_RELOAD_GDLIST } from './constants';

export const initialState = {
  actsections: [],
  commentsCount: 0,
  reloadGDList: false
};

/* eslint-disable default-case, no-param-reassign */
const generalDiaryReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ACTSECTION:
        draft.actsections = action.actsections;
        break;

      case SET_COMMENTS_COUNT:
        draft.commentsCount = action.commentsCount;
        break;

      case SET_RELOAD_GDLIST:
        draft.reloadGDList = action.reloadGDList;
        break;

      case DEFAULT_ACTION:
        break;
    }
  });

export default generalDiaryReducer;
