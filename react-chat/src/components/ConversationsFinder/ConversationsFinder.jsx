import React, {useState} from 'react';
import FinderInput from "../UI/FinderInput/FinderInput.jsx";

const ConversationsFinder = ({searchQuery, handleSearchQueryChange}) => {
    const onSearchInput = (event) => handleSearchQueryChange(event.target.value);


    return (
        <FinderInput value={searchQuery} onInput={onSearchInput}/>
    );
};

export default ConversationsFinder;