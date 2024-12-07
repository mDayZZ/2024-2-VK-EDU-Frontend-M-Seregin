import React from 'react';
import classes from './MessageFileItem.module.scss';
import {getFileName} from "../../utils/fileInfo.js";
import IconButton from "../UI/IconButton/IconButton.jsx";
import {Download} from "@mui/icons-material";
import {getShortFilename} from "../../utils/getShortFilename.js";
import IconLink from "../UI/IconLink/IconLink.jsx";
const MessageFileItem = ({file}) => {
    const fileName = getFileName(file);
    const shortenFileName = getShortFilename(fileName);

    const onDownloadClick = () => {
        let fileUrl = file;
        if (fileUrl.startsWith('http://')) {
            fileUrl = fileUrl.replace('http://', 'https://');
        }

        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (
        <li className={classes.fileItem}>
            <IconButton onClick={onDownloadClick}><Download fontSize='small'/></IconButton>
            <p>{shortenFileName}</p>
        </li>
    );
};

export default MessageFileItem;