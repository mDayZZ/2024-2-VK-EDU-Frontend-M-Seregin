import React from 'react';
import classes from './Modal.module.scss';
import IconButton from "../IconButton/IconButton.jsx";
import {Close} from "@mui/icons-material";
const Modal = ({content, onClose, isOpen}) => {



    return (
        <div className={classes.modal} onClick={onClose}>
            <div className={classes.modal__container} onClick={e => e.stopPropagation()}>
                <div className={classes.modal__header}>
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