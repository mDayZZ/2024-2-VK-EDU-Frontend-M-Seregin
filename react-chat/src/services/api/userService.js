import {axiosInstance} from "./axiosInstance.js";
import apiService from "../apiService.js";

export const userService = {
    getCurrentUser: async() => {
        const { data } = await axiosInstance.get('/user/current/');
        return data;
    },
    changeUserInfo: async (userId, userInfo) => {
        const {data} = await axiosInstance.patch(`/user/${userId}/`, userInfo);
        return data;
    },
    getUsers: async ({search = null, page_size = null, page = null}) => {
        const {data} = await axiosInstance.get('/users/', {
            params: {search, page_size, page}
        })
        return data;
    }
};