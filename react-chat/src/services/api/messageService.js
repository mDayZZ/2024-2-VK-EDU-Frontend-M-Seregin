import {axiosInstance} from "./axiosInstance.js";

export const messageService = {
    getMessages: async ({chatId, page = 1}) => {
        const {data} = await axiosInstance.get(`/messages/`, {params: {chat: chatId, page: page}});
        return data;
    },
    sendMessage: async (message) => {
        const {data} = await axiosInstance.post('/messages/', message);
        return data;
    },
}