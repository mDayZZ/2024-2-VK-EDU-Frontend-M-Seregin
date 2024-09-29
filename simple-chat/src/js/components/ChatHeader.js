import {createElement} from "../utils/createElements";

export const createChatHeader = () => {
    const chatHeaderElement = createElement('div', 'header chatHeader');
    const [chatInfoElement, chatInfoChildren] = createChatInfo();
    const [actionContainer, actionContainerChildren] = createActionContainer();

    chatHeaderElement.append(chatInfoElement, actionContainer);
    return [chatHeaderElement, {...chatInfoChildren, ...actionContainerChildren}];
}

const createChatInfo = () => {
    const chatInfoElement = document.createElement('div');
    chatInfoElement.className = 'header__chatInfo'

    chatInfoElement.insertAdjacentHTML("beforeend", actionButton);
    const chatAvatar = createElement('img', 'avatar avatar--rounded');
    const [chatInfoBody, children] = createChatInfoBody();

    chatInfoElement.append(chatAvatar, chatInfoBody)
    return [chatInfoElement, {...children, chatAvatar}];
}

const createChatInfoBody = () => {
    const chatInfoBodyElement = createElement('div');
    const chatTitle = createElement('p', 'header__chatInfo-title');
    const chatStatus = createElement('p', 'header__chatInfo-status');

    chatInfoBodyElement.append(chatTitle, chatStatus);
    return [chatInfoBodyElement, {chatTitle, chatStatus}];
}


const actionButton =
    `
                <button class="header__actionButton iconButton">
                    <span class="material-symbols-outlined">arrow_back</span>
                </button>
    `

const createActionContainer = () => {
    const actionContainer = createElement('div', 'header__actionContainer');
    const searchActionButton = createElement('button', 'header__actionButton iconButton', '<span class="material-symbols-outlined">search</span>');
    const moreActionButton = createElement('button', 'header__actionButton iconButton', '<span class="material-symbols-outlined">more_vert</span>');

    actionContainer.append(searchActionButton, moreActionButton);
    return [actionContainer, {searchActionButton, moreActionButton}];
}