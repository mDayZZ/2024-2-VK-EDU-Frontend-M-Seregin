import React, {useContext, useEffect, useMemo, useState} from 'react';
import DefaultHeader from "../UI/DefaultHeader/DefaultHeader.jsx";
import classes from "./ChatHeader.module.scss";
import IconButton from "../UI/IconButton/IconButton.jsx";
import {ArrowBack} from "@mui/icons-material";
import RoundAvatar from "../UI/RoundAvatar/RoundAvatar.jsx";
import {pluralize} from "../../utils/pluralize.js";
import {getUserById} from "../../services/userService.js";
const ChatHeader = ({userInfo, chatInfo, chatMembers, className, theme, onArrowBack}) => {
    const HeaderClasses = ['chatHeader', className, classes.chatHeader].join(' ').trim();


    return (
        <DefaultHeader className={HeaderClasses}>
            <IconButton onClick={onArrowBack}><ArrowBack /></IconButton>
            <RoundAvatar className={classes.chatHeader__chatAvatar} />
            <div className={classes.chatHeader__chatInfo}>
                <h2 className={classes.chatHeader__chatTitle}>{chatInfo.name}</h2>
                <p className={classes.chatHeader__chatStatus}>stat</p>
            </div>
        </DefaultHeader>
    );
};

export default ChatHeader;