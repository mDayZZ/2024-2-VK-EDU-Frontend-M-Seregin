import {getLangPair} from "./utils.js";

const API_URL = 'https://api.mymemory.translated.net';

export const apiService = {
    getTranslatedText: async ({text, from, to}) => {

        const langpair = getLangPair(from, to)
        try {
            const response = await fetch(`${API_URL}/get?q=${text}&langpair=${langpair}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            return data.responseData.translatedText;
        } catch (error) {
            console.error(error);
            throw error;
        }

    }
}