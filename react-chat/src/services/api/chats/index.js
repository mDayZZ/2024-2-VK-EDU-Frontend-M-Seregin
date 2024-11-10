import apiService from "../../apiService.js";

export const chatsApi = {
    get: () => apiService.get('/chats'),
    createChat: (chat) => apiService.post('/chats/', chat)
}