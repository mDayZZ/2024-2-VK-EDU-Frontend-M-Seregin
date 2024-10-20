import React, {useContext, useMemo} from 'react';
import classes from "../DefaultMain/DefaultMain.module.scss";
import {getTextColor} from "../../../utils/getTextColor.js";
import {ThemeContext} from "../../../contexts/ThemeContext.jsx";


const DefaultMain = ({children, mainRef, className, backgroundColor = ''}) => {
    const mainClasses = ['main', classes.main, className].join(' ');
    const {theme} = useContext(ThemeContext);
    const textColor = useMemo(() => getTextColor(theme.mainBackgroundColor), [theme]);
    return (
        <main ref={mainRef} className={mainClasses} style={{'background': theme.mainBackgroundColor, 'color': textColor}}>
            {children}
        </main>
    )
};
export default DefaultMain;