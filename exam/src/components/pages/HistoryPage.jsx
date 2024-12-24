import React from 'react';
import Container from "../UI/Container/Container.jsx";
import {useSelector} from "react-redux";
import {historySelector} from "../../store/history/historySelectors.js";
import HistoryCard from "../HistoryCard/HistoryCard.jsx";
import HistoryList from "../HistoryList/HistoryList.jsx";
import SectionHeader from "../UI/SectionHeader/SectionHeader.jsx";
import Translator from "../Translator/Translator.jsx";
import Section from "../UI/Section/Section.jsx";

const HistoryPage = () => {
    const history = useSelector(historySelector);
    return (
        <div>
            <Section>
                <Container>
                    <h2>История</h2>
                </Container>
                <HistoryList history={history} />
            </Section>
        </div>
    );
};

export default HistoryPage;