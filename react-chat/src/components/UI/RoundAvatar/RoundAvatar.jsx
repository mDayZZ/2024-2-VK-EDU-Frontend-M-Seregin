import React from 'react';
import classes from './RoundAvatar.module.scss';
const RoundAvatar = ({src = null}) => {
    return (
        <img className={classes.roundAvatar} src={src ? src : '/images/avatars/default_avatar.png'}/>
    );
};

export default RoundAvatar;