import {mockedChangeUserInfo, mockedGetUserById} from "../mock/mockApiHandlers.js";


export const getUserById = async (userId) => {
    try {
        if (import.meta.env.VITE_USE_MOCKS === 'true') {
            return await mockedGetUserById(userId);
        }
    } catch (error) {
        throw error;
    }
 }

 export const changeUserInfo = async (userInfo, userId) => {
    try {
        if (import.meta.env.VITE_USE_MOCKS === 'true') {
            return await mockedChangeUserInfo(userInfo, userId);
        }
        return;

    } catch (error) {
        throw error;
    }
 }