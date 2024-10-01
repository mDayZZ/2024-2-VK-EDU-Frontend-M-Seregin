import {createElement} from "../utils/createElements";
import {getDatetime} from "../utils/date";
import {getUserById} from "../api";

export const createMessageElement = ({userId, message}) => {
    const messageElement = createElement('li', 'message');
    messageElement.classList.add('message');
    const messageAvatar = createMessageAvatar();
    const [messageBlock, messageBlockChildren] = createMessageBlock();

    if (!message) {
        return [messageElement, {...children, messageAvatar}];
    }

    const {id, senderId, messageText, datetime} = message;

    messageElement.id = `message_${id}`;
    if ( Number(senderId) === Number(userId) ) {
        messageElement.classList.add('message--self');
    }

    messageBlockChildren.messageTextElement.innerText = messageText;
    messageBlockChildren.messageDatetimeElement.innerText = getDatetime(datetime);

    getUserById(senderId)
        .then(senderData => {
            messageBlockChildren.messageUsernameElement.innerText = senderData.username;
            messageAvatar.src = senderData.avatarUrl;
        })


    messageElement.append(messageAvatar, messageBlock);

    return [messageElement, {...messageBlockChildren, messageAvatar}];
}

const createMessageBlock = () => {
    const messageBlockElement = createElement('div', 'message__block', );
    const messageUsernameElement = createElement('p', 'message__username', {},'Loading...');
    const messageTextElement = createElement('p', 'message__text', {},'Loading...');
    const messageDatetimeElement = createElement('p', 'message__datetime', {},'Loading...');

    messageBlockElement.append(messageUsernameElement, messageTextElement, messageDatetimeElement);
    return [messageBlockElement, {messageUsernameElement, messageTextElement, messageDatetimeElement}]
}

const createMessageAvatar = () => {
    const messageAvatar = createElement('img', 'message__avatar avatar avatar--rounded');
    messageAvatar.src = './images/base_photo.png';

    return messageAvatar;
}
