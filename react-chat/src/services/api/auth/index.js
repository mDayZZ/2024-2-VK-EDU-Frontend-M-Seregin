import apiService from "../../apiService.js";

export const authApi = {
    auth: (credentials) => apiService.post('/auth/', credentials),
    refresh: (refreshToken) => apiService.post('/auth/refresh', {refreshToken}),
    register: (userCreate) => apiService.post('/register/', userCreate),
}
