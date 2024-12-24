import React from 'react';
import classes from './TranslateTextArea.module.scss';

const TranslateTextArea = ({sourceText, setSourceText}) => {
    const maxValue = 500;
    const symbolsValue = sourceText.length;
    return (
        <div className={classes.container}>
            <textarea className={classes.textarea} value={sourceText} onChange={(e) => setSourceText(e.target.value)}/>
            <p className={classes.symbolsCounter}>{symbolsValue}/{maxValue}</p>
        </div>
    );
};

export default TranslateTextArea;