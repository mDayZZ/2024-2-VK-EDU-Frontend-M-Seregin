import {createElement} from "../../utils/createElements";
import {createMessageElement} from "../chatMessage/";

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
