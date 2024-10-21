import React from 'react';
import classes from './RoundAvatar.module.scss';
const RoundAvatar = ({src = null, className}) => {
    const avatarClasses = [className, classes.roundAvatar].join(' ').trim();
    return (
        <img className={avatarClasses} src={src ? src : 'images/avatars/default_avatar.png'} onError={(e) => {
            e.target.onerror = null;
            e.target.src = "images/avatars/default_avatar.png";
        }} />
    );
};

export default RoundAvatar;