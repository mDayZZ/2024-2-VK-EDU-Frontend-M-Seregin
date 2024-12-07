import React from 'react';
import classes from "./MessageList.module.scss";
import MessageItem from "../MessageItem/MessageItem.jsx";
import {useTheme} from "../../hooks/useTheme.js";

const MessageList = ({messages, witnessMessages, lastMessageRef, userInfo}) => {
    const { backgroundColor, textColor } = useTheme('chat');


    return (
        <ul className={classes.messageList}>
            {messages.length > 0
                ?   messages.map((message, index) => <MessageItem ref={index === messages.length - 1 ? lastMessageRef : null} key={message.id} message={message} isWitnessMessage={witnessMessages.includes(message)} userInfo={userInfo}/>)
                :   <h2 className={classes.messageList__emptyBlock}>Сообщений пока нет :(</h2>
            }
        </ul>
    );
};

export default MessageList;