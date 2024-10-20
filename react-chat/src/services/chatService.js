import {
    mockedGetChatInfoByChatId,
    mockedGetChatsByUserId, mockedGetMembersByChatId,
    mockedGetMessagesByChatId,
    mockedGetUserById, mockedSendMessage
} from "../mock/mockApiHandlers.js";
import {getUniqueId} from "../utils/idGenerator.js";
import {
    loadChatsFromLocalStorage,
    loadMessagesFromLocalStorage,
    saveChatsToLocalStorage, saveMessagesToLocalStorage, saveMessageToLocalStorage
} from "../utils/localStorage.js";

export const getChatsByUserId = async (userId) => {
    try {
        if (import.meta.env.VITE_USE_MOCKS === 'true') {
            let loadedChats = loadChatsFromLocalStorage(userId);
            if (!loadedChats) {
                loadedChats = await mockedGetChatsByUserId(userId);
                saveChatsToLocalStorage(loadedChats, userId);
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
            let loadedMessages = loadMessagesFromLocalStorage(chatId);
            if (!loadedMessages) {
                loadedMessages = await mockedGetMessagesByChatId(chatId);
                saveMessagesToLocalStorage(loadedMessages, chatId);
            }

            return loadedMessages;
        }
    } catch (error) {
        throw error;
    }
}

export const getChatInfoByChatId = async (chatId) => {
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
            saveMessageToLocalStorage(response.data, chatId, senderId);
            return response.data;
        }
    } catch (error) {
        throw error;
    }
}