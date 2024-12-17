import React, {forwardRef, useRef} from 'react';
import classes from './TextArea.module.scss';
import cn from "classnames";
import {useTheme} from "../../../hooks/useTheme.js";
const TextArea = forwardRef( ({className, ...props}, ref)  => {

    useTheme('input');


    return (
        <textarea ref={ref} className={cn(className, classes.textarea)} {...props}/>
    );
});

export default TextArea;