import React, {useContext} from 'react';
import classes from './SendButton.module.scss';
import {ThemeContext} from "../../../contexts/ThemeContext.jsx";
import {getTextColor} from "../../../utils/getTextColor.js";
import cn from "classnames";
const SendButton = ({children, className, color, onClick}) => {
    const {theme} = useContext(ThemeContext);
    const backgroundColor = theme.ButtonBackgroundColor;
    const textColor = getTextColor(backgroundColor);
    const buttonClasses = cn(className, classes.defaultButton)

    return (
        <button className={buttonClasses} onClick={onClick} style={{backgroundColor: backgroundColor, 'color': textColor}}>
            {children}
        </button>
    );
};

export default SendButton;