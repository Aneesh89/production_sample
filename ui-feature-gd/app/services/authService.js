//Authentication Services
//import {confiurestore} from '../../app/app';

import request from './axiosApi';
import BrowserStorage from './storage';
import { API } from './constants';
import http from './http';
import { removeSession, newSession } from '../containers/App/SessionHandler';
import { loginApi, userApi } from './constants';




const CHECK_LOGIN = loginApi + 'login';
const CHECK_RELOGIN = loginApi + 'relogin';
const LOGOUT = loginApi + 'logout';
const USER_LOGOUT = userApi + 'logoutUser';
export const FETCH_USER_URL = userApi + 'getLoggedInUser';
export const MENU_VIEW_LIST_URL = "https://run.mocky.io/v3/23eccf59-e85e-4501-bccb-cddf4cbeaad2";
export const ROLE_LIST_URL = "https://run.mocky.io/v3/e14159f8-b38a-4631-b26a-7f71eef5d52d";
export const ROLEGROUP_LIST_URL = "https://run.mocky.io/v3/8f3fd6c5-5ae5-4a5f-a6ca-675f9e418a7d";
//const USER_LOGOUT = "http://localhost:3000/cctns/user/logoutUser";

class AuthService {
    constructor() {
        BrowserStorage.initializeStorage();
    }

    async login(val) {
        return await request({
            url: CHECK_LOGIN,
            method: 'POST',
            data: val
        });

    }
    async relogin(val) {
        return await request({
            url: CHECK_RELOGIN,
            method: 'POST',
            data: val
        });

    }

    startSession(res) {

        BrowserStorage.setItem('a', res.keycloakToken.access_token);
        BrowserStorage.setItem('r', res.keycloakToken.refresh_token);
        BrowserStorage.setItem('e', res.keycloakToken.expires_in);
        BrowserStorage.setItem('user', JSON.stringify(res.user));

        newSession(res);

        //BrowserStorage.setLocalSession('token', res.keycloakToken.a);
    }


    getAccessToken() {
        return BrowserStorage.getItem('a');
    }
    getToken() {
        return BrowserStorage.getItem('token');
    }
    getUser() {
        return BrowserStorage.getItem('user');
    }

    //Checking another active tab with same session. To avoid multiple sessions in same browser.
    checkTab() {
        //alert(BrowserStorage.getLocalSession('token'));
        if (BrowserStorage.getLocalSession('a') != null) {
            try {
                return (BrowserStorage.getLocalSession('a') === BrowserStorage.getItem('a'));
                    
            } catch (e) {
                return false;
            }
        } else {
            return true;
        }
    }


    isLoggedIn() {

        return (BrowserStorage.getItem('user') != null) ;

    }

    isLogin() {

        return (BrowserStorage.getItem('r') && this.checkRemoteSession());
           

    }

    async checkRemoteSession() {

        try {
            const res = await http.post(FETCH_USER_URL);
            if (res) {
                newSession(res);
                return true;
            } else {

                return false;
            }
        }
        catch (error) {
            return false;
        }
    }

    async logout(token, username) {
        return await request({
            url: LOGOUT,
            method: 'POST',
            data: {
                username: username,
                token: token
            }
        });
    }

    async userLogout() {
        try {
            const res = await http.post(USER_LOGOUT);

            BrowserStorage.clearAll();
            return res;
        }
        catch (error) {
            BrowserStorage.clearAll();
            return error;
        }

    }

    clearStorage() {
        BrowserStorage.clearAll();
    }

    setLocalUnit(unit) {
        BrowserStorage.setItem('u', JSON.stringify(unit));
    }

    getUnit() {
        return BrowserStorage.getItem('u');
    }

    getUser() {
        return BrowserStorage.getItem('user');
    }
}

export default AuthService = new AuthService;