import React, {useEffect, useRef} from 'react';
import classes from './RoundAvatar.module.scss';
import cn from "classnames";
import {useLazyImage} from "../../../hooks/useLazyImage.js";

const DEFAULT_AVATAR_PATH = 'images/avatars/default_avatar.png';

const RoundAvatar = ({src = DEFAULT_AVATAR_PATH, className}) => {
    const avatarClasses = cn(className, classes.roundAvatar);
    const imageRef = useLazyImage(src);

    const onLoadError = (e) => {
        e.target.onerror = null;
        e.target.src = DEFAULT_AVATAR_PATH;
    }
    return (
        <img ref={imageRef} className={avatarClasses} src={src || DEFAULT_AVATAR_PATH} onError={onLoadError} />
    );
};

export default RoundAvatar;