import apiService from "../../apiService.js";

export const userApi = {
    current: {
        get: () => apiService.get('/user/current'),
    },
    changeInfo: (userId, userInfo) => apiService.patch(`/user/${userId}/`, userInfo),
}
