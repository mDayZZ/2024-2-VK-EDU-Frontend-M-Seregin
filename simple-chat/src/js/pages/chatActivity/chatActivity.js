import {getChatById} from "../../api/chatApi";
import {createChatHeader} from "../../components/chatHeader";
import {createChatContainer} from "../../components/chatContainer";
import {createChatForm} from "../../components/chatForm";
import {createElement} from "../../utils/createElements";
import {getChatInfoFromLocalStorage} from "../../utils/storage";
import './_chatActivity.scss';
import {scrollElementToEnd} from "../../utils/scrollElementToEnd";

export const createChatActivity = ({chatId, userId, ...props}) => {
    const chatActivityElement = document.createElement('div');
    chatActivityElement.className = 'activity chatActivity';
    const {chatHeaderElement, chatTitle, chatStatus, chatAvatar} = createChatHeader();
    const container = createElement('main', 'container');
    const {chatContainer, renderMessages, renderMessage} = createChatContainer();
    const chatFormElement = createChatForm({chatId, userId, renderMessage, container});

    const chatInfo = getChatInfoFromLocalStorage(chatId);
    if (chatInfo) {
        chatTitle.innerText = chatInfo.title;
        chatStatus.innerText = `${chatInfo.members.length} участника`;
        chatAvatar.src = chatInfo.avatarUrl;
        renderMessages({userId, messages: chatInfo.messages});

        requestAnimationFrame(() => {
            container.scrollTop = container.scrollHeight;
        });
    }
    else {
        getChatById(chatId)
            .then(chatInfo => {
                chatTitle.innerText = chatInfo.title;
                chatStatus.innerText = `${chatInfo.members.length} участника`;
                chatAvatar.src = chatInfo.avatarUrl;
                renderMessages({userId, messages: chatInfo.messages});
                scrollElementToEnd(container);
            });
    }
    container.append(chatContainer);
    chatActivityElement.append(chatHeaderElement, container, chatFormElement);
    return chatActivityElement;
}


