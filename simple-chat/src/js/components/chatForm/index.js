import {createElement} from "../../utils/createElements";
import {getChatById, getChatsByUserId, postMessageByChatId} from "../../api";

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
        const newMessage = {id: messageId, senderId: userId, messageText: chatInputElement.value, datetime};

        // Отправка сообщения на сервер
        postMessageByChatId(newMessage, chatId)
            .then(() => {
                // Отображаем сообщение в UI
                renderMessage({userId, message: newMessage});

                // Обновляем чат в локальном хранилище
                const chatsFromLocal = JSON.parse(localStorage.getItem('chats')) || [];
                const chatIndex = chatsFromLocal.findIndex(chat => Number(chat.id) === Number(chatId));

                if (chatIndex !== -1) {
                    // Если чат найден, добавляем новое сообщение
                    chatsFromLocal[chatIndex].messages.push(newMessage);
                    localStorage.setItem('chats', JSON.stringify(chatsFromLocal));
                }

                requestAnimationFrame(() => {
                    container.scrollTop = container.scrollHeight;
                });
            });

        chatInputElement.value = '';


    });


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

