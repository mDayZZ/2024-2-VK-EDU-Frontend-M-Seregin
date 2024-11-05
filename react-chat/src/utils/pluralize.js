export const pluralize = (number, one, few, many) => {
    const pluralRules = new Intl.PluralRules('ru-RU');
    const category = pluralRules.select(number);

    switch (category) {
        case 'one':
            return `${number} ${one}`;
        case 'few':
            return `${number} ${few}`;
        default:
            return `${number} ${many}`;
    }
}