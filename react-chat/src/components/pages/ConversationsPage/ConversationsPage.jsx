import React, {useEffect, useState} from 'react';
import ConversationsHeader from "../../ConversationsHeader/ConversationsHeader.jsx";

import classes from "./ConversationsPage.module.scss";
import DefaultMain from "../../UI/DefaultMain/DefaultMain.jsx";
import {getChatsByUserId} from "../../../services/chatService.js";
import ConversationList from "../../ConversationList/ConversationList.jsx";

const ConversationsPage = ({userId}) => {
    const chatListPageClasses = ['page', classes.chatListPage].join(' ').trim()


    return (
        <div className={chatListPageClasses}>
            <ConversationsHeader className={classes.chatListPage__header} />
            <DefaultMain>
                <ConversationList userId={userId}/>
            </DefaultMain>
        </div>
    );
};

export default ConversationsPage;