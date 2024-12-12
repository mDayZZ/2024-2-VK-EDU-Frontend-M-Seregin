import React, {useEffect, useState} from 'react';
import ConversationsHeader from "../../ConversationsHeader/ConversationsHeader.jsx";

import classes from "./ConversationsPage.module.scss";
import DefaultMain from "../../UI/DefaultMain/DefaultMain.jsx";
import ConversationList from "../../ConversationList/ConversationList.jsx";
import cn from "classnames";
import Page from "../../UI/Page/Page.jsx";
import {useSelector} from "react-redux";
import {authSelector} from "../../../store/auth/authSelectors.js";
import useDebounce from "../../../hooks/useDebounce.js";

const ConversationsPage = ({}) => {
    const {user : userInfo } = useSelector(authSelector);

    const conversationsPageClasses = cn('page', classes.conversationsPage);
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    const handleSearchQueryChange = (newQuery) => {
        setSearchQuery(newQuery)
    }


    return (
        <Page className={conversationsPageClasses}>
            <ConversationsHeader userInfo={userInfo} searchQuery={searchQuery} handleSearchQueryChange={handleSearchQueryChange} className={classes.conversationsPage__header} />
            <DefaultMain>
                <ConversationList userId={userInfo.id} searchQuery={debouncedSearchQuery} />
            </DefaultMain>
        </Page>
    );
};

export default ConversationsPage;