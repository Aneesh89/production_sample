import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the fir state domain
 */

const selectFirDomain = state => state.fir || initialState;
/**
 * Other specific selectors
 */

/**
 * Default selector used by Fir
 */

const makeSelectFir = () =>
  createSelector(
    selectFirDomain,
    substate => substate,
  );


export default makeSelectFir;
export { selectFirDomain };
