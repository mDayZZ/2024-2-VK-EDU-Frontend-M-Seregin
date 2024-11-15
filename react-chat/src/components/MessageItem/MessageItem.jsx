import React, {forwardRef, useContext, useEffect} from 'react';
import classes from './MessageItem.module.scss';
import RoundAvatar from "../UI/RoundAvatar/RoundAvatar.jsx";
import {getTextColor} from "../../utils/getTextColor.js";
import {ThemeContext} from "../../contexts/ThemeContext.jsx";
import {getDatetime} from "../../utils/date.js";
import {useTheme} from "../../hooks/useTheme.js";
import cn from "classnames";
import {getUserVisibleName} from "../../utils/getUserVisibleName.js";
const MessageItem = forwardRef(({message, isWitnessMessage, userInfo}, ref) => {
    const { backgroundColor, textColor } = useTheme('chatMessageBackgroundColor');

    const isSelf = userInfo.id === message?.sender.id;
    const senderName = getUserVisibleName(message.sender);
    const text = message.text ?? '';
    const date = getDatetime(message.created_at)
    const avatar = message?.sender.avatar;

    const messageItemClasses = cn(classes.message, isSelf ? classes['message--self'] : '')
    useEffect(() => {
        document.documentElement.style.setProperty('--message-bg-color', backgroundColor);
        document.documentElement.style.setProperty('--message-text-color', textColor);
    }, [backgroundColor, textColor]);

    return (
        <li className={messageItemClasses} data-loaded={!isWitnessMessage} ref={ref}>
            <RoundAvatar className={classes.message__avatar} src={avatar}/>
            <div className={classes.message__block} >
                <p className={classes.message__username}>{senderName}</p>
                <p className={classes.message__content}>{text}</p>
                <p className={classes.message__datetime}>{date}</p>
            </div>
        </li>
    );
});

export default MessageItem;