/**
 *
 * Session handler for redux;
 *
 */
import{store} from '../../utils/store';
import {setSession,fetchUserSuccess } from './actions';
export function removeSession (){
  const state = store.getState();
  store.dispatch(setSession(false));
  console.log("STORE",state.app);
}

export function newSession (res){
  const state = store.getState();
  store.dispatch(setSession(true));
  store.dispatch(fetchUserSuccess(res.user));  
  //console.log("STORE",state.app);
}


