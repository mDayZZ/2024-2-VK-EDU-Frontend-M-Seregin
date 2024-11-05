import React from 'react';
import classes from './IconButton.module.scss';
const IconButton = ({children, color, onClick, type}) => {
    return (
        <button type={type || "button"} className={classes.iconButton} onClick={onClick} style={{'color': color}}>
            {children}
        </button>
    );
};

export default IconButton;