import React, {useContext, useEffect, useMemo} from 'react';
import classes from './DefaultHeader.module.scss';
import {getTextColor} from "../../../utils/getTextColor.js";
import {ThemeContext} from "../../../contexts/ThemeContext.jsx";
import {useTheme} from "../../../hooks/useTheme.js";

const DefaultHeader = ({children, className}) => {
    const headerClasses = [classes.header, className].join(' ');
    const {backgroundColor, textColor} = useTheme('headerBackgroundColor');
    useEffect(() => {
        document.documentElement.style.setProperty('--header-bg-color', backgroundColor);
        document.documentElement.style.setProperty('--header-text-color', textColor);
    }, []);
    return (
        <header className={headerClasses}>
            {children}
        </header>
    )
};

export default DefaultHeader;