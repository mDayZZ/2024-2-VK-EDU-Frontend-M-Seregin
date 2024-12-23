import React from 'react';
import classes from './Button.module.scss';

interface IButtonProps {
    children: string;
    onClick?: () => void;
}

const Button = ({children, ...props}: IButtonProps) => {
    return (
        <button {...props} className={classes.button}>
            {children}
        </button>
    );
};

export default Button;