import { gdApi,adminApi } from 'services/constants';

export const GET_GD = gdApi + 'getGDList';
export const GET_GD_DETAILS = gdApi + 'getGD';
export const ADD_GD = gdApi + 'addGD';
export const SEARCH_GD = gdApi + 'searchGD';
export const ADD_GD_COMMENTS = gdApi + 'saveGDComments';
export const ENABLE_DISABLE_PRINT = gdApi + 'enableorDiasablePrintButtonList';
export const PRINT_GD = gdApi + 'printGD';
export const PRINT_MULTIPLE_GD = gdApi + 'printGDlist';
export const ASSUME_GD = gdApi + 'assumeCharge';
export const ASSIGN_GD = gdApi + 'districtOfficerAssignOfficerInCharge';
export const GET_CLOSING_GD = gdApi + 'getTodaysClosingGDList';
export const GET_PURTICULAR_OFFICE_GD = gdApi + 'getListofAllGDsofDay';
export const SEARCH_CLOSING_GD = gdApi + 'searchClosingGD';
export const GET_CLOSING_GD_COMMENTS = gdApi + 'getClosingGDComments';
export const ADD_CLOSING_GD_COMMENTS = gdApi + 'submitClosingGDReviewComments';

export const UNIT_HEIRARCHY = adminApi + 'getUnitsUnderHeirarchy';

