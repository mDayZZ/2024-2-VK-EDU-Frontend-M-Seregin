import React, {useEffect} from 'react';
import classes from './TranslateTextArea.module.scss';
import clsx from "clsx";

const TranslateTextArea = ({sourceText, onChangeText, maxValue}) => {

    const symbolsValue = sourceText.length;
    const isOverflow = symbolsValue >= maxValue;


    return (
        <div className={classes.container}>
            <textarea className={classes.textarea} value={sourceText} onChange={onChangeText}/>
            <p className={clsx(classes.symbolsCounter)}>
                <span className={clsx({[classes.overflow]: isOverflow})}>{symbolsValue}</span>/{maxValue}</p>
        </div>
    );
};

export default TranslateTextArea;