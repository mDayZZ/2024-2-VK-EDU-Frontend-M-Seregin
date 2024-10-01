import {createElement} from "../utils/createElements";
import {getUserById} from "../api";
import {getDatetime} from "../utils/date";
import {createMessageElement} from "./chatMessage";

export const createChatContainer = (messages = []) => {
    const chatContainer = createElement('ul', 'chatContainer');




    const renderMessages = ({userId, messages}) => {
        messages.forEach((message) => {
            renderMessage({userId, message});
        })
    }

    const renderMessage = ({userId, message}) => {
        const [messageElement, children] = createMessageElement({userId, message})
        chatContainer.append(messageElement);
    }

    chatContainer.append();
    return [chatContainer, {renderMessages, renderMessage}];
}
