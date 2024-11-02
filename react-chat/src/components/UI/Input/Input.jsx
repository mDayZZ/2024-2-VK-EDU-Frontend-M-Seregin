import React from 'react';
import classes from './Input.module.scss';
import cn from "classnames";
const Input = ({value, onInput, maxLength, name, className, required}) => {

    const inputClasses = cn(className, classes.input);
    return (
        <input value={value} onInput={onInput} maxLength={maxLength} name={name} required={required} className={inputClasses} />
    );
};

export default Input;