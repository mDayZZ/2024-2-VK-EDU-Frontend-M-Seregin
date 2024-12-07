import React, {forwardRef} from 'react';
import classes from './IconButton.module.scss';
import cn from "classnames";
const IconButton = forwardRef(({children, className, color, onClick, type}, ref) => {
    const btnClasses = cn(classes.iconButton, className);

    return (
        <button ref={ref} type={type || "button"} className={btnClasses} onClick={onClick} style={{'color': color}}>
            {children}
        </button>
    );
});

export default IconButton;