import apiService from "../../apiService.js";

export const centrifugoApi = {
    getCentrifugoToken: (ctx) => apiService.post('/centrifugo/connect/', ctx),
    getSubscribeToken: (ctx) => apiService.post('/centrifugo/subscribe/', ctx),
}