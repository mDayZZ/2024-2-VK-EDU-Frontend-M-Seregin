import {createElement} from "../../utils/createElements";
import {createMessageElement} from "../chatMessage/";
import './_chatContainer.scss';

export const createChatContainer = (messages = []) => {
    const chatContainer = createElement('ul', 'chatContainer');




    const renderMessages = ({userId, messages}) => {
        messages.forEach((message) => {
            renderMessage({userId, message, loaded: true});
        })
    }

    const renderMessage = ({userId, message, loaded = false}) => {
        const [messageElement] = createMessageElement({userId, message, loaded})
        chatContainer.append(messageElement);
    }

    chatContainer.append();
    return {chatContainer, renderMessages, renderMessage};
}
