import React from 'react';
import classes from "../DropdownButton/DropdownButton.module.scss";
import cn from "classnames";

const DropdownButton = ({onClick, children, className}) => {
    const dropDownButtonClasses = cn(className, classes.dropdownButton);
    return (
        <button className={dropDownButtonClasses} onClick={onClick}>{children}</button>
    );
};

export default DropdownButton;