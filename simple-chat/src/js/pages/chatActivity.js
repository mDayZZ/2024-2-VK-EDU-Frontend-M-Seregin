import {getChatById} from "../api";
import {createChatHeader} from "../components/ChatHeader";
import {createChatContainer} from "../components/ChatContainer";

export const createChatActivity = ({chatId, userId, ...props}) => {
    const chatActivityElement = document.createElement('div');
    chatActivityElement.className = 'activity chatActivity';
    const [chatHeader, {chatTitle, chatStatus, chatAvatar}] = createChatHeader();
    const [chatContainer, {}] = createChatContainer();

    getChatById(chatId)
        .then(chatInfo => {
            chatTitle.innerText = chatInfo.title;
            chatStatus.innerText = `${chatInfo.members.length} участника`;
            chatAvatar.src = chatInfo.avatarUrl;
        })



    chatActivityElement.append(chatHeader, chatContainer);
    return chatActivityElement;
}


