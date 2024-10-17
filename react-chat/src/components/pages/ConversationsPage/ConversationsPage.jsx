import React, {useEffect, useState} from 'react';
import ConversationsHeader from "../../ConversationsHeader/ConversationsHeader.jsx";

import classes from "./ConversationsPage.module.scss";
import DefaultMain from "../../UI/DefaultMain/DefaultMain.jsx";
import {getChatsByUserId} from "../../../services/chatService.js";
import ConversationList from "../../ConversationList/ConversationList.jsx";

const ConversationsPage = ({userId, openChatPage}) => {
    const conversationsPageClasses = ['page', classes.conversationsPage].join(' ').trim()
    return (
        <div className={conversationsPageClasses}>
            <ConversationsHeader className={classes.conversationsPage__header} />
            <DefaultMain>
                <ConversationList userId={userId} openChatPage={openChatPage}/>
            </DefaultMain>
        </div>
    );
};

export default ConversationsPage;