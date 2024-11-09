import React from 'react';
import classes from './IconLink.module.scss';
import {Link} from "react-router-dom";
const IconLink = ({children, color, linkTo}) => {
    return (
        <Link  className={classes.iconLink} to={linkTo} style={{'color': color}}>
            {children}
        </Link>
    );
};

export default IconLink;