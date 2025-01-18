import {cache} from "./cache.js";
import {apiService} from "./apiService.js";
import {ITranslateParams} from "./types.js";



export const translate = async (params: ITranslateParams) : Promise<string> => {
    const cachedTranslate = cache.getText(params);
    if (cachedTranslate) {
        return cachedTranslate;
    }

    const fetchedTranslate = await apiService.getTranslatedText(params);
    cache.saveText(params, fetchedTranslate);

    return fetchedTranslate;
}

