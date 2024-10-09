export const scrollElementToEnd = (element) => {
    requestAnimationFrame(() => {
        element.scrollTop = element.scrollHeight;
    });
}