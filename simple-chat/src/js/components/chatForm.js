import {createElement} from "../utils/createElements";
import {getChatById, postMessageByChatId} from "../api";

export const createChatForm = ({userId, chatId, renderMessage, container}) => {
    const attributes = {
        action: "/",
    }
    const chatFormElement = createElement('form', 'chatForm', attributes);
    const chatInputElement = createChatInput();
    const chatFormButton = createChatFormButton();

    chatFormElement.addEventListener('submit', (event) => {
        event.preventDefault();
        const messageId = Math.floor(Math.random() * (100000 - 1)) + 1;
        const datetime = new Date().toISOString();
        postMessageByChatId({messageId, senderId: userId, messageText: chatInputElement.value, datetime}, chatId)
            .then(renderMessage({userId, message: {id: messageId, senderId: userId, messageText: chatInputElement.value, datetime} }));
        chatInputElement.value = '';
        container.scrollTop = container.scrollHeight
    })


    chatFormElement.append(chatInputElement, chatFormButton);
    return chatFormElement;
}

const createChatInput = () => {
    const attributes = {
        name: "message-text",
        placeholder: "Введите сообщение",
        type: "text",
        required: '',
    }
    const chatInput = createElement('input', 'chatForm__input', attributes);

    return chatInput;
}

const createChatFormButton = () => {
    const attributes = {
        placeholder: "Введите сообщение",
        type: "submit",
    }

    const chatFormButton = createElement('button', 'chatForm__button textButton', attributes, 'Отправить');

    return chatFormButton;
}

