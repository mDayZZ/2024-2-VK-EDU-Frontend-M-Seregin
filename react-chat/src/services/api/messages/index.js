import apiService from "../../apiService.js";

export const messagesApi = {
    getMessages: (chatId, ) => apiService.get(`/messages/`, {chat: chatId}),
    sendMessage: (message) => apiService.post('/messages/', message),
}