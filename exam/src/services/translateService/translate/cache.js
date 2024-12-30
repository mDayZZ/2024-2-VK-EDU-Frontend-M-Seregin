const CACHE_NAME = 'translationCache';


const getKey = ({text, from, to}) => {
    return `${text}_${from}_${to}`;
}

const getCache = () => {
    const cache = localStorage.getItem(CACHE_NAME);
    if (!cache) {
       localStorage.setItem(CACHE_NAME, JSON.stringify([]));
       return [];
    }
    const parsedCache = JSON.parse(cache);
    return parsedCache;
}

const addToCache = (key, text) => {
    const cache = getCache();
    localStorage.setItem(CACHE_NAME, JSON.stringify([...cache, {key, text}]));
}

const getFromCache = (key) => {
    const cache = getCache();
    const foundText = cache.find(cachedItem => cachedItem.key === key);

    if (!foundText) {
        return null;
    }

    return foundText.text;
}





export const cache = {
    getText: (params) => {
        const key = getKey(params);
        return getFromCache(key);
    },
    saveText: (params, translatedText) => {
        const key = getKey(params);
        addToCache(key, translatedText);
    },

    getHistory: () => {
        return getCache();
    }
}