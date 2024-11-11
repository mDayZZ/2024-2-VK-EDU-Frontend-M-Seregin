import TokenService from "./tokenService.js";
import {routes} from "../utils/routes.js";

const API_URL = import.meta.env.VITE_API_URL;

class ApiService {
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.headers = {
            'Content-Type': 'application/json',
        };
    }

    async setAuthorizationHeader() {
        let accessToken = TokenService.getAccessToken();

        if (!accessToken || TokenService.isTokenExpired(accessToken)) {
            accessToken = await TokenService.refreshAccessToken(this);
        }
        if (!accessToken) {
            delete this.headers['Authorization'];
            return;
        }

        this.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    async request(url, options = {}) {
        await this.setAuthorizationHeader();

        const headers = {
            ...this.headers,
            ...options.headers,
        };

        const response = await fetch(`${this.baseURL}${url}`, {...options, headers });

        if (response.status === 401) {
            console.log('401 я база ответьте')
            const accessToken = await TokenService.refreshAccessToken(this);
            if (accessToken) {
                return this.request(url, options);
            }
            const errorResponse = await response.json();
            const error = new Error('Unauthorized');
            error.response = errorResponse;
            throw error;
        }

        if (!response.ok) {
            const errorResponse = await response.json();
            const error = new Error(`HTTP error. status ${response.status}`);
            error.response = errorResponse;
            throw error;
        }

        return response.json();
    }

    async get(url, params, options = {}) {
        const queryString = new URLSearchParams(params).toString();
        let resultUrl
        if (queryString) {
            resultUrl = `${url}?${queryString}`;
        }
        else {
            resultUrl = `${url}`;
        }

        return this.request(resultUrl, {method: 'GET', ...options});
    }

    async post(url, body, options = {}) {
        return this.request(url, {method: 'POST', body: JSON.stringify(body), ...options});
    }

    async logout() {
        TokenService.clearTokens();
    }

}

export default new ApiService( API_URL || '/api');
