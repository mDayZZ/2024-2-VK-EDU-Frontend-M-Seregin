/*Translates string to different languages
*
* */

import {cache} from "./cache";
import {apiService} from "./apiService";

const translate = async (params) => {
    if (!params.text) {
        return '';
    }

    const cachedTranslate = cache.getText(params);
    if (cachedTranslate) {
        return cachedTranslate;
    }

    const fetchedTranslate = await apiService.getTranslatedText(params);
    cache.saveText(params, fetchedTranslate);

    return fetchedTranslate;
}

export default translate;