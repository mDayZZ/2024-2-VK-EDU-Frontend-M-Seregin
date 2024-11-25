import React from 'react';
import {Link} from "react-router-dom";
import classes from './Logo.module.scss';
const Logo = () => {
    return (
        <span className={classes.logo}>
            <Link to='/'>
                <h1>Chatix</h1>
            </Link>
        </span>
    );
};

export default Logo;