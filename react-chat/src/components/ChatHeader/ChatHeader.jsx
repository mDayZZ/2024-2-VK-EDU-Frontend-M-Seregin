import React, {useContext, useEffect, useMemo, useState} from 'react';
import DefaultHeader from "../UI/DefaultHeader/DefaultHeader.jsx";
import classes from "./ChatHeader.module.scss";
import IconButton from "../UI/IconButton/IconButton.jsx";
import {ArrowBack} from "@mui/icons-material";
import RoundAvatar from "../UI/RoundAvatar/RoundAvatar.jsx";
import {pluralize} from "../../utils/pluralize.js";
import {getUserById} from "../../services/userService.js";
import cn from "classnames";
const ChatHeader = ({chatInfo, chatTitle, chatStatus, contactAvatar, className, theme, onArrowBack}) => {
    const headerClasses = cn('chatHeader', className, classes.chatHeader);
    return (
        <DefaultHeader className={headerClasses}>
            <IconButton onClick={onArrowBack}><ArrowBack /></IconButton>
            <RoundAvatar src={chatInfo.chat_image_url || contactAvatar} className={classes.chatHeader__chatAvatar} />
            <div className={classes.chatHeader__chatInfo}>
                <h2 className={classes.chatHeader__chatTitle}>{chatTitle}</h2>
                <p className={classes.chatHeader__chatStatus}>{chatStatus}</p>
            </div>
        </DefaultHeader>
    );
};

export default ChatHeader;