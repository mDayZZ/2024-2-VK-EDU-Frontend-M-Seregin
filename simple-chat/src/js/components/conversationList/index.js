import "./_conversationList.module.scss";
import {createElement} from "../../utils/createElements";
import {getChatsByUserId} from "../../api";
import {createConversationItem} from "../conversationItem";

export const createConversationList = ({userId}) => {
    const conversationList = createElement('ul', 'conversationList');

    getChatsByUserId(userId)
        .then(chats => {
            chats.forEach(chat => {
                console.log(chat)
                const [conversationItemElement, {}] = createConversationItem({chat});

                conversationList.append(conversationItemElement);

            })
        })

    conversationList.append();
    return [conversationList, {}];
}


