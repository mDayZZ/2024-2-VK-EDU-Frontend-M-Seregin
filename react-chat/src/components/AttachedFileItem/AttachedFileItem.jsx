import React from 'react';
import classes from './AttachedFileItem.module.scss';
import {Clear} from "@mui/icons-material";
import {getShortFilename} from "../../utils/getShortFilename.js";
import IconButton from "../UI/IconButton/IconButton.jsx";

const AttachedFileItem = ({attachedFile, onDeleteFile, index}) => {
    const fileTitle = getShortFilename(attachedFile?.name, 15);
    return (
        <li className={classes.fileItem}>
            <IconButton onClick={() => onDeleteFile(index)}><Clear fontSize='small'/></IconButton>
            <p className={classes.fileItem__title}>{fileTitle}</p>
        </li>
    );
};

export default AttachedFileItem;