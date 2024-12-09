import React from 'react';

import classes from './Button.module.scss'
import cn from "classnames";
import {useTheme} from "../../../hooks/useTheme.js";
const Button = ({className, type, onClick, onError, children}) => {
    const buttonClasses = cn(classes.button, className);
    useTheme('button');
    return (
        <button type={type} className={buttonClasses} onClick={onClick} onError={onError}>
            {children}
        </button>
    );
};

export default Button;