import React, {useContext} from 'react';
import {getTextColor} from "../../utils/getTextColor.js";
import {ThemeContext} from "../../contexts/ThemeContext.jsx";
import classes from "./MessageList.module.scss";
import MessageItem from "../MessageItem/MessageItem.jsx";

const MessageList = ({messages, userInfo}) => {
    const { theme } = useContext(ThemeContext);

    const textColor = getTextColor(theme.chatBackgroundColor);

    return (
        <ul className={classes.messageList} style={{backgroundColor: theme.chatBackgroundColor, color: textColor}}>
            {messages.map(message => <MessageItem key={message.id} message={message} userInfo={userInfo}/>)}
        </ul>
    );
};

export default MessageList;