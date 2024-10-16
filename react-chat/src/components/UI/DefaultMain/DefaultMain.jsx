import React, {useContext, useMemo} from 'react';
import classes from "../DefaultHeader/DefaultHeader.module.scss";
import {getTextColor} from "../../../utils/getTextColor.js";
import {ThemeContext} from "../../../contexts/ThemeContext.jsx";


const DefaultMain = ({children, className, backgroundColor = ''}) => {
    const mainClasses = ['main', classes.main, className].join(' ');
    const {theme} = useContext(ThemeContext);
    const textColor = useMemo(() => getTextColor(theme.mainBackgroundColor), [theme]);
    return (
        <main className={mainClasses} style={{'background': theme.mainBackgroundColor, 'color': textColor}}>
            {children}
        </main>
    )
};
export default DefaultMain;