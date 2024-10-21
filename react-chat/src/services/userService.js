import {mockedGetUserById} from "../mock/mockApiHandlers.js";


export const getUserById = async (userId) => {
    try {
        if (import.meta.env.VITE_USE_MOCKS === 'true') {
            return await mockedGetUserById(userId);
        }
    } catch (error) {
        throw error;
    }
 }