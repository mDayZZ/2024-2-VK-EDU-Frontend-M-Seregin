import React from 'react';
import classes from './Form.module.scss';
import cn from "classnames";
const Form = ({className, children, onSubmit}) => {
    const formClasses = cn(classes.form, className);
    return (
        <form className={formClasses} name={name} onSubmit={onSubmit}>
            {children}
        </form>
    );
};

export default Form;