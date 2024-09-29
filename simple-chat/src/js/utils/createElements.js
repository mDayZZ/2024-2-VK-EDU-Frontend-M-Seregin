import {getUserById} from "../api";

const createMessageBlockElement = () => {
    const messageBlockElement = document.createElement('div');
    messageBlockElement.classList.add('message__block');
    messageBlockElement.insertAdjacentHTML("beforeend", `
            <p class="message__username">...</p>
        `);

    const textElement = createTextElement();
    const datetimeElement = createDatetimeElement();
    messageBlockElement.insertAdjacentElement("beforeend", textElement);
    messageBlockElement.insertAdjacentElement("beforeend", datetimeElement);

    return [messageBlockElement, {textElement, datetimeElement}];
}

const createTextElement = () => {
    const textElement = document.createElement("p");
    textElement.classList.add('message__text');
    textElement.innerText = '...';
    return textElement;
}

const createDatetimeElement = () => {
    const datetimeElement = document.createElement("p");
    datetimeElement.classList.add('message__datetime');
    datetimeElement.innerText = '...';

    return datetimeElement;
}

export const createMessageElement = ({id, senderId, senderInfo, isSelf, messageText, datetime}) => {
    const messageElement = document.createElement("li");
    messageElement.id = `message_${id}`;
    messageElement.classList.add('message');
    if (isSelf) {
        messageElement.classList.add('message--self');
    }

    const [messageBlockElement, {textElement, datetimeElement}] = createMessageBlockElement();
    messageElement.insertAdjacentHTML("beforeend", `<img src="./images/base_photo.png" alt="sender avatar" class="message__avatar avatar avatar--rounded">`);
    // messageElement.insertAdjacentElement('beforeend', createMessageBlockElement());
    messageElement.insertAdjacentElement('beforeend', messageBlockElement);


    const messageAvatarElement = messageElement.querySelector('.message__avatar');
    const messageUsernameElement = messageElement.querySelector('.message__username');

    textElement.innerText = messageText;
    datetimeElement.innerText = datetime;

    if (!senderInfo) {
        getUserById(senderId)
            .then(data => {
                if (!data) {
                    messageUsernameElement.innerText = 'Ошибка';
                    return;
                }
                messageAvatarElement.src = data.avatarUrl;
                messageUsernameElement.innerText = data.username;
            });
    }
    else {
        messageAvatarElement.src = senderInfo?.avatarUrl;
        messageUsernameElement.innerText = senderInfo?.username;
    }

    return messageElement;
}


