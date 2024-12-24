import React from 'react';
import classes from './HistoryCard.module.scss';
import {langs} from "../../utils/langs.js";
import {ArrowRight, ArrowRightAlt, Delete, DeleteOutline} from "@mui/icons-material";
import Container from "../UI/Container/Container.jsx";
import IconButton from "../UI/IconButton/IconButton.jsx";
import {useDispatch} from "react-redux";
import {deleteById} from "../../store/history/historySlice.js";

const HistoryCard = ({item}) => {
    const dispatch = useDispatch();

    const langFromTitle = langs.getLanguageName(item.from);
    const langToTitle = langs.getLanguageName(item.to);

    const sourceText = item.sourceText;
    const translatedText = item.resultedText;

    const handleDeleteItem = () => {
        dispatch(deleteById(item.id));
    }



    return (
        <div className={classes.historyCard}>
            <Container>
                <div className={classes.content}>
                    <div className={classes.header}>
                        <div className={classes.translateInfo}>
                            <p>{langFromTitle}</p>
                            <ArrowRightAlt fontSize="small"/>
                            <p>{langToTitle}</p>
                        </div>
                        <IconButton onClick={handleDeleteItem} color='gray' icon={<DeleteOutline/>}/>

                    </div>
                    <div className={classes.body}>
                    <p className={classes.sourceText}>{sourceText}</p>
                        <p className={classes.translatedText}>{translatedText}</p>
                    </div>
                </div>

            </Container>
        </div>
    );
};

export default HistoryCard;