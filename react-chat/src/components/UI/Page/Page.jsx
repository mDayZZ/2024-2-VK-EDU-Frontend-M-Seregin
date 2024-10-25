import React from 'react';
import classes from './Page.module.scss';
import cn from "classnames";

const Page = ({children, className}) => {

    const pageClasses = cn(classes.page, className);

    return (
        <div className={pageClasses}>
            {children}
        </div>
    );
};

export default Page;