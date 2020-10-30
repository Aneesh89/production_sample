/*
 *
 * GeneralDiary actions
 *
 */

import { DEFAULT_ACTION,SET_ACTSECTION,SET_COMMENTS_COUNT,SET_RELOAD_GDLIST} from './constants';
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export const setActSection = (actsections) => ({
  type: SET_ACTSECTION,
  actsections
});

export const setCommentsCount = (commentsCount) => ({
  type: SET_COMMENTS_COUNT,
  commentsCount
});

export const setReloadGDList = (reloadGDList) => ({
  type: SET_RELOAD_GDLIST,
  reloadGDList
});

