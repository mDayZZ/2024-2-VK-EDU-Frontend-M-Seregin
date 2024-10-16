import React from 'react';
import DefaultHeader from "../UI/DefaultHeader/DefaultHeader.jsx";
import classes from "./ChatListHeader.module.scss";
import IconButton from "../UI/IconButton/IconButton.jsx";
import {ArrowBack, Menu, More} from "@mui/icons-material";

const ChatListHeader = ({className, backgroundColor}) => {
    const headerClasses = ['chatListHeader', className].join(' ');
    return (
        <DefaultHeader className={headerClasses} backgroundColor={backgroundColor}>
            <IconButton><Menu /></IconButton>
            <h2 className={classes.chatListHeader__title}>Чаты</h2>
        </DefaultHeader>
    );
};

export default ChatListHeader;