import React from 'react';
import classes from './Section.module.scss';

const Section = ({children}) => {
    return (
        <div className={classes.section}>
            {children}
        </div>
    );
};

export default Section;