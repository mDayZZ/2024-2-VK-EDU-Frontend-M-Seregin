const TRANSLATE_HISTORY_KEY = 'translateHistory';

const translate = {
    saveHistoryData: (history) => {
        localStorage.setItem(TRANSLATE_HISTORY_KEY, JSON.stringify(history));
    },
    getHistoryData: () => {
        const data = JSON.parse(localStorage.getItem(TRANSLATE_HISTORY_KEY));
        if (!data) {
            return [];
        }

        return data;
    },
}

export default translate;