import React from 'react';
import classes from './Modal.module.scss';
import IconButton from "../IconButton/IconButton.jsx";
import {Close, Edit} from "@mui/icons-material";
const Modal = ({content, onClose, isOpen, onEdit}) => {

    if (!isOpen) {
        return null;
    }
    return (
        <div className={classes.modal} onClick={onClose}>
            <div className={classes.modal__container} onClick={e => e.stopPropagation()}>
                <div className={classes.modal__header}>
                    {onEdit && <IconButton onClick={onEdit}><Edit/></IconButton>}
                    <IconButton onClick={onClose}><Close/></IconButton>
                </div>
                <div className={classes.modal__content}>
                    {content}
                </div>
            </div>
        </div>
    );
};

export default Modal;