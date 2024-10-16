import React from 'react';
import classes from './IconButton.module.scss';
const IconButton = ({children, color}) => {
    return (
        <button className={classes.iconButton} style={{'color': color}}>
            {children}
        </button>
    );
};

export default IconButton;