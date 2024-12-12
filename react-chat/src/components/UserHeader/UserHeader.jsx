import React from 'react';
import RoundAvatar from "../UI/RoundAvatar/RoundAvatar.jsx";
import CopyLink from "../UI/CopyLink/CopyLink.jsx";

import classes from "./UserHeader.module.scss";
const UserHeader = ({avatar, title, status, username}) => {

    return (
        <div className={classes.headInfo}>
            <RoundAvatar src={avatar}/>
            <div className={classes.headInfo__headTitles}>
                <h2>{title}</h2>
                <p className={classes.headInfo__status}>{status}</p>
                <p><CopyLink className={classes.headInfo__username}>{username}</CopyLink></p>
            </div>
        </div>
    );
};

export default UserHeader;