import {mockedChangeUserInfo, mockedGetAllUsers, mockedGetUserById} from "../mock/mockApiHandlers.js";
import {useUserContext} from "../contexts/UserContext.jsx";


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
        const response = await mockedChangeUserInfo(userInfo, userId);
        return response;

    } catch (error) {
        throw error;
    }
 }


 export const getUsers = async () => {
    try {
        const response = await mockedGetAllUsers();
        return response;
    } catch (error) {
        throw error;
    }
 }