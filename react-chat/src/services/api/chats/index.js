import {axiosInstance} from "../axiosInstance.js";

export const chatsApi = {
    get: async () => { await axiosInstance.get('/chats')},
    createChat: async (chat) => axiosInstance.post('/chats/', chat),
}