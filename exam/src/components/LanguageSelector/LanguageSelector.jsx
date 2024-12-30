import React from 'react';
import classes from './LanguageSelector.module.scss';

const LanguageSelector = ({languagesList, langState, setLangState, excludeLang}) => {
    return (
        <select className={classes.selector} value={langState} onChange={(e) => setLangState(e.target.value)} >
            {languagesList.map((language) => {
                if (language.code === excludeLang) {
                    return;
                }

                return <option className={classes.option} key={language.code} value={language.code}>{language.name}</option>
            })}

        </select>
    );
};

export default LanguageSelector;