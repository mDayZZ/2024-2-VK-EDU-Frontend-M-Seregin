export const getLangPair = (from, to) => {
    if (!from || from === 'Autodetect') {
        return `mt|${to}`;
    }

    if (!to || to === 'Autodetect') {
        return `${from}|mt`;
    }

    return `${from}|${to}`;
}