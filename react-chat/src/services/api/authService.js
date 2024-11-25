import {axiosInstance} from "./axiosInstance.js";
import {tokenService as TokenService, tokenService} from "../tokenService.js";

export const authService = {
    register: async(formData) => {
        const {data} = await axiosInstance.post('/register/', formData);
        return data;
    },
    login: async (formData) => {
        const {data} = await axiosInstance.post('/auth/', formData);
        tokenService.setAccessToken(data.access);
        tokenService.setRefreshToken(data.refresh);
        return data;
    },
    refreshToken: async() => {
        const refreshToken = TokenService.getRefreshToken();
        const {data} = await axiosInstance.post('/auth/refresh/', {refresh: refreshToken});
        tokenService.setAccessToken(data.access);
        tokenService.setRefreshToken(data.refresh);
    },
    logout: () => {
        tokenService.clearTokens();
    }
}