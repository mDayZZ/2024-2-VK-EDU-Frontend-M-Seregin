import React from 'react';

import classes from './Button.module.scss'
import cn from "classnames";
import {useTheme} from "../../../hooks/useTheme.js";
import Loader from "../Loader/Loader.jsx";
const Button = ({className, type, isLoading, onClick, onError, children, ...props}) => {
    const buttonClasses = cn(classes.button, className);
    useTheme('button');
    return (
        <button {...props} type={type} className={buttonClasses} onClick={onClick} onError={onError}>
            {isLoading
                ? <Loader/>
                : children
            }

        </button>
    );
};

export default Button;