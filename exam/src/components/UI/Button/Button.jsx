import React from 'react';
import classes from './Button.module.scss';
import clsx from "clsx";


const Button = ({children, color, style, ...props}) => {

    return (
        <button {...props} className={clsx(classes.button, color && classes[color], style && classes[style])}>
            {children}
        </button>
    );
};

export default Button;