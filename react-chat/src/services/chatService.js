import {mockedGetChatsByUserId, mockedGetMessagesByChatId, mockedGetUserById} from "../mock/mockApiHandlers.js";

export const getChatsByUserId = async (userId) => {
    try {
        if (import.meta.env.VITE_USE_MOCKS === 'true') {
            return await mockedGetChatsByUserId(userId);
        }
    } catch (error) {
        throw error;
    }
}

export const getMessagesByChatId = async (chatId) => {
    try {
        if (import.meta.env.VITE_USE_MOCKS === 'true') {
            return await mockedGetMessagesByChatId(chatId);
        }
    } catch (error) {
        throw error;
    }
}