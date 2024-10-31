import {
    mockedGetChatInfoByChatId,
    mockedGetChatsByUserId, mockedGetMembersByChatId,
    mockedGetMessagesByChatId,
    mockedGetUserById, mockedSendMessage
} from "../mock/mockApiHandlers.js";
import {getUniqueId} from "../utils/idGenerator.js";


export const getChatsByUserId = async (userId) => {
    try {
        if (import.meta.env.VITE_USE_MOCKS === 'true') {
            let loadedChats = null;

            if (!loadedChats) {
                loadedChats = await mockedGetChatsByUserId(userId);
            }
            return loadedChats
        }
    } catch (error) {
        throw error;
    }
}

export const getMessagesByChatId = async (chatId) => {
    try {
        if (import.meta.env.VITE_USE_MOCKS === 'true') {
            let loadedMessages = null;

            if (!loadedMessages) {
                loadedMessages = await mockedGetMessagesByChatId(chatId);

            }

            return loadedMessages;
        }
    } catch (error) {
        throw error;
    }
}

export const getChatInfoByChatId = async (chatId, userId) => {
    try {
        if (import.meta.env.VITE_USE_MOCKS === 'true') {
            const data = mockedGetChatInfoByChatId(chatId);
            return await data;
        }
    } catch (error) {
        throw error;
    }
}


export const getMembersByChatId = async (chatId) => {
    try {
        if (import.meta.env.VITE_USE_MOCKS === 'true') {
            const data = await mockedGetMembersByChatId(chatId);
            return await data;
        }
    } catch (error) {
        throw error;
    }
}


export const sendMessage = async (chatId, senderId, content) => {
    try {
        const messageId = getUniqueId();
        const message = {id: messageId,chat_id: chatId,sender_id: senderId, content: content, created_at: new Date().toISOString()};
        if (import.meta.env.VITE_USE_MOCKS === 'true') {
            const response = await mockedSendMessage(message);
            if (!response.success) {
                throw new Error('Ошибка отправки сообщения');
            }
            return response.data;
        }
    } catch (error) {
        throw error;
    }
}