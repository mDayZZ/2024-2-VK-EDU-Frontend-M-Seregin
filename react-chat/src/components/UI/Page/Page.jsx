import React from 'react';
import classes from './Page.module.scss';
import cn from "classnames";

const Page = ({children, className, onDragEnter, onDragLeave, onDragOver, onDrop}) => {

    const pageClasses = cn(classes.page, className);

    return (
        <div className={pageClasses} onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDragOver={onDragOver} onDrop={onDrop}>
            {children}
        </div>
    );
};

export default Page;