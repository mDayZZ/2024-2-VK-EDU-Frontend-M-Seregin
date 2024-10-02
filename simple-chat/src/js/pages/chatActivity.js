import {getChatById} from "../api";
import {createChatHeader} from "../components/chatHeader/";
import {createChatContainer} from "../components/ChatContainer/";
import {createChatForm} from "../components/chatForm/";
import {createElement} from "../utils/createElements";

export const createChatActivity = ({chatId, userId, ...props}) => {
    const chatActivityElement = document.createElement('div');
    chatActivityElement.className = 'activity chatActivity';
    const [chatHeader, {chatTitle, chatStatus, chatAvatar}] = createChatHeader();
    const container = createElement('div', 'container');
    const [chatContainer, {renderMessages, renderMessage}] = createChatContainer();
    const chatFormElement = createChatForm({chatId, userId, renderMessage, container});

    const chatsFromLocal = JSON.parse(localStorage.getItem('chats'));
    if (chatsFromLocal) {
        const chatInfo = chatsFromLocal.find(chat => Number(chat.id) === Number(chatId));
        if (chatInfo) {
            chatTitle.innerText = chatInfo.title;
            chatStatus.innerText = `${chatInfo.members.length} участника`;
            chatAvatar.src = chatInfo.avatarUrl;
            renderMessages({userId, messages: chatInfo.messages});

            requestAnimationFrame(() => {
                container.scrollTop = container.scrollHeight;
            });
        }
    }
    else {
        getChatById(chatId)
            .then(chatInfo => {
                chatTitle.innerText = chatInfo.title;
                chatStatus.innerText = `${chatInfo.members.length} участника`;
                chatAvatar.src = chatInfo.avatarUrl;
                renderMessages({userId, messages: chatInfo.messages});
                container.scrollTop = container.scrollHeight;
            });
    }
    container.append(chatContainer);
    chatActivityElement.append(chatHeader, container, chatFormElement);
    return chatActivityElement;
}


