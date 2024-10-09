import "./_conversationItem.scss";
import {createElement} from "../../utils/createElements";
import {getUserById} from "../../api/userApi";

export const createConversationItem = ({chat}) => {
    const conversationItemElement = createElement('li', 'conversationItem');
    const chatAvatar = createElement('img', 'conversationItem__chatAvatar avatar avatar--rounded');

    const conversationInfoContainer = createElement('div', 'conversationItem__infoContainer');
    const chatTitle = createElement('p', 'conversationItem__chatTitle title');
    const chatLastMessage = createElement('p', 'conversationItem__chatLastMessage');

    conversationInfoContainer.append(chatTitle, chatLastMessage);

    const lastMessageInfo = chat.messages[chat.messages.length-1];
    chatTitle.innerText = chat.title;
    chatAvatar.src = chat.avatarUrl;

    getUserById(lastMessageInfo.senderId).then(userInfo => {
        chatLastMessage.innerText = `${userInfo.username}: ${lastMessageInfo.messageText}`;

    })

    conversationItemElement.addEventListener('click', () => {
        window.updateState('chat', {chatId: chat.id})
    })


    conversationItemElement.append(chatAvatar, conversationInfoContainer)
    return {conversationItemElement}
}