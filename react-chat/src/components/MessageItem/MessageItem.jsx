import React, {useContext} from 'react';
import classes from './MessageItem.module.scss';
import RoundAvatar from "../UI/RoundAvatar/RoundAvatar.jsx";
import {getTextColor} from "../../utils/getTextColor.js";
import {ThemeContext} from "../../contexts/ThemeContext.jsx";
const MessageItem = ({message, userInfo}) => {
    //Нехватка username и avatar

    const {theme} = useContext(ThemeContext);
    const chatMessageBackgroundColor = theme.chatMessageBackgroundColor;
    const textColor = getTextColor(chatMessageBackgroundColor);

    const isSelf = userInfo.id === message.sender_id;
    console.log(message)

    return (
        <li className={[classes.message, isSelf ? classes['message--self'] : ''].join(' ').trim()}>
            <RoundAvatar className={classes.message__avatar} src={message.sender_profile_image_url}/>
            <div className={classes.message__block} style={{backgroundColor: chatMessageBackgroundColor, color: textColor}}>
                <p className={classes.message__username}>{message.sender_username}</p>
                <p className={classes.message__content}>{message.content}</p>
                <p className={classes.message__datetime}>{message.created_at}</p>
                {String(isSelf)}
            </div>
        </li>
    );
};

export default MessageItem;