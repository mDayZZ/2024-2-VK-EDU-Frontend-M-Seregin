import {ITranslateParams, ITranslateResponse} from "./types";

const API_URL = 'https://api.mymemory.translated.net';

export const apiService = {
    getTranslatedText: async ({text, from, to} : ITranslateParams) => {

        const langpair = from ? `${from}|${to}` : `mt|en-US`
        try {
            const response = await fetch(`${API_URL}/get?q=${text}&langpair=${langpair}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data: ITranslateResponse = await response.json();
            console.log(data)
            return data.responseData.translatedText;
        } catch (error) {
            console.error(error);
            throw error;
        }

    }
}