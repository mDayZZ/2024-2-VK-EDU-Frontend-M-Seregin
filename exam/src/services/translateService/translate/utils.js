export const getLangPair = (from, to) => {
    if (!from) {
        return `Autodetect|${to}`;
    }

    if (!to) {
        return `${from}|Autodetect`;
    }

    return `${from}|${to}`;
}