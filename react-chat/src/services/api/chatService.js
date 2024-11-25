import {axiosInstance} from "./axiosInstance.js";

export const chatService = {
    getChats: async () => {
        const {data} = await axiosInstance.get('/chats/');
        return data;
    },
    getChatInfo: async (id) => {
        const {data} = await axiosInstance.get(`/chat/${id}`);
        return data;
    },
    createChat: async (chatData) => {
        const {data} = await axiosInstance.post('/chats/', chatData);
        return data;
    },

}