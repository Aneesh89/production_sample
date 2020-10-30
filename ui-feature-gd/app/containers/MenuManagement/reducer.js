/*
 *
 * MenuManagement reducer
 *
 */
import produce from 'immer';
import { 
  DEFAULT_ACTION,  
  TABLE_DATA_REQUEST,
  TABLE_DATA_RESPONSE,
  MENUVIEW_LIST,
  MENUVIEW_LIST_SUCCESS,
  MENUVIEW_LIST_ERROR,
  ROLE_LIST,
  ROLE_LIST_SUCCESS,
  ROLE_LIST_ERROR,
  ROLEGROUP_LIST,
  ROLEGROUP_LIST_SUCCESS,
  ROLEGROUP_LIST_ERROR
 } from './constants';

export const initialState = {
  results:[],
  menuViewList:[],
  isLoadingMenuViewlist:false,
  isErrorMenuViewlist:false,
  roleList:[],
  isLoadingRolelist:false,
  isErrorRolelist:false,
  rolegroupList:[],
  isLoadingRolegrouplist:false,
  isErrorRolegrouplist:false
};


const menuManagementReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {     
      case TABLE_DATA_RESPONSE:
        draft.results=action.results;
//reducer for FlatNav API
      case MENUVIEW_LIST:
        console.log('reducer MENUVIEW_LIST');
        
        draft.isLoadingMenuViewlist=true;
        draft.isErrorMenuViewlist=false;
        break;
      case MENUVIEW_LIST_SUCCESS:
        console.log('reducer MENUVIEW_LIST_SUCCESS:',action.menuViewList);
        draft.menuViewList=action.menuViewList;
        draft.isLoadingMenuViewlist=false;
        draft.isErrorMenuViewlist=false;
        break;
      case MENUVIEW_LIST_ERROR:
        draft.isLoadingMenuViewlist=false;
        draft.isErrorMenuViewlist=true;
        break;   
//reducer for Role API
      case ROLE_LIST:
        console.log('reducer ROLE_LIST');
        
        draft.isLoadingRolelist=true;
        draft.isErrorRolelist=false;
        break;
      case ROLE_LIST_SUCCESS:
        console.log('reducer ROLE_LIST_SUCCESS:',action.roleList);
        draft.roleList=action.roleList;
        draft.isLoadingRolelist=false;
        draft.isErrorRolelist=false;
        break;
      case ROLE_LIST_ERROR:
        draft.isLoadingRolelist=false;
        draft.isErrorRolelist=true;
        break;     

//reducer for Rolegroup API
      case ROLEGROUP_LIST:
        console.log('reducer ROLEGROUP_LIST');
        
        draft.isLoadingRolegrouplist=true;
        draft.isErrorRolegrouplist=false;
        break;
      case ROLEGROUP_LIST_SUCCESS:
        console.log('reducer ROLEGROUP_LIST_SUCCESS:',action.rolegroupList);
        draft.rolegroupList=action.rolegroupList;
        draft.isLoadingRolegrouplist=false;
        draft.isErrorRolegrouplist=false;
        break;
      case ROLEGROUP_LIST_ERROR:
        draft.isLoadingRolegrouplist=false;
        draft.isErrorRolegrouplist=true;
        break;     
      case DEFAULT_ACTION:
        break;
    }
  });

export default menuManagementReducer;
