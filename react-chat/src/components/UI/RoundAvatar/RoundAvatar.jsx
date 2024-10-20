import React from 'react';
import classes from './RoundAvatar.module.scss';
const RoundAvatar = ({src = null, className}) => {
    const avatarClasses = [className, classes.roundAvatar].join(' ').trim();
    return (
        <img className={avatarClasses} src={src ? src : '/images/avatars/default_avatar.png'} onError={(e) => {
            e.target.onerror = null; // предотвратить бесконечный цикл в случае, если дефолтная картинка тоже не загрузится
            e.target.src = "/images/avatars/default_avatar.png"; // подставляем дефолтную картинку
        }} />
    );
};

export default RoundAvatar;