import {ITranslateParams, ITranslateResponse} from "./types";

const API_URL = 'https://api.mymemory.translated.net';

export const apiService = {
    getTranslatedText: async ({text, from, to} : ITranslateParams) => {
        try {
            const response = await fetch(`${API_URL}/get?q=${text}&langpair=${from}|${to}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data: ITranslateResponse = await response.json();
            return data.responseData.translatedText;
        } catch (error) {
            console.error(error);
            throw error;
        }

    }
}