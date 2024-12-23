import {useEffect, useState} from 'react';
import classes from './Translator.module.scss';
import ChooseTranslate from "../ChooseTranslate/ChooseTranslate.tsx";
import {useDebounce} from "../../hooks/useDebounce.ts";
import translate from "../../services/translateService/translate/translate.ts";
import {useDispatch, useSelector} from "react-redux";
import {saveHistory} from "../../store/translator/translatorSlice.ts";
import {historySelector} from "../../store/translator/translatorSelectors.ts";




const Translator = () => {
    const [fromLang, setFromLang] = useState('');
    const [toLang, setToLang] = useState('en-GB');


    const [textFrom, setTextFrom] = useState('');
    const debouncedTextFrom = useDebounce(textFrom, 400);

    const [textTo, setTextTo] = useState('');

    const dispatch = useDispatch();


    const history = useSelector(historySelector);



    useEffect(() => {

        if (!debouncedTextFrom) {
            return;
        }

        if (!fromLang && !toLang) {
            return;
        }


        translate({text: debouncedTextFrom, from: fromLang, to: toLang})
            .then(translatedText => {
                setTextTo(translatedText);
                dispatch(saveHistory({from: fromLang, to: toLang, textTo: textTo}));

            })
    }, [debouncedTextFrom, fromLang, toLang])



    return (
        <div className={classes.translator}>

            <div className={classes.header}>
                <p>Detect Language</p>
                <ChooseTranslate langState={fromLang} setLangState={setFromLang}/>
                <ChooseTranslate langState={toLang} setLangState={setToLang}/>
            </div>
            <form className={classes.translateForm}>
                <textarea value={textFrom} onChange={(e) => {setTextFrom(e.target.value)}}/>

                <textarea value={textTo}/>
            </form>
            <div>

            </div>


        </div>
    );
};

export default Translator;