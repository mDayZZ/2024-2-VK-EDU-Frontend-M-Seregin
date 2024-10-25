import React from 'react';
import DefaultHeader from "../UI/DefaultHeader/DefaultHeader.jsx";
import classes from "./ConversationsHeader.module.scss";
import IconButton from "../UI/IconButton/IconButton.jsx";
import {ArrowBack, Menu, More} from "@mui/icons-material";
import cn from "classnames";

const ConversationsHeader = ({className, backgroundColor}) => {
    const headerClasses = cn('chatListHeader', className);
    return (
        <DefaultHeader className={headerClasses} backgroundColor={backgroundColor}>
            <IconButton><Menu /></IconButton>
            <h2 className={classes.chatListHeader__title}>Чаты</h2>
        </DefaultHeader>
    );
};

export default ConversationsHeader;