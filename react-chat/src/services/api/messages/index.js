import apiService from "../../apiService.js";

export const messagesApi = {
    getMessages: (chatId, page = 1) => apiService.get(`/messages/`, {chat: chatId, page: page}),
    sendMessage: (message) => apiService.postFormData('/messages/', message),
}