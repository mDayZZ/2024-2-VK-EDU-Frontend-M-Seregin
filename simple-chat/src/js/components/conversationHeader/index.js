import "./_conversationHeader.scss"
import {createElement, createMaterialButton} from "../../utils/createElements";

export const createConversationHeader = () => {
    const conversationHeaderElement = createElement('div', 'header conversationHeader');
    const burgerButton = createMaterialButton('menu');
    const conversationHeaderTitle = createElement('p', 'conversationHeader__title header__title', {}, 'Чаты');
    const searchButton = createMaterialButton('search');

    conversationHeaderElement.append(burgerButton, conversationHeaderTitle, searchButton);
    return [conversationHeaderElement, {burgerButton, searchButton}];
}
