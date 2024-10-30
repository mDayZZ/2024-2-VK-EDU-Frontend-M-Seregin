import React from 'react';
import classes from './UserListItem.module.scss';
import RoundAvatar from "../RoundAvatar/RoundAvatar.jsx";
import {getDatetime} from "../../../utils/date.js";
import {Link} from "react-router-dom";
const UserListItem = ({avatarUrl, heading, comment, date, linkTo}) => {
    return (
        <li>
            <Link className={classes.userListItem__button} to={linkTo}>
                <RoundAvatar src={avatarUrl}/>
                <div className={classes.userListItem__info}>
                    <h2 className={classes.userListItem__name}>{heading || '...'}</h2>
                    <p className={classes.userListItem__lastMessage}>{comment || ''}</p>
                    <p className={classes.userListItem__lastMessageTime}>{date || ''}</p>
                </div>
            </Link>
        </li>
    );
};

export default UserListItem;