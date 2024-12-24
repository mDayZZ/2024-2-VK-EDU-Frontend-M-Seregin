import languages from "./languages.json";

export const langs = {
    getLanguages: () => Object.entries(languages).map( ([key, name]) => ({code: key, name: name})),
    getLanguageName: (code) => languages[code],
}