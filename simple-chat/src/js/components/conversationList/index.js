import "./_conversationList.module.scss";
import {createElement} from "../../utils/createElements";
import {getChatsByUserId} from "../../api/userApi";
import {createConversationItem} from "../conversationItem";
import {getChatsFromLocalStorage, saveChatsToLocalStorage} from "../../utils/storage";
import {getChats} from "../../utils/getChats";

export const createConversationList = ({userId}) => {

    const conversationListElement = createElement('ul', 'conversationList');

    getChats(userId).then(chats => {
        chats.forEach(chat => {
            const {conversationItemElement} = createConversationItem({chat});
            conversationListElement.append(conversationItemElement);
        });
    });


    conversationListElement.append();
    return {conversationListElement};
}


