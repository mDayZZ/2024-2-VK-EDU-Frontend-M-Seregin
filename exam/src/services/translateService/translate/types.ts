/*
* Params for module function
* */
export interface ITranslateParams {
    /*
    *Text for translating
    * max size: 500 bytes
    * @example "hello world"
     */
    text: string;
    /*
    * original text language(in ISO standard)
    * @example "en"
    * */
    from: string;
    /*
    * language for module (in ISO standard)
    * @example "ru"
    * */
    to: string;
}


export interface ICachedItem {
    key: string;
    text: string
}
export type ICache = ICachedItem[];

export interface ITranslateResponse {
    responseData: {
        translatedText: string
        match: 0 | 1
    };
    quotaFinished: boolean;
    mtLangSupported: any;
    responseDetails: string;
    responseStatus: number;
    responderId: any | null;
    exceptionCode: string | null,
    matches: Array<{id: string,
            segment: string,
            translation: string,
            source: string,
            target: string,
            quality: string,
            reference: null,
        }>
}
