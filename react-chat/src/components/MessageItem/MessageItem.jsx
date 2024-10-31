import React, {useContext, useEffect} from 'react';
import classes from './MessageItem.module.scss';
import RoundAvatar from "../UI/RoundAvatar/RoundAvatar.jsx";
import {getTextColor} from "../../utils/getTextColor.js";
import {ThemeContext} from "../../contexts/ThemeContext.jsx";
import {getDatetime} from "../../utils/date.js";
import {useTheme} from "../../hooks/useTheme.js";
import cn from "classnames";
const MessageItem = ({message, isWitnessMessage, userInfo}) => {
    const { backgroundColor, textColor } = useTheme('chatMessageBackgroundColor');
    const isSelf = userInfo.id === message.sender_id;

    const messageItemClasses = cn(classes.message, isSelf ? classes['message--self'] : '')
    useEffect(() => {
        document.documentElement.style.setProperty('--message-bg-color', backgroundColor);
        document.documentElement.style.setProperty('--message-text-color', textColor);
    }, [backgroundColor, textColor]);

    return (
        <li className={messageItemClasses} data-loaded={!isWitnessMessage}>
            <RoundAvatar className={classes.message__avatar} src={message.sender_profile_image_url}/>
            <div className={classes.message__block} >
                <p className={classes.message__username}>{message.sender_name || message.sender_username}</p>
                <p className={classes.message__content}>{message.content}</p>
                <p className={classes.message__datetime}>{getDatetime(message.created_at)}</p>
            </div>
        </li>
    );
};

export default MessageItem;