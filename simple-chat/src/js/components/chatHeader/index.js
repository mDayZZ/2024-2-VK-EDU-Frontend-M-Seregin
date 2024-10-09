import {createElement, createMaterialButton} from "../../utils/createElements";
import './_chatHeader.scss'

const createChatInfoBody = () => {
    const chatInfoBodyElement = createElement('div');
    const chatTitle = createElement('p', 'header__chatInfo-title');
    const chatStatus = createElement('p', 'header__chatInfo-status');

    chatInfoBodyElement.append(chatTitle, chatStatus);
    return {chatInfoBodyElement, chatTitle, chatStatus};
}

const createChatInfo = () => {
    const chatInfoElement = document.createElement('div');
    chatInfoElement.className = 'header__chatInfo'

    const backButtonElement = createMaterialButton('arrow_back');
    const chatAvatar = createElement('img', 'avatar avatar--rounded');
    const {chatInfoBodyElement, chatTitle, chatStatus} = createChatInfoBody();

    backButtonElement.addEventListener('click', () => {
        window.updateState('conversations');
    })

    chatInfoElement.append(backButtonElement, chatAvatar, chatInfoBodyElement);
    return {chatInfoElement, chatTitle, chatStatus, chatAvatar};
}

const createActionContainer = () => {
    const actionContainerElement = createElement('div', 'header__actionContainer');
    const searchActionButton = createElement('button', 'header__actionButton iconButton', {},'<span class="material-symbols-outlined">search</span>');
    const moreActionButton = createElement('button', 'header__actionButton iconButton', {} ,'<span class="material-symbols-outlined">more_vert</span>');

    actionContainerElement.append(searchActionButton, moreActionButton);
    return {actionContainerElement, searchActionButton, moreActionButton};
}

export const createChatHeader = () => {
    const chatHeaderElement = createElement('header', 'header chatHeader');
    const {chatInfoElement, ...chatInfoChildren} = createChatInfo();
    const {actionContainer, ...actionContainerChildren} = createActionContainer();

    chatHeaderElement.append(chatInfoElement, actionContainer);
    return {chatHeaderElement, ...chatInfoChildren, ...actionContainerChildren};
}


