import {createElement} from "../../utils/createElements";
import {postMessageByChatId} from "../../api/chatApi";
import { getChatsByUserId } from "../../api/userApi";
import {getUniqueId} from "../../utils/uniqueId";
import {getChatsFromLocalStorage, saveChatsToLocalStorage, saveMessageToChatInLocalStorage} from "../../utils/storage";
import './_chatForm.scss';
import {scrollElementToEnd} from "../../utils/scrollElementToEnd";

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

export const createChatForm = ({userId, chatId, renderMessage, container}) => {
    const attributes = {
        action: "/",
    }
    const chatFormElement = createElement('form', 'chatForm', attributes);
    const chatInputElement = createChatInput();
    const chatFormButton = createChatFormButton();

    chatFormElement.addEventListener('submit', (event) => {
        event.preventDefault();
        const messageId = getUniqueId();
        const datetime = new Date().toISOString();
        const newMessage = {id: messageId, senderId: userId, messageText: chatInputElement.value, datetime};

        postMessageByChatId(newMessage, chatId)
            .then(() => {
                renderMessage({userId, message: newMessage});
                saveMessageToChatInLocalStorage(newMessage, chatId);
                scrollElementToEnd(container);
            });

        chatInputElement.value = '';
    });


    chatFormElement.append(chatInputElement, chatFormButton);
    return chatFormElement;
}

