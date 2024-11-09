import apiService from "../../apiService.js";

export const userApi = {
    current: {
        get: () => apiService.get('/user/current')
    }
}
