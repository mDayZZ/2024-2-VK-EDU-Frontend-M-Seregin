import {axiosInstance} from "../axiosInstance.js";

export const centrifugoApi = {
    getCentrifugoToken: (ctx) => axiosInstance.post('/centrifugo/connect/', ctx),
    getSubscribeToken: (ctx) => axiosInstance.post('/centrifugo/subscribe/', ctx),
}