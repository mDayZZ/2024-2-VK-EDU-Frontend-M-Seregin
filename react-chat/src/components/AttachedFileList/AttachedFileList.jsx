import React from 'react';
import AttachedFileItem from "../AttachedFileItem/AttachedFileItem.jsx";
import classes from './AttachedFileList.module.scss';

const AttachedFileList = ({attachedFiles, onDeleteFile}) => {
    return (
        <ul className={classes.fileList}>
            {
                attachedFiles.map((attachedFile, index) => <AttachedFileItem attachedFile={attachedFile} onDeleteFile={onDeleteFile} index={index}  key={index} />)
            }
        </ul>
    );
};

export default AttachedFileList;