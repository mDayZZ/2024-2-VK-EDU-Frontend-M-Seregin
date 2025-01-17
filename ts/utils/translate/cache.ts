import {ICache, ICachedItem, ITranslateParams} from "./types";

const CACHE_NAME = 'translationCache';


const getKey = ({text, from, to}: ITranslateParams): string => {
    return `${text}_${from}_${to}`;
}

const getCache = (): ICache => {
    const cache = localStorage.getItem(CACHE_NAME);
    if (!cache) {
       localStorage.setItem(CACHE_NAME, JSON.stringify([]));
       return [];
    }
    const parsedCache = JSON.parse(cache);
    return parsedCache;
}

const addToCache = (key: string, text:string) => {
    const cache = getCache();
    localStorage.setItem(CACHE_NAME, JSON.stringify([...cache, {key, text}]));
}

const getFromCache = (key: string): string | null => {
    const cache = getCache();
    const foundText: ICachedItem | undefined = cache.find(cachedItem => cachedItem.key === key);

    if (!foundText) {
        return null;
    }

    return foundText.text;
}





export const cache = {
    getText: (params: ITranslateParams): string | null => {
        const key = getKey(params);
        return getFromCache(key);
    },
    saveText: (params: ITranslateParams, translatedText: string): void => {
        const key = getKey(params);
        addToCache(key, translatedText);
    }
}