import apiService from "../../apiService.js";

export const usersApi = {
    get: (params) => apiService.get(`/users`, params),
}