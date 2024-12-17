import React, {useEffect, useRef} from 'react';
import RoundAvatar from "../UI/RoundAvatar/RoundAvatar.jsx";

import classes from "./ChangableAvatar.module.scss";
import {AddAPhoto} from "@mui/icons-material";
import {getFileTypeByUrl} from "../../utils/fileInfo.js";
const ChangableAvatar = ({src, setNewUserAvatar, className}) => {

    const fileInputRef = useRef(null);

    const onAvatarClick = (e) => {
        fileInputRef.current.value = null;
        fileInputRef.current.click();
    }

    const onInputFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        const fileType = getFileTypeByUrl(file.name);
        if (fileType !== 'image') {
            return;
        }

        setNewUserAvatar(file);
    }

    return (
        <button type='button' onClick={onAvatarClick} className={classes.changableAvatar}>
            <input onChange={onInputFileChange} ref={fileInputRef} type='file' accept='.png, .jpg, .jpeg, .webp' className={classes.changableAvatar__fileInput}/>
            <RoundAvatar src={src}/>
            <span className={classes.changableAvatar__icon}>
                <AddAPhoto/>
            </span>
        </button>
    );
};

export default ChangableAvatar;