import {
    mockedDeleteChatMessages,
    mockedGetChatInfoByChatId,
    mockedGetChatsByUserId,
    mockedGetMembersByChatId,
    mockedGetMessagesByChatId,
    mockedGetUserById,
    mockedSendMessage
} from "../mock/mockApiHandlers.js";
import { getUniqueId } from "../utils/idGenerator.js";
import error from "eslint-plugin-react/lib/util/error.js";

export const getChatsByUserId = async (userId) => {
    try {
        const loadedChats = await mockedGetChatsByUserId(userId);
        return loadedChats;
    } catch (error) {
        throw error;
    }
};

export const getMessagesByChatId = async (chatId) => {
    try {
        const loadedMessages = await mockedGetMessagesByChatId(chatId);
        return loadedMessages;
    } catch (error) {
        throw error;
    }
};

export const getChatInfoByChatId = async (chatId, userId) => {
    try {
        const data = await mockedGetChatInfoByChatId(chatId);
        return data;
    } catch (error) {
        throw error;
    }
};

export const getMembersByChatId = async (chatId) => {
    try {
        const data = await mockedGetMembersByChatId(chatId);
        return data;
    } catch (error) {
        throw error;
    }
};

export const sendMessage = async (chatId, senderId, content) => {
    try {
        const messageId = getUniqueId();
        const message = {
            id: messageId,
            chat_id: chatId,
            sender_id: senderId,
            content: content,
            created_at: new Date().toISOString()
        };
        const response = await mockedSendMessage(message);
        if (!response.success) {
            throw new Error('Ошибка отправки сообщения');
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteChatMessages = async (chatId) => {
    try {
        const response = await mockedDeleteChatMessages(chatId);
        return response;
    } catch (error) {
        throw error;
    }
};
