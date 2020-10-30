import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the layout state domain
 */

const selectLayoutDomain = state => state.layout || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Layout
 */

const makeSelectLayout = () =>
  createSelector(
    selectLayoutDomain,
    substate => substate,
  );

const makeSelectColorScheme = () =>
  createSelector(
    selectLayoutDomain,
    substate => substate.colorScheme,
  );

const makeSelectEnableFixedHeader = () =>
  createSelector(
    selectLayoutDomain,
    substate => substate.enableFixedHeader,
  );

const makeSelectEnableMobileMenu = () =>
  createSelector(
    selectLayoutDomain,
    substate => substate.enableMobileMenu,
  );

const makeSelectEnableFixedFooter = () =>
  createSelector(
    selectLayoutDomain,
    substate => substate.enableFixedFooter,
  );
const makeSelectEnableFixedSidebar = () =>
  createSelector(
    selectLayoutDomain,
    substate => substate.enableFixedSidebar,
  );

const makeSelectEnableClosedSidebar = () =>
  createSelector(
    selectLayoutDomain,
    substate => substate.enableClosedSidebar,
  );

const makeSelectEnablePageTabsAlt = () =>
  createSelector(
    selectLayoutDomain,
    substate => substate.enablePageTabsAlt,
  );



export {
  selectLayoutDomain,
  makeSelectLayout,
  makeSelectColorScheme,
  makeSelectEnableFixedHeader,
  makeSelectEnableMobileMenu,
  makeSelectEnableFixedFooter,
  makeSelectEnableFixedSidebar,
  makeSelectEnableClosedSidebar,
  makeSelectEnablePageTabsAlt
};
