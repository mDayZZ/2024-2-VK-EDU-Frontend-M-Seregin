import apiService from "../../apiService.js";

export const chatsApi = {
    get: () => apiService.get('/chats'),
    post: (chat) => apiService.post('/chats', chat)
}