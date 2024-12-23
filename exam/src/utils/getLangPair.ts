export const getLangPair = (from:string, to:string,): => {



    if ((!from || 'Autodetect') && (!to || 'Autodetect')) {
        return 'mt|en-GB';
    }

    if (!from || 'Autodetect' ) {
        return `mt|${to}`;
    }

    if (!to || 'Autodetect') {
        return `${from}|mt`;
    }

    return `${from}|${to}`;
}
