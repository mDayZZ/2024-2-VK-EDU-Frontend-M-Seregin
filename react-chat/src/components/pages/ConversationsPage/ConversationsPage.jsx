import React, {useEffect, useState} from 'react';
import ConversationsHeader from "../../ConversationsHeader/ConversationsHeader.jsx";

import classes from "./ConversationsPage.module.scss";
import DefaultMain from "../../UI/DefaultMain/DefaultMain.jsx";
import {getChatsByUserId} from "../../../services/chatService.js";
import ConversationList from "../../ConversationList/ConversationList.jsx";
import cn from "classnames";
import Page from "../../UI/Page/Page.jsx";

const ConversationsPage = ({userInfo, openChatPage}) => {
    const conversationsPageClasses = cn('page', classes.conversationsPage);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchQueryChange = (newQuery) => {
        setSearchQuery(newQuery)
    }
    return (
        <Page className={conversationsPageClasses}>
            <ConversationsHeader userInfo={userInfo} searchQuery={searchQuery} handleSearchQueryChange={handleSearchQueryChange} className={classes.conversationsPage__header} />
            <DefaultMain>
                <ConversationList userId={userInfo.id} openChatPage={openChatPage} searchQuery={searchQuery} />
            </DefaultMain>
        </Page>
    );
};

export default ConversationsPage;