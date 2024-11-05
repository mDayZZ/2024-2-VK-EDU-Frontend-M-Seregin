import React, {useEffect, useState} from 'react';
import ConversationsHeader from "../../ConversationsHeader/ConversationsHeader.jsx";

import classes from "./ConversationsPage.module.scss";
import DefaultMain from "../../UI/DefaultMain/DefaultMain.jsx";
import {getChatsByUserId} from "../../../services/chatService.js";
import ConversationList from "../../ConversationList/ConversationList.jsx";
import cn from "classnames";
import Page from "../../UI/Page/Page.jsx";

const ConversationsPage = ({userId, openChatPage}) => {
    const conversationsPageClasses = cn('page', classes.conversationsPage);
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <Page className={conversationsPageClasses}>
            <ConversationsHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} className={classes.conversationsPage__header} />
            <DefaultMain>
                <ConversationList userId={userId} openChatPage={openChatPage} searchQuery={searchQuery} />
            </DefaultMain>
        </Page>
    );
};

export default ConversationsPage;