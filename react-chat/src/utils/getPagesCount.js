export const getPagesCount = (elementsCount = 1, elementsInPage = 1) => {
    const pages = Math.ceil(elementsCount / elementsInPage);
    if (pages < 1) {
        return 1;
    }
    return pages;
}