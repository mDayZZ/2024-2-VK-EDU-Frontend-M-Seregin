import {createElement, createMaterialButton} from "../utils/createElements";
import {createConversationHeader} from "../components/conversationHeader/index";
import {getChatsByUserId} from "../api";
import {createConversationList} from "../components/conversationList";

export const createConversationActivity = ({userId}) => {
    const conversationActivityElement = createElement('div', 'activity conversationActivity');
    const [conversationHeaderElement, {}] = createConversationHeader();
    const [conversationListElement, {}] = createConversationList({userId});


    const container = createElement('div', 'container');
    container.append(conversationListElement)


    conversationActivityElement.append(conversationHeaderElement, container);
    return conversationActivityElement;
}
