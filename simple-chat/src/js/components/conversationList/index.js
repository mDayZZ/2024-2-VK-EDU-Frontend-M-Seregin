import "./_conversationList.module.scss";
import {createElement} from "../../utils/createElements";
import {getChatsByUserId} from "../../api";
import {createConversationItem} from "../conversationItem";

export const createConversationList = ({userId}) => {
    const conversationList = createElement('ul', 'conversationList');

    const chatsFromLocal = JSON.parse(localStorage.getItem('chats'));
    if (chatsFromLocal) {
        chatsFromLocal.forEach(chat => {
            const [conversationItemElement, {}] = createConversationItem({chat});
            conversationList.append(conversationItemElement);
        });
    } else {
        getChatsByUserId(userId)
            .then(chats => {
                chats.forEach(chat => {
                    const [conversationItemElement, {}] = createConversationItem({chat});
                    conversationList.append(conversationItemElement);
                });
                // Сохраняем чаты в localStorage только если их нет
                localStorage.setItem('chats', JSON.stringify(chats));
            });
    }


    conversationList.append();
    return [conversationList, {}];
}


