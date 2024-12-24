import React from 'react';
import classes from './Button.module.scss';
import clsx from "clsx";


const Button = ({children, color, ...props}) => {

    return (
        <button {...props} className={clsx(classes.button, classes.color)}>
            {children}
        </button>
    );
};

export default Button;