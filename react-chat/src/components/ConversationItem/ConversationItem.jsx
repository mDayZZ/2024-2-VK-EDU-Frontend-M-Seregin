import React from 'react';
import classes from './ConversationItem.module.scss';
import RoundAvatar from "../UI/RoundAvatar/RoundAvatar.jsx";
import useChatInfo from "../../hooks/useChatInfo.js";
import {getDatetime} from "../../utils/date.js";
const ConversationItem = ({userId, conversation, openChatPage}) => {
    const {chatTitle, contactAvatar} = useChatInfo(conversation, userId)

    return (
        <li className={classes.conversationItem}>
            <button className={classes.conversationItem__button} onClick={() => openChatPage(conversation.id)}>
                <RoundAvatar src={conversation.chat_image_url || contactAvatar}/>
                <div className={classes.conversationItem__info}>
                    <p className={classes.conversationItem__name}>{chatTitle}</p>
                    <p className={classes.conversationItem__lastMessage}>{conversation.last_message || 'Сообщений пока нет'}</p>
                    <p className={classes.conversationItem__lastMessageTime}>{getDatetime(conversation.last_message_time)}</p>
                </div>

            </button>

        </li>
    );
};

export default ConversationItem;