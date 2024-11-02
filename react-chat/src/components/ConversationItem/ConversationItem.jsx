import React from 'react';
import classes from './ConversationItem.module.scss';
import RoundAvatar from "../UI/RoundAvatar/RoundAvatar.jsx";
import {getDatetime} from "../../utils/date.js";
import UserListItem from "../UI/UserListItem/UserListItem.jsx";
const ConversationItem = ({userId, conversation, openChatPage}) => {
    const getLastMessage = () => {
        if (!conversation.last_message) {
            return 'Сообщений пока нет';
        }
        const name = conversation.last_message?.user?.name || conversation.last_message?.user?.username || 'Неизвестный пользователь';
        const content = conversation.last_message?.content ?? '...';
        return `${name}: ${content}`;
    }
    let conversationLastMessage = getLastMessage();

    return (
        <UserListItem avatarUrl={conversation.chat_image_url} heading={conversation.name} comment={conversationLastMessage} date={getDatetime(conversation?.last_message?.created_at)} linkTo={`/chats/${conversation.id}`}></UserListItem>
    );
};

export default ConversationItem;