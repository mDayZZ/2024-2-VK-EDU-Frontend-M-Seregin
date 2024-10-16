import React from 'react';
import ChatListHeader from "../../ChatListHeader/ChatListHeader.jsx";

import classes from "./ChatListPage.module.scss";
import DefaultMain from "../../UI/DefaultMain/DefaultMain.jsx";

const ChatListPage = ({}) => {
    const chatListPageClasses = ['page', classes.chatListPage].join(' ').trim()

    return (
        <div className={chatListPageClasses}>
            <ChatListHeader className={classes.chatListPage__header} />
            <DefaultMain></DefaultMain>
        </div>
    );
};

export default ChatListPage;