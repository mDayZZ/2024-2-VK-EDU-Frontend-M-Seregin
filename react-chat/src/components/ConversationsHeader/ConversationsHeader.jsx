import React from 'react';
import DefaultHeader from "../UI/DefaultHeader/DefaultHeader.jsx";
import classes from "./ConversationsHeader.module.scss";
import IconButton from "../UI/IconButton/IconButton.jsx";
import {ArrowBack, Menu, More} from "@mui/icons-material";
import cn from "classnames";
import ConversationsFinder from "../ConversationsFinder/ConversationsFinder.jsx";

const ConversationsHeader = ({className, backgroundColor, searchQuery, setSearchQuery}) => {
    const headerClasses = cn('chatListHeader', className);
    return (
        <DefaultHeader className={headerClasses} backgroundColor={backgroundColor}>
            <div className={classes.chatListHeader__titleContainer}>
                <IconButton><Menu /></IconButton>
                <h2 className={classes.chatListHeader__title}>Чаты</h2>
            </div>

            <ConversationsFinder searchQuery={searchQuery} setSearchQuery={setSearchQuery}></ConversationsFinder>
        </DefaultHeader>
    );
};

export default ConversationsHeader;