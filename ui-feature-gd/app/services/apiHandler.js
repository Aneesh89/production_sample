//ApiHandler
import BrowserStorage from 'services/storage';
class ApiHandler {
    constructor(apiRoot) {
        this.API_ROOT = apiRoot;
    }

    setApiRoot(apiGateway) {
        if (apiGateway) {
            this.API_ROOT = apiGateway;
        }
    }

    setToken(token) {
        if (token) {
            this.TOKEN = token;
        }
    }

    callLoginApi(endpoint, username, password) {
        const url = this.API_ROOT + endpoint;
        const headers = new Headers();
        const authHeader = btoa(`${username}:${password}`);
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Basic ${authHeader}`);
        const options = {
            method: 'GET',
            headers,
            cache: 'default',
        };
        return fetch(url, options)
            .then(response => {
                return { response };
            }).catch(error => ({ error }));
    }

    setTokenFromSessionStorage() {
        this.TOKEN = BrowserStorage.getItem('appToken');
    }

    callApi(endpoint, method, param, additionalHeaders) {
        const fullUrl = this.API_ROOT + endpoint;
        const token = `Bearer ${this.TOKEN}`;
        const headers = new Headers();
        if (additionalHeaders) {
            Object.keys(additionalHeaders).forEach(key => {
                headers.append(key, additionalHeaders[key]);
            });
        }

        const init = {
            headers,
            cache: 'default',
            credentials: 'include',
            method,
        };

        if (method === 'POST' && param)
            init.body = JSON.stringify(param);
        const request = new Request(fullUrl, init);
        return this.apiFetch(request);
    }

    apiFetch(request) {
        return fetch(request).then(function (response) {
            switch (response.headers.get('content-type')) {
                case 'application/json': default:
                    return response.json().
                        then(reply => ({
                            reply, response
                        }));
                case 'application/vnd.ms-excel': return response.blob().
                    then(reply => ({
                        reply, response
                    }));
            }
        }).then(({ reply, response }) => {
            if (response.status === 401 && this.tokenExpired(reply)) {
                if (confirm(tokenInvalidMessage)) {
                    BrowserStorage.clear();
                    window.location.reload();
                }
            }
            else if (response.status === 204) {
                reply = { status: ' success' };
            }
            else if (!response.ok) {
                if (reply.errors) {
                    return Promise.reject(reply);
                }
                return Promise.reject(response);
            }
            return { reply, response };
        })
            .then(({ reply, response }) => ({
                reply, response,
            }),
                error => this.getError(error),
            );
    }

    getError(error) {
        let apiError = { error: '' };
        if (error.message) {
            apiError.error = error.message;
        }
        return apiError;
    }

    fetchToken(endpoint) {
        const fullUrl = this.API_ROOT + endpoint;
        const headers = new Headers();
        const options = { method: 'GET', headers, cache: 'default' };
        let token;
        let apiResponse;
        return fetch(fullUrl, options)
            .then(response => {
                apiResponse = response;
                token = response.headers.get('token');
                if (token) {
                    this.TOKEN = token;
                    return response.json();
                } else return Promise.reject(error);
            },
                error => Promise.reject(error),
            ).then(json => ({ reply: json, token: token, response: apiResponse }),
                error => ({ error }),
            );
    }

    scheduleTokenRefresh(refreshToken, nextRefreshTime, interval) {
        clearTimeout(this._tokenRefreshInterval);
        !interval && (interval = nextRefreshTime);
        this._tokenRefreshInterval = setTimeout(() => {
            refreshTokenCall()
                .then(newToken => {
                    this.setToken(newToken);
                    BrowserStorage.setItem('appToken', newToken);
                    BrowserStorage.setItem('next_refresh_time', moment().add(interval, 'ms').toDate().toUTCString());
                    this.scheduleTokenRefresh(refreshToken, interval);
                }).catch(error => { clearTimeout(this._tokenRefreshInterval); });
        }, nextRefreshTime);
    }

    clearIntervals() {
        clearTimeout(this._tokenRefreshInterval);
    }

}

export const APIWrapper = new ApiHandler('<apiURL>');
