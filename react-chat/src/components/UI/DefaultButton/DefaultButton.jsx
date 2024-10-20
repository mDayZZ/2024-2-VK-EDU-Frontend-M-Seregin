import React, {useContext} from 'react';
import classes from './DefaultButton.module.scss';
import {ThemeContext} from "../../../contexts/ThemeContext.jsx";
import {getTextColor} from "../../../utils/getTextColor.js";
const DefaultButton = ({children, color, onClick}) => {
    const {theme} = useContext(ThemeContext);
    const backgroundColor = theme.ButtonBackgroundColor;
    const textColor = getTextColor(backgroundColor);

    return (
        <button className={classes.defaultButton} onClick={onClick} style={{backgroundColor: backgroundColor, 'color': textColor}}>
            {children}
        </button>
    );
};

export default DefaultButton;