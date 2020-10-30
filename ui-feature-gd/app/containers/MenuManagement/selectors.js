import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the menuManagement state domain
 */

const selectMenuManagementDomain = state =>
  state.menuManagement || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MenuManagement
 */

const makeSelectMenuManagement = () =>
  createSelector(
    selectMenuManagementDomain,
    substate => substate,
  );
  
const makeTableDataselector = () =>
  createSelector(
    selectMenuManagementDomain,
    substate => substate.results,
  );
//selector for menu view API
const makeMenuViewlistselector = () =>
  createSelector(
    selectMenuManagementDomain,
    substate => substate.menuViewList,
  );

//selector for Role API
const makeRolelistselector = () =>
createSelector(
  selectMenuManagementDomain,
  substate => substate.roleList,
);

//selector for Rolegroup API
const makeRolegrouplistselector = () =>
createSelector(
  selectMenuManagementDomain,
  substate => substate.rolegroupList,
);

export default makeSelectMenuManagement;
export { selectMenuManagementDomain,makeTableDataselector,makeMenuViewlistselector,makeRolelistselector,makeRolegrouplistselector };
