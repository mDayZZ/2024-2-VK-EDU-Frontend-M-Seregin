import React from 'react';
import classes from './DragZone.module.scss';
import {UploadFile} from "@mui/icons-material";
const DragZone = () => {
    const text = 'Перетащите файлы сюда'
    return (
        <div className={classes.dragZone}>
            <div className={classes.dragZone__info}>
                <p className={classes.dragZone__text}>{text}</p>
                <UploadFile />
            </div>
        </div>
    );
};

export default DragZone;