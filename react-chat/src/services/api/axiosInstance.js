import {tokenService} from "../tokenService.js";

export const API_URL = import.meta.env.VITE_API_URL;

import axios from "axios";
import {authService} from "./authService.js";

export const axiosInstance = axios.create({
    baseURL: API_URL || '/api',
    timeout: 10000,
});

axiosInstance.interceptors.request.use(config => {
    config.headers.Authorization = tokenService.getAuthorizationHeader();
    return config;
}, error => Promise.reject(error));

axiosInstance.interceptors.response.use(response => response, async error => {
    const responseConfig = error.config;
    if (error.response?.status === 401 && !responseConfig._retry && !responseConfig.url.includes('/auth/') ) {
        error.config._retry = true;

        try {
            await authService.refreshToken();
            responseConfig.headers.Authorization = tokenService.getAuthorizationHeader();
            return axiosInstance(responseConfig);
        } catch (refreshError) {
            authService.logout();
            return Promise.reject(refreshError);
        }
    }
    return Promise.reject(error)
})