import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the generalDiary state domain
 */

const selectGeneralDiaryDomain = state => state.generalDiary || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by GeneralDiary
 */

const makeSelectGeneralDiary = () =>
  createSelector(
    selectGeneralDiaryDomain,
    substate => substate,
  );

  const makeSelectActSection = () =>
  createSelector(
    selectGeneralDiaryDomain,
    substate => substate.actsections,
  );

  const makeSelectCommentsCount = () =>
  createSelector(
    selectGeneralDiaryDomain,
    substate => substate.commentsCount,
  );

  const makeSelectReloadGDList = () =>
  createSelector(
    selectGeneralDiaryDomain,
    substate => substate.reloadGDList,
  );
export default makeSelectGeneralDiary;
export { selectGeneralDiaryDomain,makeSelectActSection,makeSelectCommentsCount,makeSelectReloadGDList };
