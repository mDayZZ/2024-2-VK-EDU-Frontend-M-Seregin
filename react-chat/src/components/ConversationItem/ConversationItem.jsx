import React from 'react';
import {getDatetime} from "../../utils/date.js";
import UserListItem from "../UI/UserListItem/UserListItem.jsx";
import {routes} from "../../utils/routes.js";
import {pluralize} from "../../utils/pluralize.js";
import {getUserVisibleName} from "../../utils/getUserVisibleName.js";

const ConversationItem = ({userId, conversation, openChatPage}) => {

    const getLastMessage = () => {

        const getContent = () => {
            const text = conversation.last_message?.text.trim() || '';
            const filesCount = conversation.last_message?.files.length;

            if (filesCount > 0) {
                const filesInfo = pluralize(filesCount, 'файл', 'файла', 'файлов');
                return `[${filesInfo}] ${text}`.trim();
            }

            return `${text}`.trim();
        }

        if (!conversation.last_message.sender?.username) {
            return 'Сообщений пока нет';
        }

        const visibleName = getUserVisibleName(conversation.last_message.sender);
        const content = getContent();
        return `${visibleName}: ${content}`;
    }
    let conversationLastMessage = getLastMessage();

    return (
        <UserListItem avatarUrl={conversation?.avatar} heading={conversation?.title} comment={conversationLastMessage} date={getDatetime(conversation?.last_message?.created_at)} linkTo={routes.chat(conversation.id)}></UserListItem>
    );
};

export default ConversationItem;