import React, {useContext, useMemo} from 'react';
import classes from './DefaultHeader.module.scss';
import {getTextColor} from "../../../utils/getTextColor.js";
import {ThemeContext} from "../../../contexts/ThemeContext.jsx";

const DefaultHeader = ({children, className, backgroundColor = ''}) => {
    const headerClasses = [classes.header, className].join(' ');
    const { theme, updateTheme } = useContext(ThemeContext);
    const textColor = useMemo(() => getTextColor(theme.headerBackgroundColor), [theme])
    return (
        <header className={headerClasses} style={{'background': theme.headerBackgroundColor, 'color': textColor}}>
            {children}
        </header>
    )
};

export default DefaultHeader;