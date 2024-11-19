import apiService from "../../apiService.js";

export const chatApi = {
    getChatInfo: (chatId) => apiService.get(`/chat/${chatId}`),
}