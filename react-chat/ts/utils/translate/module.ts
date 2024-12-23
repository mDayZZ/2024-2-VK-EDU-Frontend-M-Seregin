/*Translates string to different languages
*
* */

import {cache} from "./cache";
import {apiService} from "./apiService";
import {ITranslateParams} from "./types";

export const translate = async (params: ITranslateParams) : Promise<string> => {
    const cachedTranslate = cache.getText(params);
    if (cachedTranslate) {
        return cachedTranslate;
    }

    const fetchedTranslate = await apiService.getTranslatedText(params);
    cache.saveText(params, fetchedTranslate);

    return fetchedTranslate;
}
