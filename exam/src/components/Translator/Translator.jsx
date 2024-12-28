import React, {useEffect, useState} from 'react';
import classes from './Translator.module.scss';
import {SwapHoriz, Swipe} from "@mui/icons-material";
import IconButton from "../UI/IconButton/IconButton.jsx";
import languages from "../../utils/languages.json";
import LanguageSelector from "../LanguageSelector/LanguageSelector.jsx";
import {useDebounce} from "../../hooks/useDebounce.js";
import translate from "../../services/translateService/translate/translate.js";
import {useDispatch, useSelector} from "react-redux";
import {historySelector} from "../../store/history/historySelectors.js";
import {saveTranslate} from "../../store/history/historySlice.js";
import {v4 as uuidv4} from "uuid";
import {langs} from "../../utils/langs.js";
import TranslateTextArea from "../TranslateTextArea/TranslateTextArea.jsx";



const Translator = () => {
    const MAX_VALUE=500;
    const languagesList = langs.getLanguages();
    const dispatch = useDispatch();

    const [langFrom, setLangFrom] = useState('Autodetect');
    const [langTo, setLangTo] = useState('en-GB');
    const [sourceText, setSourceText] = useState('');
    const debouncedSourceText = useDebounce(sourceText, 1000);
    const [translatedText, setTranslatedText] = useState('');

    const handleChangeText = (e) => {
        if ((sourceText.length >= MAX_VALUE) && (e.target.value.length > sourceText.length)) {
            setSourceText(sourceText.substring(0, MAX_VALUE));
            return;
        }

        setSourceText(e.target.value);
    }

    useEffect(() => {
        if (!debouncedSourceText) {
            return;
        }
        const sourceText = debouncedSourceText.trim()

        translate({text: sourceText, from: langFrom, to: langTo})
            .then(result => {
                setTranslatedText(result);
                dispatch(saveTranslate({
                    id: uuidv4(),
                    from: langFrom,
                    to: langTo,
                    sourceText: sourceText,
                    resultedText: result
                }));
            }).catch(err => {
                setTranslatedText(`Произошла ошибка: ${err?.message}`)
        })
    }, [debouncedSourceText, langFrom, langTo])

    const handleSwapLangs = () => {
        const pastLangFrom = langFrom;
        const pastLangTo = langTo;
        setLangTo(pastLangFrom);
        setLangFrom(pastLangTo);
    }




    return (
        <div className={classes.translator}>
            <div className={classes.container}>
                <div className={classes.block}>
                    <LanguageSelector languagesList={languagesList} langState={langFrom} setLangState={setLangFrom} excludeLang={langTo}/>
                    <TranslateTextArea sourceText={sourceText} onChangeText={handleChangeText} maxValue={500}/>
                </div>
                <IconButton onClick={handleSwapLangs} icon={<SwapHoriz/>}/>
                <div className={classes.block}>
                    <LanguageSelector languagesList={languagesList.filter(lang => lang.code !== 'Autodetect')} langState={langTo} setLangState={setLangTo} excludeLang={langFrom}/>
                    <p>{translatedText}</p>
                </div>
            </div>
        </div>
    );
};

export default Translator;