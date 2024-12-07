import React, {useEffect} from 'react';
import classes from './FinderInput.module.scss';
import cn from "classnames";
import {useTheme} from "../../../hooks/useTheme.js";
import {getTextColor} from "../../../utils/getTextColor.js";
import {Search} from "@mui/icons-material";

const FinderInput = ({className, value, ref, onInput}) => {
    const {backgroundColor, textColor} = useTheme('input');

    const inputClasses = cn(classes.finderInput__input, className);

    return (
        <div className={classes.finderInput}>
            <input className={inputClasses} value={value} ref={ref} onInput={onInput}/>
            <Search className={classes.finderInput__icon}/>
        </div>

    );
};

export default FinderInput;