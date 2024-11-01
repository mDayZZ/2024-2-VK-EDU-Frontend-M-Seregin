import React from 'react';
import classes from './RoundAvatar.module.scss';
import cn from "classnames";

const DEFAULT_AVATAR_PATH = 'images/avatars/default_avatar.png';

const RoundAvatar = ({src = DEFAULT_AVATAR_PATH, className}) => {
    const avatarClasses = cn(className, classes.roundAvatar);
    const onLoadError = (e) => {
        e.target.onerror = null;
        e.target.src = DEFAULT_AVATAR_PATH;
    }
    return (
        <img className={avatarClasses} src={src || DEFAULT_AVATAR_PATH} onError={onLoadError} />
    );
};

export default RoundAvatar;