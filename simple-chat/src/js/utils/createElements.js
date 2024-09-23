const createMessageBlockElement = () => {

}

const createTextElement = (messageText) => {
    const textElement = document.createElement("p");
    textElement.classList.add('message__text');
    textElement.innerText = messageText;
    return textElement;
}

const createDatetimeElement = (datetime) => {
    const datetimeElement = document.createElement("p");
    datetimeElement.classList.add('message__datetime');
    datetimeElement.innerText = datetime;

    return datetimeElement;
}

export const createMessageElement = (senderInfo, isSelf, messageText, datetime) => {
    const messageBlockElement = document.createElement('div');
    messageBlockElement.classList.add('message__block');
    messageBlockElement.insertAdjacentHTML("beforeend", `
            <p class="message__username">${senderInfo.username}</p>
        `);

    messageBlockElement.insertAdjacentElement("beforeend", createTextElement(messageText));
    messageBlockElement.insertAdjacentElement("beforeend", createDatetimeElement(datetime));

    const messageElement = document.createElement("div");
    messageElement.classList.add('message');
    if (isSelf) {
        messageElement.classList.add('message--self');
    }

    messageElement.insertAdjacentHTML("beforeend", `<img src="${senderInfo.avatarUrl}" alt="sender avatar" class="message__avatar avatar avatar--rounded">`);
    messageElement.insertAdjacentElement('beforeend', messageBlockElement)

    return messageElement;
}

