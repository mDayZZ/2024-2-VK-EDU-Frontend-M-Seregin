import React from 'react';
import HistoryCard from "../HistoryCard/HistoryCard.jsx";
const HistoryList = ({history}) => {
    return (
        history.length > 0
            ?
            <ul className={classes.historyList}>
                {history.map(historyItem => (<li key={historyItem.id}><HistoryCard item={historyItem}/></li>))}
            </ul>

            :
            <EmptyCard />

    );
};
import classes from "./HistoryList.module.scss";

import SectionHeader from "../UI/SectionHeader/SectionHeader.jsx";
import EmptyCard from "../UI/EmptyCard/EmptyCard.jsx";

export default HistoryList;