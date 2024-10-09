import {createElement} from "../../utils/createElements";
import {createConversationHeader} from "../../components/conversationHeader";
import {createConversationList} from "../../components/conversationList";

export const createConversationActivity = ({userId}) => {
    const conversationActivityElement = createElement('div', 'activity conversationActivity');
    const {conversationHeaderElement} = createConversationHeader();
    const {conversationListElement} = createConversationList({userId});


    const container = createElement('main', 'container');
    container.append(conversationListElement)


    conversationActivityElement.append(conversationHeaderElement, container);
    return conversationActivityElement;
}
