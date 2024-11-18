import React from 'react';
import classes from "./MessageFileList.module.scss";
import MessageFileItem from "../MessageFileItem/MessageFileItem.jsx";

const MessageFileList = ({files}) => {
    return (
        <ul className={classes.fileList}>
            {files.map((file, index) => (<MessageFileItem key={index} file={file} />))}
        </ul>
    );
};

export default MessageFileList;