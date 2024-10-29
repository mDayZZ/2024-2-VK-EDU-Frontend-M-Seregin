import React from 'react';
import classes from './ConversationItem.module.scss';
import RoundAvatar from "../UI/RoundAvatar/RoundAvatar.jsx";
import {getDatetime} from "../../utils/date.js";
import UserListItem from "../UI/UserListItem/UserListItem.jsx";
const ConversationItem = ({userId, conversation, openChatPage}) => {
    const conversationLastMessage = `${conversation.last_message?.user?.username}: ${conversation.last_message?.content}` || 'Сообщений пока нет';
    return (
        <UserListItem avatarUrl={conversation.chat_image_url} heading={conversation.name} comment={conversationLastMessage} date={getDatetime(conversation?.last_message?.created_at)} linkTo={`/chats/${conversation.id}`}></UserListItem>
    );
};

export default ConversationItem;