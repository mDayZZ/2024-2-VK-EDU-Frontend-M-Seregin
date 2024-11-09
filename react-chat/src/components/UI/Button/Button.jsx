import React from 'react';

import classes from './Button.module.scss'
import cn from "classnames";
const Button = ({className, type, onClick, onError, children}) => {
    const buttonClasses = cn(classes.button, className);
    return (
        <button type={type} className={buttonClasses} onClick={onClick} onError={onError}>
            {children}
        </button>
    );
};

export default Button;