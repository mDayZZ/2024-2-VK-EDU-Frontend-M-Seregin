import { routes } from "../utils/routes.js";
import {tokenService as TokenService} from "./tokenService.js";

export const API_URL = import.meta.env.VITE_API_URL;

class ApiService {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async setAuthorizationHeader() {
        let accessToken = TokenService.getAccessToken();

        if (!accessToken || TokenService.isTokenExpired(accessToken)) {
            accessToken = await TokenService.refreshAccessToken(this);
        }
        if (!accessToken) {
            return null;
        }

        return `Bearer ${accessToken}`;
    }

    async request(url, options = {}) {
        const authorizationHeader = await this.setAuthorizationHeader();

        const headers = {
            ...(authorizationHeader ? { 'Authorization': authorizationHeader } : {}),
            ...options.headers,
        };

        // Если body это FormData, не добавляем Content-Type
        if (!(options.body instanceof FormData)) {
            headers['Content-Type'] = 'application/json';
        }

        const response = await fetch(`${this.baseURL}${url}`, { ...options, headers });

        if (response.status === 401) {
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

        try {
            return await response.json();
        } catch (e) {
            return await response.text(); // В случае ошибки JSON, возвращаем текст
        }
    }

    async get(url, params, options = {}) {
        const queryString = new URLSearchParams(params).toString();
        const resultUrl = queryString ? `${url}?${queryString}` : url;

        return this.request(resultUrl, { method: 'GET', ...options });
    }

    async post(url, body, options = {}) {
        return this.request(url, { method: 'POST', body: JSON.stringify(body), ...options });
    }

    async postFormData(url, body, options = {}) {
        if (!(body instanceof FormData)) {
            throw new Error('Body must be an instance of FormData');
        }

        const headers = { ...options.headers }; // FormData не требует Content-Type
        return this.request(url, { method: 'POST', body, headers, ...options });
    }

    async patch(url, body, options = {}) {
        return this.request(url, { method: 'PATCH', body: JSON.stringify(body), ...options });
    }

    async logout() {
        TokenService.clearTokens();
    }
}

export default new ApiService(API_URL || '/api');
