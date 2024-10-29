import React, {useState} from 'react';
import FinderInput from "../UI/FinderInput/FinderInput.jsx";
import classes from "./ConversationsFinder.module.scss";

const ConversationsFinder = ({searchQuery, setSearchQuery}) => {



    return (
        <FinderInput className={classes.conversationsFinder} value={searchQuery} onInput={(event) => setSearchQuery(event.target.value)}/>
    );
};

export default ConversationsFinder;