import {axiosInstance} from "./axiosInstance.js";

export const centrifugoService = {
    getCentrifugoToken: async (ctx) => {
        const {data} = await axiosInstance.post('/centrifugo/connect/', ctx);
        return data;
    },
    getSubscribeToken: async (ctx) => {
        const {data} = await axiosInstance.post('/centrifugo/subscribe/', ctx);
        return data;
    },
}