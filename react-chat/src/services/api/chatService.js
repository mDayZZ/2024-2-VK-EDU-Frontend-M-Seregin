import {axiosInstance} from "./axiosInstance.js";

export const chatService = {
    getChats: async (page = null) => {
        const {data} = await axiosInstance.get('/chats/');
        return data;
    },
    getChatInfo: async (id) => {
        const {data} = await axiosInstance.get(`/chat/${id}`);
        return data;
    },

    /*
    * Creates a new chat.
     * @param {Object} chatData - The data for creating the chat.
     * @param {string | null} chatData.title - The title of the chat.
     * @param {Array<string>} chatData.members - An array of member IDs.
     * @param {boolean} chatData.isPrivate - private chat or not
     * @param {File | null} chatData.avatar - chat avatar
     * @returns {Promise<Object>} An object containing the created chat information.
     */
    createChat: async (chatData) => {
        const {data} = await axiosInstance.post('/chats/?fallback=on', chatData);
        return data;
    },

}