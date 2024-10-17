import React from 'react';
import classes from './ConversationItem.module.scss';
import RoundAvatar from "../UI/RoundAvatar/RoundAvatar.jsx";
const ConversationItem = ({conversation}) => {
    console.log(conversation)
    return (
        <li className={classes.conversationItem}>
            <button className={classes.conversationItem__button}>
                <RoundAvatar src={conversation.chat_image_url}/>
                <div className={classes.conversationItem__info}>
                    <p className={classes.conversationItem__name}>{conversation.name}</p>
                    <p className={classes.conversationItem__lastMessage}>{conversation.last_message || 'Сообщений пока нет'}</p>
                    <p className={classes.conversationItem__lastMessageTime}>{conversation.last_message_time}</p>
                </div>

            </button>

        </li>
    );
};

export default ConversationItem;