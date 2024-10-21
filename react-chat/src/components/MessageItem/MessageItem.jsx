import React, {useContext} from 'react';
import classes from './MessageItem.module.scss';
import RoundAvatar from "../UI/RoundAvatar/RoundAvatar.jsx";
import {getTextColor} from "../../utils/getTextColor.js";
import {ThemeContext} from "../../contexts/ThemeContext.jsx";
import {getDatetime} from "../../utils/date.js";
const MessageItem = ({message, isWitnessMessage, userInfo}) => {
    //Нехватка username и avatar

    const {theme} = useContext(ThemeContext);
    const chatMessageBackgroundColor = theme.chatMessageBackgroundColor;
    const textColor = getTextColor(chatMessageBackgroundColor);

    const isSelf = userInfo.id === message.sender_id;
    return (
        <li className={[classes.message, isSelf ? classes['message--self'] : ''].join(' ').trim()} data-loaded={!isWitnessMessage}>
            <RoundAvatar className={classes.message__avatar} src={message.sender_profile_image_url}/>
            <div className={classes.message__block} style={{backgroundColor: chatMessageBackgroundColor, color: textColor}}>
                <p className={classes.message__username}>{message.sender_username}</p>
                <p className={classes.message__content}>{message.content}</p>
                <p className={classes.message__datetime}>{getDatetime(message.created_at)}</p>
            </div>
        </li>
    );
};

export default MessageItem;