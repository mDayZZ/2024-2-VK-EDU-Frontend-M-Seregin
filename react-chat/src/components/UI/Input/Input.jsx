import React from 'react';
import classes from './Input.module.scss';
import cn from "classnames";
const Input = ({value, type, onInput, maxLength, name, className, required, placeholder, pattern}) => {

    const inputClasses = cn(className, classes.input);
    return (
        <input pattern={pattern} type={type} placeholder={placeholder} value={value} onInput={onInput} maxLength={maxLength} name={name} required={required} className={inputClasses} />
    );
};

export default Input;