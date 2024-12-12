import {axiosInstance} from "./axiosInstance.js";

export const messageService = {
    getMessages: async ({chatId, page = 1}) => {
        const {data} = await axiosInstance.get(`/messages/`, {params: {chat: chatId, page: page}});
        return data;
    },
    /*
    * Sends message to chat
    * @param {Object} message - Message info object
    * @param {string} message.chat - chat id
    * @param {File | null} message.voice - voice file (voice or text only)
    * @param {string | null} message.text - message text
    * @param {File[] | null} message.files - attached files
    * @returns {Promise<Object>} An object containing the sent message info.
    * */
    sendMessage: async (message) => {
        const {data} = await axiosInstance.post('/messages/', message);
        return data;
    },
}