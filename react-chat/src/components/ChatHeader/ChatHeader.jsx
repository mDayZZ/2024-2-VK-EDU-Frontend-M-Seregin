import React, {useContext, useEffect, useMemo, useState} from 'react';
import DefaultHeader from "../UI/DefaultHeader/DefaultHeader.jsx";
import classes from "./ChatHeader.module.scss";
import IconButton from "../UI/IconButton/IconButton.jsx";
import {ArrowBack} from "@mui/icons-material";
import RoundAvatar from "../UI/RoundAvatar/RoundAvatar.jsx";
import {pluralize} from "../../utils/pluralize.js";
import {getUserById} from "../../services/userService.js";
import cn from "classnames";
import IconLink from "../UI/IconLink/IconLink.jsx";
const ChatHeader = ({chatInfo, className, onArrowBack}) => {
    const headerClasses = cn('chatHeader', className, classes.chatHeader);
    return (
        <DefaultHeader className={headerClasses}>
            <IconLink linkTo={'/chats'}><ArrowBack /></IconLink>
            <RoundAvatar src={chatInfo?.chat_image_url || null} className={classes.chatHeader__chatAvatar} />
            <div className={classes.chatHeader__chatInfo}>
                <h2 className={classes.chatHeader__chatTitle}>{chatInfo?.name || 'Загрузка...'}</h2>
                <p className={classes.chatHeader__chatStatus}>{chatInfo?.status || 'Загрузка...'}</p>
            </div>
        </DefaultHeader>
    );
};

export default ChatHeader;