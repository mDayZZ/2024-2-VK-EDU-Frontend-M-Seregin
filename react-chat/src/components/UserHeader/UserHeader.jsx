import React from 'react';
import RoundAvatar from "../UI/RoundAvatar/RoundAvatar.jsx";
import CopyLink from "../UI/CopyLink/CopyLink.jsx";

import classes from "./UserHeader.module.scss";
import ChangableAvatar from "../ChangableAvatar/ChangableAvatar.jsx";
const UserHeader = ({avatar, setNewUserAvatar, title, status, username, isProfileMine}) => {

    return (
        <div className={classes.headInfo}>
            {isProfileMine
                ? <ChangableAvatar setNewUserAvatar={setNewUserAvatar} src={avatar}/>
                : <RoundAvatar src={avatar}/>
            }

            <div className={classes.headInfo__headTitles}>
                <h2>{title}</h2>
                <p className={classes.headInfo__status}>{status}</p>
                <p><CopyLink className={classes.headInfo__username}>{username}</CopyLink></p>
            </div>
        </div>
    );
};

export default UserHeader;