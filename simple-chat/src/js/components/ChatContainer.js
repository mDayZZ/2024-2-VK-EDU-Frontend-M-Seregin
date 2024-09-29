import {createElement} from "../utils/createElements";

export const createChatContainer = () => {
    const chatContainer = createElement('ul', 'chatContainer');



    chatContainer.append();
    return [chatContainer, {}];
}