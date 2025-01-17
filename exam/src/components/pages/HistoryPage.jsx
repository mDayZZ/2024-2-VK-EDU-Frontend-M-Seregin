import React from 'react';
import Container from "../UI/Container/Container.jsx";
import {useDispatch, useSelector} from "react-redux";
import {historySelector} from "../../store/history/historySelectors.js";
import HistoryCard from "../HistoryCard/HistoryCard.jsx";
import HistoryList from "../HistoryList/HistoryList.jsx";
import SectionHeader from "../UI/SectionHeader/SectionHeader.jsx";
import Translator from "../Translator/Translator.jsx";
import Section from "../UI/Section/Section.jsx";
import Button from "../UI/Button/Button.jsx";
import {deleteAll} from "../../store/history/historySlice.js";
// import {Button} from "@mui/material";

const HistoryPage = () => {
    const history = useSelector(historySelector);
    const dispatch = useDispatch();

    const handleDeleteAll = () => {
        dispatch(deleteAll());
    }
    return (
        <div>
            <Section>
                <Container>
                    <h2>История</h2>
                    <Button onClick={handleDeleteAll} color='red' style='text'>Очистить историю</Button>
                </Container>
            </Section>
            <Section>

                <HistoryList history={history}/>
            </Section>
        </div>
    );
};

export default HistoryPage;