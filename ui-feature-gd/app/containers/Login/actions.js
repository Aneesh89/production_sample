/*
 *
 * Login actions
 *
 */

import { 
  SET_LOGGED_OUT,
  SET_SESSION
 } from './constants';



export const setLoggedOut = LoggedOut => ({
  type: SET_LOGGED_OUT,
  LoggedOut
});

export const setSessionTimedOut = SessionTimedOut => ({
  type: SET_SESSION,
  SessionTimedOut
});
