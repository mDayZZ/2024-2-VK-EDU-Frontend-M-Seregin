import React from 'react';
import classes from './DefaultHeader.module.scss';
import {useTheme} from "../../../hooks/useTheme.js";

const DefaultHeader = ({children, className}) => {
    const headerClasses = [classes.header, className].join(' ');
    const {backgroundColor, textColor} = useTheme('header');

    return (
        <header className={headerClasses}>
            {children}
        </header>
    )
};

export default DefaultHeader;