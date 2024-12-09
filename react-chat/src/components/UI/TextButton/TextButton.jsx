import React from 'react';

import classes from './TextButton.module.scss'
import cn from "classnames";
const TextButton = ({className, type, onClick, onError, children}) => {
    const buttonClasses = cn(classes.textButton, className);
    return (
        <button type={type} className={buttonClasses} onClick={onClick} onError={onError}>
            {children}
        </button>
    );
};

export default TextButton;